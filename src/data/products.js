// OpsifyLabs products. Feature claims here are a first draft:
// confirm each one against what the product actually does today.
export const products = [
  {
    slug: 'qa-agent-orchestrator',
    name: 'QA Agent Orchestrator',
    badge: 'New',
    tagline: 'Agentic QA across the entire SDLC',
    short: 'A team of specialised AI agents that plans, writes, runs and triages your testing, coordinated by one orchestrator, from user story to release.',
    intro:
      'QA Agent Orchestrator turns quality assurance into an agentic workflow. Instead of one chatbot or a single test generator, it coordinates specialised agents for every SDLC stage, shares context between them and keeps your QA leads in control through approval gates.',
    stages: [
      { stage: 'Plan', agent: 'Requirements Agent', icon: 'FileSearch', desc: 'Reads user stories and specs from Jira or Azure DevOps, flags gaps and ambiguity, and drafts acceptance criteria.' },
      { stage: 'Design', agent: 'Test Design Agent', icon: 'ListChecks', desc: 'Generates test scenarios and cases mapped to each requirement, including edge and negative paths.' },
      { stage: 'Build', agent: 'Automation Agent', icon: 'Code2', desc: 'Writes Playwright UI and API tests in your framework conventions and self-heals them when the app changes.' },
      { stage: 'Test', agent: 'Execution Agent', icon: 'PlayCircle', desc: 'Runs suites in CI/CD and drives real browsers through Playwright + MCP for exploratory checks.' },
      { stage: 'Triage', agent: 'Defect Triage Agent', icon: 'Bug', desc: 'Analyses failures, separates flaky tests from real bugs and files defects with logs, screenshots and repro steps.' },
      { stage: 'Release', agent: 'Quality Gate Agent', icon: 'Rocket', desc: 'Summarises coverage, risk and open defects into a release-readiness report for go/no-go decisions.' },
    ],
    features: [
      { icon: 'Network', title: 'Central orchestration', desc: 'One orchestrator plans the work, routes tasks to the right agent and passes context along the SDLC.' },
      { icon: 'UserCheck', title: 'Human-in-the-loop', desc: 'Approval gates for generated tests, filed defects and release decisions. Agents propose; your team decides.' },
      { icon: 'GitBranch', title: 'Requirement traceability', desc: 'Every test and defect links back to the story it covers, so coverage gaps are visible.' },
      { icon: 'ScrollText', title: 'Full audit trail', desc: 'Every agent action, tool call and decision is logged for review and compliance.' },
      { icon: 'Plug', title: 'Fits your toolchain', desc: 'Works with the trackers, repositories, CI and test tools your team already uses.' },
      { icon: 'Lock', title: 'Your models, your cloud', desc: 'Deploy in your cloud or VPC and choose the LLM provider that meets your data policies.' },
    ],
    integrations: ['Jira', 'Azure DevOps', 'GitHub', 'GitLab', 'Jenkins', 'GitHub Actions', 'Playwright', 'Model Context Protocol', 'TestRail', 'Xray', 'Slack', 'Microsoft Teams'],
    audiences: [
      { title: 'QA leads', desc: 'Scale coverage without scaling headcount, and spend time on test strategy instead of script upkeep.' },
      { title: 'Engineering managers', desc: 'Get faster feedback on every change and an objective view of release readiness.' },
      { title: 'Product owners', desc: 'See which requirements are tested, which are at risk and why.' },
    ],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
