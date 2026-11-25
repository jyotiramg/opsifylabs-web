import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Play, Server, Cloud, Lock } from 'lucide-react';
import { shieldSamples } from '../data/governance';
import './DataShield.css';

// Simplified in-browser detectors for the demo. In production we use
// NER-based PII detection (e.g. Microsoft Presidio) and secret scanners.
const DETECTORS = [
  { type: 'SECRET', policy: 'secrets', re: /\bsk-[A-Za-z0-9-]{16,}\b/g },
  { type: 'SECRET', policy: 'secrets', re: /\bAKIA[0-9A-Z]{16}\b/g },
  { type: 'CARD', policy: 'pii', re: /\b(?:\d{4}[ -]?){3}\d{4}\b/g },
  { type: 'EMAIL', policy: 'pii', re: /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g },
  { type: 'PHONE', policy: 'pii', re: /\+91[\s-]?\d{5}[\s-]?\d{5}\b/g },
  { type: 'PAN', policy: 'pii', re: /\b[A-Z]{5}\d{4}[A-Z]\b/g },
  { type: 'NAME', policy: 'pii', re: /(?<=Customer:\s)[A-Z][a-z]+ [A-Z][a-z]+/g },
];
const INJECTION = /ignore (all )?previous instructions|reveal the system prompt|disregard (your|all) (rules|instructions)/i;

const regions = [
  { id: 'in', label: 'India · Mumbai' },
  { id: 'eu', label: 'EU · Frankfurt' },
  { id: 'us', label: 'US · Virginia' },
];
const policyList = [
  { id: 'pii', label: 'Mask personal data (PII)' },
  { id: 'secrets', label: 'Remove secrets & keys' },
  { id: 'injection', label: 'Prompt-injection guard' },
  { id: 'routing', label: 'Route by data classification' },
];

const analyse = (text, policies) => {
  const findings = [];
  const seen = new Set();
  for (const d of DETECTORS) {
    for (const m of text.matchAll(d.re)) {
      if (seen.has(m[0])) continue;
      seen.add(m[0]);
      findings.push({ type: d.type, value: m[0], protected: policies[d.policy] });
    }
  }
  // Build the outgoing prompt as segments so protected/exposed values can be styled.
  const counters = {};
  let segments = [{ kind: 'text', text }];
  for (const f of findings) {
    counters[f.type] = (counters[f.type] || 0) + 1;
    const label = `${f.type}_${counters[f.type]}`;
    segments = segments.flatMap((seg) => {
      if (seg.kind !== 'text' || !seg.text.includes(f.value)) return [seg];
      const parts = seg.text.split(f.value);
      return parts.flatMap((p, i) => (i < parts.length - 1
        ? [{ kind: 'text', text: p }, f.protected ? { kind: 'masked', text: `[${label}]` } : { kind: 'exposed', text: f.value }]
        : [{ kind: 'text', text: p }]));
    });
  }
  return { findings, segments, injection: INJECTION.test(text) };
};

const DataShield = () => {
  const [sampleId, setSampleId] = useState(shieldSamples[0].id);
  const [policies, setPolicies] = useState({ pii: true, secrets: true, injection: true, routing: true });
  const [region, setRegion] = useState('in');
  const [result, setResult] = useState(null);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);

  useEffect(() => () => { runId.current += 1; }, []);

  const sample = shieldSamples.find((s) => s.id === sampleId);
  const clear = () => { runId.current += 1; setResult(null); setLog([]); setRunning(false); };

  const run = async () => {
    clear();
    const id = runId.current;
    setRunning(true);
    const a = analyse(sample.text, policies);
    const sensitive = sample.classification !== 'Internal';
    const local = policies.routing && sensitive;
    const blocked = a.injection && policies.injection;
    const exposed = a.findings.filter((f) => !f.protected).length;
    const regionLabel = regions.find((r) => r.id === region).label;

    const lines = [
      { k: 'info', t: `Classified as ${sample.classification}` },
      ...a.findings.map((f) => (f.protected
        ? { k: 'ok', t: `${f.type} detected → masked` }
        : { k: 'bad', t: `${f.type} detected → NOT masked (policy off)` })),
      a.injection
        ? (blocked ? { k: 'bad', t: 'Prompt injection detected → request blocked, security alerted' } : { k: 'bad', t: 'Prompt injection present → guard is off, passed through' })
        : { k: 'ok', t: 'No prompt injection found' },
      ...(blocked ? [] : [
        local
          ? { k: 'ok', t: 'Routed to local model: restricted data never leaves your network' }
          : { k: 'info', t: `Routed to cloud model via private endpoint · ${regionLabel}` },
      ]),
      { k: 'info', t: `Audit record written · user=analyst@company · policy v3.2` },
    ];
    for (const line of lines) {
      await new Promise((r) => setTimeout(r, 280));
      if (runId.current !== id) return;
      setLog((l) => [...l, line]);
    }
    setResult({ ...a, blocked, exposed, local, regionLabel });
    setRunning(false);
  };

  const togglePolicy = (pid) => { setPolicies((p) => ({ ...p, [pid]: !p[pid] })); clear(); };

  let verdict = null;
  if (result) {
    if (result.blocked) verdict = { cls: 'blocked', icon: ShieldX, title: 'Blocked before reaching the model', text: 'The injected instructions were caught. Nothing was sent and the security team was alerted.' };
    else if (result.injection) verdict = { cls: 'danger', icon: ShieldAlert, title: 'Attack reached the model', text: 'With the guard off, the hidden instructions were sent along with the document.' };
    else if (result.exposed > 0) verdict = { cls: 'danger', icon: ShieldAlert, title: `${result.exposed} sensitive ${result.exposed === 1 ? 'value' : 'values'} exposed`, text: result.local
      ? 'Unmasked data now sits in prompts and logs, visible to anyone with access to them.'
      : 'This data would now sit in the cloud model provider\'s systems and your logs.' };
    else verdict = { cls: 'safe', icon: ShieldCheck, title: 'Safe to process', text: result.local ? 'Sensitive data handled by a local model inside your network.' : 'Only masked, approved data left your network, over a private link.' };
  }

  return (
    <div className="ds">
      <div className="ds-config">
        <h3>1. Pick a request</h3>
        <div className="ds-samples">
          {shieldSamples.map((s) => (
            <button key={s.id} type="button" className={s.id === sampleId ? 'active' : ''} onClick={() => { setSampleId(s.id); clear(); }}>
              {s.label}<small>{s.classification}</small>
            </button>
          ))}
        </div>
        <h3>2. Set your policies</h3>
        <div className="ds-policies">
          {policyList.map((p) => (
            <label key={p.id} className={`ds-toggle ${policies[p.id] ? 'on' : ''}`}>
              <input type="checkbox" checked={policies[p.id]} onChange={() => togglePolicy(p.id)} />
              <span className="ds-switch" aria-hidden="true" />{p.label}
            </label>
          ))}
        </div>
        <label className="ds-region">
          <span>Data residency</span>
          <select value={region} onChange={(e) => { setRegion(e.target.value); clear(); }}>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </label>
        <button type="button" className="btn btn-primary" onClick={run} disabled={running}><Play size={16} /> {running ? 'Scanning…' : 'Send through the AI gateway'}</button>
      </div>

      <div className="ds-flow">
        <div className="ds-panel">
          <span className="ds-label">What the user typed</span>
          <p className="ds-text">{sample.text}</p>
        </div>

        <div className={`ds-gateway ${running ? 'scanning' : ''} ${result ? 'done' : ''}`}>
          <Lock size={16} /> OpsifyLabs AI gateway
          <span className="ds-active">{Object.values(policies).filter(Boolean).length}/4 policies on</span>
        </div>

        <div className="ds-panel">
          <span className="ds-label">
            What reaches the model
            {result && !result.blocked && (
              <em className={result.local ? 'local' : 'cloud'}>
                {result.local ? <><Server size={12} /> Local model</> : <><Cloud size={12} /> Cloud · {result.regionLabel}</>}
              </em>
            )}
          </span>
          {!result && <p className="ds-text ds-wait">{running ? 'Scanning…' : 'Press "Send through the AI gateway" to see the result.'}</p>}
          {result && result.blocked && <p className="ds-text ds-blocked-text">Nothing. The request was stopped at the gateway.</p>}
          {result && !result.blocked && (
            <p className="ds-text">
              {result.segments.map((s, i) => (s.kind === 'text' ? <span key={i}>{s.text}</span> : <mark key={i} className={s.kind}>{s.text}</mark>))}
            </p>
          )}
        </div>

        {verdict && (
          <div className={`ds-verdict ${verdict.cls}`} role="status">
            <verdict.icon size={22} />
            <div><strong>{verdict.title}</strong><span>{verdict.text}</span></div>
          </div>
        )}
      </div>

      <div className="ds-log" aria-live="polite" aria-label="Gateway audit log">
        <span className="ds-label">Audit log</span>
        {log.length === 0 && <p className="ds-wait">Every decision is recorded here.</p>}
        {log.map((l, i) => <div key={i} className={`ds-line k-${l.k}`}>{l.t}</div>)}
      </div>
    </div>
  );
};

export default DataShield;
