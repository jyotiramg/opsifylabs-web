import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const CTA = ({
  title = 'Ready to put AI to work?',
  text = 'Book a free 30-minute consultation. We will review your goals, point out quick wins and tell you honestly where AI will and will not help.',
}) => (
  <section className="section">
    <div className="container">
      <Reveal className="cta">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="btn-row">
          <Link to="/contact" className="btn btn-primary btn-lg">Book a consultation <ArrowRight size={18} /></Link>
          <Link to="/services" className="btn btn-ghost btn-lg">Explore services</Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTA;
