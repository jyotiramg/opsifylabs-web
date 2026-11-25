import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import { company } from '../data/company';
import { footerColumns } from '../data/siteMap';
import SiteGrid from './SiteGrid';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-brand">
        <img src="/assets/opsifylabs-logo-dark.png" alt="OpsifyLabs: Innovate, Automate, Accelerate" className="footer-logo" />
        <p>AI consulting, agentic workflow automation, AI governance and quality engineering. Helping teams innovate, automate and accelerate since {company.founded}.</p>
        <div className="footer-social">
          {company.social.linkedin && <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>}
          {company.social.github && <a href={company.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>}
        </div>
      </div>
      <SiteGrid columns={footerColumns} />
    </div>

    <div className="container footer-bottom">
      <small>© {new Date().getFullYear()} OpsifyLabs. All rights reserved.</small>
      <small>Innovate. Automate. Accelerate.</small>
    </div>
  </footer>
);

export default Footer;
