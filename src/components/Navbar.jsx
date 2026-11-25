import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { categories, servicesByCategory, serviceHref } from '../data/services';
import Icon from './Icon';
import './Navbar.css';

const links = [
  { name: 'AI Automation', path: '/ai-automation' },
  { name: 'AI Governance', path: '/ai-governance' },
  { name: 'QA Agent Orchestrator', path: '/products/qa-agent-orchestrator', badge: 'New' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'About', path: '/about', mobileOnly: true },
  { name: 'Contact', path: '/contact', mobileOnly: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => { setMobileOpen(false); setMenuOpen(false); }, [pathname]);

  // Close the services menu on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const servicesActive = pathname.startsWith('/services');

  return (
    <nav className={`nav ${scrolled || mobileOpen ? 'nav-solid' : ''} ${mobileOpen ? 'nav-open' : ''}`} aria-label="Main">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" aria-label="OpsifyLabs home">
          <img src="/assets/opsifylabs-logo-horizontal.png" alt="OpsifyLabs" width="236" height="34" />
        </Link>

        <ul className="nav-links">
          <li ref={menuRef} className="nav-dropdown">
            <button
              type="button"
              className={`nav-link ${servicesActive ? 'active' : ''}`}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((o) => !o)}
            >
              Services <ChevronDown size={16} className={menuOpen ? 'rot' : ''} />
            </button>
            {menuOpen && (
              <div className="mega" role="menu">
                {Object.entries(categories).map(([key, cat]) => (
                  <div key={key} className="mega-col">
                    <p className="mega-title">{cat.label}</p>
                    {servicesByCategory(key).map((s) => (
                      <Link key={s.slug} to={serviceHref(s)} className="mega-item" role="menuitem">
                        <span className={`mega-icon ${key === 'engineering' ? 'cyan' : ''}`}><Icon name={s.icon} size={18} /></span>
                        <span>
                          <strong>{s.title}</strong>
                          <small>{s.short}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
                <Link to="/services" className="mega-footer">View all services <ArrowRight size={16} /></Link>
              </div>
            )}
          </li>
          {links.filter((l) => !l.mobileOnly).map((l) => (
            <li key={l.path}>
              <NavLink to={l.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{l.name}{l.badge && <span className="badge">{l.badge}</span>}</NavLink>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="btn btn-primary nav-cta">Book a call</Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-panel">
          <div className="mobile-group">
            <p className="mega-title">Product</p>
            <Link to="/products/qa-agent-orchestrator" className="mobile-link">QA Agent Orchestrator <span className="badge">New</span></Link>
          </div>
          {Object.entries(categories).map(([key, cat]) => (
            <div key={key} className="mobile-group">
              <p className="mega-title">{cat.label}</p>
              {servicesByCategory(key).map((s) => (
                <Link key={s.slug} to={serviceHref(s)} className="mobile-link">{s.title}</Link>
              ))}
            </div>
          ))}
          <div className="mobile-group">
            <p className="mega-title">Company</p>
            <Link to="/services" className="mobile-link">All services</Link>
            {links.filter((l) => !l.badge).map((l) => <Link key={l.path} to={l.path} className="mobile-link">{l.name}</Link>)}
          </div>
          <Link to="/contact" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Book a consultation</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
