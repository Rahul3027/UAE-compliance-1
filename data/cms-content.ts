// This file acts as our Local CMS (Content Management System)

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: 'Updates' | 'Technical' | 'Compliance';
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Technical' | 'Pricing';
}

export const blogs: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-uae-peppol-pint',
    title: 'Understanding UAE PEPPOL PINT Requirements',
    excerpt: 'A comprehensive guide to the upcoming FTA mandates and how the PINT AE specification differs from standard PEPPOL.',
    content: 'Full content goes here...',
    date: '2026-05-30',
    author: 'Compliance Team',
    readTime: '5 min read',
    category: 'Updates',
  },
  {
    id: '2',
    slug: 'oman-ota-implementation-timeline',
    title: 'Oman OTA Implementation Timeline',
    excerpt: 'Prepare your ERP for the upcoming Oman Tax Authority e-invoicing phases.',
    content: 'Full content goes here...',
    date: '2026-05-25',
    author: 'Regulatory Affairs',
    readTime: '4 min read',
    category: 'Compliance',
  }
];

export const services: ServiceItem[] = [
  {
    id: '1',
    slug: 'erp-integration',
    title: 'ERP Integration Services',
    description: 'Connect SAP, Oracle, or Microsoft Dynamics directly to the tax authority APIs.',
    features: ['Custom middleware', 'Real-time validation', 'Automated retry logic'],
    icon: 'Layers'
  },
  {
    id: '2',
    slug: 'compliance-audit',
    title: 'Pre-Production Compliance Audit',
    description: 'Ensure your generated XML schemas pass all EN 16931 and local business rules.',
    features: ['Schema validation', 'Tax logic verification', '5-corner routing checks'],
    icon: 'ShieldCheck'
  }
];

export const faqs: FAQItem[] = [
  {
    question: 'When is the UAE e-invoicing mandate effective?',
    answer: 'The UAE FTA has announced the first wave will begin in phased rollouts. Specific dates will be communicated to Phase 1 taxpayers directly.',
    category: 'General'
  },
  {
    question: 'What is the difference between PINT AE and PINT OM?',
    answer: 'While both are based on the international PINT standard, they have distinct Business Rules (BR) for localized tax calculation and currency rounding.',
    category: 'Technical'
  }
];
