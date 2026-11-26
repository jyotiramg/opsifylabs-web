import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, RotateCcw, Check, Zap, Clock, UserCheck, AlertTriangle, Bot } from 'lucide-react';
import { demo } from '../data/workflowDemo';
import Icon from './Icon';
import './WorkflowPlayground.css';

const STEP_MS = 900;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stamp = (start) => {
  const s = (performance.now() - start) / 1000;
  return `00:${String(Math.floor(s)).padStart(2, '0')}.${String(Math.floor((s % 1) * 10))}`;
};
const fmtMinutes = (m) => (m >= 60 ? `${Math.floor(m / 60)} h ${Math.round(m % 60)} min` : `${Math.max(1, Math.round(m))} min`);

const WorkflowPlayground = () => {
  const [trigger, setTrigger] = useState('email');
  const [model, setModel] = useState('hybrid');
  const [approval, setApproval] = useState('exceptions');
  const [batch, setBatch] = useState(25);
  const [enabled, setEnabled] = useState(() => Object.fromEntries(demo.steps.map((s) => [s.id, true])));

  const [status, setStatus] = useState('idle'); // idle | running | waiting | done
  const [activeId, setActiveId] = useState(null);
  const [doneIds, setDoneIds] = useState([]);
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pending, setPending] = useState(0);

  const runId = useRef(0);
  const approveResolver = useRef(null);
  const logRef = useRef(null);

  useEffect(() => () => { runId.current += 1; }, []); // cancel on unmount
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [logs]);

  const steps = useMemo(() => demo.steps.filter((s) => enabled[s.id]), [enabled]);
  const locked = status === 'running' || status === 'waiting';

  const reset = () => {
    runId.current += 1;
    if (approveResolver.current) { approveResolver.current(); approveResolver.current = null; }
    setStatus('idle'); setActiveId(null); setDoneIds([]); setLogs([]); setSummary(null);
  };

  const run = async () => {
    reset();
    const id = runId.current;
    const alive = () => runId.current === id;
    const start = performance.now();
    const push = (text, kind = 'info') => setLogs((l) => [...l, { t: stamp(start), text, kind }]);

    const n = batch;
    const dupes = enabled.duplicates && n >= 10 ? 1 : 0;
    const exceptions = Math.max(1, Math.round(n * 0.12));
    const review = approval === 'all' ? n - dupes : approval === 'exceptions' ? exceptions : 0;
    const ctx = {
      n, dupes, exceptions, review, approval,
      posted: n - dupes,
      model: demo.models.find((m) => m.id === model),
    };

    setStatus('running');
    push(demo.triggers.find((t) => t.id === trigger).log, 'trigger');

    for (const step of steps) {
      if (!alive()) return;
      setActiveId(step.id);
      push(`▶ ${step.name}`, 'step');
      await sleep(STEP_MS * 0.45);

      if (step.human && approval !== 'none') {
        step.log(ctx).forEach((l) => push(l, 'human'));
        setPending(review);
        setStatus('waiting');
        await new Promise((resolve) => { approveResolver.current = resolve; });
        approveResolver.current = null;
        if (!alive()) return;
        setStatus('running');
        push(`✓ ${review} items approved by Finance`, 'ok');
      } else {
        for (const line of step.log(ctx)) {
          if (!alive()) return;
          push(line, step.human ? 'warn' : 'info');
          await sleep(STEP_MS * 0.35);
        }
      }
      setDoneIds((d) => [...d, step.id]);
    }
    if (!alive()) return;

    // Illustrative comparison: manual minutes for the same enabled steps vs.
    // agent processing plus the human review that remains.
    // Manual baseline is independent of the agent config: people handle exceptions today too.
    const manualMin = n * steps.reduce((sum, s) => sum + s.manualMin, 0) + exceptions * 6;
    const reviewMin = approval === 'all' ? review * 1 : review * 3;
    const agentMin = reviewMin + (n * steps.length * 4) / 60;
    setSummary({ n, manualMin, agentMin, review, exceptions, dupes, saved: Math.max(0, 1 - agentMin / manualMin) });
    setActiveId(null);
    setStatus('done');
    push(`Workflow complete: ${n - dupes} invoices processed`, 'ok');
  };

  const approve = () => { if (approveResolver.current) approveResolver.current(); };
  const toggle = (sid) => setEnabled((e) => ({ ...e, [sid]: !e[sid] }));

  const modelInfo = demo.models.find((m) => m.id === model);
  const approvalInfo = demo.approvals.find((a) => a.id === approval);

  return (
    <div className="wp">
      {/* Configuration */}
      <aside className="wp-config" aria-label="Configure the workflow">
        <h3>Configure the flow</h3>
        <label className="wp-field">
          <span>Trigger</span>
          <select value={trigger} onChange={(e) => setTrigger(e.target.value)} disabled={locked}>
            {demo.triggers.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </label>
        <div className="wp-field">
          <span>AI model routing</span>
          <div className="wp-seg">
            {demo.models.map((m) => (
              <button key={m.id} type="button" className={m.id === model ? 'active' : ''} onClick={() => setModel(m.id)} disabled={locked}>{m.label}</button>
            ))}
          </div>
          <small>{modelInfo.note}</small>
        </div>
        <div className="wp-field">
          <span>Human approval</span>
          <div className="wp-seg">
            {demo.approvals.map((a) => (
              <button key={a.id} type="button" className={a.id === approval ? 'active' : ''} onClick={() => setApproval(a.id)} disabled={locked}>{a.label}</button>
            ))}
          </div>
          <small className={approval === 'none' ? 'warn' : ''}>{approval === 'none' && <AlertTriangle size={12} />} {approvalInfo.note}</small>
        </div>
        <label className="wp-field">
          <span>Batch size <output>{batch} invoices</output></span>
          <input type="range" min={5} max={100} step={5} value={batch} onChange={(e) => setBatch(Number(e.target.value))} disabled={locked}
            style={{ '--fill': `${((batch - 5) / 95) * 100}%` }} />
        </label>
        <div className="wp-field">
          <span>Optional steps</span>
          <div className="wp-checks">
            {demo.steps.filter((s) => s.optional).map((s) => (
              <label key={s.id} className={`wp-check ${enabled[s.id] ? 'on' : ''}`}>
                <input type="checkbox" checked={enabled[s.id]} onChange={() => toggle(s.id)} disabled={locked} />
                <span className="wp-switch" aria-hidden="true" />{s.name}
              </label>
            ))}
          </div>
        </div>
        <div className="wp-actions">
          {status === 'idle' || status === 'done'
            ? <button type="button" className="btn btn-primary" onClick={run}><Play size={16} /> {status === 'done' ? 'Run again' : 'Run workflow'}</button>
            : <button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} /> Stop</button>}
          {status === 'done' && <button type="button" className="btn btn-ghost" onClick={reset}><RotateCcw size={16} /> Reset</button>}
        </div>
      </aside>

      {/* Flow */}
      <div className="wp-flow" aria-label="Workflow steps">
        <div className="wp-flow-head">
          <span className={`wp-status s-${status}`}><span className="dot" />
            {status === 'idle' && 'Ready'}{status === 'running' && 'Running'}{status === 'waiting' && 'Waiting for approval'}{status === 'done' && 'Completed'}
          </span>
          <span className="wp-name">{demo.name}</span>
        </div>
        <ol>
          <li className={`wp-node trigger ${status !== 'idle' ? 'done' : ''}`}>
            <span className="wp-node-icon"><Zap size={16} /></span>
            <span><strong>Trigger</strong><small>{demo.triggers.find((t) => t.id === trigger).label}</small></span>
          </li>
          {steps.map((s) => {
            const isActive = activeId === s.id;
            const isDone = doneIds.includes(s.id);
            const skipped = s.human && approval === 'none';
            return (
              <li key={s.id} className={`wp-node ${s.human ? 'human' : ''} ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${skipped ? 'skipped' : ''}`}>
                <span className="wp-node-icon">{isDone ? <Check size={16} /> : <Icon name={s.icon} size={16} />}</span>
                <span>
                  <strong>{s.name}{s.human && <em>{skipped ? 'skipped' : 'human'}</em>}</strong>
                  <small>{s.desc}</small>
                </span>
                {isActive && status === 'waiting' && (
                  <button type="button" className="btn btn-primary wp-approve" onClick={approve}><UserCheck size={14} /> Approve {pending}</button>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Live log + results */}
      <div className="wp-side">
        <div className="wp-log" ref={logRef} aria-live="polite" aria-label="Live run log">
          {logs.length === 0 && <p className="wp-log-empty"><Bot size={16} /> Configure the flow and press <strong>Run workflow</strong> to watch the agents work.</p>}
          {logs.map((l, i) => (
            <div key={i} className={`wp-line k-${l.kind}`}><time>{l.t}</time>{l.text}</div>
          ))}
        </div>
        {summary && (
          <div className="wp-summary">
            <span className="wp-sum-label">Run result · {summary.n} invoices</span>
            <div className="wp-sum-grid">
              <div><Clock size={16} /><strong>{fmtMinutes(summary.manualMin)}</strong><span>manual effort today</span></div>
              <div className="hi"><Bot size={16} /><strong>{fmtMinutes(summary.agentMin)}</strong><span>total with agents</span></div>
              <div><UserCheck size={16} /><strong>{summary.review}</strong><span>items a person touched</span></div>
              <div className="hi"><Zap size={16} /><strong>{Math.round(summary.saved * 100)}%</strong><span>less time overall</span></div>
            </div>
            <small>Illustrative per-invoice timings. We measure your real baseline during discovery.</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowPlayground;
