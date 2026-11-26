import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { governanceSteps } from '../data/governance';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import GovernanceReadiness from '../components/GovernanceReadiness';
import { ProtectionLayers, Frameworks, DataShieldSection } from '../components/GovernanceSections';
import './pages.css';

const AIGovernance = () => (
  <>
    <PageHeader eyebrow="AI governance · compliance · data security" title={<>Use AI without <span className="gradient-text">putting your data at risk</span></>}>
      Data is the most valuable thing you give an AI system and the easiest to lose control of. We set up the governance,
      compliance and security controls that let your teams use AI confidently: personal data protected, access respected,
      every decision auditable.
    </PageHeader>
    <div className="container" style={{ marginTop: '-1.5rem' }}>
      <div className="btn-row">
        <Link to="/contact?service=ai-governance" className="btn btn-primary btn-lg">Book an AI governance assessment <ArrowRight size={18} /></Link>
        <a href="#data-shield" className="btn btn-ghost btn-lg">Try the live data shield</a>
      </div>
    </div>

    <DataShieldSection />

    <section className="section band">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Defence in depth</span>
          <h2 style={{ marginBottom: '1rem' }}>Six layers protecting your data in AI</h2>
          <p className="lead">No single tool makes AI safe. We put controls at every point where data can leak, be misused or be manipulated.</p>
        </Reveal>
        <ProtectionLayers />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Compliance</span>
          <h2 style={{ marginBottom: '1rem' }}>Aligned with the rules that apply to you</h2>
          <p className="lead">We map each AI use case to the regulations and standards that apply, then build the controls and evidence to meet them.</p>
        </Reveal>
        <Frameworks />
        <p className="gs-disclaimer">
          We work alongside your legal, privacy and compliance teams and your auditors. We do not provide legal advice or
          certification; we design and implement the controls, documentation and evidence they need.
        </p>
      </div>
    </section>

    <section className="section band">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">How we set it up</span>
          <h2>From AI sprawl to governed AI in five steps</h2>
        </Reveal>
        <ol className="process">
          {governanceSteps.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 60} className="process-step">
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.step}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section id="readiness" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Self-check · 2 minutes</span>
          <h2 style={{ marginBottom: '1rem' }}>How ready is your AI governance?</h2>
          <p className="lead">Answer eight questions to get a readiness score and the specific gaps to close.</p>
        </Reveal>
        <GovernanceReadiness />
      </div>
    </section>

    <CTA title="Make AI safe to scale" text="Book an AI governance assessment. We inventory your AI use, check your data protection against the regulations that apply and give you a prioritised plan." />
  </>
);

export default AIGovernance;
