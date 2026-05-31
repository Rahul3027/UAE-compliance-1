import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldAlert, FileSpreadsheet, Settings } from 'lucide-react';
import Link from 'next/link';

interface IndustryDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technicalRisks: string[];
  requirements: string[];
  checklist: string[];
}

const industryDetails: Record<string, IndustryDetail> = {
  'retail-ecommerce': {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    subtitle: 'High frequency billing, POS integration & real-time sales reporting',
    description: 'Retail and e-commerce sectors face high transactional volumes. UAE Phase 1/2 mandate forces syncing physical POS terminal transactions and online web checkout APIs directly with clearance engines. Caching mechanisms are required to ensure business continuity during network dropouts.',
    technicalRisks: [
      'Sub-second latency limits on API endpoint submissions.',
      'Data mapping mismatches on POS discount coupon items.',
      'Complex local cyber-compliance laws regarding client metadata privacy.'
    ],
    requirements: [
      'POS Terminal client side schema caching.',
      'Consolidated daily B2C batch XML clearance.',
      'Automated TAX discount line adjustments matching EN 16931 rules.'
    ],
    checklist: [
      'Define POS layout conversion rules (JSON to UBL).',
      'Verify VAT standard rate (5%) math on discounted totals.',
      'Establish offline buffer queues for network disruptions.'
    ]
  },
  'logistics-supply-chain': {
    slug: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    subtitle: 'Cross-border customs clearing, multi-currency conversions & AS4 secure messaging',
    description: 'Logistics companies operate across borders, requiring complex shipping documents. Invoices must include specific carrier details, transport reference keys, customs registration IDs, and convert tax computations into the reporting currency (AED/OMR).',
    technicalRisks: [
      'Multi-currency VAT calculations violating decimal rounding limits (UAE-R-010).',
      'Missing or malformed SBDH tracking header metadata.',
      'Difficulty in mapping multi-recipient cargo splits.'
    ],
    requirements: [
      'Exchange rate tables synced dynamically to Central Bank rates.',
      'Customs document reference matching in UBL invoice headers.',
      'Automatic routing matching based on receiver SMP lookups.'
    ],
    checklist: [
      'Map transport reference IDs (Bill of Lading) into cac:DocumentReference.',
      'Sync currency exchange conversions to central bank tables.',
      'Test receiver AS4 address Lookups using SMP sandbox.'
    ]
  },
  'healthcare-pharma': {
    slug: 'healthcare-pharma',
    title: 'Healthcare & Pharmaceuticals',
    subtitle: 'Medicine tariff verification, Zero-Rated classifications & secure database logs',
    description: 'Pharmaceutical billing must adhere to strict drug classifications. Zero-Rated medicine supplies must be clearly separated from Standard-Rated medical equipment in the generated XML schema. Business rules strictly check medication registration codes.',
    technicalRisks: [
      'Incorrect application of standard 5% VAT to zero-rated life-saving drugs.',
      'Rejections due to incorrect drug registration numbers in line item descriptions.',
      'Privacy violations on sensitive patient treatment records in invoice headers.'
    ],
    requirements: [
      'Real-time medicine registry lookup before invoice generation.',
      'Strict isolation of zero-rated vs. standard rated supply lines in XML.',
      'De-identification of patient medical data in public invoicing files.'
    ],
    checklist: [
      'Map zero-rated supplies to VAT Category Z in UBL invoice lines.',
      'Input medicine drug codes in cac:Item/cac:CommodityClassification.',
      'Audit billing files to ensure patient name records are omitted.'
    ]
  },
  'it-professional-services': {
    slug: 'it-professional-services',
    title: 'IT & Professional Services',
    subtitle: 'Milestone tracking, SaaS recurring subscriptions & contract alignment',
    description: 'IT and service companies frequently bill via recurring subscriptions, contracts, and milestones. E-invoices must describe billing periods, original contract references, and service line item details clearly.',
    technicalRisks: [
      'Missing milestone dates or billing schedule intervals in invoice metadata.',
      'Difficulty in validating variable usage-based consumption fees.',
      'Incorrect VAT application on services exported to non-GCC entities.'
    ],
    requirements: [
      'Billing period date ranges declared in UBL schema header (cac:InvoicePeriod).',
      'Integration of recurring CRM contracts to billing generators.',
      'Clear definition of Export (Z-rated/Out of scope) tax categories.'
    ],
    checklist: [
      'Input billing start/end dates in cbc:StartDate and cbc:EndDate.',
      'Map contract references into cac:ContractDocumentReference.',
      'Verify export customer country code is correct to allow Zero VAT.'
    ]
  }
};

export function generateStaticParams() {
  return [
    { slug: 'retail-ecommerce' },
    { slug: 'logistics-supply-chain' },
    { slug: 'healthcare-pharma' },
    { slug: 'it-professional-services' }
  ];
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function IndustryDetailPage({ params }: PageProps) {
  const detail = industryDetails[params.slug];

  if (!detail) {
    notFound();
  }

  return (
    <main className="flex-1 pb-24">
      {/* Header */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-border bg-muted/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> All Industries
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {detail.title} Blueprint
          </h1>
          <p className="text-sm text-primary uppercase font-mono tracking-widest font-bold">
            {detail.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 pt-16 grid md:grid-cols-3 gap-12">
        {/* Description & Risks */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{detail.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-red-500">
              <ShieldAlert className="w-5 h-5" /> Primary Compliance Risks
            </h3>
            <ul className="space-y-3">
              {detail.technicalRisks.map((risk, idx) => (
                <li key={idx} className="flex gap-3 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl bg-red-500/[0.02] border border-red-500/10">
                  <span className="font-bold text-red-400">0{idx + 1}.</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
              <Settings className="w-5 h-5" /> Integration Requirements
            </h3>
            <ul className="space-y-3">
              {detail.requirements.map((req, idx) => (
                <li key={idx} className="flex gap-3 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl bg-primary/[0.02] border border-primary/10">
                  <span className="font-bold text-primary">0{idx + 1}.</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Checklist */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-muted/10 border border-border space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" /> Mapping Checklist
            </h3>
            <ul className="space-y-4">
              {detail.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-border/50">
              <Link href="/assessments/erp-readiness" className="w-full inline-flex items-center justify-center h-10 px-4 rounded-full bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/95 transition-colors">
                Run ERP Readiness Audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
