import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Clock, Target } from 'lucide-react';
import { services, servicesByCategory, process, industries } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import { getProduct } from '../data/products';
import SdlcOrchestrator from '../components/SdlcOrchestrator';
import DevOpsAiLoop from '../components/DevOpsAiLoop';
import LocalAgentWorkflow from '../components/LocalAgentWorkflow';
import AutomationSections from '../components/AutomationSections';
import '../components/GovernanceSections.css';
import ServiceCard from '../components/ServiceCard';
import AgentPipeline from '../components/AgentPipeline';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import CTA from '../components/CTA';
import './pages.css';

const consoleLines = [
  { t: 'run', text: 'agent.run("process vendor invoices")' },
  { t: 'ok', text: 'collected 25 invoices from ap@ inbox' },
  { t: 'ok', text: 'extracted 14 fields · confidence 97%' },
  { t: 'ok', text: 'three-way match: 21 matched' },
  { t: 'human', text: '3 exceptions → sent to Finance for approval' },
  { t: 'done', text: 'posted 24 to ERP · 1 duplicate held' },
];

const tech = ['Playwright', 'Model Context Protocol', 'OpenAI', 'Claude', 'LangChain', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP', 'Databricks', 'Cypress'];

const qaOrchestrator = getProduct('qa-agent-orchestrator');

const Home = () => (
  <>
    {/* Hero */}
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> AI consulting &amp; agentic automation</span>
          <h1>
            Turn manual work into<br />
            <span className="gradient-text">AI agent workflows</span>
          </h1>
          <p className="lead hero-lead">
            OpsifyLabs is an AI consulting partner. We find the repetitive workflows that slow your teams down, rebuild
            them as secure AI agent workflows with people in control, and measure the time and cost you save.
            Backed by our AI testing, DevOps and cloud engineering.
          </p>
          <div className="btn-row">
            <Link to="/contact?service=ai-agents" className="btn btn-primary btn-lg">Get a free automation assessment <ArrowRight size={18} /></Link>
            <a href="#live" className="btn btn-ghost btn-lg">See a live workflow</a>
          </div>
          <ul className="hero-points">
            <li><CheckCircle2 size={16} /> Less manual effort</li>
            <li><CheckCircle2 size={16} /> People approve what matters</li>
            <li><CheckCircle2 size={16} /> Savings measured, not promised</li>
          </ul>
        </div>

        <div className="console" aria-hidden="true">
          <div className="console-bar"><span /><span /><span /><em>opsify-agent · invoice workflow</em></div>
          <div className="console-body">
            {consoleLines.map((l, i) => (
              <div key={i} className={`console-line c-${l.t}`} style={{ animationDelay: `${300 + i * 380}ms` }}>
                <span className="console-tag">{l.t}</span>{l.text}
              </div>
            ))}
            <div className="console-line c-sum" style={{ animationDelay: `${300 + consoleLines.length * 380}ms` }}>
              ✓ done · 3 human approvals · 0 manual data entry
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

    <AutomationSections showPageLink />

    {/* AI governance, compliance & data security */}
    <section className="section band">
      <div className="container gov-teaser">
        <Reveal>
          <span className="eyebrow">AI governance · compliance · data security</span>
          <h2 style={{ marginBottom: '1rem' }}>Your data stays <span className="gradient-text">protected in every AI workflow</span></h2>
          <p className="lead" style={{ marginBottom: '1.5rem' }}>
            Automation is only worth it if your data is safe. Every system we build sits behind an AI gateway that masks
            personal data, blocks secrets and attacks, keeps restricted data on local models and logs every decision.
          </p>
          <ul className="check-list" style={{ marginBottom: '2rem' }}>
            <li><CheckCircle2 size={18} /> AI policy, risk tiers and an inventory of every AI tool in use</li>
            <li><CheckCircle2 size={18} /> PII masking, permission-aware retrieval and data residency</li>
            <li><CheckCircle2 size={18} /> Aligned with GDPR, India DPDP Act, EU AI Act and ISO/IEC 42001</li>
          </ul>
          <div className="btn-row">
            <Link to="/ai-governance" className="btn btn-primary">AI governance &amp; security <ArrowRight size={16} /></Link>
            <Link to="/ai-governance#data-shield" className="btn btn-ghost">Try the data shield</Link>
          </div>
        </Reveal>
        <Reveal delay={120} className="gov-mini" aria-hidden="true">
          <div className="gov-mini-box">
            <span>Before: what a user pastes</span>
            <p>Customer <mark className="bad">Priya Nair</mark>, card <mark className="bad">4111 1111 1111 1111</mark>, email <mark className="bad">priya.nair@example.com</mark>: refund missing.</p>
          </div>
          <div className="gov-mini-gate">AI gateway · mask PII · block secrets · injection guard · audit log</div>
          <div className="gov-mini-box">
            <span>After: what the model receives</span>
            <p>Customer <mark className="ok">[NAME_1]</mark>, card <mark className="ok">[CARD_1]</mark>, email <mark className="ok">[EMAIL_1]</mark>: refund missing.</p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Product: QA Agent Orchestrator */}
    <section className="section">
      <div className="container">
        <Reveal className="section-head split-head">
          <div style={{ maxWidth: '46rem' }}>
            <span className="eyebrow">Our product <span className="badge">{qaOrchestrator.badge}</span></span>
            <h2 style={{ marginBottom: '1rem' }}>{qaOrchestrator.name}: <span className="gradient-text">SDLC agentic workflow</span></h2>
            <p className="lead">{qaOrchestrator.short}</p>
          </div>
          <div className="btn-row">
            <Link to={`/products/${qaOrchestrator.slug}`} className="btn btn-primary">Explore the product <ArrowRight size={16} /></Link>
            <Link to={`/contact?service=${qaOrchestrator.slug}`} className="btn btn-ghost">Request a demo</Link>
          </div>
        </Reveal>
        <Reveal><SdlcOrchestrator stages={qaOrchestrator.stages} /></Reveal>
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

    {/* AI across the DevOps cycle */}
    <section className="section">
      <div className="container">
        <Reveal className="section-head split-head">
          <div style={{ maxWidth: '46rem' }}>
            <span className="eyebrow">AI enablement · DevOps</span>
            <h2 style={{ marginBottom: '1rem' }}>AI across the <span className="gradient-text">entire DevOps cycle</span></h2>
            <p className="lead">We do not bolt one AI tool onto one stage. We enable AI at every step of the loop, from planning to monitoring, and feed production insight back into the next plan. Click any stage to see how.</p>
          </div>
          <Link to="/services/devops" className="link-arrow">DevOps &amp; platform engineering <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal><DevOpsAiLoop /></Reveal>
      </div>
    </section>

    {/* Local AI agent workflow on AWS / Azure */}
    <section className="section band">
      <div className="container">
        <Reveal className="section-head split-head">
          <div style={{ maxWidth: '46rem' }}>
            <span className="eyebrow">Local AI agents · AWS, Azure &amp; GCP</span>
            <h2 style={{ marginBottom: '1rem' }}>Agent workflows that keep <span className="gradient-text">your data at home</span></h2>
            <p className="lead">We set up agents that run on your own machines with local models, and connect privately to AWS, Azure or Google Cloud only when they need more power. Switch between clouds and follow the flow.</p>
          </div>
          <Link to="/services/ai-agents" className="link-arrow">Agentic AI services <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal><LocalAgentWorkflow /></Reveal>
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
