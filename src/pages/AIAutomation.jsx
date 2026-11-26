import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { automationApproach } from '../data/automation';
import PageHeader from '../components/PageHeader';
import AutomationSections from '../components/AutomationSections';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import './pages.css';

const AIAutomation = () => (
  <>
    <PageHeader eyebrow="AI workflow automation" title={<>Less manual work. <span className="gradient-text">More done by AI agents.</span></>}>
      We are AI consultants who ship. We map where your teams lose time, turn those manual workflows into secure AI agent
      workflows with human approval built in, and measure the time and cost saved against your baseline.
    </PageHeader>
    <div className="container" style={{ marginTop: '-1.5rem' }}>
      <div className="btn-row">
        <Link to="/contact?service=ai-agents" className="btn btn-primary btn-lg">Get a free automation assessment <ArrowRight size={18} /></Link>
        <a href="#live" className="btn btn-ghost btn-lg">Try the live workflow</a>
      </div>
    </div>

    <AutomationSections />

    <section className="section band">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Our approach</span>
          <h2>From manual to agentic in four steps</h2>
        </Reveal>
        <ol className="process process-4">
          {automationApproach.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 60} className="process-step">
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.step}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <CTA title="Which workflow should you automate first?" text="Book a free 45-minute automation assessment. We review your manual workflows and tell you which ones will pay back fastest, and which ones are not worth automating." />
  </>
);

export default AIAutomation;
