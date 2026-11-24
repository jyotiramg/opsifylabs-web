import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const NotFound = () => (
  <section className="page-top section center" style={{ minHeight: '60vh' }}>
    <div className="container">
      <span className="eyebrow">404</span>
      <h1 style={{ marginBottom: '1rem' }}>Page not found</h1>
      <p className="lead" style={{ marginBottom: '2rem' }}>The page you are looking for does not exist or has moved.</p>
      <div className="btn-row" style={{ justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">Go home</Link>
        <Link to="/services" className="btn btn-ghost">View services</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
