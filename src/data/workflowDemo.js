// Live workflow playground: one worked example (vendor invoice processing)
// that visitors can configure and run. Timings are illustrative per-item
// estimates used to compare manual effort with an agent workflow.

export const demo = {
  name: 'Vendor invoice processing',
  triggers: [
    { id: 'email', label: 'Email inbox', log: 'Watching ap@company.com for new invoices' },
    { id: 'schedule', label: 'Daily schedule', log: 'Scheduled run started (07:00 daily)' },
    { id: 'portal', label: 'Supplier portal webhook', log: 'Webhook received from supplier portal' },
    { id: 'chat', label: 'Slack / Teams command', log: '"/process-invoices" received from #finance-ops' },
  ],
  models: [
    { id: 'local', label: 'Local LLM only', log: 'Local model (Llama 3.1, on-prem)', note: 'All data stays in your network' },
    { id: 'hybrid', label: 'Hybrid', log: 'Local model for PII, cloud model for reasoning', note: 'Best balance of privacy and accuracy' },
    { id: 'cloud', label: 'Cloud model', log: 'Cloud model via private endpoint', note: 'Highest accuracy, data leaves via private link' },
  ],
  approvals: [
    { id: 'exceptions', label: 'Exceptions only', note: 'Recommended: people review only what the agent flags' },
    { id: 'all', label: 'Every invoice', note: 'Safest start: a person approves each item' },
    { id: 'none', label: 'Fully automatic', note: 'Only once accuracy is proven on your data' },
  ],
  // manualMin = minutes a person spends per invoice on this step today.
  steps: [
    { id: 'collect', icon: 'Inbox', name: 'Collect invoices', desc: 'Pull PDFs and emails from the trigger source', manualMin: 2, optional: false,
      log: (c) => [`Fetched ${c.n} invoices`, `${c.n} PDFs queued for extraction`] },
    { id: 'extract', icon: 'ScanSearch', name: 'Extract data', desc: 'Read vendor, totals, tax and PO number with document AI', manualMin: 5, optional: false,
      log: (c) => [`Model: ${c.model.log}`, `Extracted 14 fields per invoice · avg confidence 97%`] },
    { id: 'validate', icon: 'ShieldCheck', name: 'Validate vendor & tax', desc: 'Check vendor master, bank details and tax IDs', manualMin: 2, optional: true,
      log: (c) => [`Vendor master check: ${c.n}/${c.n} known vendors`, 'Bank details unchanged · tax IDs valid'] },
    { id: 'duplicates', icon: 'Copy', name: 'Detect duplicates', desc: 'Catch the same invoice sent twice', manualMin: 1, optional: true,
      log: (c) => [c.dupes ? `Found ${c.dupes} duplicate invoice, held back` : 'No duplicates found'] },
    { id: 'match', icon: 'GitCompare', name: 'Three-way match', desc: 'Match invoice to PO and goods receipt in the ERP', manualMin: 4, optional: false,
      log: (c) => [`${c.n - c.exceptions - c.dupes} matched automatically`, `${c.exceptions} exceptions: price or quantity mismatch`] },
    { id: 'approve', icon: 'UserCheck', name: 'Human approval', desc: 'Finance reviews what the agent flags', manualMin: 0, human: true, optional: false,
      log: (c) => (c.approval === 'none'
        ? ['Approval step skipped: fully automatic mode']
        : [`${c.review} items waiting for approval`, 'Agent attached a suggested resolution to each']) },
    { id: 'post', icon: 'Database', name: 'Post to ERP', desc: 'Create the payable entry and schedule payment', manualMin: 2, optional: false,
      log: (c) => [`Posted ${c.posted} invoices to ERP`, 'Payments scheduled for next pay run'] },
    { id: 'notify', icon: 'MessageSquare', name: 'Notify team', desc: 'Post a summary to Slack or Teams', manualMin: 1, optional: true,
      log: (c) => [`Summary posted to #finance-ops: ${c.posted} posted, ${c.exceptions} exceptions resolved`] },
    { id: 'audit', icon: 'ScrollText', name: 'Audit trail', desc: 'Store every decision and document for auditors', manualMin: 1, optional: true,
      log: () => ['Decision log and source PDFs archived'] },
  ],
};
