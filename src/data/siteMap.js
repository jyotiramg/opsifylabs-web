// Site map used by the navbar menu (first row) and the footer (all rows).
// Items without `to`/`href` render as plain text.
import { servicesByCategory, serviceHref } from './services';
import { industries } from './services';
import { company } from './company';

const fromServices = (cat) => servicesByCategory(cat).map((s) => ({ label: s.title, to: serviceHref(s) }));

export const menuColumns = [
  { title: 'AI Services', items: fromServices('ai') },
  { title: 'Engineering', items: fromServices('engineering') },
  {
    title: 'Solutions',
    items: [
      { label: 'Agentic AI platform', to: '/platform' },
      { label: 'AI workflow automation', to: '/ai-automation' },
      { label: 'Live workflow demo', to: '/ai-automation#live' },
      { label: 'AI governance & data security', to: '/ai-governance' },
      { label: 'AI data shield demo', to: '/ai-governance#data-shield' },
      { label: 'AI across the DevOps cycle', to: '/services/devops' },
      { label: 'Local AI agents on AWS, Azure & GCP', to: '/services/ai-agents' },
    ],
  },
  {
    title: 'Product',
    items: [
      { label: 'QA Agent Orchestrator', to: '/products/qa-agent-orchestrator', badge: 'New' },
      { label: 'SDLC agentic workflow', to: '/products/qa-agent-orchestrator#workflow' },
      { label: 'Request a demo', to: '/contact?service=qa-agent-orchestrator' },
    ],
  },
];

export const footerColumns = [
  ...menuColumns,
  { title: 'Industries', items: industries.map((i) => ({ label: i.name })) },
  {
    title: 'Resources',
    items: [
      { label: 'Platform: build · scale · optimize', to: '/platform#build' },
      { label: 'Case studies', to: '/case-studies' },
      { label: 'Savings calculator', to: '/ai-automation#savings' },
      { label: 'AI governance self-check', to: '/ai-governance#readiness' },
      { label: 'All services', to: '/services' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About us', to: '/about' },
      { label: 'Contact us', to: '/contact' },
      { label: 'Request a proposal', to: '/contact?service=other' },
    ],
  },
  {
    title: 'Contact',
    items: [
      ...company.emails.map((e) => ({ label: e, href: `mailto:${e}` })),
      { label: company.phone, href: `tel:${company.phoneHref}` },
      ...company.offices.map((o) => ({ label: `${o.label}: ${o.short}` })),
    ],
  },
];
