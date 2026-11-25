import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to the top on page change, or to the #anchor when the URL has one.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ block: 'start' });
    }, 50);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
};

export default ScrollToTop;
