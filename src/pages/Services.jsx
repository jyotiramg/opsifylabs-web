import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, services } from '../data/services';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import './pages.css';

const tabs = [{ key: 'all', label: 'All services' }, ...Object.entries(categories).map(([key, c]) => ({ key, label: c.label }))];

const Services = () => {
  const [params, setParams] = useSearchParams();
  const active = categories[params.get('category')] ? params.get('category') : 'all';
  const list = active === 'all' ? services : services.filter((s) => s.category === active);

  return (
    <>
      <PageHeader eyebrow="Services" title={<>AI and engineering services, <span className="gradient-text">end to end</span></>}>
        Consulting, build, testing and operations for AI-driven software. Engage us for a single service or a full
        programme, from first workshop to production support.
      </PageHeader>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filter services">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active === t.key}
                className={`tab ${active === t.key ? 'active' : ''}`}
                onClick={() => setParams(t.key === 'all' ? {} : { category: t.key }, { replace: true })}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid grid-3">
            {list.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 60} style={{ display: 'flex' }}><ServiceCard service={s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Need a combination of services?" text="Most clients combine strategy, build and assurance. We will scope a programme around your goals and budget." />
    </>
  );
};

export default Services;
