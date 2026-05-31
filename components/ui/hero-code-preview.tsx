'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FileCode2, FileJson, ArrowRight } from 'lucide-react';

export function HeroCodePreview() {
  const [activeTab, setActiveTab] = useState<'json' | 'xml'>('json');
  const [typing, setTyping] = useState(true);

  // Auto-switch tabs to show the "magic"
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(prev => prev === 'json' ? 'xml' : 'json');
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const jsonSnippet = `{
  "invoice": {
    "id": "INV-2026-001",
    "issueDate": "2026-05-30",
    "currency": "AED",
    "supplier": {
      "name": "Acme Corp LLC",
      "trn": "100234567890123"
    },
    "totals": {
      "taxExclusive": 1000.00,
      "taxAmount": 50.00
    }
  }
}`;

  const xmlSnippet = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <cbc:CustomizationID>urn:peppol:pint:billing-3.0@ae-1.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
  <cbc:ID>INV-2026-001</cbc:ID>
  <cbc:IssueDate>2026-05-30</cbc:IssueDate>
  <cbc:DocumentCurrencyCode>AED</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>Acme Corp LLC</cbc:Name>
      </cac:PartyName>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>100234567890123</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>
</Invoice>`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-3xl mx-auto mt-12 rounded-xl overflow-hidden border border-border/50 bg-[#0d1117] shadow-2xl shadow-primary/10"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex gap-2 bg-[#0d1117] p-1 rounded-md">
          <button 
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors ${activeTab === 'json' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <FileJson className="w-3.5 h-3.5" />
            Input
          </button>
          <button 
            onClick={() => setActiveTab('xml')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors ${activeTab === 'xml' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            PINT Output
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto text-left">
        <pre className="font-mono text-xs leading-relaxed">
          <code className={activeTab === 'json' ? 'text-green-300' : 'text-blue-300'}>
            {activeTab === 'json' ? jsonSnippet : xmlSnippet}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
