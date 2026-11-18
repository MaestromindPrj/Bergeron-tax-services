export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "notices",
    title: "IRS & State Tax Notices",
    description:
      "Review and understand IRS and state tax notices, identify important issues, and determine appropriate next steps.",
    iconName: "FileWarning",
  },
  {
    id: "unfiled",
    title: "Unfiled Tax Returns",
    description:
      "Assistance with preparing outstanding tax returns and addressing unfiled tax obligations.",
    iconName: "FileClock",
  },
  {
    id: "debt-resolution",
    title: "Tax Debt Resolution",
    description:
      "Explore available tax relief options, payment arrangements and penalty abatement opportunities.",
    iconName: "ShieldAlert",
  },
  {
    id: "audit-representation",
    title: "Audit Representation",
    description:
      "Professional assistance with tax audits, audit defense and communications with taxing authorities.",
    iconName: "ShieldCheck",
  },
  {
    id: "tax-preparation",
    title: "Tax Preparation & Planning",
    description:
      "Accurate individual and small-business tax return preparation, applicable deductions, credits and proactive tax planning.",
    iconName: "Calculator",
  },
];

export const RESOLUTION_PROCESS_DATA = [
  {
    step: "01",
    title: "Assessment",
    description:
      "I start with a free, confidential consultation to review your tax situation. I'll help you understand your position and identify the best path forward.",
  },
  {
    step: "02",
    title: "Strategy Formulation",
    description:
      "Following your initial consultation, I secure your complete IRS file. I meticulously review your tax matters to formulate a tailored strategy designed to secure the most favorable resolution for your case.",
  },
  {
    step: "03",
    title: "Strategic Negotiation & Resolution Execution",
    description:
      "I negotiate directly with the taxing authorities on your behalf. I handle all communications, filings, and deadlines so you don't have to.",
  },
  {
    step: "04",
    title: "Tax Relief",
    description:
      "Once resolved, you'll have a clear path forward. Depending on your situation, this may mean lower payments, reduced debt, or full resolution — a fresh start.",
  },
];

export const PROFESSIONAL_APPROACH_DATA = [
  {
    id: "personalized-attention",
    title: "Personalized Attention",
    description:
      "Understand each client's individual circumstances and provide services based on their specific tax needs.",
    iconName: "UserCheck",
  },
  {
    id: "clear-communication",
    title: "Clear Communication",
    description:
      "Make complex tax matters easier to understand through honest communication and practical guidance.",
    iconName: "MessageSquare",
  },
  {
    id: "proactive-tax-planning",
    title: "Proactive Tax Planning",
    description:
      "Identify applicable deductions, credits and opportunities to minimize tax liabilities through proactive planning.",
    iconName: "LineChart",
  },
];
