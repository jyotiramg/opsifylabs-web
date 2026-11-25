import React from 'react';
import { Link } from 'react-router-dom';
import './SiteGrid.css';

// Bordered "table" grid of link columns with + markers at the corners.
const SiteGrid = ({ columns, className = '', onNavigate }) => (
  <div className={`sg ${className}`}>
    {columns.map((col) => (
      <div key={col.title} className="sg-cell">
        <p className="sg-title">{col.title}</p>
        <ul>
          {col.items.map((it) => (
            <li key={`${col.title}-${it.label}`}>
              {it.to && <Link to={it.to} onClick={onNavigate}>{it.label}{it.badge && <span className="badge">{it.badge}</span>}</Link>}
              {it.href && <a href={it.href}>{it.label}</a>}
              {!it.to && !it.href && <span className="sg-text">{it.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default SiteGrid;
