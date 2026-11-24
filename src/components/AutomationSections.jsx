import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import AgenticTransformation from './AgenticTransformation';
import WorkflowPlayground from './WorkflowPlayground';
import SavingsCalculator from './SavingsCalculator';

// The "AI consultant" story: manual → agentic, live demo, savings.
// Shared by the home page and /ai-automation.
const AutomationSections = ({ showPageLink = false }) => (
  <>
    <section className="section">
      <div className="container">
        <Reveal className="section-head split-head">
          <div style={{ maxWidth: '46rem' }}>
            <span className="eyebrow">AI consulting · manual to agentic</span>
            <h2 style={{ marginBottom: '1rem' }}>Your manual workflows, <span className="gradient-text">rebuilt as AI agent workflows</span></h2>
            <p className="lead">
              Most teams lose hours every week to copy-paste work between systems. We find those workflows, rebuild them
              as AI agent workflows on your existing tools, and keep people in charge of the decisions that matter.
            </p>
          </div>
          {showPageLink && <Link to="/ai-automation" className="link-arrow">How we automate <ArrowRight size={16} /></Link>}
        </Reveal>
        <Reveal><AgenticTransformation /></Reveal>
      </div>
    </section>

    <section id="live" className="section band">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Live workflow · try it</span>
          <h2 style={{ marginBottom: '1rem' }}>Configure an agent workflow and <span className="gradient-text">watch it run</span></h2>
          <p className="lead">
            One real-world example: vendor invoice processing. Pick the trigger, the AI model and where people approve,
            switch steps on or off, then press run. This is the same design we deliver, connected to your own systems.
          </p>
        </Reveal>
        <Reveal><WorkflowPlayground /></Reveal>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Cost &amp; time savings</span>
          <h2 style={{ marginBottom: '1rem' }}>What could automation <span className="gradient-text">save you?</span></h2>
          <p className="lead">Move the sliders to match one of your manual workflows. We then confirm the real numbers in a free assessment.</p>
        </Reveal>
        <Reveal><SavingsCalculator /></Reveal>
      </div>
    </section>
  </>
);

export default AutomationSections;
