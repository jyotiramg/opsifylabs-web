import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, Cpu, Cloud } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content container animate-fade-in">
          <h1 className="hero-title">
            Innovate. Automate. <span className="gradient-text">Accelerate.</span>
          </h1>
          <p className="hero-subtitle delay-100">
            At OpsifyLabs, we empower organizations to build high-quality, scalable, and intelligent digital solutions through advanced Quality Engineering, DevOps, and AI-driven transformation.
          </p>
          <div className="hero-btns delay-200">
            <Link to="/contact" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Speak with an Expert
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section container section">
        <div className="intro-grid">
          <div className="intro-text">
            <h2>Transforming Software Delivery</h2>
            <p>
              In today's rapidly evolving digital landscape, organizations must deliver software faster while maintaining the highest standards of quality and reliability. Traditional development and testing approaches are no longer sufficient to meet modern demands.
            </p>
            <p><strong>OpsifyLabs bridges this gap.</strong></p>
            <p className="text-muted">
              Founded in 2020, OpsifyLabs is a next-generation technology company specializing in end-to-end Quality Engineering, DevOps transformation, and Artificial Intelligence solutions. We partner with enterprises and startups to design, build, test, automate, and scale their digital ecosystems.
            </p>
          </div>
          <div className="intro-image glass card-hover">
             <div className="stats-container">
                <div className="stat-item">
                  <h3 className="gradient-text">60%</h3>
                  <p>Reduced Testing Time</p>
                </div>
                <div className="stat-item">
                  <h3 className="gradient-text">100+</h3>
                  <p>Successful Deliveries</p>
                </div>
                <div className="stat-item">
                  <h3 className="gradient-text">AI</h3>
                  <p>First Approach</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="services-overview section">
        <div className="container">
          <h2 className="text-center mb-12">What We Do</h2>
          <div className="grid-3">
            <div className="service-card glass card-hover">
              <Shield className="service-icon" size={40} color="var(--primary-light)" />
              <h3>Quality Engineering</h3>
              <p className="text-muted">Ensuring applications are reliable, scalable, and defect-free through continuous testing.</p>
              <Link to="/services" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
            <div className="service-card glass card-hover delay-100">
              <Zap className="service-icon" size={40} color="var(--secondary)" />
              <h3>DevOps & Platform Engineering</h3>
              <p className="text-muted">Enabling faster delivery through infrastructure automation and continuous integration.</p>
              <Link to="/devops" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
            <div className="service-card glass card-hover delay-200">
              <Cpu className="service-icon" size={40} color="#a78bfa" />
              <h3>AI & Intelligent Automation</h3>
              <p className="text-muted">Leveraging AI to enhance efficiency, predictive accuracy, and decision-making.</p>
              <Link to="/ai-solutions" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section container section">
        <h2>Why Choose OpsifyLabs</h2>
        <div className="why-us-grid">
          {[
            'End-to-End Ownership: From consulting to implementation',
            'AI-First Approach: Integrating intelligence into every solution',
            'Scalable Solutions: Designed for growth and adaptability',
            'Expert Team: Skilled professionals with deep domain expertise',
            'Client-Centric Delivery: Tailored solutions aligned with business goals'
          ].map((item, idx) => (
             <div key={idx} className="feature-item glass">
                <CheckCircle color="var(--primary-light)" className="feature-icon" />
                <span>{item}</span>
             </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="mb-6">Transform your software delivery with OpsifyLabs.</h2>
          <p className="mb-8">Let’s innovate, automate, and accelerate together.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Partner With Us</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
