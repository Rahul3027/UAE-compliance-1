export interface NavItem {
  label: string;
  href: string;
  moduleId: string;
}

export interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    groupLabel: 'Getting Started',
    items: [
      { label: 'Dashboard', href: '/dashboard', moduleId: 'dashboard' },
      { label: 'UAE E-Invoicing Overview', href: '/uae-overview', moduleId: 'uae-overview' },
      { label: 'PEPPOL 5-Corner Model', href: '/peppol-5-corner', moduleId: 'peppol-5-corner' },
      { label: 'Glossary & Terms', href: '/glossary-technical-terms', moduleId: 'glossary-technical-terms' }
    ]
  },
  {
    groupLabel: 'Core Concepts',
    items: [
      { label: 'PINT AE Architecture', href: '/pint-ae-architecture', moduleId: 'pint-ae-architecture' },
      { label: 'E-Invoice Lifecycle', href: '/invoice-lifecycle', moduleId: 'invoice-lifecycle' },
      { label: 'UAE VAT & Tax Logic', href: '/tax-logic-visualization', moduleId: 'tax-logic-visualization' }
    ]
  },
  {
    groupLabel: 'Technical Deep-Dives',
    items: [
      { label: 'XML Structure Explorer', href: '/xml-structure-explorer', moduleId: 'xml-structure-explorer' },
      { label: 'Business Rules Explorer', href: '/business-rules-explorer', moduleId: 'business-rules-explorer' },
      { label: 'API & Data Flow', href: '/api-data-flow', moduleId: 'api-data-flow' },
      { label: 'ASP Communication Flow', href: '/asp-communication-flow', moduleId: 'asp-communication-flow' },
      { label: 'Response Status Lifecycle', href: '/response-status-lifecycle', moduleId: 'response-status-lifecycle' }
    ]
  },
  {
    groupLabel: 'Hands-On Practice',
    items: [
      { label: 'Validation Simulator', href: '/validation-engine-simulator', moduleId: 'validation-engine-simulator' },
      { label: 'Sandbox Testing Center', href: '/sandbox-testing-center', moduleId: 'sandbox-testing-center' },
      { label: 'Error Rejection Debugger', href: '/error-rejection-simulator', moduleId: 'error-rejection-simulator' },
      { label: 'ERP Integration Center', href: '/erp-integration-center', moduleId: 'erp-integration-center' },
      { label: 'Developer Learning Center', href: '/developer-learning-center', moduleId: 'developer-learning-center' }
    ]
  }
];
