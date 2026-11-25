import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { readinessQuestions } from '../data/governance';
import './GovernanceReadiness.css';

const levels = [
  { min: 7, label: 'Well governed', text: 'Strong foundations. Focus on continuous monitoring and audit evidence.' },
  { min: 4, label: 'Partly governed', text: 'Good start, but gaps that an auditor or attacker would find. Close them before scaling AI.' },
  { min: 0, label: 'At risk', text: 'AI is likely in use without the controls to protect your data. Start with an inventory and policy.' },
];

const GovernanceReadiness = () => {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter(Boolean).length;
  const done = answered === readinessQuestions.length;
  const level = levels.find((l) => score >= l.min);
  const gaps = readinessQuestions.filter((_, i) => answers[i] === false);

  return (
    <div className="gr">
      <ol className="gr-questions">
        {readinessQuestions.map((item, i) => (
          <li key={item.q} className={answers[i] === undefined ? '' : answers[i] ? 'yes' : 'no'}>
            <span className="gr-num">{i + 1}</span>
            <p>{item.q}</p>
            <div className="gr-btns" role="group" aria-label={`Answer question ${i + 1}`}>
              <button type="button" aria-pressed={answers[i] === true} className={answers[i] === true ? 'on yes' : ''} onClick={() => setAnswers((a) => ({ ...a, [i]: true }))}><Check size={14} /> Yes</button>
              <button type="button" aria-pressed={answers[i] === false} className={answers[i] === false ? 'on no' : ''} onClick={() => setAnswers((a) => ({ ...a, [i]: false }))}><X size={14} /> No</button>
            </div>
          </li>
        ))}
      </ol>

      <aside className="gr-result" aria-live="polite">
        <span className="gr-label">Your AI governance readiness</span>
        <div className="gr-score">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="gr-track" />
            <circle cx="60" cy="60" r="52" className="gr-fill" style={{ strokeDashoffset: 327 - (327 * score) / readinessQuestions.length }} />
          </svg>
          <div><strong>{score}<small>/{readinessQuestions.length}</small></strong><span>{answered}/{readinessQuestions.length} answered</span></div>
        </div>
        {!done && <p className="gr-hint">Answer all {readinessQuestions.length} questions to see your result and the gaps to close.</p>}
        {done && (
          <>
            <p className={`gr-level l-${level.min}`}><strong>{level.label}.</strong> {level.text}</p>
            {gaps.length > 0 && (
              <div className="gr-gaps">
                <span className="gr-label">Gaps to close</span>
                <ul>{gaps.map((g) => <li key={g.q}>{g.gap}</li>)}</ul>
              </div>
            )}
            <Link to="/contact?service=ai-governance" className="btn btn-primary">Get a governance assessment <ArrowRight size={16} /></Link>
          </>
        )}
      </aside>
    </div>
  );
};

export default GovernanceReadiness;
