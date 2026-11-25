import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Github } from 'lucide-react';
import { servicesByCategory, serviceHref } from '../data/services';
import { company } from '../data/company';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <img src="/assets/opsifylabs-logo-dark.png" alt="OpsifyLabs: Innovate, Automate, Accelerate" className="footer-logo" />
        <p>AI-first quality engineering, DevOps and AI consulting. Helping teams innovate, automate and accelerate since {company.founded}.</p>
        <div className="footer-social">
          {company.social.linkedin && <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>}
          {company.social.github && <a href={company.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>}
        </div>
      </div>

      <div>
        <h4>AI Services</h4>
        {servicesByCategory('ai').map((s) => <Link key={s.slug} to={serviceHref(s)}>{s.title}</Link>)}
      </div>

      <div>
        <h4>Engineering</h4>
        {servicesByCategory('engineering').map((s) => <Link key={s.slug} to={serviceHref(s)}>{s.title}</Link>)}
        <h4 style={{ marginTop: '1.5rem' }}>Product</h4>
        <Link to="/products/qa-agent-orchestrator">QA Agent Orchestrator</Link>
        <h4 style={{ marginTop: '1.5rem' }}>Company</h4>
        <Link to="/about">About</Link>
        <Link to="/case-studies">Case Studies</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div>
        <h4>Get in touch</h4>
        {company.emails.map((e) => (
          <a key={e} href={`mailto:${e}`} className="footer-contact"><Mail size={16} /> {e}</a>
        ))}
        <a href={`tel:${company.phoneHref}`} className="footer-contact"><Phone size={16} /> {company.phone}</a>
        {company.offices.map((o) => (
          <span key={o.label} className="footer-contact"><MapPin size={16} /> <span><strong>{o.label}:</strong> {o.short}</span></span>
        ))}
      </div>
    </div>

    <div className="container footer-bottom">
      <small>© {new Date().getFullYear()} OpsifyLabs. All rights reserved.</small>
      <small>Innovate. Automate. Accelerate.</small>
    </div>
  </footer>
);

export default Footer;
