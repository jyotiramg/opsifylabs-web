import React from 'react';
import { Network } from 'lucide-react';
import Icon from './Icon';
import './SdlcOrchestrator.css';

// Orchestrator hub coordinating one agent per SDLC stage.
const SdlcOrchestrator = ({ stages }) => (
  <figure className="orch" aria-label={`QA Agent Orchestrator coordinating ${stages.length} agents: ${stages.map((s) => s.agent).join(', ')}`}>
    <div className="orch-hub">
      <span className="orch-hub-icon"><Network size={22} /></span>
      <div>
        <strong>QA Agent Orchestrator</strong>
        <small>plans · routes · shares context · approval gates</small>
      </div>
    </div>
    <div className="orch-bus" aria-hidden="true"><span /></div>
    <ol className="orch-stages">
      {stages.map((s, i) => (
        <li key={s.stage} className="orch-stage">
          <span className="orch-drop" aria-hidden="true" />
          <span className="orch-step">{String(i + 1).padStart(2, '0')} · {s.stage}</span>
          <span className="orch-icon"><Icon name={s.icon} size={20} /></span>
          <strong>{s.agent}</strong>
          <p>{s.desc}</p>
        </li>
      ))}
    </ol>
  </figure>
);

export default SdlcOrchestrator;
