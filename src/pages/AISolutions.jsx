import React from 'react';
import { Bot, LineChart, MessageSquare, Zap } from 'lucide-react';

const AISolutions = () => {
  return (
    <div className="page-container section">
      <div className="container animate-fade-in">
        <h1 className="text-center mb-4">AI Solutions</h1>
        <p className="text-center text-muted max-w-2xl mx-auto mb-12">
          Artificial Intelligence is transforming the way software is built, tested, and deployed. At OpsifyLabs, we leverage AI to create intelligent, adaptive, and efficient systems.
        </p>

        <div className="grid-2 gap-8 mb-12">
          <div className="glass p-8">
            <h2 className="gradient-text mb-6">Our AI Capabilities</h2>
            <ul className="text-muted space-y-4">
              <li className="flex items-center gap-3">
                <Bot color="var(--primary-light)" /> Intelligent Test Automation
              </li>
              <li className="flex items-center gap-3">
                <LineChart color="var(--primary-light)" /> Predictive Analytics
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare color="var(--primary-light)" /> Natural Language Processing (NLP)
              </li>
              <li className="flex items-center gap-3">
                <Zap color="var(--primary-light)" /> Autonomous Systems
              </li>
            </ul>
          </div>
          
          <div className="glass p-8">
            <h2 className="gradient-text mb-6">How We Deliver Value</h2>
             <ul className="text-muted space-y-4 ml-4" style={{listStyleType: 'decimal'}}>
              <li>Automating repetitive tasks</li>
              <li>Enhancing accuracy and efficiency</li>
              <li>Providing actionable insights</li>
              <li>Enabling data-driven decision-making</li>
            </ul>
          </div>
        </div>

        <div className="glass p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-3xl opacity-10 rounded-full"></div>
          <h2 className="mb-8 text-center">Use Cases & Benefits</h2>
          <div className="grid-2 gap-8">
            <div>
              <h3 className="mb-4">Use Cases</h3>
              <ul className="text-muted ml-4" style={{listStyleType: 'disc'}}>
                <li className="mb-2">Automated test case generation from requirements</li>
                <li className="mb-2">Smart regression optimization</li>
                <li className="mb-2">Production anomaly detection</li>
                <li>AI-driven customer support systems</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Business Benefits</h3>
              <ul className="text-muted ml-4" style={{listStyleType: 'disc'}}>
                <li className="mb-2">Reduced operational costs</li>
                <li className="mb-2">Faster innovation cycles</li>
                <li className="mb-2">Improved system reliability</li>
                <li>Enhanced user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISolutions;
