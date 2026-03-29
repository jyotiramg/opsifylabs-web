import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AI Solutions', path: '/ai-solutions' },
    { name: 'DevOps', path: '/devops' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/assets/Opsifylabs_Stamp.png" alt="Opsifylabs" className="logo-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <span className="logo-text" style={{display: 'none'}}><Rocket className="logo-icon"/> OpsifyLabs</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
        </div>

        <ul className={isMobileMenuOpen ? 'nav-menu active glass' : 'nav-menu'}>
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link 
                to={link.path} 
                className={`nav-links ${location.pathname === link.path ? 'active-link' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="nav-item mobile-only">
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </li>
        </ul>

        <div className="navbar-btn">
          <Link to="/contact" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
