// "Agentic company map": an EXAMPLE blueprint of how a mid-size company can
// run each department with AI agents. Status = 'live' (running) or 'build'
// (being built) inside the example, not a claim about deployed client agents.

export const departments = [
  {
    id: 'sales', name: 'Sales',
    roles: [
      { name: 'Lead research', status: 'live', desc: 'Finds and enriches target accounts from your ICP.' },
      { name: 'Prospecting', status: 'live', desc: 'Builds contact lists and scores fit and intent.' },
      { name: 'Outreach', status: 'live', desc: 'Drafts personalised emails and follow-ups for review.' },
      { name: 'Meeting booker', status: 'live', desc: 'Handles replies and books calls into calendars.' },
      { name: 'CRM hygiene', status: 'live', desc: 'Keeps contacts, stages and notes up to date.' },
      { name: 'Proposals', status: 'live', desc: 'Drafts proposals and SOWs from discovery notes.' },
      { name: 'Forecasting', status: 'build', desc: 'Predicts pipeline and flags deals at risk.' },
      { name: 'Deal desk', status: 'build', desc: 'Checks pricing and terms against policy.' },
    ],
  },
  {
    id: 'marketing', name: 'Marketing',
    roles: [
      { name: 'Content writer', status: 'live', desc: 'Drafts blogs, case studies and landing pages.' },
      { name: 'SEO', status: 'live', desc: 'Researches keywords and optimises pages.' },
      { name: 'Social', status: 'live', desc: 'Plans and drafts posts across channels.' },
      { name: 'Campaign analyst', status: 'live', desc: 'Reports on spend, leads and ROI weekly.' },
      { name: 'Competitor watch', status: 'live', desc: 'Tracks competitor pricing, launches and messaging.' },
      { name: 'Newsletter', status: 'build', desc: 'Assembles and personalises the monthly newsletter.' },
      { name: 'Brand QA', status: 'build', desc: 'Checks every asset against brand and legal rules.' },
    ],
  },
  {
    id: 'customer', name: 'Customer',
    roles: [
      { name: 'Ticket triage', status: 'live', desc: 'Classifies, prioritises and routes every ticket.' },
      { name: 'Answer drafting', status: 'live', desc: 'Drafts grounded replies from your knowledge base.' },
      { name: 'Refunds', status: 'live', desc: 'Checks eligibility and prepares refunds for approval.' },
      { name: 'Escalations', status: 'live', desc: 'Summarises complex cases for the right team.' },
      { name: 'Onboarding guide', status: 'live', desc: 'Walks new customers through setup.' },
      { name: 'Voice of customer', status: 'build', desc: 'Turns tickets and reviews into product insights.' },
      { name: 'Knowledge base', status: 'build', desc: 'Writes and updates help articles from solved tickets.' },
    ],
  },
  {
    id: 'finance', name: 'Finance',
    roles: [
      { name: 'Invoices', status: 'live', desc: 'Extracts, matches and posts supplier invoices.' },
      { name: 'Expenses', status: 'live', desc: 'Audits expense claims against policy.' },
      { name: 'Reconciliation', status: 'live', desc: 'Matches bank lines to ledger entries.' },
      { name: 'Collections', status: 'live', desc: 'Sends reminders and tracks overdue invoices.' },
      { name: 'Month-end close', status: 'build', desc: 'Prepares accruals and close checklists.' },
      { name: 'Spend analytics', status: 'build', desc: 'Spots savings and unusual spend.' },
    ],
  },
  {
    id: 'people', name: 'People',
    roles: [
      { name: 'Screening', status: 'live', desc: 'Screens CVs against role criteria with bias checks.' },
      { name: 'Scheduling', status: 'live', desc: 'Coordinates interviews across calendars.' },
      { name: 'Onboarding', status: 'live', desc: 'Provisions accounts and runs first-week plans.' },
      { name: 'Policy Q&A', status: 'live', desc: 'Answers HR questions from your handbook.' },
      { name: 'Payroll checks', status: 'build', desc: 'Flags anomalies before payroll runs.' },
      { name: 'Engagement', status: 'build', desc: 'Summarises survey themes for managers.' },
    ],
  },
  {
    id: 'operations', name: 'Operations',
    roles: [
      { name: 'Access requests', status: 'live', desc: 'Grants and revokes access with approvals.' },
      { name: 'Incident triage', status: 'live', desc: 'Groups alerts and proposes the likely cause.' },
      { name: 'Runbooks', status: 'live', desc: 'Runs safe diagnostics and fixes with approval.' },
      { name: 'Procurement', status: 'live', desc: 'Compares quotes and raises purchase orders.' },
      { name: 'Vendors', status: 'build', desc: 'Tracks contracts, renewals and SLAs.' },
      { name: 'Compliance evidence', status: 'build', desc: 'Collects audit evidence continuously.' },
    ],
  },
  {
    id: 'engineering', name: 'Engineering',
    roles: [
      { name: 'Requirements', status: 'live', desc: 'Turns specs into clear, testable stories.' },
      { name: 'Test design', status: 'live', desc: 'Generates test cases mapped to stories.' },
      { name: 'Test automation', status: 'live', desc: 'Writes and self-heals Playwright tests.' },
      { name: 'Code review', status: 'live', desc: 'Reviews PRs for bugs, style and security.' },
      { name: 'Defect triage', status: 'live', desc: 'Separates flaky tests from real bugs.' },
      { name: 'Release gate', status: 'live', desc: 'Summarises release readiness for go/no-go.' },
      { name: 'Docs', status: 'build', desc: 'Keeps technical docs in sync with the code.' },
    ],
  },
  {
    id: 'data', name: 'Data',
    roles: [
      { name: 'Pipelines', status: 'live', desc: 'Monitors and repairs data pipelines.' },
      { name: 'Data quality', status: 'live', desc: 'Detects anomalies and broken tables.' },
      { name: 'Ask your data', status: 'live', desc: 'Answers business questions in plain English.' },
      { name: 'Reports', status: 'live', desc: 'Builds weekly and monthly reports with commentary.' },
      { name: 'Forecasting', status: 'build', desc: 'Forecasts demand, revenue and capacity.' },
    ],
  },
];

export const brain = {
  title: 'The company brain',
  intro: 'Every agent connects to one shared brain, so they work from the same knowledge, follow the same rules and hand work to each other.',
  parts: [
    { title: 'Shared knowledge', desc: 'Documents, tickets and data, searchable with permission-aware retrieval.' },
    { title: 'Memory', desc: 'What happened before: customers, decisions and open work.' },
    { title: 'Orchestrator', desc: 'Routes tasks between agents and departments.' },
    { title: 'Policies & guardrails', desc: 'PII masking, approvals and action limits for every agent.' },
    { title: 'Human approvals', desc: 'People sign off on anything that matters.' },
    { title: 'Audit trail', desc: 'Every prompt, tool call and decision recorded.' },
  ],
};

export const mapTotals = () => {
  const roles = departments.flatMap((d) => d.roles);
  return { departments: departments.length, roles: roles.length, live: roles.filter((r) => r.status === 'live').length };
};
