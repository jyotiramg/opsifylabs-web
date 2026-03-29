import React from 'react';
import { PlayCircle, Server, Bot, GitBranch, ArrowRight, ArrowLeftRight } from 'lucide-react';
import './ArchitectureDiagram.css';

const ArchitectureDiagram = () => {
  return (
    <div className="diagram-container">
      <div className="diagram-flow">
        
        {/* Node 1: CI/CD Pipeline */}
        <div className="diagram-node pulse-glow delay-100">
          <div className="node-icon bg-secondary-glow">
            <GitBranch size={32} color="#0ea5e9" />
          </div>
          <h4 className="node-title">CI/CD Pipeline</h4>
          <p className="node-desc">Triggers automated testing via GitHub Actions / Jenkins</p>
        </div>

        <div className="diagram-connector">
          <ArrowRight size={24} className="animate-pulse-slow" color="var(--text-muted)" />
        </div>

        {/* Node 2: Playwright */}
        <div className="diagram-node pulse-glow delay-200">
          <div className="node-icon bg-primary-glow">
            <PlayCircle size={32} color="#8b5cf6" />
          </div>
          <h4 className="node-title">Playwright Engine</h4>
          <p className="node-desc">Executes UI actions, extracts browser DOM, captures screenshots</p>
        </div>

        <div className="diagram-connector bidirectional">
          <ArrowLeftRight size={24} className="animate-pulse-slow delay-100" color="var(--text-muted)" />
          <span className="connector-label text-xs absolute top-[-20px] w-max text-center">Tool Call API</span>
        </div>

        {/* Node 3: MCP Server */}
        <div className="diagram-node pulse-glow delay-300">
          <div className="node-icon bg-accent-glow">
            <Server size={32} color="#f43f5e" />
          </div>
          <h4 className="node-title">MCP Server</h4>
          <p className="node-desc">Exposes Playwright functions & site contexts dynamically</p>
        </div>

        <div className="diagram-connector bidirectional">
          <ArrowLeftRight size={24} className="animate-pulse-slow delay-200" color="var(--text-muted)" />
          <span className="connector-label text-xs absolute top-[-20px] w-max text-center">Context & Action</span>
        </div>

        {/* Node 4: AI Agent */}
        <div className="diagram-node pulse-glow delay-400">
          <div className="node-icon bg-success-glow">
            <Bot size={32} color="#10b981" />
          </div>
          <h4 className="node-title">LLM AI Agent</h4>
          <p className="node-desc">Evaluates DOM, decides next steps, detects anomalies</p>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureDiagram;
