import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from './Icon';

const ServiceCard = ({ service }) => (
  <Link to={`/services/${service.slug}`} className="card">
    <div className={`icon-tile ${service.category === 'engineering' ? 'cyan' : ''}`}>
      <Icon name={service.icon} size={24} />
    </div>
    <h3>{service.title}</h3>
    <p className="grow">{service.short}</p>
    <span className="link-arrow" style={{ marginTop: '1.25rem' }}>Learn more <ArrowRight size={16} /></span>
  </Link>
);

export default ServiceCard;
