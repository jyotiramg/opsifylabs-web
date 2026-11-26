import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, X, ArrowRight } from 'lucide-react';
import { departments, brain, mapTotals } from '../data/agentMap';
import './AgentMap.css';

/* ---------- deterministic randomness so the map is stable ---------- */
const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ---------- particle brain (procedural dots inside a brain silhouette) ---------- */
const makeBrain = (scale = 1, count = 900, seed = 7) => {
  const r = rng(seed);
  const inEllipse = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
  const dots = [];
  for (let i = 0; i < count * 4 && dots.length < count; i += 1) {
    const x = (r() * 2 - 1) * 100;
    const y = (r() * 2 - 1) * 90;
    const cerebrum = inEllipse(x, y, -6, -10, 92, 62) && !(y > 34 && x > 20);
    const cerebellum = inEllipse(x, y, 40, 40, 34, 19);
    const stem = x > 14 && x < 30 && y > 30 && y < 78 - (x - 14) * 0.6;
    if (!cerebrum && !cerebellum && !stem) continue;
    if (cerebrum) {
      // folds (gyri) and the lateral fissure
      const fold = Math.sin(x * 0.13 + Math.sin(y * 0.09) * 2.2) * Math.cos(y * 0.15 + Math.sin(x * 0.06) * 1.7);
      if (fold < -0.25) continue;
      if (Math.abs(y - (0.28 * x + 14)) < 3.2 && x > -55 && x < 25) continue;
    }
    if (cerebellum && !cerebrum && Math.abs(Math.sin(y * 0.55)) < 0.25) continue;
    dots.push({ x: x * scale, y: y * scale, r: (0.7 + r() * 1.4) * scale, tw: r() < 0.18, d: (r() * 4).toFixed(2) });
  }
  return dots;
};

const BrainDots = ({ dots, onClick, label }) => (
  <g className="am-brain" onClick={onClick} role="button" tabIndex={0} aria-label={label}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}>
    <circle r="112" className="am-brain-hit" />
    {dots.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} className={p.tw ? 'tw' : ''} style={p.tw ? { animationDelay: `${p.d}s` } : undefined} />)}
  </g>
);

/* ---------- overview geometry ---------- */
const R_RING = 128;
const R_DEPT = 205;
const buildOverview = () => departments.map((dep, di) => {
  const r = rng(100 + di);
  const base = -Math.PI / 2 + (di / departments.length) * Math.PI * 2;
  const n = dep.roles.length;
  const spread = 0.62;
  const node = { x: Math.cos(base) * R_DEPT, y: Math.sin(base) * R_DEPT };
  const branches = dep.roles.map((role, ri) => {
    const off = n === 1 ? 0 : (ri / (n - 1) - 0.5) * spread;
    const len = 110 + r() * 150;
    const steps = Math.max(3, Math.round(len / 30));
    const bend = (r() - 0.5) * 0.25;
    const pts = [];
    for (let s = 1; s <= steps; s += 1) {
      const t = s / steps;
      const ang = base + off * (0.35 + 0.65 * t) + bend * t * t;
      const rad = R_DEPT + 18 + len * t;
      pts.push({ x: Math.cos(ang) * rad, y: Math.sin(ang) * rad });
    }
    const path = `M${node.x.toFixed(1)},${node.y.toFixed(1)} ${pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}`;
    const full = `M${(Math.cos(base) * R_RING).toFixed(1)},${(Math.sin(base) * R_RING).toFixed(1)} L${node.x.toFixed(1)},${node.y.toFixed(1)} ${pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}`;
    const end = pts[pts.length - 1];
    const endAng = Math.atan2(end.y, end.x);
    return { role, pts, path, full, end, endAng, pulse: r() < 0.45, dur: (3 + r() * 4).toFixed(1), begin: (r() * 5).toFixed(1) };
  });
  const lx = Math.cos(base) * (R_DEPT - 38);
  const ly = Math.sin(base) * (R_DEPT - 38);
  // Invisible wedge covering this department's slice, so the whole area is clickable.
  const half = Math.PI / departments.length;
  const a0 = base - half; const a1 = base + half; const r0 = R_RING + 6; const r1 = 500;
  const p = (a, rr) => `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`;
  const wedge = `M${p(a0, r0)} L${p(a0, r1)} A${r1},${r1} 0 0 1 ${p(a1, r1)} L${p(a1, r0)} A${r0},${r0} 0 0 0 ${p(a0, r0)} Z`;
  return { dep, di, base, node, branches, wedge, label: { x: lx, y: ly } };
});

const Overview = ({ data, brainDots, hover, setHover, open, openBrain, motion }) => {
  const ringDots = useMemo(() => Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    return { x: Math.cos(a) * R_RING, y: Math.sin(a) * R_RING };
  }), []);
  return (
    <svg viewBox="-520 -520 1040 1040" className="am-svg" role="group" aria-label="Agentic company map overview">
      <defs>
        <radialGradient id="amGlow"><stop offset="0" stopColor="#5eead4" stopOpacity=".16" /><stop offset="1" stopColor="#5eead4" stopOpacity="0" /></radialGradient>
      </defs>
      <circle r="260" fill="url(#amGlow)" />
      {ringDots.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.6" className="am-ring" />)}
      {data.map(({ dep, di, node, branches, label, base, wedge }) => {
        const dim = hover != null && hover !== di;
        return (
          <g key={dep.id} className={`am-dept ${dim ? 'dim' : ''} ${hover === di ? 'hot' : ''}`}
            onMouseEnter={() => setHover(di)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(di)} onBlur={() => setHover(null)}
            onClick={() => open(di)} role="button" tabIndex={0} aria-label={`${dep.name}: ${dep.roles.length} agent roles. Open department`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(di); } }}>
            <path d={wedge} className="am-hit" />
            <line x1={Math.cos(base) * R_RING} y1={Math.sin(base) * R_RING} x2={node.x} y2={node.y} className="am-stem" />
            {branches.map((b, bi) => (
              <g key={bi}>
                <path d={b.path} className={`am-branch ${b.role.status}`} />
                {b.pts.map((p, pi) => <circle key={pi} cx={p.x} cy={p.y} r={pi === b.pts.length - 1 ? 3.4 : 2.3} className={`am-dot ${b.role.status} ${pi === b.pts.length - 1 ? 'leaf' : ''}`} />)}
                <text x={b.end.x + Math.cos(b.endAng) * 8} y={b.end.y + Math.sin(b.endAng) * 8} className="am-leaf-label"
                  textAnchor={Math.cos(b.endAng) > 0.2 ? 'start' : Math.cos(b.endAng) < -0.2 ? 'end' : 'middle'} dominantBaseline="middle">{b.role.name}</text>
                {motion && b.pulse && (
                  <circle r="2.6" className="am-pulse">
                    <animateMotion dur={`${b.dur}s`} begin={`${b.begin}s`} repeatCount="indefinite" path={b.full} />
                  </circle>
                )}
              </g>
            ))}
            <circle cx={node.x} cy={node.y} r="9" className="am-node" />
            <circle cx={node.x} cy={node.y} r="3.5" className="am-node-core" />
            <text x={label.x} y={label.y} className="am-dept-label" textAnchor="middle" dominantBaseline="middle">
              {dep.name.toUpperCase()}
            </text>
          </g>
        );
      })}
      <g className="am-brain-wrap">
        <BrainDots dots={brainDots} onClick={openBrain} label="Open the company brain" />
        <text y="4" className="am-open" textAnchor="middle">OPEN THE BRAIN</text>
      </g>
    </svg>
  );
};

/* ---------- department detail: roles as rising chains ---------- */
const Detail = ({ dep, idx, total, prev, next, back, sel, setSel }) => {
  const n = dep.roles.length;
  const gap = Math.min(110, 760 / Math.max(1, n - 1));
  const root = { x: 500, y: 600 };
  const fingers = useMemo(() => {
    const r = rng(900 + idx);
    return dep.roles.map((role, i) => {
      const x = 500 + (i - (n - 1) / 2) * gap;
      const top = 120 + r() * 140;
      const dots = [];
      for (let y = 520; y >= top; y -= 34) dots.push(y);
      return { role, x, top, dots, d: `M${root.x},${root.y} C${root.x},${root.y - 50} ${x},${root.y - 40} ${x},520 L${x},${top}` };
    });
  }, [dep, idx, n, gap]);
  const live = dep.roles.filter((r) => r.status === 'live').length;
  return (
    <div className="am-detail" key={dep.id}>
      <svg viewBox="0 40 1000 680" className="am-svg am-detail-svg" role="group" aria-label={`${dep.name} department: ${n} agent roles`}>
        {fingers.map((f, i) => {
          const active = sel === i;
          return (
            <g key={f.role.name} className={`am-finger ${f.role.status} ${sel != null && !active ? 'dim' : ''} ${active ? 'hot' : ''}`}
              onMouseEnter={() => setSel(i)} onClick={() => setSel(i)} style={{ animationDelay: `${i * 70}ms` }}>
              <rect className="am-hit" x={f.x - gap / 2} y={f.top - 44} width={gap} height={560 - f.top + 44} />
              <path d={f.d} className="am-branch" />
              {f.dots.map((y, di) => (
                <circle key={y} cx={f.x} cy={y} r={di === f.dots.length - 1 ? 6 : 4.2}
                  className={`am-dot ${f.role.status} ${f.role.status === 'build' && di >= f.dots.length - 2 ? 'ghost' : ''}`}
                  style={{ animationDelay: `${i * 70 + di * 40}ms` }} />
              ))}
              <text x={f.x} y={f.top - 22} className="am-role-label" textAnchor="middle">{f.role.name}</text>
            </g>
          );
        })}
        <circle cx={root.x} cy={root.y} r="12" className="am-node" />
        <circle cx={root.x} cy={root.y} r="5" className="am-node-core" />
        <text x="500" y="652" className="am-detail-title" textAnchor="middle">{dep.name.toUpperCase()}</text>
        <text x="500" y="684" className="am-detail-sub" textAnchor="middle">{n} ROLES · {live} LIVE · {n - live} IN BUILD</text>
      </svg>
      <div className="am-detail-bar">
        <button type="button" onClick={back} className="am-btn"><ArrowLeft size={14} /> Map</button>
        <div className="am-pager">
          <button type="button" onClick={prev} className="am-btn icon" aria-label="Previous department"><ChevronLeft size={16} /></button>
          <span>{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {dep.name.toUpperCase()}</span>
          <button type="button" onClick={next} className="am-btn icon" aria-label="Next department"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

/* ---------- simulated live activity ---------- */
const ACTIONS = ['completed {n} tasks', 'handed {n} items to a person for approval', 'processed {n} new requests', 'updated {n} records', 'drafted {n} replies', 'flagged {n} items for review'];
const makeEvent = (seed) => {
  const r = rng(seed);
  const dep = departments[Math.floor(r() * departments.length)];
  const live = dep.roles.filter((x) => x.status === 'live');
  const role = live[Math.floor(r() * live.length)];
  const action = ACTIONS[Math.floor(r() * ACTIONS.length)].replace('{n}', String(2 + Math.floor(r() * 30)));
  return { id: seed, dep: dep.name, role: role.name, action };
};

/* ---------- main component ---------- */
const AgentMap = ({ compact = false }) => {
  const data = useMemo(buildOverview, []);
  const brainDots = useMemo(() => makeBrain(0.95, 700), []);
  const bigBrain = useMemo(() => makeBrain(2.6, 1500, 11), []);
  const [hover, setHover] = useState(null);
  const [dept, setDept] = useState(null);
  const [sel, setSel] = useState(null);
  const [brainOpen, setBrainOpen] = useState(false);
  const [motion, setMotion] = useState(false);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [events, setEvents] = useState(() => [3, 2, 1].map((s) => makeEvent(s)));
  useEffect(() => { setMotion(!reducedMotion()); }, []);
  useEffect(() => { setSel(null); }, [dept]);

  // Autoplay: sweep the highlight across departments while the visitor is idle.
  useEffect(() => {
    if (!motion || !auto || paused || dept != null || brainOpen) return undefined;
    let i = -1;
    const t = setInterval(() => { i = (i + 1) % departments.length; setHover(i); }, 2200);
    return () => { clearInterval(t); setHover(null); };
  }, [motion, auto, paused, dept, brainOpen]);

  // Simulated live activity feed.
  useEffect(() => {
    if (!motion) return undefined;
    let seed = 10;
    const t = setInterval(() => { seed += 1; setEvents((ev) => [makeEvent(seed), ...ev].slice(0, 4)); }, 2600);
    return () => clearInterval(t);
  }, [motion]);

  const stopAuto = () => { if (auto) setAuto(false); };
  useEffect(() => {
    if (!brainOpen && dept == null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setBrainOpen(false); setDept(null); }
      if (dept != null && !brainOpen && e.key === 'ArrowRight') setDept((d) => (d + 1) % departments.length);
      if (dept != null && !brainOpen && e.key === 'ArrowLeft') setDept((d) => (d - 1 + departments.length) % departments.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [brainOpen, dept]);

  const totals = mapTotals();
  const current = dept != null ? departments[dept] : null;
  const focusDept = current || (hover != null ? departments[hover] : null);

  return (
    <div className={`am ${compact ? 'compact' : ''}`}>
      <div className="am-stage" onPointerDown={stopAuto} onKeyDown={stopAuto}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="am-top">
          <span className="am-live"><span className="dot" /> Live simulation</span>
          {motion && dept == null && (
            <button type="button" className={`am-auto ${auto ? 'on' : ''}`} onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
              <span className="am-auto-sw" aria-hidden="true" /> Autoplay
            </button>
          )}
        </div>
        {current == null && (
          <div className="am-view" key="overview">
            <Overview data={data} brainDots={brainDots} hover={hover} setHover={setHover} open={setDept} openBrain={() => setBrainOpen(true)} motion={motion} />
          </div>
        )}
        {current != null && (
          <div className="am-view" key={`d-${dept}`}>
            <Detail dep={current} idx={dept} total={departments.length}
              prev={() => setDept((d) => (d - 1 + departments.length) % departments.length)}
              next={() => setDept((d) => (d + 1) % departments.length)}
              back={() => setDept(null)} sel={sel} setSel={setSel} />
          </div>
        )}

        {brainOpen && (
          <div className="am-brain-panel" role="dialog" aria-modal="true" aria-label={brain.title}>
            <button type="button" className="am-close" onClick={() => setBrainOpen(false)} aria-label="Close"><X size={18} /></button>
            <svg viewBox="-300 -260 600 520" className="am-big-brain" aria-hidden="true">
              {bigBrain.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r * 0.75} className={p.tw ? 'tw' : ''} style={p.tw ? { animationDelay: `${p.d}s` } : undefined} />)}
            </svg>
            <div className="am-brain-copy">
              <span className="am-kicker">Open the brain</span>
              <h3>{brain.title}</h3>
              <p>{brain.intro}</p>
              <div className="am-brain-parts">
                {brain.parts.map((b) => <div key={b.title}><strong>{b.title}</strong><span>{b.desc}</span></div>)}
              </div>
              <div className="btn-row">
                <Link to="/platform" className="btn btn-primary">How we build it <ArrowRight size={16} /></Link>
                <Link to="/ai-governance" className="btn btn-ghost">Governance &amp; security</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <aside className="am-side" aria-live="polite">
        {current == null ? (
          <>
            <span className="am-kicker">{focusDept ? 'Department' : 'Example blueprint'}</span>
            <h3>{focusDept ? focusDept.name : 'A company run by AI agents'}</h3>
            <p>{focusDept
              ? `${focusDept.roles.length} agent roles. Click to open the department.`
              : 'Hover or tap a department to explore it, open it for its agents, or open the brain to see what connects them.'}</p>
            <ul className="am-legend">
              <li><span className="lg live" /> Live agent</li>
              <li><span className="lg build" /> In build</li>
              <li><span className="lg pulse" /> Work moving between agents</li>
            </ul>
            <div className="am-depts">
              {departments.map((d, i) => (
                <button key={d.id} type="button" onClick={() => setDept(i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className={hover === i ? 'hot' : ''}>
                  <span>{String(i + 1).padStart(2, '0')}</span>{d.name}<em>{d.roles.length}</em>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="am-kicker">{String(dept + 1).padStart(2, '0')} / {String(departments.length).padStart(2, '0')}</span>
            <h3>{current.name}</h3>
            <ul className="am-roles">
              {current.roles.map((r, i) => (
                <li key={r.name} className={sel === i ? 'hot' : ''} onMouseEnter={() => setSel(i)} onMouseLeave={() => setSel(null)}>
                  <span className={`lg ${r.status}`} />
                  <span><strong>{r.name}</strong><small>{r.desc}</small></span>
                  <em className={r.status}>{r.status === 'live' ? 'Live' : 'In build'}</em>
                </li>
              ))}
            </ul>
          </>
        )}
        {motion && (
          <div className="am-feed" aria-label="Simulated agent activity">
            <span className="am-kicker">Agent activity · simulated</span>
            {events.map((e) => (
              <div key={e.id} className="am-event"><span>{e.dep} · {e.role}</span>{e.action}</div>
            ))}
          </div>
        )}
        <div className="am-stats">
          <div><strong>{totals.departments}</strong><span>departments</span></div>
          <div><strong>{totals.roles}</strong><span>agent roles</span></div>
          <div><strong>{totals.live}</strong><span>live in example</span></div>
        </div>
      </aside>
    </div>
  );
};

export default AgentMap;
