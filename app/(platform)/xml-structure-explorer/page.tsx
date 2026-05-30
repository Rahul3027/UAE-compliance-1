'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CodeViewer } from '@/components/ui/code-viewer';
import { CheckCircle2, FileCode } from 'lucide-react';

export default function XmlStructureExplorer() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (completeModule) {
      completeModule('xml-structure-explorer', 100);
    }
  }, []);

  const isCompleted = mounted && completedModules.includes('xml-structure-explorer');

  const xmlSegments = [
    {
      id: 'seg-1',
      title: '1. Root Namespaces & Declarations',
      range: 'Lines 1-6',
      description: 'Defines the standard OASIS UBL 2.1 schemas for Invoice documents, importing common aggregate (cac) and basic (cbc) components namespaces.',
      businessTerm: 'Standard UBL Envelope structure',
      codeSnippet: `<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">`
    },
    {
      id: 'seg-2',
      title: '2. Customization & Profile IDs',
      range: 'Lines 7-9',
      description: 'Crucial routing parameters. The CustomizationID declares that the XML follows the UAE PEPPOL PINT specification, and the ProfileID maps it to standard billing processes.',
      businessTerm: 'CustomizationID (BT-24), ProfileID (BT-23)',
      schematronRule: 'CustomizationID must match "urn:peppol:pint:billing-ae:1.0"',
      codeSnippet: `<cbc:CustomizationID>urn:peppol:pint:billing-ae:1.0</cbc:CustomizationID>
<cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>`
    },
    {
      id: 'seg-3',
      title: '3. Invoice Identification',
      range: 'Lines 10-13',
      description: 'Contains the unique invoice ID (serial number), date of issue, and type code. Code 380 defines a standard Tax Invoice.',
      businessTerm: 'Invoice ID (BT-1), Issue Date (BT-2), Invoice Type Code (BT-3)',
      schematronRule: 'InvoiceTypeCode must be one of 380, 381, 388, 480',
      codeSnippet: `<cbc:ID>INV-2026-0042</cbc:ID>
<cbc:IssueDate>2026-05-30</cbc:IssueDate>
<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>`
    },
    {
      id: 'seg-4',
      title: '4. Supplier Information (C1)',
      range: 'Lines 15-32',
      description: 'Identifies the seller (Supplier) including registration name, physical address, country code, and their 15-digit UAE Tax Registration Number (TRN).',
      businessTerm: 'Seller Registration Name (BT-27), Seller Address, Seller TRN (BT-31 / UAE-R-001)',
      schematronRule: 'UAE-R-002: TRN must contain exactly 15 digits',
      codeSnippet: `<cac:AccountingSupplierParty>
    <cac:Party>
        <cac:PartyName>
            <cbc:Name>Al-Desert Tech Solutions LLC</cbc:Name>
        </cac:PartyName>
        <cac:PostalAddress>
            <cbc:StreetName>Sheikh Zayed Road, Floor 14</cbc:StreetName>
            <cbc:CityName>Dubai</cbc:CityName>
            <cac:Country>
                <cbc:IdentificationCode>AE</cbc:IdentificationCode>
            </cac:Country>
        </cac:PostalAddress>
        <cac:PartyTaxScheme>
            <cbc:CompanyID>100234567800003</cbc:CompanyID>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:PartyTaxScheme>
    </cac:Party>
</cac:AccountingSupplierParty>`
    },
    {
      id: 'seg-5',
      title: '5. Buyer Information (C4)',
      range: 'Lines 34-51',
      description: 'Identifies the customer (Buyer) including registration name, address, and their UAE TRN. If B2C (simplified), the buyer TRN block is omitted.',
      businessTerm: 'Buyer Name (BT-44), Buyer TRN (BT-48)',
      codeSnippet: `<cac:AccountingCustomerParty>
    <cac:Party>
        <cac:PartyName>
            <cbc:Name>Gulf Retail Enterprises PJSC</cbc:Name>
        </cac:PartyName>
        <cac:PostalAddress>
            <cbc:StreetName>Corniche Road, Block B</cbc:StreetName>
            <cbc:CityName>Abu Dhabi</cbc:CityName>
            <cac:Country>
                <cbc:IdentificationCode>AE</cbc:IdentificationCode>
            </cac:Country>
        </cac:PostalAddress>
        <cac:PartyTaxScheme>
            <cbc:CompanyID>100876543200003</cbc:CompanyID>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:PartyTaxScheme>
    </cac:Party>
</cac:AccountingCustomerParty>`
    },
    {
      id: 'seg-6',
      title: '6. Tax Total Breakdown',
      range: 'Lines 53-68',
      description: 'Declares calculated tax amount summaries. Contains subtotals split by Tax Category Code (e.g. S for Standard 5% VAT) and the taxable basis values.',
      businessTerm: 'Invoice Tax Amount (BT-110), Tax Category Code (BT-95), VAT rate percent (BT-96)',
      schematronRule: 'UAE-R-004: Standard VAT (S) must have percent exactly equal to 5',
      codeSnippet: `<cac:TaxTotal>
    <cbc:TaxAmount>150.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
        <cbc:TaxableAmount>3000.00</cbc:TaxableAmount>
        <cbc:TaxAmount>150.00</cbc:TaxAmount>
        <cac:TaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>5</cbc:Percent>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:TaxCategory>
    </cac:TaxSubtotal>
</cac:TaxTotal>`
    },
    {
      id: 'seg-7',
      title: '7. Legal Monetary Totals',
      range: 'Lines 70-77',
      description: 'The overall billing values. Sum of line extensions, total before tax (exclusive), total including tax (inclusive), and the final payable balance.',
      businessTerm: 'Line Extension Sum (BT-106), Tax Exclusive (BT-109), Tax Inclusive (BT-112), Payable (BT-115)',
      schematronRule: 'LineExtensionAmount must equal sum of line net extension amounts',
      codeSnippet: `<cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount>3000.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount>3000.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount>3150.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount>3150.00</cbc:PayableAmount>
</cac:LegalMonetaryTotal>`
    },
    {
      id: 'seg-8',
      title: '8. Invoice Line Details',
      range: 'Lines 79-96',
      description: 'Describes individual items billed. Contains line ID, quantity, rate price, net sum, item description, and tax categories.',
      businessTerm: 'Line ID (BT-126), Item Name (BT-153), Invoiced Qty (BT-129), Price (BT-146)',
      codeSnippet: `<cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="EA">10</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount>3000.00</cbc:LineExtensionAmount>
    <cac:Item>
        <cbc:Name>Enterprise ERP Integration Consulting</cbc:Name>
        <cac:ClassifiedTaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>5</cbc:Percent>
            <cac:TaxScheme>
                <cbc:ID>VAT</cbc:ID>
            </cac:TaxScheme>
        </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
        <cbc:PriceAmount>300.00</cbc:PriceAmount>
    </cac:Price>
</cac:InvoiceLine>`
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 3: Technical Deep-Dives</span>
        <h1 className="apple-h1">XML Structure Explorer</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          UBL XML is the universal markup language for PEPPOL invoices. Click through segments to see how business rules map onto individual tags.
        </p>
      </div>

      {/* Explorer Panel */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-accent" /> Interactive Document Inspector
        </h3>
        <CodeViewer segments={xmlSegments} />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 100 XP for exploring the UBL XML invoice schema.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
