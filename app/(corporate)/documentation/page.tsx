'use client';
import { useState } from 'react';
import { Key, FileCode, CheckSquare, ShieldAlert, Terminal, Copy, Check, Info } from 'lucide-react';

type Tab = 'auth' | 'generate' | 'validate' | 'errors';

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('auth');
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const codeSnippets = {
    authCurl: `curl -X POST https://api.compliance.intelligence/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/xml" \\
  -H "X-Country-Code: AE" \\
  -d @invoice.xml`,
    authNode: `const fs = require('fs');
const fetch = require('node-fetch');

async function validateInvoice() {
  const xmlData = fs.readFileSync('invoice.xml', 'utf8');
  
  const response = await fetch('https://api.compliance.intelligence/v1/validate', {
    method: 'POST',
    body: xmlData,
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/xml',
      'X-Country-Code': 'AE' // Use 'OM' for Oman PINT OM
    }
  });
  
  const result = await response.json();
  console.log(result);
}
validateInvoice();`,
    genJson: `{
  "invoiceId": "INV-2026-0092",
  "issueDate": "2026-06-06",
  "currency": "AED",
  "supplierTrn": "100234567800003",
  "customerTrn": "100987654300003",
  "lineItems": [
    {
      "id": "1",
      "description": "Enterprise Cloud Architecture Consulting",
      "quantity": 10,
      "unitPrice": 1500,
      "vatCategory": "S",
      "vatRate": 5
    }
  ]
}`,
    genXml: `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:peppol:pint:billing-ae:1.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
  <cbc:ID>INV-2026-0092</cbc:ID>
  <cbc:IssueDate>2026-06-06</cbc:IssueDate>
  <cbc:DocumentCurrencyCode>AED</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>100234567800003</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>100987654300003</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:LineExtensionAmount>15000.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>Enterprise Cloud Architecture Consulting</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>5</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
  </cac:InvoiceLine>
</Invoice>`,
    valSuccess: `{
  "status": "COMPLIANT",
  "timestamp": "2026-06-06T14:15:00Z",
  "errors": []
}`,
    valFail: `{
  "status": "FAILED",
  "timestamp": "2026-06-06T14:15:20Z",
  "errors": [
    {
      "id": "UAE-R-002",
      "severity": "FATAL",
      "context": "cbc:CompanyID[ancestor::cac:PartyTaxScheme/cac:TaxScheme/cbc:ID = 'VAT']",
      "test": "matches(., '^[0-9]{15}$')",
      "message": "Tax Registration Number (TRN) must contain exactly 15 digits.",
      "line": 12
    }
  ]
}`
  };

  return (
    <main className="flex-1 pb-24">
      {/* Hero Header */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-border bg-black/[0.02]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-[80px] rounded-full" />
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold px-2.5 py-1 rounded bg-primary/10 max-w-max block">
            Developer Reference
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-none">
            Compliance Engine API
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            Integrate the Compliance Intelligence engine directly into your enterprise ERP middleware, CI/CD pipeline, or billing workflows.
          </p>
        </div>
      </section>

      {/* Tabs & Main Section */}
      <section className="max-w-5xl mx-auto px-6 pt-12">
        <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Sidebar Tabs */}
          <div className="w-full shrink-0 flex flex-col gap-1 bg-card/20 border border-border/40 p-2 rounded-2xl">
            <button
              onClick={() => setActiveTab('auth')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'auth'
                  ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Authentication</span>
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'generate'
                  ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Generate XML</span>
            </button>
            <button
              onClick={() => setActiveTab('validate')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'validate'
                  ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Validate UBL</span>
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === 'errors'
                  ? 'bg-primary/10 text-primary border-l-2 border-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Error Codes</span>
            </button>
          </div>

          {/* Code/Content Panel */}
          <div className="bg-card/10 border border-border/40 p-6 rounded-2xl space-y-6">
            {activeTab === 'auth' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <Key className="w-5 h-5 text-primary" /> API Authentication
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All compliance endpoints require Bearer Token authorization. You can fetch and manage your tokens from the developer console dashboard.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">Request Headers</h3>
                  <div className="overflow-x-auto border border-border/40 rounded-xl bg-card/25 p-4 text-xs space-y-2.5 font-mono">
                    <div className="flex border-b border-border/20 pb-2">
                      <span className="w-32 font-bold text-foreground">Authorization</span>
                      <span className="text-muted-foreground">Bearer &lt;YOUR_API_KEY&gt; (Required)</span>
                    </div>
                    <div className="flex border-b border-border/20 pb-2">
                      <span className="w-32 font-bold text-foreground">Content-Type</span>
                      <span className="text-muted-foreground">application/xml OR application/json</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-bold text-foreground">X-Country-Code</span>
                      <span className="text-muted-foreground">AE (United Arab Emirates) or OM (Sultanate of Oman)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">cURL Shell Request</h3>
                    <button
                      onClick={() => triggerCopy(codeSnippets.authCurl, 'authCurl')}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {copied['authCurl'] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied['authCurl'] ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#0b0b0d] border border-border/60 rounded-xl p-4 font-mono text-[11px] overflow-x-auto text-primary-foreground leading-relaxed">
                    <code>{codeSnippets.authCurl}</code>
                  </pre>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">Node.js Integration</h3>
                    <button
                      onClick={() => triggerCopy(codeSnippets.authNode, 'authNode')}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {copied['authNode'] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied['authNode'] ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#0b0b0d] border border-border/60 rounded-xl p-4 font-mono text-[11px] overflow-x-auto text-primary-foreground leading-relaxed">
                    <code>{codeSnippets.authNode}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'generate' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <FileCode className="w-5 h-5 text-primary" /> Generate PEPPOL XML
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Constructing fully-hierarchial UBL XML schemas from database states can be error-prone. Use the `POST /v1/generate` endpoint to map a simplified JSON structure directly into fully-valid regional XML.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* JSON Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">JSON Input Payload</span>
                      <button
                        onClick={() => triggerCopy(codeSnippets.genJson, 'genJson')}
                        className="text-[10px] text-primary hover:underline"
                      >
                        {copied['genJson'] ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-[#0b0b0d] border border-border/60 rounded-xl p-3.5 font-mono text-[10px] overflow-auto leading-relaxed max-h-[300px]">
                      <code>{codeSnippets.genJson}</code>
                    </pre>
                  </div>

                  {/* XML Output */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Generated UBL XML</span>
                      <button
                        onClick={() => triggerCopy(codeSnippets.genXml, 'genXml')}
                        className="text-[10px] text-primary hover:underline"
                      >
                        {copied['genXml'] ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-[#0b0b0d] border border-border/60 rounded-xl p-3.5 font-mono text-[10px] overflow-auto leading-relaxed max-h-[300px]">
                      <code>{codeSnippets.genXml}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'validate' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <CheckSquare className="w-5 h-5 text-primary" /> Validate UBL XML
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Transmit your raw XML document directly to `POST /v1/validate` to run schema structures and regional Schematron rule diagnostics before triggering the AS4 delivery handshake.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Compliance success */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Success Compliance Response
                      </span>
                      <button
                        onClick={() => triggerCopy(codeSnippets.valSuccess, 'valSuccess')}
                        className="text-[10px] text-primary hover:underline"
                      >
                        {copied['valSuccess'] ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-[#0b0b0d] border border-border/60 rounded-xl p-3.5 font-mono text-[10.5px] overflow-auto leading-relaxed max-h-[250px]">
                      <code>{codeSnippets.valSuccess}</code>
                    </pre>
                  </div>

                  {/* Compliance fail */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Failed Rule Response
                      </span>
                      <button
                        onClick={() => triggerCopy(codeSnippets.valFail, 'valFail')}
                        className="text-[10px] text-primary hover:underline"
                      >
                        {copied['valFail'] ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-[#0b0b0d] border border-border/60 rounded-xl p-3.5 font-mono text-[10.5px] overflow-auto leading-relaxed max-h-[250px]">
                      <code>{codeSnippets.valFail}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'errors' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <ShieldAlert className="w-5 h-5 text-primary" /> Compliance Error Reference
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Identify and debug the most common regional and technical verification errors reported by the validation engine.
                  </p>
                </div>

                <div className="overflow-hidden border border-border/40 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-muted/10 border-b border-border/40">
                        <th className="p-3.5 font-semibold text-foreground w-1/4">Rule ID</th>
                        <th className="p-3.5 font-semibold text-foreground w-1/6">Severity</th>
                        <th className="p-3.5 font-semibold text-foreground w-7/12">Resolution Guideline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20 font-mono text-[11px] text-muted-foreground bg-card/5">
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="p-3.5 font-bold text-foreground">UAE-R-002</td>
                        <td className="p-3.5 text-red-400">FATAL</td>
                        <td className="p-3.5 font-sans leading-normal">
                          The Tax Registration Number (TRN) must contain exactly 15 digits. Check `cbc:CompanyID` context where scheme is 'VAT'.
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="p-3.5 font-bold text-foreground">OM-R-002</td>
                        <td className="p-3.5 text-red-400">FATAL</td>
                        <td className="p-3.5 font-sans leading-normal">
                          The Oman VAT Identification Number (VATIN) must start with prefix "OM" followed by exactly 10 digits.
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="p-3.5 font-bold text-foreground">UAE-R-003</td>
                        <td className="p-3.5 text-red-400">FATAL</td>
                        <td className="p-3.5 font-sans leading-normal">
                          Invoices must use AED as document currency or report tax values in AED. Check `cbc:DocumentCurrencyCode` or `cbc:TaxCurrencyCode`.
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="p-3.5 font-bold text-foreground">UAE-R-004 / OM-R-004</td>
                        <td className="p-3.5 text-red-400">FATAL</td>
                        <td className="p-3.5 font-sans leading-normal">
                          For Standard Rated Supplies (VAT Category S), the VAT rate must be exactly 5%. Assert `cbc:Percent = 5` inside `cac:TaxCategory`.
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="p-3.5 font-bold text-foreground">AS4-TLS-ERR</td>
                        <td className="p-3.5 text-red-400">FATAL</td>
                        <td className="p-3.5 font-sans leading-normal">
                          The AS4 communication bridge failed verification. Check that PEPPOL certified PKI credentials are valid in your keystore.
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="p-3.5 font-bold text-foreground">SMP-LOOKUP-FAIL</td>
                        <td className="p-3.5 text-amber-400">WARNING</td>
                        <td className="p-3.5 font-sans leading-normal">
                          The buyer PEPPOL Participant ID is not registered in the central SMP registry. Verify that buyer onboarding is complete.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
