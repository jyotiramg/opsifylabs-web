// Content for the "AI across the DevOps cycle" loop and the
// "Local AI agent workflow on AWS / Azure" reference architecture.

export const devopsStages = [
  {
    key: 'plan', label: 'Plan', loop: 'dev',
    title: 'AI requirement analysis',
    points: ['Turn PRDs and tickets into clear user stories', 'Flag ambiguity, missing acceptance criteria and risk early', 'Estimate effort from historical delivery data'],
    tools: ['Jira', 'Azure DevOps', 'QA Agent Orchestrator'],
  },
  {
    key: 'code', label: 'Code', loop: 'dev',
    title: 'AI pair programming & review',
    points: ['Coding assistants rolled out with team guardrails', 'Automated PR review for bugs, style and security', 'Secrets and licence checks before code is merged'],
    tools: ['GitHub Copilot', 'Claude Code', 'CodeRabbit'],
  },
  {
    key: 'build', label: 'Build', loop: 'dev',
    title: 'Intelligent CI pipelines',
    points: ['Plain-English root cause for failed builds', 'Dependency and CVE triage ranked by real exploitability', 'Pipeline tuning to cut build minutes'],
    tools: ['GitHub Actions', 'Jenkins', 'Snyk'],
  },
  {
    key: 'test', label: 'Test', loop: 'dev',
    title: 'Agentic testing',
    points: ['Tests generated from stories and self-healed on UI change', 'Smart selection runs only tests affected by the change', 'Flaky tests separated from real failures automatically'],
    tools: ['Playwright + MCP', 'QA Agent Orchestrator'],
  },
  {
    key: 'release', label: 'Release', loop: 'ops',
    title: 'AI release gates',
    points: ['Change-risk score for every release candidate', 'Release notes drafted from commits and tickets', 'Go/no-go summary of coverage and open defects'],
    tools: ['Argo CD', 'Azure Pipelines', 'Jira'],
  },
  {
    key: 'deploy', label: 'Deploy', loop: 'ops',
    title: 'AI-verified progressive delivery',
    points: ['Canary metrics analysed automatically during rollout', 'Automatic rollback when error or latency budgets break', 'Infrastructure-as-code changes reviewed by an agent'],
    tools: ['Argo Rollouts', 'Terraform', 'Kubernetes'],
  },
  {
    key: 'operate', label: 'Operate', loop: 'ops',
    title: 'AIOps & runbook agents',
    points: ['Incident summaries posted to Slack or Teams in seconds', 'Runbook agents run safe diagnostics with approval', 'Post-incident reports drafted automatically'],
    tools: ['PagerDuty', 'Slack / Teams', 'MCP'],
  },
  {
    key: 'monitor', label: 'Monitor', loop: 'ops',
    title: 'Anomaly detection & feedback',
    points: ['Anomalies spotted across logs, metrics and traces', 'Noisy alerts grouped into one actionable signal', 'Production insights fed back into the next Plan'],
    tools: ['Datadog', 'Grafana', 'CloudWatch', 'Azure Monitor', 'Cloud Monitoring'],
  },
];

// Node ids are referenced by the workflow steps so the diagram can
// highlight what each step touches.
export const localAgentArch = {
  local: {
    title: 'Your environment',
    subtitle: 'Developer machines / on-prem',
    nodes: [
      { id: 'trigger', icon: 'Terminal', name: 'Trigger', desc: 'IDE, CLI, chat or CI pipeline' },
      { id: 'runtime', icon: 'Bot', name: 'Agent runtime', desc: 'LangGraph / Claude Agent SDK, runs locally' },
      { id: 'llm', icon: 'Cpu', name: 'Local LLM', desc: 'Ollama / vLLM: Llama, Qwen, Mistral' },
      { id: 'mcp', icon: 'Plug', name: 'MCP tool servers', desc: 'Git, Jira, databases, Playwright' },
    ],
  },
  link: {
    aws: { name: 'Private link', desc: 'Site-to-Site VPN or Direct Connect + AWS PrivateLink · IAM Identity Center' },
    azure: { name: 'Private link', desc: 'VPN Gateway or ExpressRoute + Private Endpoints · Microsoft Entra ID' },
    gcp: { name: 'Private link', desc: 'Cloud VPN or Cloud Interconnect + Private Service Connect · Cloud IAM' },
  },
  cloud: {
    aws: {
      title: 'AWS', subtitle: 'Your AWS account',
      nodes: [
        { id: 'model', icon: 'Sparkles', name: 'Amazon Bedrock', desc: 'Claude, Llama and other models for heavy reasoning' },
        { id: 'workers', icon: 'Container', name: 'EKS / ECS workers', desc: 'Long-running and parallel agent jobs' },
        { id: 'rag', icon: 'Database', name: 'S3 + OpenSearch', desc: 'Documents and vector search for RAG' },
        { id: 'observe', icon: 'Activity', name: 'CloudWatch · X-Ray · KMS', desc: 'Tracing, audit logs, keys and secrets' },
      ],
    },
    azure: {
      title: 'Azure', subtitle: 'Your Azure subscription',
      nodes: [
        { id: 'model', icon: 'Sparkles', name: 'Azure OpenAI / AI Foundry', desc: 'GPT and other models for heavy reasoning' },
        { id: 'workers', icon: 'Container', name: 'AKS / Container Apps', desc: 'Long-running and parallel agent jobs' },
        { id: 'rag', icon: 'Database', name: 'Blob + Azure AI Search', desc: 'Documents and vector search for RAG' },
        { id: 'observe', icon: 'Activity', name: 'Monitor · App Insights · Key Vault', desc: 'Tracing, audit logs, keys and secrets' },
      ],
    },
    gcp: {
      title: 'Google Cloud', subtitle: 'Your GCP project',
      nodes: [
        { id: 'model', icon: 'Sparkles', name: 'Vertex AI', desc: 'Gemini, Claude and open models for heavy reasoning' },
        { id: 'workers', icon: 'Container', name: 'GKE / Cloud Run', desc: 'Long-running and parallel agent jobs' },
        { id: 'rag', icon: 'Database', name: 'Cloud Storage + Vector Search', desc: 'Documents and vector search for RAG' },
        { id: 'observe', icon: 'Activity', name: 'Cloud Logging · Trace · Secret Manager', desc: 'Tracing, audit logs, keys and secrets' },
      ],
    },
  },
  steps: [
    { title: 'Trigger', desc: 'A developer or pipeline starts a task, such as "find why the nightly build failed".', nodes: ['trigger', 'runtime'] },
    { title: 'Work locally first', desc: 'The agent reads code, logs and tickets through MCP tools. Sensitive data is handled by the local model and never leaves your network.', nodes: ['runtime', 'llm', 'mcp'] },
    { title: 'Route by policy', desc: 'A policy router sends only redacted, approved context to the cloud model, over a private connection, when deeper reasoning is needed.', nodes: ['runtime', 'link', 'model'] },
    { title: 'Scale in your cloud', desc: 'Long or parallel jobs run on container workers in your account, grounded in your documents via vector search.', nodes: ['workers', 'rag', 'model'] },
    { title: 'Human approval', desc: 'Write actions such as opening a PR, filing a ticket or deploying wait for a person to approve.', nodes: ['runtime', 'trigger'] },
    { title: 'Trace everything', desc: 'Every prompt, tool call and decision is traced and audited, with secrets held in your key vault.', nodes: ['observe', 'runtime'] },
  ],
};
