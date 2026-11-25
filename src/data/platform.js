// "Agentic AI Platform" page: the agent stack OpsifyLabs builds, scales and
// optimises inside the client's own cloud. Describes what we deliver, not a
// licensed SaaS product. Metrics shown are example targets, not claims.

export const platformSections = [
  { id: 'build', num: '01', label: 'Build' },
  { id: 'scale', num: '02', label: 'Scale' },
  { id: 'optimize', num: '03', label: 'Optimize' },
  { id: 'performance', num: '04', label: 'Performance' },
  { id: 'foundation', num: '05', label: 'Foundation' },
];

export const buildCapabilities = [
  {
    id: 'orchestration', icon: 'Network', title: 'Multi-agent orchestration',
    desc: 'A supervisor agent breaks work into tasks and hands them to specialist agents, with shared memory, retries and deterministic fallbacks.',
    points: ['Supervisor / worker and pipeline patterns', 'Shared state and long-running tasks', 'Hand-off to humans at any step'],
    code: ['supervisor = Orchestrator(policy="approval-on-write")', 'supervisor.add(ResearchAgent, TriageAgent, ActionAgent)', 'supervisor.run(task="resolve ticket #4821")'],
  },
  {
    id: 'tools', icon: 'Plug', title: 'Tools & integrations (MCP)',
    desc: 'Agents act through your systems via Model Context Protocol servers, with permission-scoped credentials for every tool.',
    points: ['MCP servers for APIs, databases and browsers', 'Least-privilege, per-agent credentials', 'Read vs write tools with approval gates'],
    code: ['mcp.register("jira", scopes=["read", "comment"])', 'mcp.register("erp", scopes=["read"])', 'mcp.register("playwright", sandbox=True)'],
  },
  {
    id: 'knowledge', icon: 'Database', title: 'Knowledge & RAG',
    desc: 'Agents answer from your documents, tickets and data with citations, using permission-aware retrieval.',
    points: ['Connectors for SharePoint, Confluence, Drive, S3', 'Hybrid search with re-ranking', 'Respects the user\'s existing access rights'],
    code: ['kb = Knowledge(sources=["confluence", "sharepoint"])', 'kb.retrieve(query, user=ctx.user, top_k=8)', '→ answers with citations [doc-12, doc-31]'],
  },
  {
    id: 'studio', icon: 'Code2', title: 'Low-code + pro-code',
    desc: 'Business teams design flows visually; engineers extend them in Python or TypeScript. Same agents, same guardrails.',
    points: ['Visual workflow designer for analysts', 'SDKs: LangGraph, Claude Agent SDK, OpenAI Agents SDK', 'Version control and code review for every flow'],
    code: ['flow = Flow.from_yaml("invoice-processing.yaml")', 'flow.step("match", MatchAgent).approve_if("exception")', 'git commit -m "flow: add duplicate check"'],
  },
  {
    id: 'guardrails', icon: 'ShieldCheck', title: 'Guardrails built in',
    desc: 'Every agent ships behind the AI gateway: PII masking, prompt-injection defence, output validation and audit logging.',
    points: ['Input and output policies per agent', 'Topic and action allow-lists', 'Full audit trail of prompts and tool calls'],
    code: ['agent.guard(pii="mask", injection="block")', 'agent.allow_actions(["create_ticket", "comment"])', 'agent.audit(store="your-cloud-logs")'],
  },
  {
    id: 'testing', icon: 'BadgeCheck', title: 'Agent testing',
    desc: 'Agents are tested like software: evaluation suites, simulated conversations and regression checks in CI, powered by QA Agent Orchestrator.',
    points: ['Golden datasets and automated graders', 'Scenario simulation for multi-step tasks', 'Quality gates before every release'],
    code: ['evals.run(suite="ticket-triage", threshold=0.9)', '✓ task success 94% · tool-call accuracy 97%', 'gate: PASS → deploy to staging'],
  },
];

export const scaleGroups = [
  { title: 'Channels', icon: 'MessageSquare', items: ['Web & in-app chat', 'Slack & Microsoft Teams', 'WhatsApp', 'Email', 'Voice & IVR', 'REST / webhooks'] },
  { title: 'Enterprise systems', icon: 'Layers', items: ['Salesforce', 'ServiceNow', 'SAP', 'Workday', 'Jira & Confluence', 'Microsoft 365'] },
  { title: 'Deployment', icon: 'Cloud', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'On-premise / private cloud', 'Local models (air-gapped)', 'Hybrid'] },
  { title: 'Enterprise scale', icon: 'Activity', items: ['Autoscaling agent workers', 'Multi-region & data residency', 'Multi-tenant / multi-brand', 'Multi-language', 'Queueing & rate limits', 'Blue-green releases'] },
];

export const optimizeLevers = [
  { id: 'routing', label: 'Smart model routing', desc: 'Simple tasks go to small, cheap models; only hard ones reach large models.', saving: 0.35 },
  { id: 'caching', label: 'Semantic caching', desc: 'Repeated questions are answered from cache instead of calling a model.', saving: 0.2 },
  { id: 'prompts', label: 'Prompt & context optimisation', desc: 'Shorter prompts and tighter retrieval cut tokens per task.', saving: 0.15 },
  { id: 'batching', label: 'Batching & async jobs', desc: 'Non-urgent work runs in batches at lower prices.', saving: 0.1 },
];

export const optimizeCapabilities = [
  { icon: 'Activity', title: 'Observability & tracing', desc: 'Every step, prompt, tool call, latency and cost traced end to end.' },
  { icon: 'ListChecks', title: 'Continuous evaluation', desc: 'Quality, faithfulness and task success measured on live traffic and test suites.' },
  { icon: 'BarChart3', title: 'Business analytics', desc: 'Containment, hours saved and cost per task tied to the KPIs you care about.' },
  { icon: 'Workflow', title: 'Feedback loops', desc: 'Human corrections and ratings flow back into prompts, data and tests.' },
];

export const performanceMetrics = [
  { id: 'success', label: 'Task success rate', value: 94, unit: '%', trend: [86, 88, 87, 90, 91, 92, 93, 94], good: 'up' },
  { id: 'latency', label: 'p95 response time', value: 2.4, unit: 's', trend: [4.1, 3.8, 3.5, 3.1, 2.9, 2.7, 2.5, 2.4], good: 'down' },
  { id: 'escalation', label: 'Escalated to humans', value: 11, unit: '%', trend: [24, 21, 19, 17, 15, 13, 12, 11], good: 'down' },
  { id: 'cost', label: 'Cost per task', value: 0.042, unit: '$', trend: [0.11, 0.09, 0.08, 0.07, 0.06, 0.05, 0.046, 0.042], good: 'down' },
  { id: 'uptime', label: 'Availability', value: 99.9, unit: '%', trend: [99.5, 99.7, 99.8, 99.9, 99.9, 99.9, 99.95, 99.9], good: 'up' },
];

export const foundation = [
  { icon: 'Lock', title: 'Security & governance', desc: 'AI gateway, PII masking, access control and audit trail on every agent.', link: '/ai-governance' },
  { icon: 'Sparkles', title: 'Model-agnostic', desc: 'OpenAI, Claude, Gemini, Llama, Mistral or your own. Switch models without rebuilding agents.' },
  { icon: 'Server', title: 'Your cloud, your data', desc: 'Deployed in your AWS, Azure, GCP or on-prem account. No data stored by us.' },
  { icon: 'Database', title: 'Data layer', desc: 'Vector stores, knowledge connectors and data pipelines built for AI.' },
  { icon: 'Scale', title: 'Compliance-ready', desc: 'Controls and evidence aligned with GDPR, DPDP Act, EU AI Act and ISO/IEC 42001.' },
  { icon: 'Infinity', title: 'DevOps & MLOps', desc: 'CI/CD, infrastructure as code, versioning and rollback for agents, prompts and models.' },
];
