import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { protectionLayers, frameworks } from '../data/governance';
import Icon from './Icon';
import Reveal from './Reveal';
import DataShield from './DataShield';
import './GovernanceSections.css';

export const ProtectionLayers = () => (
  <div className="grid grid-3">
    {protectionLayers.map((l, i) => (
      <Reveal key={l.title} delay={(i % 3) * 60} className="card gl-card">
        <div className="gl-head">
          <div className="icon-tile"><Icon name={l.icon} size={22} /></div>
          <span className="gl-layer">Layer {i + 1}</span>
        </div>
        <h3>{l.title}</h3>
        <p className="gl-risk"><AlertTriangle size={14} /> <span><strong>Risk:</strong> {l.risk}</span></p>
        <ul className="check-list gl-controls">
          {l.controls.map((c) => <li key={c}><CheckCircle2 size={16} /> {c}</li>)}
        </ul>
      </Reveal>
    ))}
  </div>
);

export const Frameworks = () => (
  <div className="gf">
    {frameworks.map((f, i) => (
      <Reveal key={f.name} delay={(i % 3) * 50} className="gf-item">
        <strong>{f.name}</strong>
        <span>{f.help}</span>
      </Reveal>
    ))}
  </div>
);

export const DataShieldSection = ({ id = 'data-shield' }) => (
  <section id={id} className="section">
    <div className="container">
      <Reveal className="section-head">
        <span className="eyebrow">Live demo · AI data shield</span>
        <h2 style={{ marginBottom: '1rem' }}>See what reaches the model, <span className="gradient-text">and what never does</span></h2>
        <p className="lead">
          Every request passes through an AI gateway before it reaches any model. Pick a request, switch policies on or off
          and watch how personal data, secrets and attacks are handled. Turn a policy off to see the risk.
        </p>
      </Reveal>
      <Reveal><DataShield /></Reveal>
      <p className="gs-note">Demo runs entirely in your browser; nothing you see here is sent anywhere. Production gateways use NER-based PII detection and secret scanning.</p>
    </div>
  </section>
);
