'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { CheckCircle2, Download, RefreshCw, FileCode, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sandboxFormSchema, type SandboxFormValues } from '@/lib/validations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { insertLead } from '@/lib/supabase/db';
import { toast } from 'sonner';

export default function SandboxTesting() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [generatedXml, setGeneratedXml] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadName, setDownloadName] = useState('');
  const [downloadCompany, setDownloadCompany] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const form = useForm<SandboxFormValues>({
    resolver: zodResolver(sandboxFormSchema),
    defaultValues: {
      supplierName: 'Al-Maktoum Trading LLC',
      supplierTrn: '100348291000003',
      customerName: 'Abu Dhabi Distribution Co',
      customerTrn: '100984729100003',
      itemName: 'High Performance Cloud Nodes',
      qty: 5,
      price: 500,
    }
  });

  const { watch, setValue, formState: { errors } } = form;
  const values = watch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOman = mounted && country === 'om';

  // Sync regional defaults
  useEffect(() => {
    if (mounted) {
      if (country === 'om') {
        setValue('supplierName', 'Mazoon Trade & Logistics SAOC');
        setValue('supplierTrn', 'OM1234567890');
        setValue('customerName', 'Salalah Trading Enterprises LLC');
        setValue('customerTrn', 'OM9876543210');
        setValue('itemName', 'High Performance Cloud Nodes');
        setValue('qty', 5);
        setValue('price', 50);
      } else {
        setValue('supplierName', 'Al-Maktoum Trading LLC');
        setValue('supplierTrn', '100348291000003');
        setValue('customerName', 'Abu Dhabi Distribution Co');
        setValue('customerTrn', '100984729100003');
        setValue('itemName', 'High Performance Cloud Nodes');
        setValue('qty', 5);
        setValue('price', 500);
      }
    }
  }, [country, mounted, setValue]);

  const isCompleted = mounted && completedModules.includes('sandbox-testing-center');

  const lineExtension = values.qty * values.price;
  const vatAmount = lineExtension * 0.05;
  const taxInclusive = lineExtension + vatAmount;

  // Generate XML
  useEffect(() => {
    if (mounted) {
      // Basic escaping to prevent trivial injection in XML
      const escapeXml = (unsafe: string) => unsafe.replace(/[<>&'"]/g, c => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case "'": return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:CustomizationID>urn:peppol:pint:billing-${isOman ? 'om' : 'ae'}:1.0</cbc:CustomizationID>
    <cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
    <cbc:ID>INV-${Date.now().toString().slice(-6)}</cbc:ID>
    <cbc:IssueDate>${new Date().toISOString().split('T')[0]}</cbc:IssueDate>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>${isOman ? 'OMR' : 'AED'}</cbc:DocumentCurrencyCode>

    <cac:AccountingSupplierParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>${escapeXml(values.supplierName)}</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>${isOman ? 'Sultan Qaboos Street' : 'Sheikh Zayed Road'}</cbc:StreetName>
                <cbc:CityName>${isOman ? 'Muscat' : 'Dubai'}</cbc:CityName>
                <cac:Country>
                    <cbc:IdentificationCode>${isOman ? 'OM' : 'AE'}</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${escapeXml(values.supplierTrn)}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
        </cac:Party>
    </cac:AccountingSupplierParty>

    <cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>${escapeXml(values.customerName)}</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>${isOman ? 'Al-Ribat Street' : 'Corniche Road'}</cbc:StreetName>
                <cbc:CityName>${isOman ? 'Salalah' : 'Abu Dhabi'}</cbc:CityName>
                <cac:Country>
                    <cbc:IdentificationCode>${isOman ? 'OM' : 'AE'}</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>${escapeXml(values.customerTrn)}</cbc:CompanyID>
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
        <cbc:InvoicedQuantity unitCode="EA">${values.qty}</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount>${lineExtension.toFixed(2)}</cbc:LineExtensionAmount>
        <cac:Item>
            <cbc:Name>${escapeXml(values.itemName)}</cbc:Name>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>5</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount>${values.price.toFixed(2)}</cbc:PriceAmount>
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>`;

      setGeneratedXml(xml.trim());
    }
  }, [mounted, values, country, vatAmount, lineExtension, taxInclusive, isOman]);

  const generateXmlManual = () => {
    // Triggers Zod validation silently
    form.handleSubmit((data) => {
      if (completeModule) {
        completeModule('sandbox-testing-center', 150);
      }
    })();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedXml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const executeDownload = () => {
    const blob = new Blob([generatedXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${isOman ? 'oman' : 'uae'}-peppol-invoice-${Date.now()}.xml`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('download_lead_captured') === 'true') {
      executeDownload();
    } else {
      setIsDownloadDialogOpen(true);
    }
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail || !downloadName) {
      toast.warning('Please fill in your name and email.');
      return;
    }
    setIsDownloading(true);
    try {
      const res = await insertLead({
        type: 'download',
        first_name: downloadName,
        email: downloadEmail,
        company: downloadCompany,
        message: 'Downloaded compliant UBL XML template from Sandbox Builder',
        metadata: {
          country: isOman ? 'OM' : 'AE',
          document_type: '380',
        }
      });
      if (res.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('download_lead_captured', 'true');
        }
        setIsDownloadDialogOpen(false);
        executeDownload();
        toast.success('Download started! Subsequent downloads will be instant.');
      } else {
        toast.error('Failed to register download.');
      }
    } catch (err) {
      toast.error('Download failed.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">Hands-On Practice</span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Interactive Sandbox Builder</h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Input your transaction details to generate a fully compliant {isOman ? 'Oman PINT OM' : 'UAE PINT AE'} UBL XML file. Inspect the output or download it to test against your ERP integrations.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Parameters</CardTitle>
            <CardDescription>Configure the dynamic UBL fields.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplierName">Supplier (Seller) Name</Label>
              <Input
                id="supplierName"
                {...form.register('supplierName')}
                placeholder="Company Name"
                className={errors.supplierName ? "border-destructive" : ""}
              />
              {errors.supplierName && <p className="text-xs text-destructive">{errors.supplierName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierTrn">Supplier {isOman ? '10-digit VATIN' : '15-digit TRN'}</Label>
              <Input
                id="supplierTrn"
                {...form.register('supplierTrn')}
                className={`font-mono ${errors.supplierTrn ? "border-destructive" : ""}`}
              />
              {errors.supplierTrn && <p className="text-xs text-destructive">{errors.supplierTrn.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerName">Customer (Buyer) Name</Label>
              <Input
                id="customerName"
                {...form.register('customerName')}
                className={errors.customerName ? "border-destructive" : ""}
              />
              {errors.customerName && <p className="text-xs text-destructive">{errors.customerName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerTrn">Customer {isOman ? '10-digit VATIN' : '15-digit TRN'}</Label>
              <Input
                id="customerTrn"
                {...form.register('customerTrn')}
                className={`font-mono ${errors.customerTrn ? "border-destructive" : ""}`}
              />
              {errors.customerTrn && <p className="text-xs text-destructive">{errors.customerTrn.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemName">Line Item Description</Label>
              <Input
                id="itemName"
                {...form.register('itemName')}
                className={errors.itemName ? "border-destructive" : ""}
              />
              {errors.itemName && <p className="text-xs text-destructive">{errors.itemName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qty">Quantity</Label>
                <Input
                  id="qty"
                  type="number"
                  {...form.register('qty', { valueAsNumber: true })}
                  className={`font-mono ${errors.qty ? "border-destructive" : ""}`}
                />
                {errors.qty && <p className="text-xs text-destructive">{errors.qty.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Unit Price ({isOman ? 'OMR' : 'AED'})</Label>
                <Input
                  id="price"
                  type="number"
                  {...form.register('price', { valueAsNumber: true })}
                  className={`font-mono ${errors.price ? "border-destructive" : ""}`}
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
              </div>
            </div>

            <Button
              onClick={generateXmlManual}
              className="w-full mt-6 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Re-generate XML Schema
            </Button>
          </CardContent>
        </Card>

        {/* XML Terminal Display */}
        <Card className="overflow-hidden bg-zinc-950 text-zinc-50 border-zinc-800 flex flex-col h-full">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-accent" /> Generated XML Output
            </span>
            <div className="flex gap-4">
              <button 
                onClick={handleCopy}
                className="text-xs text-accent hover:text-accent-foreground transition-colors flex items-center gap-1.5"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : null}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
              <button 
                onClick={handleDownload}
                className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
          <pre className="p-6 overflow-auto text-xs font-mono leading-relaxed h-[600px]">
            <code>{generatedXml}</code>
          </pre>
        </Card>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/10"
        >
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm font-semibold text-foreground">Module Completed</p>
              <p className="text-xs text-muted-foreground">You earned 150 XP for compiling your own PEPPOL XML invoice.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Download Request Lead Dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-zinc-950 text-zinc-50 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-zinc-50">Download Compliant XML Schema</DialogTitle>
            <DialogDescription className="text-xs text-zinc-400">
              Provide your details to unlock download capability. This registers you to receive technical updates for UAE & Oman PEPPOL specifications.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDownloadSubmit} className="space-y-4 pt-2 text-zinc-900">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Full Name</label>
              <input
                required
                type="text"
                value={downloadName}
                onChange={(e) => setDownloadName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Work Email</label>
              <input
                required
                type="email"
                value={downloadEmail}
                onChange={(e) => setDownloadEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Company Name</label>
              <input
                type="text"
                value={downloadCompany}
                onChange={(e) => setDownloadCompany(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button type="button" className="text-xs text-zinc-400 hover:text-zinc-200" onClick={() => setIsDownloadDialogOpen(false)}>
                Cancel
              </button>
              <Button type="submit" disabled={isDownloading} className="text-xs px-4 h-9">
                {isDownloading ? 'Unlocking...' : 'Unlock & Download'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
