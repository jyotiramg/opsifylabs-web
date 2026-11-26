import React, { useState } from 'react';
import { User, Bot, UserCheck, ArrowRight } from 'lucide-react';
import { workflows } from '../data/automation';
import Icon from './Icon';
import './AgenticTransformation.css';

const AgenticTransformation = () => {
  const [key, setKey] = useState(workflows[0].key);
  const wf = workflows.find((w) => w.key === key);
  const humanSteps = wf.agentic.filter((s) => s.kind === 'human').length;

  return (
    <div className="at">
      <div className="at-tabs" role="tablist" aria-label="Example workflows">
        {workflows.map((w) => (
          <button key={w.key} type="button" role="tab" aria-selected={w.key === key} className={w.key === key ? 'active' : ''} onClick={() => setKey(w.key)}>
            <Icon name={w.icon} size={16} />
            <span><small>{w.area}</small>{w.name}</span>
          </button>
        ))}
      </div>

      <div className="at-compare" key={wf.key}>
        <div className="at-col manual">
          <header>
            <span className="at-label">Today · manual</span>
            <strong>{wf.manual.length} manual steps</strong>
          </header>
          <ol>
            {wf.manual.map((t, i) => (
              <li key={t} style={{ animationDelay: `${i * 50}ms` }}><span className="at-ico"><User size={14} /></span>{t}</li>
            ))}
          </ol>
        </div>

        <div className="at-arrow" aria-hidden="true"><ArrowRight size={22} /></div>

        <div className="at-col agentic">
          <header>
            <span className="at-label">With AI agents</span>
            <strong>{humanSteps} human {humanSteps === 1 ? 'decision' : 'decisions'}, the rest automated</strong>
          </header>
          <ol>
            {wf.agentic.map((s, i) => (
              <li key={s.text} className={s.kind} style={{ animationDelay: `${200 + i * 70}ms` }}>
                <span className="at-ico">{s.kind === 'human' ? <UserCheck size={14} /> : <Bot size={14} />}</span>
                {s.text}
                {s.kind === 'human' && <em>you approve</em>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AgenticTransformation;
