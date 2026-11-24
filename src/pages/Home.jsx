import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Clock, Target } from 'lucide-react';
import { services, servicesByCategory, process, industries } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import ServiceCard from '../components/ServiceCard';
import AgentPipeline from '../components/AgentPipeline';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import CTA from '../components/CTA';
import './pages.css';

const consoleLines = [
  { t: 'run', text: 'agent.test("checkout with saved card")' },
  { t: 'ok', text: 'navigate /cart · 312ms' },
  { t: 'ok', text: 'select payment → "Visa •••• 4242"' },
  { t: 'ok', text: 'assert order confirmation visible' },
  { t: 'heal', text: 'locator changed: #pay-btn → healed' },
  { t: 'eval', text: 'llm-eval faithfulness 0.97 · hallucination 0' },
];

const tech = ['Playwright', 'Model Context Protocol', 'OpenAI', 'Claude', 'LangChain', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP', 'Databricks', 'Cypress'];

const Home = () => (
  <>
    {/* Hero */}
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> AI-first IT services</span>
          <h1>
            Build, test and scale<br />
            <span className="gradient-text">AI-driven software</span>
          </h1>
          <p className="lead hero-lead">
            OpsifyLabs helps businesses adopt AI with confidence: AI consulting, generative AI and agent development,
            AI-powered testing and the DevOps and cloud engineering that keep it all running.
          </p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn-primary btn-lg">Book a free consultation <ArrowRight size={18} /></Link>
            <Link to="/services" className="btn btn-ghost btn-lg">Explore services</Link>
          </div>
          <ul className="hero-points">
            <li><CheckCircle2 size={16} /> Vendor-neutral advice</li>
            <li><CheckCircle2 size={16} /> Proof of value in weeks</li>
            <li><CheckCircle2 size={16} /> Quality built in</li>
          </ul>
        </div>

        <div className="console" aria-hidden="true">
          <div className="console-bar"><span /><span /><span /><em>opsify-agent · test run</em></div>
          <div className="console-body">
            {consoleLines.map((l, i) => (
              <div key={i} className={`console-line c-${l.t}`} style={{ animationDelay: `${300 + i * 380}ms` }}>
                <span className="console-tag">{l.t}</span>{l.text}
              </div>
            ))}
            <div className="console-line c-sum" style={{ animationDelay: `${300 + consoleLines.length * 380}ms` }}>
              ✓ 24 passed · 1 healed · 0 failed
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Tech strip */}
    <section className="tech-strip" aria-label="Technologies we work with">
      <div className="marquee">
        <div className="marquee-track">
          {[...tech, ...tech].map((t, i) => <span key={i} aria-hidden={i >= tech.length}>{t}</span>)}
        </div>
      </div>
    </section>

    {/* AI services */}
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">AI services</span>
          <h2>From AI strategy to <span className="gradient-text">production-grade AI</span></h2>
          <p className="lead">We cover the whole AI lifecycle: deciding what to build, building it, proving it works and running it reliably.</p>
        </Reveal>
        <div className="grid grid-3">
          {servicesByCategory('ai').map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80} style={{ display: 'flex' }}><ServiceCard service={s} /></Reveal>
          ))}
          <Reveal delay={160} style={{ display: 'flex' }}>
            <Link to="/contact" className="card card-cta">
              <h3>Not sure where to start?</h3>
              <p className="grow">Tell us the problem. We will tell you if AI is the right tool and what a first step looks like.</p>
              <span className="link-arrow" style={{ marginTop: '1.25rem' }}>Talk to an expert <ArrowRight size={16} /></span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>

    {/* AI testing spotlight */}
    <section className="section band">
      <div className="container">
        <div className="split">
          <Reveal>
            <span className="eyebrow">Spotlight · AI testing</span>
            <h2>Testing <span className="gradient-text">with</span> AI, and testing <span className="gradient-text">of</span> AI</h2>
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              Our roots are in quality engineering. Today we use LLM agents to write and run tests, and we build
              evaluation suites that prove your own AI features are accurate, safe and secure.
            </p>
            <ul className="check-list" style={{ marginBottom: '2rem' }}>
              <li><CheckCircle2 size={18} /> Agentic browser testing with Playwright + MCP</li>
              <li><CheckCircle2 size={18} /> Self-healing automation and AI test generation</li>
              <li><CheckCircle2 size={18} /> LLM evals, RAG quality testing and AI red teaming</li>
            </ul>
            <div className="btn-row">
              <Link to="/services/ai-testing" className="btn btn-primary">AI-powered testing <ArrowRight size={16} /></Link>
              <Link to="/services/ai-assurance" className="btn btn-ghost">AI assurance</Link>
            </div>
          </Reveal>
          <Reveal delay={120}><AgentPipeline compact /></Reveal>
        </div>
      </div>
    </section>

    {/* Engineering services */}
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Engineering services</span>
          <h2>The foundation AI runs on</h2>
          <p className="lead">AI only delivers value on top of reliable software delivery. These are the services that make that possible.</p>
        </Reveal>
        <div className="grid grid-4">
          {servicesByCategory('engineering').map((s, i) => (
            <Reveal key={s.slug} delay={i * 80} style={{ display: 'flex' }}><ServiceCard service={s} /></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Why us */}
    <section className="section band">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Why OpsifyLabs</span>
          <h2>Small senior teams. Measurable outcomes.</h2>
        </Reveal>
        <div className="grid grid-4">
          {[
            { icon: Target, title: 'Outcome first', text: 'Every engagement starts with agreed success metrics, not a technology wish list.' },
            { icon: Sparkles, title: 'AI-first, not AI-only', text: 'We recommend AI where it pays back and conventional engineering where it does not.' },
            { icon: CheckCircle2, title: 'Quality built in', text: 'Testing and evaluation are part of every build, a habit from our QA roots.' },
            { icon: Clock, title: 'Global delivery', text: 'Teams in India and the US give you overlap with your working day and cost-effective scale.' },
          ].map(({ icon: Ico, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="card">
              <div className="icon-tile"><Ico size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="stats">
          <div><strong className="gradient-text">{new Date().getFullYear() - 2020}+</strong><span>years delivering</span></div>
          <div><strong className="gradient-text">60%</strong><span>less manual testing for one enterprise client</span></div>
          <div><strong className="gradient-text">{services.length}</strong><span>AI &amp; engineering service lines</span></div>
          <div><strong className="gradient-text">2</strong><span>delivery hubs: Pune &amp; Nevada</span></div>
        </Reveal>
      </div>
    </section>

    {/* Process */}
    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">How we work</span>
          <h2>A clear path from idea to impact</h2>
        </Reveal>
        <ol className="process">
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 80} className="process-step">
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.step}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* Industries */}
    <section className="section-sm">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Industries</span>
          <h2>Domain context that speeds delivery</h2>
        </Reveal>
        <div className="industries">
          {industries.map((ind) => (
            <div key={ind.name} className="industry"><Icon name={ind.icon} size={20} /> {ind.name}</div>
          ))}
        </div>
      </div>
    </section>

    {/* Case study teaser */}
    <section className="section">
      <div className="container">
        <Reveal className="section-head split-head">
          <div>
            <span className="eyebrow">Results</span>
            <h2>Recent work</h2>
          </div>
          <Link to="/case-studies" className="link-arrow">All case studies <ArrowRight size={16} /></Link>
        </Reveal>
        <div className="grid grid-3">
          {caseStudies.slice(0, 3).map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="card case-mini">
              <span className="chip chip-accent">{c.tag}</span>
              <div className="case-metric"><strong className="gradient-text">{c.metric}</strong><span>{c.metricLabel}</span></div>
              <h3>{c.title}</h3>
              <p>{c.result}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CTA />
  </>
);

export default Home;
