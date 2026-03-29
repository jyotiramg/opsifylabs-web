import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container glass">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <img src="/assets/Opsifylabs Logo.png" alt="OpsifyLabs" className="footer-logo" />
            <p className="footer-desc">
              Empowering organizations to build high-quality, scalable, and intelligent digital solutions.
            </p>
            <div className="social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><Github /></a>
            </div>
          </div>
          <div className="footer-link-items">
            <h2>Company</h2>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Services</h2>
            <Link to="/services">Quality Engineering</Link>
            <Link to="/devops">DevOps & Platform</Link>
            <Link to="/ai-solutions">AI & Automation</Link>
            <Link to="/services">Cloud Services</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <div className="contact-item">
              <MapPin size={18} />
              <span>India: Viman nager Pune <br/> USA: St. Rose Pkwy, Henderson, NV</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>8600174725</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>contact@opsifylabs.com</span>
            </div>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">OpsifyLabs © {new Date().getFullYear()} All rights reserved.</small>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
