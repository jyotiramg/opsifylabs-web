import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { getService, services, categories, process } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import { getProduct } from '../data/products';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import AgentPipeline from '../components/AgentPipeline';
import DevOpsAiLoop from '../components/DevOpsAiLoop';
import LocalAgentWorkflow from '../components/LocalAgentWorkflow';
import ServiceCard from '../components/ServiceCard';
import CTA from '../components/CTA';
import './pages.css';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <Navigate to="/services" replace />;
  if (service.href) return <Navigate to={service.href} replace />;

  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const study = caseStudies.find((c) => c.service === service.slug);
  const product = service.product && getProduct(service.product);

  return (
    <>
      <header className="page-top section-sm">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/services">Services</Link><ChevronRight size={14} />
            <Link to={`/services?category=${service.category}`}>{categories[service.category].label}</Link>
          </nav>
          <div className="detail-hero">
            <div className={`icon-tile icon-lg ${service.category === 'engineering' ? 'cyan' : ''}`}><Icon name={service.icon} size={30} /></div>
            <div>
              <h1 style={{ marginBottom: '1rem' }}>{service.title}</h1>
              <p className="lead detail-tagline">{service.tagline}</p>
            </div>
          </div>
          <p className="lead" style={{ marginTop: '1.5rem' }}>{service.intro}</p>
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link to={`/contact?service=${service.slug}`} className="btn btn-primary btn-lg">Discuss your project <ArrowRight size={18} /></Link>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What we deliver</span>
            <h2>Capabilities</h2>
          </Reveal>
          <div className="grid grid-3">
            {service.offerings.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 60} className="card offering">
                <span className="offering-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {service.visuals?.includes('devopsLoop') && (
        <section className="section band">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">AI enablement</span>
              <h2>How we bring AI into every DevOps stage</h2>
              <p className="lead">Follow the live flow or click a stage to see what AI does there and which tools we use.</p>
            </Reveal>
            <Reveal><DevOpsAiLoop /></Reveal>
          </div>
        </section>
      )}

      {service.visuals?.includes('localAgents') && (
        <section className="section band">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Reference architecture</span>
              <h2>Local AI agent workflow on AWS, Azure or GCP</h2>
              <p className="lead">Agents run inside your network with local models and reach your cloud account over private connections only when needed.</p>
            </Reveal>
            <Reveal><LocalAgentWorkflow /></Reveal>
          </div>
        </section>
      )}

      {service.showDiagram && (
        <section className="section band">
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Reference architecture</span>
              <h2>Agentic testing with Playwright + MCP</h2>
              <p className="lead">An LLM agent drives the browser through a Model Context Protocol server, so tests describe intent rather than brittle selectors.</p>
            </Reveal>
            <Reveal><AgentPipeline /></Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container split">
          <Reveal className="card">
            <span className="eyebrow">Outcomes</span>
            <h3 style={{ marginBottom: '1.25rem' }}>What you walk away with</h3>
            <ul className="check-list">
              {service.outcomes.map((o) => <li key={o}><CheckCircle2 size={18} /> {o}</li>)}
            </ul>
          </Reveal>
          <Reveal className="card" delay={100}>
            <span className="eyebrow">Technology</span>
            <h3 style={{ marginBottom: '1.25rem' }}>Tools and platforms</h3>
            <div className="chips">{service.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <p style={{ marginTop: '1.25rem', fontSize: '.9rem' }}>We are vendor-neutral and work within your existing stack where it makes sense.</p>
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Engagement</span>
            <h2>How we run it</h2>
          </Reveal>
          <ol className="process">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 60} className="process-step">
                <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.step}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {product && (
        <section className="section-sm">
          <div className="container">
            <Reveal className="card case-feature card-cta">
              <div>
                <span className="chip chip-accent">Product</span>
                <h3 style={{ margin: '1rem 0 .75rem', fontSize: '1.5rem' }}>{product.name}</h3>
                <p>{product.short}</p>
              </div>
              <div className="btn-row">
                <Link to={`/products/${product.slug}`} className="btn btn-primary">See the SDLC workflow <ArrowRight size={16} /></Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {study && (
        <section className="section">
          <div className="container">
            <Reveal className="card case-feature">
              <div>
                <span className="chip chip-accent">Case study</span>
                <h3 style={{ margin: '1rem 0 .75rem', fontSize: '1.5rem' }}>{study.title}</h3>
                <p>{study.result}</p>
                <Link to="/case-studies" className="link-arrow" style={{ marginTop: '1rem' }}>Read more <ArrowRight size={16} /></Link>
              </div>
              <div className="case-metric big"><strong className="gradient-text">{study.metric}</strong><span>{study.metricLabel}</span></div>
            </Reveal>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: study ? 0 : undefined }}>
          <div className="container">
            <Reveal className="section-head"><h2>Related services</h2></Reveal>
            <div className="grid grid-3">
              {related.map((s) => <Reveal key={s.slug} style={{ display: 'flex' }}><ServiceCard service={s} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <CTA title="Let's scope your project" text={`Tell us where you are today and what you want from ${service.title}. We will come back with a proposed first step.`} />
    </>
  );
};

export default ServiceDetail;
