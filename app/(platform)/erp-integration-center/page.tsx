'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Database, Table, HelpCircle } from 'lucide-react';

export default function ErpIntegration() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [activeLang, setActiveLang] = useState<'sql' | 'js' | 'python'>('sql');

  useEffect(() => {
    setMounted(true);
    if (completeModule) {
      completeModule('erp-integration-center', 100);
    }
  }, []);

  const isCompleted = mounted && completedModules.includes('erp-integration-center');
  const isOman = mounted && country === 'om';

  const mappings = [
    { db: 'INV_HDR.ID', type: 'VARCHAR', ubl: 'cbc:ID', term: 'Invoice Number (BT-1)', rule: 'Must be unique' },
    { db: 'INV_HDR.DATE_CREATED', type: 'DATE', ubl: 'cbc:IssueDate', term: 'Invoice Issue Date (BT-2)', rule: 'Not in future' },
    { 
      db: 'SUPPLIER.VAT_REG_NUM', 
      type: 'VARCHAR', 
      ubl: 'cac:PartyTaxScheme/cbc:CompanyID', 
      term: isOman ? 'Seller VATIN (BT-31)' : 'Seller TRN (BT-31)', 
      rule: isOman ? 'OM followed by exactly 10 digits' : 'Exactly 15 digits' 
    },
    { 
      db: 'CUSTOMER.VAT_REG_NUM', 
      type: 'VARCHAR', 
      ubl: 'cac:PartyTaxScheme/cbc:CompanyID', 
      term: isOman ? 'Buyer VATIN (BT-48)' : 'Buyer TRN (BT-48)', 
      rule: 'Omit if B2C' 
    },
    { db: 'INV_LINE.EXT_AMT', type: 'DECIMAL', ubl: 'cbc:LineExtensionAmount', term: 'Line extension amount (BT-131)', rule: 'Net line sum' }
  ];

  const codeSnippets = {
    sql: `-- Fetch ERP data pre-mapped to UBL fields
SELECT 
  ih.invoice_num AS "cbc:ID",
  ih.issue_date AS "cbc:IssueDate",
  s.${isOman ? 'vatin_number' : 'trn_number'} AS "supplier:CompanyID",
  c.${isOman ? 'vatin_number' : 'trn_number'} AS "customer:CompanyID",
  SUM(il.line_amount) AS "cbc:LineExtensionAmount"
FROM invoice_headers ih
JOIN suppliers s ON ih.supplier_id = s.id
JOIN customers c ON ih.customer_id = c.id
JOIN invoice_lines il ON il.invoice_id = ih.id
WHERE ih.id = :invoice_id
GROUP BY ih.invoice_num, ih.issue_date, s.${isOman ? 'vatin_number' : 'trn_number'}, c.${isOman ? 'vatin_number' : 'trn_number'};`,
    
    js: `// Map ERP JSON payloads directly to PEPPOL PINT XML structures
function mapToPeppol(erpInvoice) {
  return {
    "cbc:CustomizationID": "urn:peppol:pint:billing-${isOman ? 'om' : 'ae'}:1.0",
    "cbc:ProfileID": "urn:peppol:bis:billing",
    "cbc:ID": erpInvoice.header.invoiceNum,
    "cbc:IssueDate": erpInvoice.header.dateCreated.slice(0, 10),
    "cac:AccountingSupplierParty": {
      "cac:Party": {
        "cac:PartyTaxScheme": {
          "cbc:CompanyID": erpInvoice.supplier.${isOman ? 'vatin' : 'trn'},
          "cac:TaxScheme": { "cbc:ID": "VAT" }
        }
      }
    }
  };
}`,
    
    python: `# Transform ERP database dict into PEPPOL XML elements using lxml
import lxml.etree as ET

def build_peppol_element(erp_row):
    root = ET.Element("Invoice", nsmap={
        None: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
        "cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
        "cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
    })
    
    customization = ET.SubElement(root, "{cbc}CustomizationID")
    customization.text = "urn:peppol:pint:billing-${isOman ? 'om' : 'ae'}:1.0"
    
    invoice_id = ET.SubElement(root, "{cbc}ID")
    invoice_id.text = erp_row["invoice_number"]
    
    return ET.tostring(root, pretty_print=True).decode()`
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 4: Hands-On Practice</span>
        <h1 className="apple-h1">ERP Integration & Mapping</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          To comply with PEPPOL e-invoicing, systems must map internal ERP relational database tables directly onto the hierarchal UBL XML schema.
        </p>
      </div>

      {/* Database mapping table */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <Database className="w-4 h-4 text-accent" /> Schema Mapping Spec Sheet
        </h3>
        <div className="apple-panel overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                <th className="p-4 font-semibold text-textPrimary">Source ERP Column</th>
                <th className="p-4 font-semibold text-textPrimary">Type</th>
                <th className="p-4 font-semibold text-textPrimary">UBL XML Target Node</th>
                <th className="p-4 font-semibold text-textPrimary">PINT {isOman ? 'OM' : 'AE'} Business Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] font-mono text-[10px]">
              {mappings.map((m, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 text-textPrimary">{m.db}</td>
                  <td className="p-4 text-textSecondary">{m.type}</td>
                  <td className="p-4 text-accent">{m.ubl}</td>
                  <td className="p-4 text-textSecondary font-sans">{m.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code generator widget */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Automated Code Mapping Templates
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Select your backend environment language to see pre-configured query structures designed to interface directly with Access Point APIs.
        </p>

        <div className="space-y-3">
          {/* Toggles */}
          <div className="flex gap-1.5 p-1 bg-white/[0.02] border border-white/[0.06] rounded-lg max-w-max font-mono">
            {(['sql', 'js', 'python'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 rounded text-[10px] uppercase font-semibold transition-all ${
                  activeLang === lang
                    ? 'bg-accent/10 text-accent font-bold'
                    : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Snippet Block */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
            <div className="bg-[#121214] px-4 py-2 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] font-mono text-textSecondary flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-accent" /> Mapping Source Script
              </span>
            </div>
            <pre className="p-4 overflow-auto text-[10px] font-mono text-[#dcdcdc] leading-relaxed max-h-[300px]">
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for reviewing ERP mapping guidelines.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
