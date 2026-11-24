import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { services, getService } from '../data/services';
import { company } from '../data/company';
import { products, getProduct } from '../data/products';
import PageHeader from '../components/PageHeader';
import './pages.css';

// Set VITE_CONTACT_ENDPOINT (e.g. a Formspree / Web3Forms / your own API URL)
// to receive submissions as JSON. Without it the form opens the visitor's
// email client with the message prefilled, so no enquiry is silently lost.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const empty = { name: '', email: '', company: '', service: '', budget: '', message: '', website: '' };

const Contact = () => {
  const [params] = useSearchParams();
  const preset = getService(params.get('service')) || getProduct(params.get('service')) ? params.get('service') : '';
  const [form, setForm] = useState({ ...empty, service: preset });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const serviceLabel = getService(form.service)?.title
    || (getProduct(form.service) && `${getProduct(form.service).name} (demo request)`)
    || (form.service === 'other' ? 'Other' : 'Not specified');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot: bots fill hidden fields

    if (!ENDPOINT) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nService: ${serviceLabel}\nBudget: ${form.budget || 'Not specified'}\n\n${form.message}`;
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${serviceLabel}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const { website, ...payload } = form;
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, service: serviceLabel }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setForm(empty);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Let's build something <span className="gradient-text">intelligent</span></>}>
        Tell us about your project, whether it is an AI idea, a testing bottleneck or a platform that needs to scale.
        A senior consultant will reply personally.
      </PageHeader>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container contact-grid">
          <aside className="contact-info">
            <div className="card">
              <h3 style={{ marginBottom: '1.25rem' }}>Contact details</h3>
              <a href={`mailto:${company.email}`} className="info-row"><span className="icon-tile"><Mail size={20} /></span><span><strong>Email</strong>{company.email}</span></a>
              <a href={`tel:${company.phoneHref}`} className="info-row"><span className="icon-tile cyan"><Phone size={20} /></span><span><strong>Phone</strong>{company.phone}</span></a>
              {company.offices.map((o) => (
                <div key={o.label} className="info-row"><span className="icon-tile"><MapPin size={20} /></span><span><strong>{o.label} office</strong>{o.full}</span></div>
              ))}
            </div>
            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>What happens next</h3>
              <ol className="next-steps">
                <li>We review your message and reply to schedule a call.</li>
                <li>A 30-minute discovery call with a senior consultant.</li>
                <li>A short written proposal with scope, timeline and cost.</li>
              </ol>
            </div>
          </aside>

          <div className="card">
            {status === 'sent' ? (
              <div className="form-done" role="status">
                <CheckCircle2 size={40} />
                <h3>Thanks, your message is on its way.</h3>
                <p>We will be in touch shortly at the email you provided.</p>
                <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>Send another message</button>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="form-row">
                  <label>Full name *<input name="name" value={form.name} onChange={onChange} required autoComplete="name" /></label>
                  <label>Work email *<input type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" /></label>
                </div>
                <div className="form-row">
                  <label>Company<input name="company" value={form.company} onChange={onChange} autoComplete="organization" /></label>
                  <label>Service of interest
                    <select name="service" value={form.service} onChange={onChange}>
                      <option value="">Select a service</option>
                      <optgroup label="Products">
                        {products.map((p) => <option key={p.slug} value={p.slug}>{p.name} (demo)</option>)}
                      </optgroup>
                      <optgroup label="Services">
                        {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                      </optgroup>
                      <option value="other">Other / not sure yet</option>
                    </select>
                  </label>
                </div>
                <label>Estimated budget
                  <select name="budget" value={form.budget} onChange={onChange}>
                    <option value="">Prefer not to say</option>
                    <option>Under $10k</option>
                    <option>$10k – $50k</option>
                    <option>$50k – $150k</option>
                    <option>$150k+</option>
                  </select>
                </label>
                <label>How can we help? *
                  <textarea name="message" rows={6} value={form.message} onChange={onChange} required placeholder="Goals, timeline, current challenges..." />
                </label>
                <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} /></label>

                {status === 'error' && (
                  <p className="form-msg err" role="alert"><AlertCircle size={16} /> Something went wrong. Please email us directly at {company.email}.</p>
                )}
                {status === 'mailto' && (
                  <p className="form-msg" role="status"><CheckCircle2 size={16} /> Your email app should have opened with the message ready to send. If not, write to {company.email}.</p>
                )}

                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : <>Send message <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
