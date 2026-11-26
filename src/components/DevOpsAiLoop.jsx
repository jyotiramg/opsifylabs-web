import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Sparkles } from 'lucide-react';
import { devopsStages } from '../data/aiEnablement';
import './DevOpsAiLoop.css';

// Figure-eight path: left loop = Dev, right loop = Ops. Starts at the centre,
// runs the left loop, crosses back through the centre and runs the right loop.
const PATH = 'M300,140 C240,40 70,40 70,140 C70,240 240,240 300,140 C360,40 530,40 530,140 C530,240 360,240 300,140';
const STAGE_AT = [0.07, 0.19, 0.31, 0.43, 0.57, 0.69, 0.81, 0.93];
const CYCLE_MS = 16000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DevOpsAiLoop = () => {
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const progress = useRef(STAGE_AT[0]);
  const [points, setPoints] = useState([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());

  // Measure stage positions on the path once.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPoints(STAGE_AT.map((f) => path.getPointAtLength(f * len)));
  }, []);

  const placeDot = (p) => {
    const path = pathRef.current;
    if (!path) return;
    const pt = path.getPointAtLength(p * path.getTotalLength());
    for (const el of [dotRef.current, glowRef.current]) {
      if (el) { el.setAttribute('cx', pt.x); el.setAttribute('cy', pt.y); }
    }
  };

  // Animation loop: move the pulse and derive the active stage from it.
  useEffect(() => {
    placeDot(progress.current);
    if (!playing) return undefined;
    let raf; let last = performance.now();
    const tick = (now) => {
      progress.current = (progress.current + (now - last) / CYCLE_MS) % 1;
      last = now;
      placeDot(progress.current);
      let idx = STAGE_AT.length - 1;
      for (let i = 0; i < STAGE_AT.length; i += 1) if (progress.current >= STAGE_AT[i] - 0.04) idx = i;
      if (progress.current < STAGE_AT[0] - 0.04) idx = STAGE_AT.length - 1;
      setActive((a) => (a === idx ? a : idx));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const select = (i) => {
    setPlaying(false);
    setActive(i);
    progress.current = STAGE_AT[i];
    placeDot(STAGE_AT[i]);
  };

  const stage = devopsStages[active];

  return (
    <div className="dl">
      <div className="dl-visual">
        <div className="dl-toolbar">
          <span className={`dl-live ${playing ? 'on' : ''}`}><span className="dl-live-dot" />{playing ? 'Live flow' : 'Paused'}</span>
          <button type="button" className="dl-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause animation' : 'Play animation'}>
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
        <svg viewBox="0 0 600 280" className="dl-svg" role="group" aria-label="DevOps lifecycle loop">
          <defs>
            <linearGradient id="dlGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#0ea59c" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="dlBlur"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>
          <path ref={pathRef} d={PATH} className="dl-track" />
          <path d={PATH} className="dl-flow" />
          <text x="155" y="146" className="dl-loop-label">DEV</text>
          <text x="445" y="146" className="dl-loop-label">OPS</text>
          <circle ref={glowRef} r="14" className="dl-glow" filter="url(#dlBlur)" />
          <circle ref={dotRef} r="6" className="dl-dot" />
          {points.map((pt, i) => (
            <g
              key={devopsStages[i].key}
              className={`dl-node ${i === active ? 'active' : ''}`}
              transform={`translate(${pt.x} ${pt.y})`}
              onClick={() => select(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); } }}
              tabIndex={0}
              role="button"
              aria-pressed={i === active}
              aria-label={`${devopsStages[i].label}: ${devopsStages[i].title}`}
            >
              <circle r="22" />
              <text y="4">{devopsStages[i].label}</text>
            </g>
          ))}
        </svg>
        <div className="dl-chips" role="tablist" aria-label="DevOps stages">
          {devopsStages.map((s, i) => (
            <button key={s.key} type="button" role="tab" aria-selected={i === active} className={i === active ? 'active' : ''} onClick={() => select(i)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dl-panel" aria-live="polite">
        <span className="dl-stage">
          {String(active + 1).padStart(2, '0')} · {stage.label} <em>{stage.loop === 'dev' ? 'Dev' : 'Ops'}</em>
        </span>
        <h3><Sparkles size={18} /> {stage.title}</h3>
        <ul className="check-list">
          {stage.points.map((pt) => <li key={pt}><span className="dl-bullet" />{pt}</li>)}
        </ul>
        <div className="chips">{stage.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        <div className="dl-progress" aria-hidden="true">
          {devopsStages.map((s, i) => <span key={s.key} className={i <= active ? 'done' : ''} />)}
        </div>
      </div>
    </div>
  );
};

export default DevOpsAiLoop;
