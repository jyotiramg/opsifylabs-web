import React from 'react';
import { Target, Flag, Compass, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="page-container section">
      <div className="container animate-fade-in">
        <h1 className="text-center mb-8">About OpsifyLabs</h1>
        
        <div className="glass p-8 mb-8">
          <h2 className="gradient-text mb-4">Who We Are</h2>
          <p className="text-muted mb-4">
            OpsifyLabs is a technology-driven organization committed to delivering excellence in software quality, automation, and digital transformation.
          </p>
          <p className="text-muted">
            Since our founding in 2020, we have been helping organizations navigate complex technology challenges by providing innovative, scalable, and intelligent solutions. Our expertise spans across Quality Engineering, DevOps, and Artificial Intelligence, enabling us to deliver comprehensive solutions that drive business success.
          </p>
        </div>

        <div className="grid-3 mb-12">
          <div className="glass p-6 card-hover">
            <Compass size={40} color="var(--primary-light)" className="mb-4" />
            <h3>Our Journey</h3>
            <p className="text-muted">What started as a focused testing and automation initiative has evolved into a full-fledged technology solutions company. Over the years, OpsifyLabs has successfully delivered multiple projects across domains, helping clients achieve faster time-to-market, improved quality, and operational efficiency.</p>
          </div>
          <div className="glass p-6 card-hover delay-100">
            <Target size={40} color="var(--secondary)" className="mb-4" />
            <h3>Our Vision</h3>
            <p className="text-muted">To be a globally recognized leader in AI-driven Quality Engineering and DevOps transformation, empowering organizations to build future-ready digital systems.</p>
          </div>
          <div className="glass p-6 card-hover delay-200">
            <Flag size={40} color="#a78bfa" className="mb-4" />
            <h3>Our Mission</h3>
            <p className="text-muted">To enable businesses to deliver secure, scalable, and high-quality software by leveraging cutting-edge technologies, automation, and intelligent solutions.</p>
          </div>
        </div>

        {/* Core Values */}
        <h2 className="text-center mb-8">Our Core Values</h2>
        <div className="grid-3 mb-12">
          {[
            { title: 'Innovation', desc: 'Continuously exploring new technologies and approaches' },
            { title: 'Quality Excellence', desc: 'Ensuring the highest standards in every deliverable' },
            { title: 'Customer Success', desc: 'Prioritizing client goals and outcomes' },
            { title: 'Integrity', desc: 'Building trust through transparency and accountability' },
            { title: 'Continuous Learning', desc: 'Adapting to evolving technologies and industry trends' }
          ].map((value, idx) => (
            <div key={idx} className="glass p-6 card-hover">
              <CheckCircle size={24} color="var(--primary-light)" className="mb-3" />
              <h4>{value.title}</h4>
              <p className="text-muted">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Approach */}
        <h2 className="text-center mb-8">Our Approach</h2>
        <div className="glass p-8 text-center">
          <p className="text-muted mb-6">We follow a structured and proven approach mapping to your success:</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {['Consult', 'Design', 'Build', 'Automate', 'Scale'].map((step, idx) => (
              <span key={idx} className="btn btn-outline" style={{pointerEvents: 'none'}}>{idx + 1}. {step}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
