import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import AIAutomation from './pages/AIAutomation';
import AIGovernance from './pages/AIGovernance';
import Platform from './pages/Platform';
import AgentMapPage from './pages/AgentMapPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/products" element={<Navigate to="/products/qa-agent-orchestrator" replace />} />
          <Route path="/ai-automation" element={<AIAutomation />} />
          <Route path="/ai-governance" element={<AIGovernance />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/agent-map" element={<AgentMapPage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          {/* Old URLs kept working */}
          <Route path="/ai-solutions" element={<Navigate to="/services?category=ai" replace />} />
          <Route path="/devops" element={<Navigate to="/services/devops" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
