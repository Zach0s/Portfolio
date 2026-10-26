import { createHash } from "node:crypto";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { exists, increment, remove, set, setIfAbsent } from "@/lib/store";
import { verifyTurnstile } from "@/lib/turnstile";

const MAX_LENGTH = { name: 100, email: 254, message: 5000 };

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const LIMITS = {
  // Au-delà de 5 requêtes par minute depuis une même IP, on la bloque 24 h.
  burst: { max: 5, window: MINUTE, block: DAY },
  // Envois acceptés par IP, par adresse email, et tous expéditeurs confondus.
  perIp: { max: 3, window: HOUR },
  perEmail: { max: 2, window: HOUR },
  global: { max: 20, window: HOUR },
  // Un message identique déjà reçu est ignoré pendant 24 h.
  duplicate: { window: DAY },
};

const hash = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 32);

// Sur Vercel, x-real-ip et x-forwarded-for sont posés par la plateforme et non falsifiables.
// Une IPv6 est ramenée à son préfixe /64, qu'un même abonné peut faire tourner librement.
function clientIp(req: NextRequest) {
  const raw =
    req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!raw.includes(":")) return raw;
  return raw.split(":").slice(0, 4).join(":") + "::/64";
}

function tooMany(message: string, retryAfter: number) {
  return NextResponse.json({ error: message }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Service email non configuré." }, { status: 500 });
  }

  const ip = clientIp(req);
  const ipKey = hash(ip);
  const blockKey = `contact:block:${ipKey}`;

  if (await exists(blockKey)) {
    return tooMany("Trop de tentatives. Réessayez plus tard.", LIMITS.burst.block);
  }

  // Chaque requête compte, valide ou non : un script qui martèle la route est bloqué.
  if ((await increment(`contact:burst:${ipKey}`, LIMITS.burst.window)) > LIMITS.burst.max) {
    await set(blockKey, LIMITS.burst.block);
    return tooMany("Trop de tentatives. Réessayez plus tard.", LIMITS.burst.block);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège invisible pour les humains : un robot qui le remplit reçoit un faux succès.
  if (body.website) {
    await set(blockKey, LIMITS.burst.block);
    return NextResponse.json({ success: true });
  }

  const field = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");
  // Le nom part dans l'objet du mail : on retire les retours à la ligne.
  const name = field("name").replace(/[\r\n]+/g, " ");
  const email = field("email");
  const message = field("message");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    message.length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ error: "Un des champs est trop long." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!(await verifyTurnstile(token, ip))) {
    return NextResponse.json({ error: "Vérification anti-robot échouée. Réessayez." }, { status: 403 });
  }

  if ((await increment(`contact:ip:${ipKey}`, LIMITS.perIp.window)) > LIMITS.perIp.max) {
    return tooMany("Vous avez envoyé plusieurs messages récemment. Réessayez dans une heure.", LIMITS.perIp.window);
  }
  const emailKey = hash(email.toLowerCase());
  if ((await increment(`contact:email:${emailKey}`, LIMITS.perEmail.window)) > LIMITS.perEmail.max) {
    return tooMany("Vous avez envoyé plusieurs messages récemment. Réessayez dans une heure.", LIMITS.perEmail.window);
  }
  if ((await increment("contact:global", LIMITS.global.window)) > LIMITS.global.max) {
    return tooMany(
      "Le formulaire reçoit trop de messages en ce moment. Écrivez-moi directement par email.",
      LIMITS.global.window,
    );
  }

  // Un doublon (double clic, script qui renvoie le même texte) reçoit un faux succès sans nouvel email.
  const duplicateKey = `contact:dup:${hash(message.toLowerCase().replace(/\s+/g, " "))}`;
  if (!(await setIfAbsent(duplicateKey, LIMITS.duplicate.window))) {
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);
  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) };

  try {
    // Resend ne lève pas d'exception sur une erreur d'API : il la renvoie dans `error`.
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "zacharie.rodde@gmail.com",
      replyTo: email,
      subject: `[IMPORTANT] Message de ${name} — Portfolio`,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #4f46e5; margin-bottom: 4px;">Nouveau message de votre portfolio</h2>
          <p style="color: #6b7280; margin-bottom: 24px; font-size: 14px;">Reçu via le formulaire de contact</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #111827; width: 100px;">Nom</td>
              <td style="padding: 8px 0; color: #374151;">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #111827;">Email</td>
              <td style="padding: 8px 0; color: #374151;"><a href="mailto:${safe.email}" style="color: #4f46e5;">${safe.email}</a></td>
            </tr>
          </table>

          <div style="background: #f8f9fa; border-left: 3px solid #4f46e5; padding: 16px; border-radius: 4px;">
            <p style="font-weight: 600; color: #111827; margin-bottom: 8px;">Message</p>
            <p style="color: #374151; white-space: pre-wrap; margin: 0;">${safe.message}</p>
          </div>
        </div>
      `,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch {
    await remove(duplicateKey);
    return NextResponse.json({ error: "Erreur lors de l'envoi. Réessayez plus tard." }, { status: 500 });
  }
}
