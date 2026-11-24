import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getProduct } from '../data/products';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import SdlcOrchestrator from '../components/SdlcOrchestrator';
import CTA from '../components/CTA';
import './pages.css';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <Navigate to="/" replace />;

  return (
    <>
      <header className="page-top section-sm">
        <div className="container">
          <span className="eyebrow">Product {product.badge && <span className="badge">{product.badge}</span>}</span>
          <h1 style={{ maxWidth: '52rem', marginBottom: '1rem' }}>
            {product.name}: <span className="gradient-text">{product.tagline}</span>
          </h1>
          <p className="lead">{product.intro}</p>
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link to={`/contact?service=${product.slug}`} className="btn btn-primary btn-lg">Request a demo <ArrowRight size={18} /></Link>
            <a href="#workflow" className="btn btn-ghost btn-lg">See the workflow</a>
          </div>
        </div>
      </header>

      <section id="workflow" className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">SDLC agentic workflow</span>
            <h2>One orchestrator. An agent for every stage.</h2>
            <p className="lead">Each agent is specialised for one job. The orchestrator sequences them, hands over context and stops for human approval where it matters.</p>
          </Reveal>
          <Reveal><SdlcOrchestrator stages={product.stages} /></Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Platform</span>
            <h2>Built for teams that need control</h2>
          </Reveal>
          <div className="grid grid-3">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 60} className="card">
                <div className="icon-tile"><Icon name={f.icon} size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: 'start' }}>
          <Reveal className="card">
            <span className="eyebrow">Who it is for</span>
            <ul className="check-list" style={{ marginTop: '.5rem' }}>
              {product.audiences.map((a) => (
                <li key={a.title}><CheckCircle2 size={18} /><span><strong style={{ color: 'var(--text)' }}>{a.title}.</strong> {a.desc}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="card" delay={100}>
            <span className="eyebrow">Integrations</span>
            <div className="chips" style={{ marginTop: '.5rem' }}>{product.integrations.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <p style={{ marginTop: '1.25rem', fontSize: '.9rem' }}>
              Need another tool connected? Integrations are built on the Model Context Protocol, so new systems can be added as tools.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <Reveal className="card case-feature">
            <div>
              <span className="chip chip-accent">Services + product</span>
              <h3 style={{ margin: '1rem 0 .75rem', fontSize: '1.5rem' }}>Rolled out by the team that built it</h3>
              <p>Our AI-powered testing and quality engineering consultants set up the orchestrator for your stack, tune the agents to your conventions and train your team.</p>
            </div>
            <div className="btn-row">
              <Link to="/services/ai-testing" className="btn btn-ghost">AI-powered testing <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA title={`See ${product.name} on your own app`} text="Book a demo. We will walk through the agentic workflow on a sample of your user stories and show the tests, runs and triage it produces." />
    </>
  );
};

export default ProductDetail;
