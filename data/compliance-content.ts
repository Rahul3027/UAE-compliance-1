export interface ModuleMeta {
  id: string;
  title: string;
  shortTitle: string;
  category: 'getting-started' | 'core-concepts' | 'technical' | 'hands-on';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  icon: string;
  description: string;
}

export const modulesMeta: ModuleMeta[] = [
  {
    id: 'dashboard',
    title: 'UAE PINT AE Dashboard',
    shortTitle: 'Cockpit',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    icon: '📊',
    description: 'Interactive cockpit for enterprise e-invoicing compliance journeys.'
  },
  {
    id: 'uae-overview',
    title: 'UAE E-Invoicing Overview',
    shortTitle: 'UAE Overview',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    icon: '🇦🇪',
    description: 'Understand the UAE Federal Tax Authority (FTA) e-invoicing mandate timeline and business scope.'
  },
  {
    id: 'peppol-5-corner',
    title: 'PEPPOL 5-Corner Model',
    shortTitle: '5-Corner Model',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    icon: '🌐',
    description: 'Learn how decentralized data flows work across the PEPPOL network and the role of the UAE authority.'
  },
  {
    id: 'glossary-technical-terms',
    title: 'Glossary & Technical Terms',
    shortTitle: 'Glossary',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    icon: '📖',
    description: 'A quick-reference list of PEPPOL, PINT, and FTA terms and their meanings.'
  },
  {
    id: 'pint-ae-architecture',
    title: 'PINT AE Architecture & Document Types',
    shortTitle: 'PINT Architecture',
    category: 'core-concepts',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    icon: '🏛️',
    description: 'Deconstruct PINT international specifications, UAE customizations, profile IDs, and document types.'
  },
  {
    id: 'invoice-lifecycle',
    title: 'E-Invoice Lifecycle',
    shortTitle: 'Invoice Lifecycle',
    category: 'core-concepts',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    icon: '🔄',
    description: 'Track an invoice from creation in ERP, validation, transmission, FTA clearance, to final archiving.'
  },
  {
    id: 'tax-logic-visualization',
    title: 'UAE VAT & Tax Logic',
    shortTitle: 'Tax Logic',
    category: 'core-concepts',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    icon: '💸',
    description: 'Master VAT calculations, category codes, rounding rules, and accounting currency rules.'
  },
  {
    id: 'xml-structure-explorer',
    title: 'XML Structure Explorer',
    shortTitle: 'XML Explorer',
    category: 'technical',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    icon: '📄',
    description: 'Inspect a fully annotated UAE PINT AE UBL XML invoice line by line.'
  },
  {
    id: 'business-rules-explorer',
    title: 'UAE Schematron Business Rules',
    shortTitle: 'Business Rules',
    category: 'technical',
    difficulty: 'advanced',
    estimatedMinutes: 18,
    icon: '⚖️',
    description: 'Explore the specific validation rules (e.g. TRN checks, VAT calculations) enforced in the UAE.'
  },
  {
    id: 'api-data-flow',
    title: 'API & Data Flow Visualization',
    shortTitle: 'API Data Flow',
    category: 'technical',
    difficulty: 'advanced',
    estimatedMinutes: 12,
    icon: '⚡',
    description: 'Learn the API sequences between ERPs and Access Points, including Envelope (SBDH) payloads.'
  },
  {
    id: 'asp-communication-flow',
    title: 'Access Point (AP) Communication',
    shortTitle: 'AP Flow',
    category: 'technical',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    icon: '📡',
    description: 'Understand AS4 protocols, SML lookup, SMP server discovery, and envelope matching.'
  },
  {
    id: 'response-status-lifecycle',
    title: 'Application Response & Statuses',
    shortTitle: 'Response Lifecycle',
    category: 'technical',
    difficulty: 'advanced',
    estimatedMinutes: 12,
    icon: '📬',
    description: 'Master message level responses (MLR) and business level invoice responses (IR).'
  },
  {
    id: 'validation-engine-simulator',
    title: 'Validation Engine Simulator',
    shortTitle: 'Validation Simulator',
    category: 'hands-on',
    difficulty: 'intermediate',
    estimatedMinutes: 15,
    icon: '🛠️',
    description: 'Paste and test your XML structure against real UAE Schematron validation rules.'
  },
  {
    id: 'sandbox-testing-center',
    title: 'Interactive Sandbox Builder',
    shortTitle: 'Sandbox Builder',
    category: 'hands-on',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    icon: '🧪',
    description: 'Build a compliant UAE PINT XML invoice using a form UI and download it.'
  },
  {
    id: 'error-rejection-simulator',
    title: 'Error Rejection Debugger',
    shortTitle: 'Error Debugger',
    category: 'hands-on',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    icon: '🛑',
    description: 'Play a mini-game to find and correct hidden compliance errors in realistic XML payloads.'
  },
  {
    id: 'erp-integration-center',
    title: 'ERP Integration & Mapping',
    shortTitle: 'ERP Mapping',
    category: 'hands-on',
    difficulty: 'advanced',
    estimatedMinutes: 20,
    icon: '🔌',
    description: 'Generate code templates and map database schemas directly to PEPPOL UBL structures.'
  },
  {
    id: 'developer-learning-center',
    title: 'Developer Implementation Center',
    shortTitle: 'Dev Center',
    category: 'hands-on',
    difficulty: 'advanced',
    estimatedMinutes: 15,
    icon: '💻',
    description: 'SDK examples in Python, JavaScript/Node.js, and a checklist for go-live production.'
  }
];

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export const uaeMandateTimeline: TimelineEvent[] = [
  {
    date: 'Q2 2024',
    title: 'PEPPOL Authority Declaration',
    description: 'UAE FTA announces adoption of PEPPOL as the foundation for the national e-invoicing model.'
  },
  {
    date: 'Q4 2024',
    title: 'PINT AE Spec Release',
    description: 'Release of PEPPOL PINT AE (UAE specifications) and local Schematron business rules.'
  },
  {
    date: 'Q2 2025',
    title: 'Service Provider Accreditations',
    description: 'FTA begins accrediting Access Point providers (ASPs) for the local market.'
  },
  {
    date: 'Dec 2025',
    title: 'Phase 1 Mandate Go-Live',
    description: 'Mandatory B2B & B2G e-invoicing compliance for large tax groups and enterprise sellers.'
  },
  {
    date: '2026',
    title: 'Phase 2 Mandate Expansion',
    description: 'Gradual onboarding of mid-market and SME taxpayers into the PEPPOL network.'
  }
];

export interface CornerRole {
  id: string;
  name: string;
  description: string;
  techDetails: string[];
}

export const fiveCornerRoles: CornerRole[] = [
  {
    id: 'C1',
    name: 'Corner 1: The Seller (Supplier)',
    description: 'The entity generating the invoice. C1 integrates their ERP or accounting system with an accredited Access Point to send business documents.',
    techDetails: [
      'Extracts invoice details from ERP database',
      'Transforms data into PEPPOL PINT AE XML (UBL)',
      'Constructs the Standard Business Document Header (SBDH)',
      'Sends payload via API/Secure channel to Corner 2'
    ]
  },
  {
    id: 'C2',
    name: 'Corner 2: Seller\'s Access Point',
    description: 'The certified service provider that validates C1\'s document, lookups the receiver on the network, and transmits it via secure AS4 protocol.',
    techDetails: [
      'Validates XML against UAE PEPPOL Schematron rules',
      'Performs SMP lookup to locate C3 (Receiver\'s Access Point)',
      'Digitally signs document and sends it via AS4 protocol over HTTPS',
      'Processes asynchronous response codes'
    ]
  },
  {
    id: 'C5',
    name: 'Corner 5: Federal Tax Authority (FTA)',
    description: 'In the UAE 5-Corner model, the FTA sits in the middle (Corner 5). Access Points route invoices through the C5 authority validation engine for real-time compliance checks.',
    techDetails: [
      'Receives copies of transmitted invoices from Access Points',
      'Performs real-time VAT calculation auditing',
      'Enforces national business checks (TRN registrations, double-billing prevention)',
      'Provides status responses back to the transmitting Access Points'
    ]
  },
  {
    id: 'C3',
    name: 'Corner 3: Buyer\'s Access Point',
    description: 'The certified service provider representing the Buyer. C3 receives AS4 payloads, decrypts them, validates, and routes the document to C4.',
    techDetails: [
      'Receives AS4 transmission from C2',
      'Verifies sender signature and decrypts payload',
      'Sends a Message Level Response (MLR) back to C2 to acknowledge delivery',
      'Transforms XML or pushes UBL directly to C4 via API/SFTP'
    ]
  },
  {
    id: 'C4',
    name: 'Corner 4: The Buyer (Customer)',
    description: 'The end customer receiving the invoice. C4\'s ERP receives the standard UBL XML, matches it with purchase orders, and issues business acknowledgements.',
    techDetails: [
      'Ingests standardized UBL XML format',
      'Auto-matches lines against internal purchase orders (PO) or goods receipts (GRN)',
      'Generates Invoice Response (IR) (e.g. Accept, Reject, Dispute) to send back'
    ]
  }
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'peppol' | 'tax' | 'technical';
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'PEPPOL',
    definition: 'Pan-European Public Procurement On-Line. A set of open technical specifications that enables secure B2B/B2G document exchange over a decentralized network.',
    category: 'peppol'
  },
  {
    term: 'PINT',
    definition: 'PEPPOL International Invoice. A generic, global invoice specification designed to support international trade, modified by countries for local requirements.',
    category: 'peppol'
  },
  {
    term: 'PINT AE',
    definition: 'The specific UAE customization of the PINT specification, implementing UAE Federal Tax Authority rules (like 5% VAT, TRN, and Arabized requirements).',
    category: 'peppol'
  },
  {
    term: 'UBL',
    definition: 'Universal Business Language. The underlying XML-based schema standard used for PEPPOL documents.',
    category: 'technical'
  },
  {
    term: 'SBDH',
    definition: 'Standard Business Document Header. An XML metadata envelope containing sender/receiver IDs, document types, and routing info, wrapped around the invoice.',
    category: 'technical'
  },
  {
    term: 'TRN',
    definition: 'Tax Registration Number. A unique 15-digit identifier issued by the FTA to businesses registered for VAT in the UAE.',
    category: 'tax'
  },
  {
    term: 'AS4',
    definition: 'Applicability Statement 4. The secure, payload-agnostic communication protocol using HTTP and OASIS security profiles required to exchange documents between Access Points.',
    category: 'technical'
  },
  {
    term: 'SMP',
    definition: 'Service Metadata Publisher. A decentralized directory containing details of what documents a specific Access Point (representing a buyer) can receive.',
    category: 'technical'
  },
  {
    term: 'SML',
    definition: 'Service Metadata Locator. The central DNS registry that maps participant identifiers to their corresponding SMP server locations.',
    category: 'technical'
  },
  {
    term: 'Schematron',
    definition: 'An XML validation language based on rules and assertions. Used in PEPPOL to enforce strict country-specific business logics (like checking VAT rates or mathematical accuracy).',
    category: 'technical'
  },
  {
    term: 'MLR',
    definition: 'Message Level Response. An automated, network-level XML document acknowledging that a transmission arrived successfully and passed schema validation (or failed it).',
    category: 'peppol'
  },
  {
    term: 'IR',
    definition: 'Invoice Response. A business-level document sent by the buyer (C4) to report the payment/dispute status of an invoice (e.g. Accepted, Rejected, Under Dispute).',
    category: 'peppol'
  }
];

export interface BusinessRule {
  id: string;
  message: string;
  context: string;
  test: string;
  severity: 'fatal' | 'warning';
}

export const uaeBusinessRules: BusinessRule[] = [
  {
    id: 'UAE-R-001',
    message: 'Seller Tax Registration Number (TRN) must be provided unless the seller is not registered for UAE VAT.',
    context: 'cac:AccountingSupplierParty',
    test: 'exists(cac:Party/cac:PartyTaxScheme[cac:TaxScheme/cbc:ID = \'VAT\']/cbc:CompanyID)',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-002',
    message: 'Tax Registration Number (TRN) must contain exactly 15 digits.',
    context: 'cbc:CompanyID[ancestor::cac:PartyTaxScheme/cac:TaxScheme/cbc:ID = \'VAT\']',
    test: 'matches(., \'^[0-9]{15}$\')',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-003',
    message: 'The Document Currency Code must match Arab Emirates Dirham (AED) or the tax currency must be AED.',
    context: 'cbc:DocumentCurrencyCode',
    test: '. = \'AED\' or ../cbc:TaxCurrencyCode = \'AED\'',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-004',
    message: 'For Standard Rated Supplies (VAT Category S), the VAT rate must be exactly 5%.',
    context: 'cac:TaxCategory[cbc:ID = \'S\']',
    test: 'cbc:Percent = 5',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-005',
    message: 'Zero Rated Supplies (VAT Category Z) must specify a percent value of 0.',
    context: 'cac:TaxCategory[cbc:ID = \'Z\']',
    test: 'cbc:Percent = 0',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-006',
    message: 'For Out-of-Scope supplies (VAT Category O), the VAT rate must be 0 and the tax scheme must be VAT.',
    context: 'cac:TaxCategory[cbc:ID = \'O\']',
    test: 'cbc:Percent = 0 and cac:TaxScheme/cbc:ID = \'VAT\'',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-007',
    message: 'The invoice issue date must not be in the future.',
    context: 'cbc:IssueDate',
    test: 'xs:date(.) <= current-date()',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-008',
    message: 'A credit note (Document Type 381) must reference at least one original invoice.',
    context: '/ubl:CreditNote',
    test: 'exists(cac:BillingReference/cac:InvoiceDocumentReference/cbc:ID)',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-009',
    message: 'Sum of Invoice line net amounts must equal Invoice Line Extension Amount.',
    context: 'cac:LegalMonetaryTotal',
    test: 'cbc:LineExtensionAmount = sum(../cac:InvoiceLine/cbc:LineExtensionAmount)',
    severity: 'fatal'
  },
  {
    id: 'UAE-R-010',
    message: 'Tax Inclusive Amount must equal Tax Exclusive Amount plus Tax Total Amount.',
    context: 'cac:LegalMonetaryTotal',
    test: 'abs(cbc:TaxInclusiveAmount - (cbc:TaxExclusiveAmount + ../cac:TaxTotal/cbc:TaxAmount)) < 0.05',
    severity: 'fatal'
  }
];

export interface TaxCategoryDetail {
  code: string;
  name: string;
  rate: number;
  description: string;
  example: string;
}

export const uaeTaxCategories: TaxCategoryDetail[] = [
  {
    code: 'S',
    name: 'Standard Rated',
    rate: 5,
    description: 'Enforced on most goods and services in the UAE, including local retail, consulting, electronics, and standard trade.',
    example: 'A developer consulting service invoiced to a client based in Dubai Mainland.'
  },
  {
    code: 'Z',
    name: 'Zero-Rated',
    rate: 0,
    description: 'Supplies subject to 0% VAT, allowing suppliers to recover input tax. Applicable to exports, healthcare, and education.',
    example: 'Software licenses exported to a buyer located outside the GCC region.'
  },
  {
    code: 'E',
    name: 'Exempt',
    rate: 0,
    description: 'Supplies exempt from VAT. Input tax recovery is not allowed. Includes certain financial services and local residential building leases.',
    example: 'Leasing of residential housing units or standard life insurance policies.'
  },
  {
    code: 'O',
    name: 'Out of Scope',
    rate: 0,
    description: 'Supplies outside the scope of UAE VAT. Includes supplies made by non-taxable entities, or transactions outside UAE borders (like freezone-to-freezone transit).',
    example: 'Trading of cargo stored in a free trade zone going directly to Europe without entering the mainland.'
  }
];

export const omanMandateTimeline: TimelineEvent[] = [
  {
    date: 'August 2026',
    title: 'Pilot Phase Kick-off',
    description: 'Oman Tax Authority (OTA) launches pilot e-invoicing. Mandatory for designated large VAT-registered taxpayers.'
  },
  {
    date: 'February 2027',
    title: 'Phase 1 Mandate Go-Live',
    description: 'Mandatory PEPPOL PINT-OM billing integration for all remaining large enterprise taxpayers.'
  },
  {
    date: 'August 2027',
    title: 'Phase 2 SME Rollout',
    description: 'Mandatory e-invoicing compliance expanded to include medium-sized, small, and micro taxpayers.'
  },
  {
    date: '2028+',
    title: 'B2G & G2B Integration',
    description: 'Extension of Fawtara PINT-OM standard to all Government procurement systems.'
  }
];

export const omanBusinessRules: BusinessRule[] = [
  {
    id: 'OM-R-001',
    message: 'Seller VAT Identification Number (VATIN) must be provided unless the seller is tax exempt.',
    context: 'cac:AccountingSupplierParty',
    test: 'exists(cac:Party/cac:PartyTaxScheme[cac:TaxScheme/cbc:ID = \'VAT\']/cbc:CompanyID)',
    severity: 'fatal'
  },
  {
    id: 'OM-R-002',
    message: 'VAT Identification Number (VATIN) must follow Omani format: prefix "OM" followed by exactly 10 digits.',
    context: 'cbc:CompanyID[ancestor::cac:PartyTaxScheme/cac:TaxScheme/cbc:ID = \'VAT\']',
    test: 'matches(., \'^OM[0-9]{10}$\')',
    severity: 'fatal'
  },
  {
    id: 'OM-R-003',
    message: 'The Document Currency Code must match Omani Rial (OMR) or the tax reporting currency must be OMR.',
    context: 'cbc:DocumentCurrencyCode',
    test: '. = \'OMR\' or ../cbc:TaxCurrencyCode = \'OMR\'',
    severity: 'fatal'
  },
  {
    id: 'OM-R-004',
    message: 'For Standard Rated Supplies (VAT Category S), the VAT rate must be exactly 5%.',
    context: 'cac:TaxCategory[cbc:ID = \'S\']',
    test: 'cbc:Percent = 5',
    severity: 'fatal'
  },
  {
    id: 'OM-R-005',
    message: 'Zero Rated Supplies (VAT Category Z) must specify a percent value of 0.',
    context: 'cac:TaxCategory[cbc:ID = \'Z\']',
    test: 'cbc:Percent = 0',
    severity: 'fatal'
  },
  {
    id: 'OM-R-006',
    message: 'For Out-of-Scope supplies (VAT Category O), the VAT rate must be 0 and the tax scheme must be VAT.',
    context: 'cac:TaxCategory[cbc:ID = \'O\']',
    test: 'cbc:Percent = 0 and cac:TaxScheme/cbc:ID = \'VAT\'',
    severity: 'fatal'
  },
  {
    id: 'OM-R-007',
    message: 'The invoice issue date must not be in the future.',
    context: 'cbc:IssueDate',
    test: 'xs:date(.) <= current-date()',
    severity: 'fatal'
  },
  {
    id: 'OM-R-008',
    message: 'A credit note (Document Type 381) must reference at least one original invoice.',
    context: '/ubl:CreditNote',
    test: 'exists(cac:BillingReference/cac:InvoiceDocumentReference/cbc:ID)',
    severity: 'fatal'
  },
  {
    id: 'OM-R-009',
    message: 'Sum of Invoice line net amounts must equal Invoice Line Extension Amount.',
    context: 'cac:LegalMonetaryTotal',
    test: 'cbc:LineExtensionAmount = sum(../cac:InvoiceLine/cbc:LineExtensionAmount)',
    severity: 'fatal'
  },
  {
    id: 'OM-R-010',
    message: 'Tax Inclusive Amount must equal Tax Exclusive Amount plus Tax Total Amount.',
    context: 'cac:LegalMonetaryTotal',
    test: 'abs(cbc:TaxInclusiveAmount - (cbc:TaxExclusiveAmount + ../cac:TaxTotal/cbc:TaxAmount)) < 0.05',
    severity: 'fatal'
  }
];

export const omanTaxCategories: TaxCategoryDetail[] = [
  {
    code: 'S',
    name: 'Standard Rated',
    rate: 5,
    description: 'Enforced on standard domestic trade of goods and services in the Sultanate of Oman.',
    example: 'Retail, consulting, or general commerce billing in Muscat.'
  },
  {
    code: 'Z',
    name: 'Zero-Rated',
    rate: 0,
    description: 'Supplies subject to 0% VAT in Oman (e.g. food items, medicine, exports, and hydrocarbon supplies).',
    example: 'Crucial food products supplied to local wholesalers.'
  },
  {
    code: 'E',
    name: 'Exempt',
    rate: 0,
    description: 'Exempted trade (e.g. local public transport, residential rents, and certain financial services).',
    example: 'Renting a residential apartment in Salalah.'
  },
  {
    code: 'O',
    name: 'Out of Scope',
    rate: 0,
    description: 'Transactions outside the scope of Omani VAT rules.',
    example: 'Services delivered outside the borders of the Sultanate.'
  }
];

