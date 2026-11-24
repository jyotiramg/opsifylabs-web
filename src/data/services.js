// Single source of truth for the service catalogue.
// Drives the navbar menu, /services index, /services/:slug pages,
// footer links and the contact-form service dropdown.

export const categories = {
  ai: {
    label: 'AI Services',
    blurb: 'Strategy, build and assurance for production AI.',
  },
  engineering: {
    label: 'Engineering Services',
    blurb: 'The quality, delivery and cloud foundation AI runs on.',
  },
};

export const services = [
  {
    slug: 'ai-consulting',
    category: 'ai',
    icon: 'Compass',
    title: 'AI Strategy & Consulting',
    short: 'Find the AI use cases that pay back, then build the roadmap to ship them.',
    tagline: 'From AI curiosity to a funded, sequenced roadmap.',
    intro:
      'Most AI programmes stall between a promising demo and production. We work with leadership and engineering teams to pick use cases with measurable ROI, assess data and platform readiness, and set up the governance needed to ship AI responsibly.',
    offerings: [
      { title: 'AI Opportunity Assessment', desc: 'Workshops and process mapping to identify, size and prioritise use cases by value, feasibility and risk.' },
      { title: 'Data & Platform Readiness', desc: 'Audit of data quality, access, infrastructure and skills against what your target use cases actually require.' },
      { title: 'Build vs. Buy vs. Partner', desc: 'Vendor-neutral evaluation of models, platforms and SaaS tools, including total cost of ownership.' },
      { title: 'AI Governance & Responsible AI', desc: 'Policies, risk classification and review workflows aligned with the EU AI Act, NIST AI RMF and ISO/IEC 42001.' },
      { title: 'Proof of Value Sprints', desc: '4–6 week time-boxed pilots with agreed success metrics, so go/no-go decisions rest on evidence.' },
      { title: 'AI Enablement & Training', desc: 'Hands-on programmes that make engineering, QA and business teams productive with AI tooling.' },
    ],
    outcomes: ['Prioritised use-case backlog with ROI estimates', '12-month AI roadmap and operating model', 'Governance framework ready for audit'],
    stack: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Azure AI', 'AWS Bedrock', 'Llama', 'NIST AI RMF', 'ISO/IEC 42001'],
  },
  {
    slug: 'generative-ai',
    category: 'ai',
    icon: 'Sparkles',
    title: 'Generative AI & LLM Applications',
    short: 'Copilots, RAG knowledge assistants and document intelligence built for production.',
    tagline: 'LLM applications that are grounded, measurable and secure.',
    intro:
      'We design and build generative AI products on top of your data: retrieval-augmented assistants, domain copilots and document-processing pipelines. Every build ships with an evaluation harness, guardrails and cost controls rather than as a one-off prototype.',
    offerings: [
      { title: 'RAG Knowledge Assistants', desc: 'Chat and search over internal documents, wikis and tickets with citations, access control and freshness pipelines.' },
      { title: 'Domain Copilots', desc: 'Embedded assistants inside your product or internal tools that draft, summarise and answer in context.' },
      { title: 'Document Intelligence', desc: 'Extraction, classification and summarisation of contracts, invoices, claims and forms at scale.' },
      { title: 'Conversational AI', desc: 'Customer-facing chat and voice assistants with human hand-off and conversation analytics.' },
      { title: 'Fine-tuning & Model Selection', desc: 'Benchmarking hosted and open-weight models on your tasks; fine-tuning only where it beats prompting.' },
      { title: 'Guardrails & Cost Control', desc: 'PII redaction, prompt-injection defences, output validation, caching and model routing to keep spend predictable.' },
    ],
    outcomes: ['Production LLM app with evaluation dashboard', 'Measured answer quality and hallucination rate', 'Predictable per-request cost'],
    stack: ['LangChain', 'LlamaIndex', 'pgvector', 'Pinecone', 'Weaviate', 'OpenAI', 'Claude', 'Azure OpenAI', 'FastAPI', 'Next.js'],
  },
  {
    slug: 'ai-agents',
    visuals: ['localAgents'],
    category: 'ai',
    icon: 'Bot',
    title: 'Agentic AI & Intelligent Automation',
    short: 'AI agents that plan, call tools and complete multi-step workflows with humans in the loop.',
    tagline: 'Automate the work that rule-based RPA could never reach.',
    intro:
      'Agents combine LLM reasoning with your APIs, browsers and data to complete real workflows: triaging tickets, reconciling records, running test suites or operating internal tools. We build them with clear permission boundaries, audit trails and approval steps.',
    offerings: [
      { title: 'Workflow Agents', desc: 'Multi-step agents for operations, finance, support and IT that act through your existing systems.' },
      { title: 'MCP Tool Integration', desc: 'Model Context Protocol servers that expose your APIs, databases and browsers to agents safely.' },
      { title: 'Multi-Agent Orchestration', desc: 'Planner/worker architectures with shared memory, retries and deterministic fallbacks.' },
      { title: 'Intelligent Process Automation', desc: 'Upgrade brittle RPA bots with AI for unstructured inputs, exceptions and judgement calls.' },
      { title: 'Human-in-the-Loop Design', desc: 'Approval gates, confidence thresholds and escalation paths so automation stays accountable.' },
      { title: 'Agent Observability', desc: 'Tracing of every step, tool call and decision for debugging, compliance and cost attribution.' },
    ],
    outcomes: ['Hours of manual work removed per workflow', 'Full audit trail of agent actions', 'Safe, permission-scoped tool access'],
    stack: ['Model Context Protocol', 'LangGraph', 'CrewAI', 'Claude Agent SDK', 'OpenAI Agents SDK', 'Temporal', 'Playwright', 'n8n'],
  },
  {
    slug: 'ai-testing',
    category: 'ai',
    icon: 'ScanSearch',
    title: 'AI-Powered Testing',
    short: 'Use AI to generate, run and heal tests, so coverage grows while maintenance shrinks.',
    tagline: 'Testing that keeps up with how fast you ship.',
    intro:
      'We apply AI across the testing lifecycle: generating test cases from requirements, driving browsers with LLM agents through Playwright and MCP, self-healing broken locators, and choosing which tests to run for each change. The result is broader coverage with less script maintenance.',
    offerings: [
      { title: 'AI Test Case Generation', desc: 'Turn user stories, specs and production logs into reviewed, executable test cases.' },
      { title: 'Agentic Browser Testing', desc: 'LLM agents that navigate and validate UIs via Playwright + MCP, removing brittle locator scripts.' },
      { title: 'Self-Healing Automation', desc: 'Frameworks that detect UI changes and repair selectors automatically, with human review.' },
      { title: 'Smart Regression Selection', desc: 'Change-impact analysis that runs the tests that matter for each commit, cutting pipeline time.' },
      { title: 'Visual & Accessibility AI', desc: 'AI-assisted visual regression and WCAG checks across browsers and devices.' },
      { title: 'Synthetic Test Data', desc: 'Realistic, privacy-safe test data generated on demand for every environment.' },
    ],
    outcomes: ['Lower test-maintenance effort', 'Faster regression cycles in CI', 'Coverage traced back to requirements'],
    stack: ['Playwright', 'Model Context Protocol', 'Cypress', 'Selenium', 'Appium', 'Applitools', 'GitHub Actions', 'Jenkins'],
    showDiagram: true,
    product: 'qa-agent-orchestrator',
  },
  {
    slug: 'ai-assurance',
    category: 'ai',
    icon: 'ShieldCheck',
    title: 'LLM Evaluation & AI Assurance',
    short: 'Test the AI itself: accuracy, hallucination, bias, safety and prompt-injection resilience.',
    tagline: 'Know your AI works before your customers find out it does not.',
    intro:
      'AI systems fail differently from traditional software: answers drift, models hallucinate and attackers inject prompts. Our assurance practice builds the evaluation suites, red-team exercises and monitoring you need to release AI features with confidence and evidence for auditors.',
    offerings: [
      { title: 'LLM Evaluation Harnesses', desc: 'Golden datasets, automated graders and regression evals wired into CI for every prompt or model change.' },
      { title: 'RAG Quality Testing', desc: 'Measure retrieval relevance, faithfulness and citation accuracy across your knowledge base.' },
      { title: 'AI Red Teaming', desc: 'Adversarial testing for prompt injection, jailbreaks, data leakage and unsafe tool use.' },
      { title: 'Bias & Fairness Audits', desc: 'Statistical testing of model outputs across user groups with documented remediation.' },
      { title: 'Agent Reliability Testing', desc: 'Scenario simulation for agents: task success rate, tool-call correctness and failure recovery.' },
      { title: 'Production AI Monitoring', desc: 'Drift, quality and safety monitoring with alerting once the system is live.' },
    ],
    outcomes: ['Quantified quality baseline for each AI feature', 'Red-team report with fixes verified', 'Evidence pack for compliance reviews'],
    stack: ['Promptfoo', 'DeepEval', 'Ragas', 'LangSmith', 'Langfuse', 'Arize Phoenix', 'OWASP LLM Top 10', 'Garak'],
  },
  {
    slug: 'mlops',
    visuals: ['localAgents'],
    category: 'ai',
    icon: 'Workflow',
    title: 'MLOps & LLMOps',
    short: 'Pipelines, registries and monitoring that take models from notebook to reliable production.',
    tagline: 'Ship models with the same discipline as software.',
    intro:
      'We build the platform layer for machine learning and LLM workloads: reproducible training and prompt pipelines, model and prompt registries, deployment automation, GPU cost management and live performance monitoring.',
    offerings: [
      { title: 'ML Pipelines & Feature Stores', desc: 'Reproducible data prep, training and validation pipelines with versioned features.' },
      { title: 'Model & Prompt Registry', desc: 'Versioning, approval workflow and lineage for models, prompts and datasets.' },
      { title: 'Model Serving', desc: 'Autoscaled inference on Kubernetes or managed endpoints, including self-hosted open-weight LLMs.' },
      { title: 'Continuous Training & Evaluation', desc: 'Automated retraining triggers gated by evaluation results.' },
      { title: 'Monitoring & Drift Detection', desc: 'Latency, cost, accuracy and data-drift dashboards with alerting.' },
      { title: 'GPU & Inference Cost Optimisation', desc: 'Right-sizing, batching, quantisation and caching to cut inference spend.' },
    ],
    outcomes: ['Repeatable path from experiment to production', 'Rollback-ready model deployments', 'Visible, controlled inference cost'],
    stack: ['MLflow', 'Kubeflow', 'SageMaker', 'Vertex AI', 'Azure ML', 'vLLM', 'Ray', 'Kubernetes', 'Prometheus'],
  },
  {
    slug: 'data-engineering',
    category: 'ai',
    icon: 'Database',
    title: 'Data Engineering & Analytics',
    short: 'AI-ready data platforms, pipelines and dashboards your teams can trust.',
    tagline: 'Good AI starts with good data.',
    intro:
      'We modernise data platforms so analytics and AI run on clean, governed, well-documented data. That covers ingestion, transformation, quality checks, semantic layers and the dashboards that put insight in front of decision-makers.',
    offerings: [
      { title: 'Modern Data Platforms', desc: 'Lakehouse and warehouse architecture on Snowflake, Databricks, BigQuery or Fabric.' },
      { title: 'Data Pipelines', desc: 'Batch and streaming ingestion with orchestration, lineage and recovery.' },
      { title: 'Data Quality Engineering', desc: 'Automated tests, contracts and anomaly detection on critical datasets.' },
      { title: 'Vector & Unstructured Data', desc: 'Chunking, embedding and indexing pipelines that feed RAG and search.' },
      { title: 'BI & Predictive Analytics', desc: 'Dashboards, forecasting and churn/propensity models tied to business KPIs.' },
      { title: 'Data Governance', desc: 'Catalogues, access policies and PII handling that satisfy security and compliance.' },
    ],
    outcomes: ['Single trusted source for analytics and AI', 'Data-quality SLAs on key tables', 'Faster time from question to answer'],
    stack: ['Snowflake', 'Databricks', 'BigQuery', 'dbt', 'Airflow', 'Kafka', 'Great Expectations', 'Power BI', 'Looker'],
  },
  {
    slug: 'quality-engineering',
    category: 'engineering',
    icon: 'BadgeCheck',
    title: 'Quality Engineering & Test Automation',
    short: 'End-to-end testing across web, mobile and APIs with scalable automation frameworks.',
    tagline: 'Quality built into every stage of delivery.',
    intro:
      'Quality engineering has been our core since 2020. We design shift-left and shift-right test strategies, build reusable automation frameworks and embed testing into CI/CD so every release is backed by evidence.',
    offerings: [
      { title: 'Test Strategy & QA Consulting', desc: 'Maturity assessment, test pyramid design and quality metrics that leadership can track.' },
      { title: 'UI, API & Mobile Automation', desc: 'Framework design and build with Playwright, Cypress, Selenium, Appium and RestAssured.' },
      { title: 'Performance & Load Testing', desc: 'Load, stress and soak testing with bottleneck analysis and capacity planning.' },
      { title: 'Security Testing', desc: 'SAST, DAST and penetration-test support integrated into your pipeline.' },
      { title: 'Functional & Regression Testing', desc: 'Managed manual and automated regression for complex enterprise applications.' },
      { title: 'Test Data Management & UAT', desc: 'Masked, compliant test data and structured UAT support for business sign-off.' },
    ],
    outcomes: ['Reduced manual regression effort', 'Automation integrated with CI/CD', 'Release quality dashboards'],
    stack: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'RestAssured', 'Postman', 'k6', 'JMeter', 'Cucumber'],
  },
  {
    slug: 'devops',
    visuals: ['devopsLoop'],
    category: 'engineering',
    icon: 'Infinity',
    title: 'DevOps & Platform Engineering',
    short: 'CI/CD, infrastructure as code and internal developer platforms for faster, safer releases.',
    tagline: 'Release on demand, with confidence.',
    intro:
      'We help teams move from manual, risky deployments to automated delivery. That means CI/CD pipelines, infrastructure as code, containers, observability and DevSecOps, packaged as a platform your developers actually want to use.',
    offerings: [
      { title: 'CI/CD Pipelines', desc: 'Build, test, scan and deploy pipelines with GitHub Actions, GitLab CI, Jenkins or Azure DevOps.' },
      { title: 'Infrastructure as Code', desc: 'Terraform, Pulumi and Ansible for reproducible, reviewable environments.' },
      { title: 'Containers & Kubernetes', desc: 'Containerisation, cluster design, GitOps with Argo CD and Helm.' },
      { title: 'Platform Engineering', desc: 'Internal developer platforms and golden paths that cut onboarding and setup time.' },
      { title: 'DevSecOps', desc: 'Secrets management, dependency and container scanning, and policy-as-code in the pipeline.' },
      { title: 'Observability & SRE', desc: 'Metrics, logs, traces, SLOs and incident response runbooks.' },
    ],
    outcomes: ['Shorter lead time to production', 'Lower change failure rate', 'Self-service environments for developers'],
    stack: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 'Kubernetes', 'Argo CD', 'Docker', 'Grafana', 'Datadog'],
  },
  {
    slug: 'cloud',
    visuals: ['localAgents'],
    category: 'engineering',
    icon: 'Cloud',
    title: 'Cloud & Infrastructure',
    short: 'Migration, cloud-native architecture and FinOps on AWS, Azure and GCP.',
    tagline: 'Cloud that scales with you, not your bill.',
    intro:
      'We plan and execute cloud migrations, design resilient cloud-native architectures and put FinOps practices in place so spend tracks value. Our infrastructure work is automated and documented from day one.',
    offerings: [
      { title: 'Cloud Migration', desc: 'Assessment, wave planning and execution for rehost, replatform and refactor paths.' },
      { title: 'Cloud-Native Architecture', desc: 'Serverless, microservices and event-driven designs built for resilience.' },
      { title: 'FinOps & Cost Optimisation', desc: 'Tagging, rightsizing, reservations and dashboards that cut waste.' },
      { title: 'Landing Zones & Governance', desc: 'Secure multi-account foundations with identity, networking and guardrails.' },
      { title: 'Disaster Recovery', desc: 'Backup, failover and recovery testing against defined RTO/RPO targets.' },
      { title: 'Managed Cloud Operations', desc: 'Ongoing monitoring, patching and optimisation of your cloud estate.' },
    ],
    outcomes: ['Migration with minimal downtime', 'Measurable reduction in cloud waste', 'Audit-ready cloud governance'],
    stack: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Serverless', 'CloudHealth'],
  },
  {
    slug: 'product-engineering',
    category: 'engineering',
    icon: 'Code2',
    title: 'AI-Native Product Engineering',
    short: 'Web, mobile and SaaS products designed with AI capabilities from the first sprint.',
    tagline: 'Build products where AI is a feature, not an afterthought.',
    intro:
      'Our product teams design and build web, mobile and SaaS applications with AI woven into the user experience, and with testing and DevOps baked in. We take ideas from discovery through MVP to scale.',
    offerings: [
      { title: 'Product Discovery & UX', desc: 'Research, prototyping and UX design for AI-assisted user journeys.' },
      { title: 'Web Applications', desc: 'Modern front-ends and APIs with React, Next.js, Node.js and Python.' },
      { title: 'Mobile Applications', desc: 'Cross-platform apps with React Native and Flutter.' },
      { title: 'SaaS & Multi-Tenant Platforms', desc: 'Billing, tenancy, auth and admin tooling for scalable SaaS products.' },
      { title: 'Legacy Modernisation', desc: 'AI-assisted code analysis and incremental refactoring of legacy systems.' },
      { title: 'MVP in Weeks', desc: 'Small senior teams shipping a usable MVP fast, with quality gates intact.' },
    ],
    outcomes: ['Launch-ready MVP', 'Automated tests and pipelines from day one', 'Architecture that scales with users'],
    stack: ['React', 'Next.js', 'Node.js', 'Python', 'React Native', 'Flutter', 'PostgreSQL', 'Supabase'],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
export const servicesByCategory = (cat) => services.filter((s) => s.category === cat);

export const process = [
  { step: 'Discover', desc: 'Understand goals, constraints and current state through workshops and audits.' },
  { step: 'Design', desc: 'Define the architecture, success metrics and a delivery plan you sign off on.' },
  { step: 'Build', desc: 'Ship in short iterations with demos, code reviews and automated tests.' },
  { step: 'Validate', desc: 'Prove quality with test evidence, AI evaluations and security checks.' },
  { step: 'Scale', desc: 'Harden for production, hand over knowledge and optimise continuously.' },
];

export const industries = [
  { icon: 'Landmark', name: 'Banking & FinTech' },
  { icon: 'HeartPulse', name: 'Healthcare & Life Sciences' },
  { icon: 'ShoppingCart', name: 'Retail & E-commerce' },
  { icon: 'Shield', name: 'Insurance' },
  { icon: 'Factory', name: 'Manufacturing' },
  { icon: 'Layers', name: 'SaaS & Technology' },
];
