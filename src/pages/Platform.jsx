import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import {
  platformSections, buildCapabilities, scaleGroups, optimizeLevers,
  optimizeCapabilities, performanceMetrics, foundation,
} from '../data/platform';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import '../components/SiteGrid.css';
import './Platform.css';

/* ---------- Sticky section nav with scroll-spy ---------- */
const SectionNav = () => {
  const [active, setActive] = useState(platformSections[0].id);
  const barRef = useRef(null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    platformSections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  // Keep the active tab visible when the bar scrolls horizontally (phones).
  useEffect(() => {
    const bar = barRef.current;
    const link = bar && bar.querySelector('a.active');
    if (!bar || !link || bar.scrollWidth <= bar.clientWidth) return;
    bar.scrollTo({ left: link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);
  return (
    <nav className="pf-nav" aria-label="Platform sections">
      <div className="container pf-nav-inner" ref={barRef}>
        {platformSections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} aria-current={active === s.id ? 'true' : undefined}>
            <span>{s.num}</span>{s.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

const SectionHead = ({ num, label, title, children }) => (
  <Reveal className="pf-head">
    <span className="pf-kicker"><span>{num}</span> {label}</span>
    <h2>{title}</h2>
    {children && <p className="lead">{children}</p>}
  </Reveal>
);

/* ---------- 01 Build ---------- */
const Build = () => {
  const [sel, setSel] = useState(buildCapabilities[0].id);
  const cap = buildCapabilities.find((c) => c.id === sel);
  return (
    <div className="pf-build">
      <div className="pf-build-list" role="tablist" aria-label="Build capabilities">
        {buildCapabilities.map((c, i) => (
          <button key={c.id} type="button" role="tab" aria-selected={c.id === sel} className={c.id === sel ? 'active' : ''} onClick={() => setSel(c.id)}>
            <span className="pf-idx">{String(i + 1).padStart(2, '0')}</span>
            <Icon name={c.icon} size={18} />
            {c.title}
          </button>
        ))}
      </div>
      <div className="pf-build-detail" key={cap.id} role="tabpanel">
        <h3>{cap.title}</h3>
        <p>{cap.desc}</p>
        <ul className="check-list">{cap.points.map((p) => <li key={p}><CheckCircle2 size={16} /> {p}</li>)}</ul>
        {cap.link && (
          <Link to={cap.link.to} className="pf-ref">
            <span className="pf-ref-tag">Reference</span>
            <span><strong>{cap.link.label}</strong><small>{cap.link.note}</small></span>
            <ArrowRight size={16} />
          </Link>
        )}
        <pre className="pf-code" aria-label="Example">
          {cap.code.map((line, i) => <code key={line} style={{ animationDelay: `${150 + i * 160}ms` }}>{line}</code>)}
        </pre>
      </div>
    </div>
  );
};

/* ---------- 02 Scale ---------- */
const Scale = () => (
  <div className="sg pf-grid">
    {scaleGroups.map((g) => (
      <div key={g.title} className="sg-cell">
        <p className="sg-title pf-grid-title"><Icon name={g.icon} size={15} /> {g.title}</p>
        <ul>{g.items.map((it) => <li key={it}><span className="sg-text pf-grid-item">{it}</span></li>)}</ul>
      </div>
    ))}
  </div>
);

/* ---------- 03 Optimize ---------- */
const Optimize = () => {
  const [on, setOn] = useState({ routing: true, caching: true, prompts: false, batching: false });
  const base = 100;
  const remaining = optimizeLevers.reduce((r, l) => (on[l.id] ? r * (1 - l.saving) : r), 1);
  const cost = Math.round(base * remaining);
  return (
    <>
      <div className="pf-opt">
        <div className="pf-opt-levers">
          <p className="pf-mini-label">Turn on optimisation levers</p>
          {optimizeLevers.map((l) => (
            <label key={l.id} className={`pf-lever ${on[l.id] ? 'on' : ''}`}>
              <input type="checkbox" checked={on[l.id]} onChange={() => setOn((o) => ({ ...o, [l.id]: !o[l.id] }))} />
              <span className="pf-switch" aria-hidden="true" />
              <span><strong>{l.label}</strong><small>{l.desc}</small></span>
              <em>−{Math.round(l.saving * 100)}%</em>
            </label>
          ))}
        </div>
        <div className="pf-opt-result" aria-live="polite">
          <p className="pf-mini-label">AI running cost (indexed)</p>
          <div className="pf-bars">
            <div className="pf-bar"><span>Before</span><div><i style={{ width: '100%' }} /></div><b>100</b></div>
            <div className="pf-bar after"><span>After</span><div><i style={{ width: `${cost}%` }} /></div><b>{cost}</b></div>
          </div>
          <p className="pf-opt-big"><strong className="gradient-text">{100 - cost}%</strong> lower running cost</p>
          <small>Illustrative: levers compound, and real savings depend on your traffic. We measure them in an optimisation sprint.</small>
        </div>
      </div>
      <div className="grid grid-4" style={{ marginTop: '1rem' }}>
        {optimizeCapabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 60} className="card">
            <div className="icon-tile"><Icon name={c.icon} size={20} /></div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
};

/* ---------- 04 Performance ---------- */
const Spark = ({ data, good }) => {
  const min = Math.min(...data); const max = Math.max(...data); const span = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / span) * 26 - 2}`).join(' ');
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={`pf-spark ${good}`} aria-hidden="true">
      <polyline points={pts} pathLength="1" />
    </svg>
  );
};
const fmt = (m) => (m.unit === '$' ? `$${m.value.toFixed(3)}` : `${m.value}${m.unit}`);

const Performance = () => (
  <div className="pf-perf">
    <div className="pf-perf-head">
      <span className="pf-live"><span className="dot" /> Example agent dashboard</span>
      <span className="pf-mini-label">Last 8 weeks · ticket-triage agent</span>
    </div>
    <div className="pf-perf-grid">
      {performanceMetrics.map((m) => {
        const improved = m.good === 'up' ? m.trend.at(-1) >= m.trend[0] : m.trend.at(-1) <= m.trend[0];
        return (
          <Reveal key={m.id} className="pf-metric">
            <span className="pf-mini-label">{m.label}</span>
            <strong>{fmt(m)}</strong>
            <span className={`pf-delta ${improved ? 'good' : 'bad'}`}>
              {m.good === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {m.good === 'up' ? 'higher is better' : 'lower is better'}
            </span>
            <Spark data={m.trend} good={improved ? 'good' : 'bad'} />
          </Reveal>
        );
      })}
    </div>
    <p className="pf-note">Example figures showing what we track. Targets (SLOs) for success rate, latency, escalation and cost are agreed per project and reported weekly.</p>
  </div>
);

/* ---------- 05 Foundation ---------- */
const Foundation = () => (
  <div className="sg pf-grid pf-found">
    {foundation.map((f) => (
      <div key={f.title} className="sg-cell">
        <div className="icon-tile"><Icon name={f.icon} size={20} /></div>
        <h3>{f.title}</h3>
        <p>{f.desc}</p>
        {f.link && <Link to={f.link} className="link-arrow" style={{ marginTop: '.75rem' }}>Learn more <ArrowRight size={14} /></Link>}
      </div>
    ))}
  </div>
);

/* ---------- Page ---------- */
const Platform = () => (
  <>
    <header className="page-top section-sm pf-hero">
      <div className="container">
        <span className="eyebrow">Agentic AI platform</span>
        <h1 style={{ maxWidth: '56rem', marginBottom: '1.25rem' }}>
          Build, scale and optimise <span className="gradient-text">AI agents in your own cloud</span>
        </h1>
        <p className="lead">
          The agent stack we deliver for clients: orchestration, tools, knowledge, guardrails and testing, deployed on your
          AWS, Azure, GCP or on-prem infrastructure, then tuned for quality, speed and cost. You own the code and the data.
        </p>
        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link to="/contact?service=ai-agents" className="btn btn-primary btn-lg">Plan your agent platform <ArrowRight size={18} /></Link>
          <a href="#build" className="btn btn-ghost btn-lg">Explore the platform</a>
        </div>
      </div>
    </header>

    <SectionNav />

    <section id="build" className="section pf-sec">
      <div className="container">
        <SectionHead num="01" label="Build" title={<>Build agents <span className="gradient-text">your way</span></>}>
          From visual flows to full code, every agent gets orchestration, tools, knowledge and guardrails from day one.
        </SectionHead>
        <Reveal><Build /></Reveal>
      </div>
    </section>

    <section id="scale" className="section band pf-sec">
      <div className="container">
        <SectionHead num="02" label="Scale" title={<>Scale across <span className="gradient-text">channels, systems and clouds</span></>}>
          Agents meet people where they work, act in the systems you already run and scale on the infrastructure you choose.
        </SectionHead>
        <Reveal><Scale /></Reveal>
      </div>
    </section>

    <section id="optimize" className="section pf-sec">
      <div className="container">
        <SectionHead num="03" label="Optimize" title={<>Optimise quality <span className="gradient-text">and cost, continuously</span></>}>
          Agents get better and cheaper after launch. Switch on the levers we use to cut running cost.
        </SectionHead>
        <Reveal><Optimize /></Reveal>
      </div>
    </section>

    <section id="performance" className="section band pf-sec">
      <div className="container">
        <SectionHead num="04" label="Performance" title={<>Performance you can <span className="gradient-text">see every week</span></>}>
          Every agent we run is measured on task success, speed, human escalation, cost and availability.
        </SectionHead>
        <Performance />
      </div>
    </section>

    <section id="foundation" className="section pf-sec">
      <div className="container">
        <SectionHead num="05" label="Foundation" title={<>An enterprise <span className="gradient-text">foundation</span></>}>
          Security, model choice, data and operations: the parts that make agents safe to run in production.
        </SectionHead>
        <Reveal><Foundation /></Reveal>
      </div>
    </section>

    <CTA title="Ready to build your agent platform?" text="We start with one high-value workflow, deliver it on this foundation and scale from there. Book a call to plan your first agent." />
  </>
);

export default Platform;
