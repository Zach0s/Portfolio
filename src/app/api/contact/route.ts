import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const MAX_LENGTH = { name: 100, email: 254, message: 5000 };

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

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège invisible pour les humains : un robot qui le remplit reçoit un faux succès.
  if (body.website) {
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

  const resend = new Resend(apiKey);
  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) };

  try {
    await resend.emails.send({
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'envoi. Réessayez plus tard." }, { status: 500 });
  }
}
