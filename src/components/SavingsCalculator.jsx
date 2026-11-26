import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Wallet, Info } from 'lucide-react';
import './SavingsCalculator.css';

const WEEKS_PER_YEAR = 48;
const HOURS_PER_FTE = 1800;
const currencies = {
  USD: { locale: 'en-US', rate: 40, min: 10, max: 200, step: 5 },
  INR: { locale: 'en-IN', rate: 1200, min: 300, max: 10000, step: 100 },
};

const Slider = ({ label, value, onChange, min, max, step, display, hint }) => (
  <label className="sc-field">
    <span className="sc-field-top"><span>{label}</span><output>{display}</output></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
      style={{ '--fill': `${((value - min) / (max - min)) * 100}%` }} />
    {hint && <small>{hint}</small>}
  </label>
);

const SavingsCalculator = () => {
  const [currency, setCurrency] = useState('USD');
  const [people, setPeople] = useState(10);
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(currencies.USD.rate);
  const [share, setShare] = useState(50);

  const cur = currencies[currency];
  const money = (n) => new Intl.NumberFormat(cur.locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
  const num = (n) => new Intl.NumberFormat(cur.locale, { maximumFractionDigits: 0 }).format(n);

  const switchCurrency = (c) => { setCurrency(c); setRate(currencies[c].rate); };

  const hoursSaved = people * hours * WEEKS_PER_YEAR * (share / 100);
  const fte = hoursSaved / HOURS_PER_FTE;
  const costSaved = hoursSaved * rate;

  return (
    <div className="sc">
      <div className="sc-inputs">
        <div className="sc-head">
          <h3>Estimate your savings</h3>
          <div className="sc-cur" role="tablist" aria-label="Currency">
            {Object.keys(currencies).map((c) => (
              <button key={c} type="button" role="tab" aria-selected={c === currency} className={c === currency ? 'active' : ''} onClick={() => switchCurrency(c)}>{c}</button>
            ))}
          </div>
        </div>
        <Slider label="People doing this work" value={people} onChange={setPeople} min={1} max={200} step={1} display={num(people)} />
        <Slider label="Hours per person per week on it" value={hours} onChange={setHours} min={1} max={40} step={1} display={`${hours} h`} />
        <Slider label="Fully loaded cost per hour" value={rate} onChange={setRate} min={cur.min} max={cur.max} step={cur.step} display={money(rate)} hint="Salary plus overheads" />
        <Slider label="Share of the work agents can take on" value={share} onChange={setShare} min={10} max={80} step={5} display={`${share}%`} hint="Most workflows land between 30% and 60%; we confirm it in discovery" />
      </div>

      <div className="sc-results" aria-live="polite">
        <span className="sc-label">Estimated yearly impact</span>
        <div className="sc-big">
          <Wallet size={22} />
          <div><strong className="gradient-text">{money(costSaved)}</strong><span>cost freed up each year</span></div>
        </div>
        <div className="sc-row">
          <div><Clock size={18} /><strong>{num(hoursSaved)}</strong><span>hours saved / year</span></div>
          <div><Users size={18} /><strong>{fte.toFixed(1)}</strong><span>full-time roles redirected</span></div>
        </div>
        <p className="sc-formula">
          <Info size={14} />
          <span>
            {num(people)} people × {hours} h/week × {WEEKS_PER_YEAR} weeks × {share}% automated. Estimate only:
            excludes build and running costs. We validate real numbers in a free assessment.
          </span>
        </p>
        <Link to="/contact?service=ai-agents" className="btn btn-primary">Get a free automation assessment <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
};

export default SavingsCalculator;
