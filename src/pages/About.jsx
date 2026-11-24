import React from 'react';
import { Compass, Target, Flag, Lightbulb, BadgeCheck, HeartHandshake, ShieldCheck, GraduationCap } from 'lucide-react';
import { process } from '../data/services';
import { company } from '../data/company';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import './pages.css';

const values = [
  { icon: Lightbulb, title: 'Innovation', text: 'We test new tools and approaches before recommending them to clients.' },
  { icon: BadgeCheck, title: 'Quality excellence', text: 'Every deliverable is tested, reviewed and measured.' },
  { icon: HeartHandshake, title: 'Customer success', text: 'Your business outcome is the definition of done.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'Transparent estimates, honest advice, no lock-in.' },
  { icon: GraduationCap, title: 'Continuous learning', text: 'AI moves fast; our teams train continuously to keep pace.' },
];

const About = () => (
  <>
    <PageHeader eyebrow="About us" title={<>Engineering quality into the <span className="gradient-text">AI era</span></>}>
      OpsifyLabs started in {company.founded} as a focused testing and automation practice. Today we are an AI-first technology
      partner covering AI consulting, generative AI, AI-powered testing, DevOps and cloud, with delivery teams in India and the US.
    </PageHeader>

    <section className="section" style={{ paddingTop: '1rem' }}>
      <div className="container grid grid-3">
        {[
          { icon: Compass, title: 'Our journey', text: 'From a quality engineering specialist to a full-stack AI and engineering partner, we have grown by helping clients ship faster without trading off reliability.' },
          { icon: Target, title: 'Our vision', text: 'To be a globally recognised leader in AI-driven quality engineering and DevOps transformation, helping organisations build future-ready digital systems.' },
          { icon: Flag, title: 'Our mission', text: 'To help businesses deliver secure, scalable, high-quality software by applying AI, automation and modern engineering where they create real value.' },
        ].map(({ icon: Ico, title, text }, i) => (
          <Reveal key={title} delay={i * 80} className="card">
            <div className="icon-tile"><Ico size={22} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="section band">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Values</span>
          <h2>What we stand for</h2>
        </Reveal>
        <div className="values">
          {values.map(({ icon: Ico, title, text }, i) => (
            <Reveal key={title} delay={i * 60} className="card">
              <div className="icon-tile cyan"><Ico size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Approach</span>
          <h2>Discover. Design. Build. Validate. Scale.</h2>
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

    <CTA title="Work with OpsifyLabs" />
  </>
);

export default About;
