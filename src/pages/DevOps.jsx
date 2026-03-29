import React from 'react';
import { Shield, Zap, Wrench, Users } from 'lucide-react';

const DevOps = () => {
  return (
    <div className="page-container section">
      <div className="container animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="mb-4">DevOps Center & Lifecycle</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Comprehensive environment management, release automation, and continuous testing.
          </p>
        </div>

        {/* Image Section */}
        <div className="glass p-8 mb-16 text-center shadow-lg">
          <img 
            src="/assets/devops-diagram.png" 
            alt="DevOps Lifecycle Diagram" 
            className="w-full max-w-5xl mx-auto rounded-lg mb-4"
          />
        </div>

        {/* Description Section */}
        <div className="mb-16">
          <h2 className="gradient-text mb-6">The DevOps Lifecycle</h2>
          <p className="text-muted mb-4 text-lg">
            Modern DevOps is an infinite loop combining <strong>Plan, Build, Test, Release, and Observe</strong> with continuous security, test automation, and collaboration integrations. 
          </p>
          <p className="text-muted mb-6">
            The ecosystem supports advanced cross-functional capabilities. It integrates Low Code Builders and IDEs seamlessly while ensuring robustness through comprehensive Code Analyzers, Data Masking, and Scale Testing. Security is maintained at every step with Privacy Centers and Event Monitoring, and deployment environments span everything from Scratch Orgs to Full Sandboxes.
          </p>
        </div>

        {/* How OpsifyLabs Helps */}
        <div className="glass p-8">
          <h2 className="gradient-text mb-8 text-center">How OpsifyLabs Helps</h2>
          <div className="grid-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Wrench size={28} color="var(--primary-light)" /></div>
              <div>
                <h3 className="mb-2">End-to-End Implementation</h3>
                <p className="text-muted">We set up, configure, and manage your entire DevOps Center, integrating your IDEs, repositories, and environment sandboxes seamlessly into your workflow.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Zap size={28} color="var(--secondary)" /></div>
              <div>
                <h3 className="mb-2">Test Automation Strategy</h3>
                <p className="text-muted">OpsifyLabs integrates Code Analyzers, Data Masking, and Scale Testing directly into your CI/CD pipelines to catch bugs and performance issues before they surface in production.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Shield size={28} color="#10b981" /></div>
              <div>
                <h3 className="mb-2">Security & Compliance</h3>
                <p className="text-muted">We weave Event Monitoring, Privacy Centers, and Zero Trust Architectures into your release processes, ensuring strict data residency and compliance automatically.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1"><Users size={28} color="#f43f5e" /></div>
              <div>
                <h3 className="mb-2">Empowering Your Team</h3>
                <p className="text-muted">From training your Low Code Builders to configuring Salesforce Backup and intelligent automation, we empower your team to release with absolute confidence.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DevOps;
