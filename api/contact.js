// Vercel serverless function: POST /api/contact
// Sends contact-form enquiries to the OpsifyLabs inbox through Gmail SMTP.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   GMAIL_USER          the Gmail address that sends the mail, e.g. opsifylabs@gmail.com
//   GMAIL_APP_PASSWORD  a Google "App password" for that account (not the normal password)
// Optional:
//   CONTACT_TO          where enquiries are delivered (default: opsifylabs@gmail.com)
import nodemailer from 'nodemailer';

const DEFAULT_TO = 'opsifylabs@gmail.com';
const LIMITS = { name: 120, email: 200, company: 160, service: 160, budget: 60, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);

export const validate = (body) => {
  const data = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body?.[k], max)]));
  const errors = [];
  if (!data.name) errors.push('name');
  if (!EMAIL_RE.test(data.email)) errors.push('email');
  if (data.message.length < 2) errors.push('message');
  return { data, errors };
};

export const buildMail = (d, { from, to }) => {
  const rows = [
    ['Name', d.name], ['Email', d.email], ['Company', d.company || '-'],
    ['Service', d.service || 'Not specified'], ['Budget', d.budget || 'Not specified'],
  ];
  const oneLine = (s) => s.replace(/[\n]+/g, ' ');
  return {
    from: `"OpsifyLabs Website" <${from}>`,
    to,
    replyTo: `"${oneLine(d.name).replace(/"/g, '')}" <${d.email}>`,
    subject: oneLine(`New enquiry: ${d.service || 'General'} - ${d.name}${d.company ? ` (${d.company})` : ''}`),
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${d.message}\n\n- Sent from the opsifylabs.com contact form`,
    html: `<h2 style="font-family:sans-serif">New website enquiry</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><b>${k}</b></td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`).join('')}</table>
<h3 style="font-family:sans-serif">Message</h3>
<p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(d.message)}</p>
<p style="font-family:sans-serif;color:#888;font-size:12px">Sent from the opsifylabs.com contact form. Reply to this email to answer ${escapeHtml(d.name)} directly.</p>`,
  };
};

let transporter;
const getTransport = () => {
  if (process.env.CONTACT_TEST_TRANSPORT === 'json') return nodemailer.createTransport({ jsonTransport: true });
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
  }
  return transporter;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (body?.website) return res.status(200).json({ ok: true });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Too many messages. Please try again in a few minutes.' });

  const { data, errors } = validate(body);
  if (errors.length) return res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', fields: errors });

  const testMode = process.env.CONTACT_TEST_TRANSPORT === 'json';
  if (!testMode && (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD)) {
    console.error('contact: GMAIL_USER / GMAIL_APP_PASSWORD not configured');
    return res.status(500).json({ ok: false, error: 'We could not send your message right now.' });
  }

  const from = process.env.GMAIL_USER || 'test@example.com';
  const to = process.env.CONTACT_TO || DEFAULT_TO;
  try {
    const info = await getTransport().sendMail(buildMail(data, { from, to }));
    return res.status(200).json({ ok: true, ...(testMode ? { preview: JSON.parse(info.message) } : {}) });
  } catch (err) {
    console.error('contact: send failed', err && err.message);
    return res.status(502).json({ ok: false, error: 'We could not send your message right now.' });
  }
}
