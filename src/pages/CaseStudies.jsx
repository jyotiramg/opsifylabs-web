import React from 'react';
import { Briefcase, ArrowRight, CheckCircle, Network } from 'lucide-react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const CaseStudies = () => {
  const cases = [
    {
      title: "Automation Transformation",
      client: "Leading Enterprise",
      metric: "60% Reduction",
      description: "A leading enterprise reduced manual testing efforts by 60% through the implementation of a robust automation framework designed by OpsifyLabs.",
      tag: "Test Automation"
    },
    {
      title: "DevOps Implementation",
      client: "Technology Startup",
      metric: "Faster Releases",
      description: "We enabled a client to achieve continuous integration and deployment, reducing release cycles and improving system stability.",
      tag: "CI/CD & DevOps"
    },
    {
      title: "AI-Based Testing",
      client: "Financial Services",
      metric: "Higher Accuracy",
      description: "By implementing AI-driven testing solutions, we improved defect detection accuracy and reduced production issues.",
      tag: "AI Solutions"
    }
  ];

  return (
    <div className="page-container section">
      <div className="container animate-fade-in">
        <div className="text-center mb-12">
          <Briefcase size={48} color="var(--primary)" className="mx-auto mb-4" />
          <h1 className="mb-4">Case Studies & Impact</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Discover how OpsifyLabs has delivered measurable outcomes and transformed organizations across various industries.
          </p>
        </div>

        {/* Flagship AI Pipeline Use Case */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
             <Network size={32} color="var(--secondary)" />
             <h2 className="gradient-text m-0">Flagship AI Pipeline Architecture</h2>
          </div>
          <p className="text-muted mb-6 max-w-4xl font-medium">
            At OpsifyLabs, we have successfully integrated cutting-edge AI into browser automation pipelines. By coupling the <strong>Playwright Engine</strong> with an <strong>MCP (Model Context Protocol) Server</strong>, we enable advanced Large Language Models to autonomously reason, navigate, and validate complex UI interactions.
          </p>
          
          <ArchitectureDiagram />
          
          <p className="text-muted mt-6 max-w-4xl">
            This intelligent automation eliminates brittle locators, drastically reduces maintenance overhead, and ensures web applications behave deterministically in the real world. Our architecture provides a fully autonomous AI agent communicating bidirectionally with a browser through a standardized tool-call protocol loop.
          </p>
        </div>

        <h2 className="mb-8 border-b border-border-light pb-4">More Success Stories</h2>

        <div className="grid-3 gap-8">
          {cases.map((study, idx) => (
            <div key={idx} className={`glass p-8 card-hover delay-${(idx+1)*100} relative overflow-hidden flex flex-col`}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CheckCircle size={100} />
              </div>
              <span className="inline-block px-3 py-1 bg-surface border border-border-light rounded-full text-xs font-semibold text-primary-light mb-4 w-max">
                {study.tag}
              </span>
              <h3 className="mb-2 z-10">{study.title}</h3>
              <div className="flex justify-between items-center mb-4 z-10">
                <p className="text-sm font-semibold">{study.client}</p>
                <span className="text-secondary font-bold text-sm bg-secondary bg-opacity-10 px-2 py-1 rounded">
                  {study.metric}
                </span>
              </div>
              <p className="text-muted z-10 flex-grow">
                {study.description}
              </p>
              <div className="mt-6 pt-4 border-t border-border-light z-10">
                <button className="btn btn-outline w-full text-sm">Read Full Story <ArrowRight size={16} className="ml-2"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
