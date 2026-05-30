export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type QuizData = Record<string, QuizQuestion[]>;

export const quizzes: QuizData = {
  'uae-overview': [
    {
      id: 'uo-1',
      question: 'Which authority is responsible for regulating the e-invoicing model and mandate in the UAE?',
      options: [
        'Central Bank of the UAE',
        'Federal Tax Authority (FTA)',
        'Ministry of Economy',
        'Dubai Chamber of Commerce'
      ],
      correctIndex: 1,
      explanation: 'The Federal Tax Authority (FTA) regulates national taxation and acts as the official PEPPOL Authority in the UAE.'
    },
    {
      id: 'uo-2',
      question: 'When is the Phase 1 Mandate go-live slated to begin for large tax groups and enterprise sellers in the UAE?',
      options: [
        'Q1 2024',
        'December 2025',
        'Mid 2027',
        'January 2028'
      ],
      correctIndex: 1,
      explanation: 'The FTA scheduled the mandatory e-invoicing rollout starting in December 2025 for large taxpayers.'
    },
    {
      id: 'uo-3',
      question: 'What is the foundation of the UAE e-invoicing standard?',
      options: [
        'A proprietary FTA JSON API format',
        'PEPPOL PINT AE (International Invoice UAE customization)',
        'The Saudi Arabian FATOORA XML format',
        'PDF invoices containing signed QR codes'
      ],
      correctIndex: 1,
      explanation: 'The UAE e-invoicing model is built on PEPPOL PINT AE, an XML specification localized with UAE tax laws.'
    }
  ],
  'peppol-5-corner': [
    {
      id: 'p5c-1',
      question: 'In the PEPPOL 5-Corner Model, who is Corner 5 (C5)?',
      options: [
        'The Buyer (Customer)',
        'The Seller\'s Access Point',
        'The Federal Tax Authority (FTA)',
        'The DNS Directory server (SML)'
      ],
      correctIndex: 2,
      explanation: 'Under the UAE customization, Corner 5 is the Federal Tax Authority (FTA), which receives real-time transaction reporting.'
    },
    {
      id: 'p5c-2',
      question: 'Which protocol is used to transmit business documents securely between Corner 2 and Corner 3?',
      options: [
        'FTP / SFTP',
        'REST over WebSockets',
        'SMTP Email attachment',
        'AS4 over HTTPS'
      ],
      correctIndex: 3,
      explanation: 'AS4 (Applicability Statement 4) is the mandatory secure communication protocol for PEPPOL Access Points.'
    },
    {
      id: 'p5c-3',
      question: 'What is the role of Corner 3 in the document transmission workflow?',
      options: [
        'Generating the UBL XML invoice',
        'Receiving the AS4 payload from C2 and routing it to the Buyer (C4)',
        'Enforcing Schematron validations for the Seller',
        'Auditing the VAT calculation for the FTA'
      ],
      correctIndex: 1,
      explanation: 'Corner 3 represents the Buyer\'s Access Point, which receives the secure AS4 package and serves it to the Buyer\'s ERP (C4).'
    }
  ],
  'pint-ae-architecture': [
    {
      id: 'pa-1',
      question: 'Which of the following UBL document types corresponds to a Credit Note in PEPPOL PINT AE?',
      options: [
        'Document Type 380',
        'Document Type 381',
        'Document Type 480',
        'Document Type 81'
      ],
      correctIndex: 1,
      explanation: 'UBL document type code 381 represents a Credit Note. A standard Tax Invoice uses 380.'
    },
    {
      id: 'pa-2',
      question: 'How is the UAE transaction type flag (e.g. Free Trade Zone, Deemed Supply, exports) represented in PINT AE?',
      options: [
        'A string in the invoice note',
        'An 8-bit binary flag system represented as a transaction category code',
        'An element inside the supplier address block',
        'It is determined automatically by the buyer\'s country code'
      ],
      correctIndex: 1,
      explanation: 'PINT AE implements specific transaction type indicators using structured code values to identify Free Trade Zone supplies, deemed supplies, etc.'
    }
  ],
  'invoice-lifecycle': [
    {
      id: 'il-1',
      question: 'At which stage of the invoice lifecycle is the Schematron business rule check performed for the seller?',
      options: [
        'Archiving',
        'Creation inside ERP (C1)',
        'Validation by the Seller\'s Access Point (C2) and Corner 5 (FTA)',
        'Payment confirmation'
      ],
      correctIndex: 2,
      explanation: 'Validation against PEPPOL and UAE-specific Schematron rules is performed at C2 (Access Point) and C5 (FTA) before transmission succeeds.'
    },
    {
      id: 'il-2',
      question: 'What does C4 generate to notify C1 that an invoice has a disputed line amount?',
      options: [
        'A brand new invoice',
        'An Invoice Response (IR) with status code indicating dispute',
        'A printout sent via courier',
        'A Message Level Response (MLR)'
      ],
      correctIndex: 1,
      explanation: 'An Invoice Response (IR) is a business-level document used by the buyer to communicate acceptances, rejections, or disputes.'
    }
  ],
  'tax-logic-visualization': [
    {
      id: 'tl-1',
      question: 'What is the standard VAT rate in the UAE, and which PEPPOL Category Code represents it?',
      options: [
        '5%, Code S',
        '10%, Code S',
        '5%, Code Z',
        '0%, Code E'
      ],
      correctIndex: 0,
      explanation: 'The standard VAT rate is 5% and is represented by the category code "S" (Standard Rated).'
    },
    {
      id: 'tl-2',
      question: 'If an invoice lists a Standard Rated line of 100 AED, and an Out-of-Scope line of 50 AED, what is the Tax Total Amount?',
      options: [
        '7.50 AED',
        '5.00 AED',
        '2.50 AED',
        '0.00 AED'
      ],
      correctIndex: 1,
      explanation: 'Standard Rated line tax is 100 * 5% = 5 AED. Out-of-scope has 0% VAT, so the Tax Total is 5.00 AED.'
    },
    {
      id: 'tl-3',
      question: 'For invoices involving non-AED transaction currencies, how must the VAT calculations be presented?',
      options: [
        'Converted using the exchange rate on the payment date',
        'The tax totals must be converted and reported in UAE Dirhams (AED) using the official Central Bank exchange rate on the invoice date',
        'In USD only, as international trade ignores local currencies',
        'Tax conversions are optional in PEPPOL'
      ],
      correctIndex: 1,
      explanation: 'According to FTA regulations, if the invoice is in a foreign currency, the VAT breakdown must be converted and reported in AED using the official Central Bank rate on the issue date.'
    }
  ],
  'business-rules-explorer': [
    {
      id: 'br-1',
      question: 'Which of the following business rules enforces that a TRN must have exactly 15 digits?',
      options: [
        'UAE-R-001',
        'UAE-R-002',
        'UAE-R-004',
        'UAE-R-007'
      ],
      correctIndex: 1,
      explanation: 'Rule UAE-R-002 enforces that any CompanyID marked under the "VAT" scheme matches the regular expression \'^[0-9]{15}$\'.'
    },
    {
      id: 'br-2',
      question: 'If a business rule fails with "fatal" severity, what is the result?',
      options: [
        'The invoice is delivered, but marked as warning',
        'The Access Point rejects the transmission, and the invoice fails delivery',
        'A fine is immediately issued by the FTA',
        'It is ignored if the buyer accepts it'
      ],
      correctIndex: 1,
      explanation: 'A fatal business rule failure halts the transmission. The Access Point will block delivery and reject the document.'
    }
  ]
};
