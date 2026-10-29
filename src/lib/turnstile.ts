// Vérification Cloudflare Turnstile, active seulement si TURNSTILE_SECRET_KEY est définie.

export const turnstileEnabled = Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(token: string, ip: string) {
  if (!turnstileEnabled) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
        ...(ip !== "unknown" && { remoteip: ip }),
      }),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Vérification Turnstile impossible :", err);
    return false;
  }
}
