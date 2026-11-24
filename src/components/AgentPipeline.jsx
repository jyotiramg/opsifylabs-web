import React from 'react';
import { GitBranch, PlayCircle, Server, Bot } from 'lucide-react';
import './AgentPipeline.css';

const nodes = [
  { icon: GitBranch, title: 'CI/CD Pipeline', desc: 'GitHub Actions or Jenkins triggers the run on every change.', tone: 'sky' },
  { icon: PlayCircle, title: 'Playwright Engine', desc: 'Drives real browsers, captures DOM, screenshots and traces.', tone: 'violet', link: 'Tool calls' },
  { icon: Server, title: 'MCP Server', desc: 'Exposes browser actions and app context as tools via Model Context Protocol.', tone: 'rose', link: 'Context & actions' },
  { icon: Bot, title: 'LLM Test Agent', desc: 'Reads the page, decides next steps, asserts outcomes and flags anomalies.', tone: 'green' },
];

const AgentPipeline = ({ compact = false }) => (
  <figure className={`pipeline ${compact ? 'compact' : ''}`} aria-label="Agentic testing architecture: CI/CD pipeline triggers Playwright, which talks to an MCP server used by an LLM test agent">
    <ol className="pipeline-flow">
      {nodes.map(({ icon: Ico, title, desc, tone, link }, i) => (
        <li key={title} className="pipeline-step">
          {i > 0 && (
            <span className="pipeline-link" aria-hidden="true">
              <span className="pipeline-line" />
              {link && <span className="pipeline-label">{link}</span>}
            </span>
          )}
          <div className={`pipeline-node tone-${tone}`}>
            <span className="pipeline-icon"><Ico size={22} /></span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        </li>
      ))}
    </ol>
  </figure>
);

export default AgentPipeline;
