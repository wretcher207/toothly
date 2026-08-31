// Vercel serverless function: waitlist signup -> email David via Resend.
// Env needed at deploy: RESEND_API_KEY, WAITLIST_TO (destination inbox),
// WAITLIST_FROM (a verified Resend sender, e.g. toothly@deadpixeldesign.com).

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const email = (req.body?.email ?? '').toString().trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'invalid email' });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_TO;
  const from = process.env.WAITLIST_FROM;
  if (!key || !to || !from) return res.status(500).json({ error: 'not configured' });

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Toothly waitlist: ${email}`,
      text: `New waitlist signup: ${email}\nTime: ${new Date().toISOString()}`,
    }),
  });
  if (!r.ok) return res.status(502).json({ error: 'delivery failed' });

  return res.status(200).json({ ok: true });
}
