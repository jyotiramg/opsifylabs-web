import React from 'react';
import { ShieldCheck, Server, Cpu, CloudLightning } from 'lucide-react';

const Services = () => {
  return (
    <div className="page-container section">
      <div className="container animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="mb-4">Our Services</h1>
          <p className="text-muted max-w-2xl mx-auto">
            OpsifyLabs provides a comprehensive suite of services designed to address the challenges of modern software development and delivery. Our services are built around three key pillars: Quality Engineering, DevOps, and AI.
          </p>
        </div>

        <div className="mb-12">
          <div className="glass p-8 flex-col md-flex-row gap-8 mb-8">
            <div className="flex-1">
              <ShieldCheck size={48} color="var(--primary-light)" className="mb-4" />
              <h2 className="gradient-text mb-4">Quality Engineering & Testing</h2>
              <p className="text-muted mb-4">
                Quality is at the core of everything we do. Our Quality Engineering services ensure that your applications are reliable, secure, and high-performing.
              </p>
              <h4>Our Capabilities Include:</h4>
              <ul className="text-muted mt-2 ml-4 mb-4" style={{listStyleType: 'disc'}}>
                <li>Functional Testing</li>
                <li>Automation Testing (UI, API, Mobile)</li>
                <li>Regression Testing</li>
                <li>Performance & Load Testing</li>
                <li>Security Testing</li>
                <li>Test Data Management & UAT Support</li>
              </ul>
              <p className="text-muted">We adopt a shift-left and shift-right testing approach, ensuring quality is embedded throughout the development lifecycle.</p>
            </div>
          </div>

          <div className="glass p-8 flex-col md-flex-row gap-8 mb-8" style={{marginLeft: 'auto'}}>
            <div className="flex-1 text-right">
              <Cpu size={48} color="var(--secondary)" className="mb-4 ml-auto" />
              <h2 className="gradient-text mb-4">Test Automation</h2>
              <p className="text-muted mb-4">
                Automation is key to achieving speed and efficiency. We design and implement scalable and reusable automation frameworks tailored to your needs.
              </p>
              <h4 className="mb-2">Technologies & Tools:</h4>
              <p className="text-muted mb-4">Selenium, Cypress, Playwright, Appium for mobile testing, RestAssured, Postman for API testing, BDD frameworks (Cucumber).</p>
              <h4>Key Benefits:</h4>
              <ul className="text-muted mt-2 inline-block text-left" style={{listStyleType: 'disc'}}>
                <li>Faster regression cycles & Reduced manual effort</li>
                <li>Improved test coverage & Continuous integration support</li>
              </ul>
            </div>
          </div>

          <div className="grid-2 gap-8">
            <div className="glass p-8 card-hover">
              <Server size={40} color="#a78bfa" className="mb-4" />
              <h3>DevOps & Platform Engineering</h3>
              <p className="text-muted mb-4">We enable organizations to adopt modern DevOps practices that enhance collaboration and accelerate delivery.</p>
              <ul className="text-muted ml-4 mb-4" style={{listStyleType: 'disc'}}>
                <li>CI/CD Pipeline Design & Implementation</li>
                <li>Infrastructure as Code (Terraform, Ansible)</li>
                <li>Containerization (Docker, Kubernetes)</li>
                <li>DevSecOps Integration & Observability</li>
              </ul>
              <p className="text-muted font-bold">Our DevOps solutions ensure continuous delivery, reduced downtime, and improved system reliability.</p>
            </div>

            <div className="glass p-8 card-hover">
              <CloudLightning size={40} color="var(--primary-light)" className="mb-4" />
              <h3>Cloud & Infrastructure Services</h3>
              <p className="text-muted mb-4">We help organizations build and manage cloud-native applications that are scalable and resilient.</p>
              <ul className="text-muted ml-4" style={{listStyleType: 'disc'}}>
                <li>Cloud Migration (AWS, Azure, GCP)</li>
                <li>Cloud Architecture Design</li>
                <li>Cost Optimization</li>
                <li>Infrastructure Automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
