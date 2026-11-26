import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import { getService } from '../data/services';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import AgentPipeline from '../components/AgentPipeline';
import CTA from '../components/CTA';
import './pages.css';

const CaseStudies = () => (
  <>
    <PageHeader eyebrow="Case studies" title={<>Measurable outcomes, <span className="gradient-text">not slideware</span></>}>
      A selection of engagements across AI testing, quality engineering and DevOps. Client names are kept confidential.
    </PageHeader>

    <section className="section" style={{ paddingTop: '1rem' }}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Flagship</span>
          <h2>AI agents in the browser test pipeline</h2>
          <p className="lead">
            We coupled the Playwright engine with a Model Context Protocol server so an LLM agent can reason about the page,
            act on it and validate outcomes, removing brittle locators and cutting maintenance.
          </p>
        </Reveal>
        <Reveal><AgentPipeline /></Reveal>
      </div>
    </section>

    <section className="section band">
      <div className="container case-list">
        {caseStudies.map((c, i) => {
          const svc = getService(c.service);
          return (
            <Reveal key={c.title} delay={(i % 2) * 80} className="card case-card">
              <div className="case-card-head">
                <span className="chip chip-accent">{c.tag}</span>
                <span className="chip">{c.client}</span>
              </div>
              <h3>{c.title}</h3>
              <div className="case-metric"><strong className="gradient-text">{c.metric}</strong><span>{c.metricLabel}</span></div>
              <dl className="case-dl">
                <dt>Challenge</dt><dd>{c.challenge}</dd>
                <dt>Solution</dt><dd>{c.solution}</dd>
                <dt>Result</dt><dd>{c.result}</dd>
              </dl>
              {svc && <Link to={`/services/${svc.slug}`} className="link-arrow">{svc.title} <ArrowRight size={16} /></Link>}
            </Reveal>
          );
        })}
      </div>
    </section>

    <CTA title="Want results like these?" />
  </>
);

export default CaseStudies;
