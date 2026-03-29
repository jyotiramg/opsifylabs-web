import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'quality-engineering',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for contacting OpsifyLabs! Your message has been sent successfully.');
    setFormData({ name: '', email: '', company: '', service: 'quality-engineering', message: '' });
  };

  return (
    <div className="page-container section">
      <div className="container animate-fade-in">
        <h1 className="text-center mb-4">Get In Touch</h1>
        <p className="text-center text-muted max-w-2xl mx-auto mb-12">
          We would love to hear from you. Whether you have a question, need a consultation, or want to explore partnership opportunities, our team is here to help.
        </p>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info glass p-8">
            <h2 className="mb-6 gradient-text">Contact Information</h2>
            
            <div className="info-item mb-6">
              <MapPin className="info-icon" size={24} color="var(--primary-light)" />
              <div>
                <h4>India Office</h4>
                <p className="text-muted">Viman nager Pune</p>
              </div>
            </div>

            <div className="info-item mb-6">
              <MapPin className="info-icon" size={24} color="var(--secondary)" />
              <div>
                <h4>US Office</h4>
                <p className="text-muted">St. Rose Pkwy, Suite 244<br/>Henderson, NV 89052</p>
              </div>
            </div>

            <div className="info-item mb-6">
              <Phone className="info-icon" size={24} color="#a78bfa" />
              <div>
                <h4>Phone</h4>
                <p className="text-muted">8600174725</p>
              </div>
            </div>

            <div className="info-item mb-6">
              <Mail className="info-icon" size={24} color="#38bdf8" />
              <div>
                <h4>Email</h4>
                <p className="text-muted">contact@opsifylabs.com<br/>Opsifylabs@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container glass p-8">
            <h2 className="mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="form-control"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group grid-2 gap-4">
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="form-control"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="company">Company Name</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    className="form-control"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Required</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  className="form-control select-control"
                >
                  <option value="quality-engineering">Quality Engineering & Testing</option>
                  <option value="devops">DevOps & Platform Engineering</option>
                  <option value="ai-solutions">AI & Intelligent Automation</option>
                  <option value="cloud">Cloud & Infrastructure Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="form-control text-area"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
