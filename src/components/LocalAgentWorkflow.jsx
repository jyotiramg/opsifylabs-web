import React, { useEffect, useState } from 'react';
import { Lock, Pause, Play } from 'lucide-react';
import { localAgentArch as arch } from '../data/aiEnablement';
import Icon from './Icon';
import './LocalAgentWorkflow.css';

const STEP_MS = 3200;
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Node = ({ node, lit }) => (
  <div className={`law-node ${lit ? 'lit' : ''}`}>
    <span className="law-node-icon"><Icon name={node.icon} size={18} /></span>
    <span>
      <strong>{node.name}</strong>
      <small>{node.desc}</small>
    </span>
  </div>
);

const LocalAgentWorkflow = ({ defaultCloud = 'aws' }) => {
  const [cloud, setCloud] = useState(defaultCloud);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!playing) return undefined;
    const t = setInterval(() => setStep((s) => (s + 1) % arch.steps.length), STEP_MS);
    return () => clearInterval(t);
  }, [playing]);

  const lit = new Set(arch.steps[step].nodes);
  const cloudSide = arch.cloud[cloud];
  const link = arch.link[cloud];

  return (
    <div className="law">
      <div className="law-head">
        <div className="law-toggle" role="tablist" aria-label="Cloud provider">
          {[['aws', 'AWS'], ['azure', 'Azure'], ['gcp', 'GCP']].map(([k, label]) => (
            <button key={k} type="button" role="tab" aria-selected={cloud === k} className={cloud === k ? 'active' : ''} onClick={() => setCloud(k)}>
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="law-play" onClick={() => setPlaying((p) => !p)}>
          {playing ? <><Pause size={14} /> Pause flow</> : <><Play size={14} /> Play flow</>}
        </button>
      </div>

      <div className="law-diagram">
        <section className="law-zone local">
          <header><span>{arch.local.title}</span><small>{arch.local.subtitle}</small></header>
          {arch.local.nodes.map((n) => <Node key={n.id} node={n} lit={lit.has(n.id)} />)}
          <p className="law-note"><Lock size={13} /> Sensitive code and data stay here</p>
        </section>

        <div className={`law-link ${lit.has('link') ? 'lit' : ''}`}>
          <span className="law-wire" aria-hidden="true"><i /></span>
          <div className="law-link-card">
            <Lock size={16} />
            <strong>{link.name}</strong>
            <small>{link.desc}</small>
          </div>
          <span className="law-wire" aria-hidden="true"><i /></span>
        </div>

        <section className={`law-zone cloud ${cloud}`} key={cloud}>
          <header><span>{cloudSide.title}</span><small>{cloudSide.subtitle}</small></header>
          {cloudSide.nodes.map((n) => <Node key={n.id} node={n} lit={lit.has(n.id)} />)}
        </section>
      </div>

      <ol className="law-steps">
        {arch.steps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={`law-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
              onClick={() => { setStep(i); setPlaying(false); }}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="law-step-num">{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.desc}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LocalAgentWorkflow;
