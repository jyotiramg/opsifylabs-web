import React from 'react';

const PageHeader = ({ eyebrow, title, children }) => (
  <header className="page-top section-sm">
    <div className="container">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 style={{ maxWidth: '52rem', marginBottom: '1.25rem' }}>{title}</h1>
      {children && <p className="lead">{children}</p>}
    </div>
  </header>
);

export default PageHeader;
