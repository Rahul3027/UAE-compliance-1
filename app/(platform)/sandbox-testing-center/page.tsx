'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Download, RefreshCw, FileCode, Check } from 'lucide-react';

export default function SandboxTesting() {
  const { completeModule, completedModules } = useLearningStore();
  const [mounted, setMounted] = useState(false);

  // Form Fields
  const [supplierName, setSupplierName] = useState('Al-Maktoum Trading LLC');
  const [supplierTrn, setSupplierTrn] = useState('100348291000003');
  const [customerName, setCustomerName] = useState('Abu Dhabi Distribution Co');
  const [customerTrn, setCustomerTrn] = useState('100984729100003');
  const [itemName, setItemName] = useState('High Performance Cloud Nodes');
  const [qty, setQty] = useState(5);
  const [price, setPrice] = useState(500);

  const [generatedXml, setGeneratedXml] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    generateXml();
  }, []);

  const isCompleted = mounted && completedModules.includes('sandbox-testing-center');

  const lineExtension = qty * price;
  const vatAmount = lineExtension * 0.05;
  const taxInclusive = lineExtension + vatAmount;

  const generateXml = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:CustomizationID>urn:peppol:pint:billing-ae:1.0</cbc:CustomizationID>
    <cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
    <cbc:ID>INV-${Date.now().toString().slice(-6)}</cbc:ID>
    <cbc:IssueDate>${new Date().toISOString().split('T')[0]}</cbc:IssueDate>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>AED</cbc:DocumentCurrencyCode>

    <cac:AccountingSupplierParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>${supplierName}</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>Sheikh Zayed Road</cbc:StreetName>
                <cbc:CityName>Dubai</cbc:CityName>
                <cac:Country>
                    <cbc:IdentificationCode>AE</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${supplierTrn}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
        </cac:Party>
    </cac:AccountingSupplierParty>

    <cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>${customerName}</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>Corniche Road</cbc:StreetName>
                <cbc:CityName>Abu Dhabi</cbc:CityName>
                <cac:Country>
                    <cbc:IdentificationCode>AE</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${customerTrn}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
        </cac:Party>
    </cac:AccountingCustomerParty>

    <cac:TaxTotal>
        <cbc:TaxAmount>${vatAmount.toFixed(2)}</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount>${lineExtension.toFixed(2)}</cbc:TaxableAmount>
            <cbc:TaxAmount>${vatAmount.toFixed(2)}</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>5</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>

    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount>${lineExtension.toFixed(2)}</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount>${lineExtension.toFixed(2)}</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount>${taxInclusive.toFixed(2)}</cbc:TaxInclusiveAmount>
        <cbc:PayableAmount>${taxInclusive.toFixed(2)}</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>

    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID>
        <cbc:InvoicedQuantity unitCode="EA">${qty}</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount>${lineExtension.toFixed(2)}</cbc:LineExtensionAmount>
        <cac:Item>
            <cbc:Name>${itemName}</cbc:Name>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>5</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount>${price.toFixed(2)}</cbc:PriceAmount>
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>`;

    setGeneratedXml(xml.trim());
    if (completeModule) {
      completeModule('sandbox-testing-center', 150);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedXml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uae-peppol-invoice-${Date.now()}.xml`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 4: Hands-On Practice</span>
        <h1 className="apple-h1">Interactive Sandbox Builder</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Input your transaction details to generate a fully compliant UAE PINT AE UBL XML file. Inspect the output or download it to test against your ERP integrations.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
        {/* Input Form */}
        <div className="apple-panel p-5 space-y-4">
          <h4 className="text-xs font-semibold text-textPrimary">Invoice Parameters</h4>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-mono text-textSecondary">Supplier (Seller) Name</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-mono text-textSecondary">Supplier 15-digit TRN</label>
              <input
                type="text"
                value={supplierTrn}
                onChange={(e) => setSupplierTrn(e.target.value)}
                className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-mono text-textSecondary">Customer (Buyer) Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-mono text-textSecondary">Customer 15-digit TRN</label>
              <input
                type="text"
                value={customerTrn}
                onChange={(e) => setCustomerTrn(e.target.value)}
                className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-mono text-textSecondary">Line Item Description</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono text-textSecondary">Quantity</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono text-textSecondary">Unit Price (AED)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-black border border-white/[0.08] rounded-lg p-2 text-xs text-textPrimary focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <button
              onClick={generateXml}
              className="w-full btn-apple-primary text-xs py-2.5 flex items-center justify-center gap-2 mt-4"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-generate XML Schema
            </button>
          </div>
        </div>

        {/* XML Terminal Display */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
          <div className="bg-[#121214] px-4 py-2 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-textSecondary flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-accent" /> Generated XML Output
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className="text-[10px] text-accent hover:underline flex items-center gap-1"
              >
                {isCopied ? <Check className="w-3 h-3 text-green-400" /> : null}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
              <span className="text-textSecondary/30">|</span>
              <button 
                onClick={handleDownload}
                className="text-[10px] text-accent hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download
              </button>
            </div>
          </div>
          <pre className="p-4 overflow-auto text-[10px] font-mono text-[#dcdcdc] leading-relaxed h-[420px] max-h-[500px]">
            <code>{generatedXml}</code>
          </pre>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 150 XP for compiling your own PEPPOL XML invoice.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
