import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AgentMap from '../components/AgentMap';
import PageHeader from '../components/PageHeader';
import CTA from '../components/CTA';
import './pages.css';

const AgentMapPage = () => (
  <>
    <PageHeader eyebrow="Agentic company map" title={<>What your company looks like <span className="gradient-text">run by AI agents</span></>}>
      Eight departments, dozens of agent roles and one shared brain. Explore an example blueprint, open any department to
      see its agents, then let us map your own company.
    </PageHeader>
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <AgentMap />
        <p className="gs-note" style={{ marginTop: '1rem', fontSize: '.8rem', color: 'var(--text-dim)' }}>
          Example blueprint for a mid-size company. &ldquo;Live&rdquo; and &ldquo;in build&rdquo; describe the example, not a specific client.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link to="/contact?service=ai-agents" className="btn btn-primary btn-lg">Get your company&rsquo;s agent map <ArrowRight size={18} /></Link>
          <Link to="/ai-automation#live" className="btn btn-ghost btn-lg">See one workflow run live</Link>
        </div>
      </div>
    </section>
    <CTA title="Get your own agent map" text="In a free assessment we map your departments, find the roles agents can take on first and estimate the time and cost saved." />
  </>
);

export default AgentMapPage;
