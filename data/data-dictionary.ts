export type Category = 'Header' | 'Supplier' | 'Buyer' | 'Payment & Delivery' | 'Tax' | 'Totals' | 'Lines';

export interface DictionaryItem {
  path: string;
  bt: string;
  name: string;
  category: Category;
  req: {
    ae: 'mandatory' | 'conditional' | 'optional';
    om: 'mandatory' | 'conditional' | 'optional';
  };
  rules: {
    ae: string;
    om: string;
  };
}

export const dictionaryItems: DictionaryItem[] = [
  // --- HEADER CATEGORY ---
  {
    path: 'cbc:CustomizationID',
    bt: 'BT-24',
    name: 'Specification Identifier',
    category: 'Header',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Must contain: urn:peppol:pint:billing-ae:1.0',
      om: 'Must contain: urn:peppol:pint:billing-om:1.0'
    }
  },
  {
    path: 'cbc:ProfileID',
    bt: 'BT-23',
    name: 'Process Identifier',
    category: 'Header',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Must contain: urn:peppol:bis:billing',
      om: 'Must contain: urn:peppol:bis:billing'
    }
  },
  {
    path: 'cbc:ID',
    bt: 'BT-1',
    name: 'Invoice Identifier',
    category: 'Header',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'A unique sequential number identifying the invoice in the ERP system. Maximum length 127 characters.',
      om: 'A unique sequential number identifying the invoice. Maximum length 127 characters.'
    }
  },
  {
    path: 'cbc:IssueDate',
    bt: 'BT-2',
    name: 'Invoice Issue Date',
    category: 'Header',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The date when the invoice was issued (YYYY-MM-DD). Must not be a future date.',
      om: 'The date when the invoice was issued (YYYY-MM-DD). Must not be a future date.'
    }
  },
  {
    path: 'cbc:InvoiceTypeCode',
    bt: 'BT-3',
    name: 'Invoice Type Code',
    category: 'Header',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Must match standard UNCL1001 codes: 380 (Tax Invoice), 381 (Credit Note), 388 (Simplified), 480 (Out of Scope).',
      om: 'Must match standard UNCL1001 codes: 380 (Tax Invoice), 381 (Credit Note), 388 (Simplified Invoice).'
    }
  },
  {
    path: 'cbc:DocumentCurrencyCode',
    bt: 'BT-5',
    name: 'Invoice Currency Code',
    category: 'Header',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Document transaction currency. Standard is AED. If other, cbc:TaxCurrencyCode must be AED.',
      om: 'Document transaction currency. Standard is OMR. If other, cbc:TaxCurrencyCode must be OMR.'
    }
  },
  {
    path: 'cbc:TaxCurrencyCode',
    bt: 'BT-6',
    name: 'Tax Reporting Currency Code',
    category: 'Header',
    req: { ae: 'conditional', om: 'conditional' },
    rules: {
      ae: 'Mandatory if the invoice Document Currency is not AED. Value must be AED.',
      om: 'Mandatory if the invoice Document Currency is not OMR. Value must be OMR.'
    }
  },

  // --- SUPPLIER CATEGORY ---
  {
    path: 'cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID',
    bt: 'BT-31',
    name: 'Seller Tax Registration Number',
    category: 'Supplier',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The 15-digit Tax Registration Number (TRN) issued by the UAE Federal Tax Authority.',
      om: 'The Omani VAT Identification Number (VATIN) prefixed with "OM" followed by exactly 10 digits.'
    }
  },
  {
    path: 'cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name',
    bt: 'BT-27',
    name: 'Seller Legal Name',
    category: 'Supplier',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The official trading name or legal entity registration name of the supplier.',
      om: 'The official trading name or legal entity registration name of the supplier.'
    }
  },
  {
    path: 'cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:StreetName',
    bt: 'BT-35',
    name: 'Seller Street Name',
    category: 'Supplier',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The street name of the supplier address.',
      om: 'The street name or block number of the supplier address.'
    }
  },
  {
    path: 'cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CityName',
    bt: 'BT-37',
    name: 'Seller City Name',
    category: 'Supplier',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The city or emirate of the supplier address (e.g. Dubai, Abu Dhabi).',
      om: 'The city or region of the supplier address (e.g. Muscat, Salalah).'
    }
  },
  {
    path: 'cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode',
    bt: 'BT-40',
    name: 'Seller Country Code',
    category: 'Supplier',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Must be "AE".',
      om: 'Must be "OM".'
    }
  },

  // --- BUYER CATEGORY ---
  {
    path: 'cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID',
    bt: 'BT-48',
    name: 'Buyer Tax Registration Number',
    category: 'Buyer',
    req: { ae: 'conditional', om: 'conditional' },
    rules: {
      ae: 'Mandatory for Standard B2B/B2G invoices. Must contain exactly 15 digits. Omitted/Optional for B2C simplified.',
      om: 'Mandatory for Standard B2B/B2G invoices. Must contain prefix "OM" followed by 10 digits. Omitted/Optional for B2C.'
    }
  },
  {
    path: 'cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name',
    bt: 'BT-44',
    name: 'Buyer Legal Name',
    category: 'Buyer',
    req: { ae: 'conditional', om: 'conditional' },
    rules: {
      ae: 'Mandatory for Standard B2B/B2G invoices. Represents the legal business name of the buyer.',
      om: 'Mandatory for Standard B2B/B2G invoices. Represents the legal business name of the buyer.'
    }
  },
  {
    path: 'cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CityName',
    bt: 'BT-52',
    name: 'Buyer City Name',
    category: 'Buyer',
    req: { ae: 'conditional', om: 'conditional' },
    rules: {
      ae: 'Mandatory for B2B standard rated invoices. The city or emirate of the buyer.',
      om: 'Mandatory for B2B standard rated invoices. The city or region of the buyer.'
    }
  },

  // --- PAYMENT & DELIVERY CATEGORY ---
  {
    path: 'cac:PaymentMeans/cbc:PaymentMeansCode',
    bt: 'BT-81',
    name: 'Payment Means Code',
    category: 'Payment & Delivery',
    req: { ae: 'optional', om: 'optional' },
    rules: {
      ae: 'Specifies the method of payment using UNTDID 4461 codes (e.g. 30 for Credit Transfer, 48 for Card).',
      om: 'Specifies the method of payment using UNTDID 4461 codes (e.g. 30 for Credit Transfer, 48 for Card).'
    }
  },
  {
    path: 'cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:ID',
    bt: 'BT-84',
    name: 'Payment Account Identifier',
    category: 'Payment & Delivery',
    req: { ae: 'optional', om: 'optional' },
    rules: {
      ae: 'The bank account IBAN where payment is requested. Must match standard UAE IBAN format if locally paid.',
      om: 'The bank account IBAN where payment is requested. Must match standard Omani IBAN format.'
    }
  },
  {
    path: 'cac:Delivery/cac:DeliveryLocation/cbc:ID',
    bt: 'BT-71',
    name: 'Delivery Location ID',
    category: 'Payment & Delivery',
    req: { ae: 'optional', om: 'optional' },
    rules: {
      ae: 'GLN (Global Location Number) or custom code identifying delivery location.',
      om: 'GLN (Global Location Number) or custom code identifying delivery location.'
    }
  },

  // --- TAX CATEGORY ---
  {
    path: 'cac:TaxTotal/cbc:TaxAmount',
    bt: 'BT-110',
    name: 'Total VAT Amount',
    category: 'Tax',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The sum of all VAT category tax amounts, calculated in the national reporting currency (AED).',
      om: 'The sum of all VAT category tax amounts, calculated in the national reporting currency (OMR).'
    }
  },
  {
    path: 'cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount',
    bt: 'BT-116',
    name: 'VAT Category Taxable Amount',
    category: 'Tax',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The net sum of line extension amounts subject to a specific VAT category rate.',
      om: 'The net sum of line extension amounts subject to a specific VAT category rate.'
    }
  },
  {
    path: 'cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:ID',
    bt: 'BT-118',
    name: 'VAT Category Code',
    category: 'Tax',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Must use codes: S (Standard Rated), Z (Zero-Rated), E (Exempt), O (Out of Scope).',
      om: 'Must use codes: S (Standard Rated), Z (Zero-Rated), E (Exempt), O (Out of Scope).'
    }
  },
  {
    path: 'cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:Percent',
    bt: 'BT-119',
    name: 'VAT Category Rate Percent',
    category: 'Tax',
    req: { ae: 'conditional', om: 'conditional' },
    rules: {
      ae: 'Mandatory if VAT Category is "S" (must be exactly 5) or "Z" / "O" / "E" (must be exactly 0).',
      om: 'Mandatory if VAT Category is "S" (must be exactly 5) or "Z" / "O" / "E" (must be exactly 0).'
    }
  },

  // --- TOTALS CATEGORY ---
  {
    path: 'cac:LegalMonetaryTotal/cbc:LineExtensionAmount',
    bt: 'BT-106',
    name: 'Sum of Line Extension Amount',
    category: 'Totals',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Sum of all invoice line net amounts. Excluding VAT and discounts.',
      om: 'Sum of all invoice line net amounts. Excluding VAT and discounts.'
    }
  },
  {
    path: 'cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount',
    bt: 'BT-109',
    name: 'Tax Exclusive Amount',
    category: 'Totals',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Total invoice amount excluding VAT. Must equal LineExtensionAmount minus allowances plus charges.',
      om: 'Total invoice amount excluding VAT. Must equal LineExtensionAmount minus allowances plus charges.'
    }
  },
  {
    path: 'cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount',
    bt: 'BT-112',
    name: 'Tax Inclusive Amount',
    category: 'Totals',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Total invoice amount including VAT. Must equal TaxExclusiveAmount plus total TaxAmount.',
      om: 'Total invoice amount including VAT. Must equal TaxExclusiveAmount plus total TaxAmount.'
    }
  },
  {
    path: 'cac:LegalMonetaryTotal/cbc:PayableAmount',
    bt: 'BT-115',
    name: 'Amount Due For Payment',
    category: 'Totals',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Total payable amount. Must equal TaxInclusiveAmount minus prepayments.',
      om: 'Total payable amount. Must equal TaxInclusiveAmount minus prepayments.'
    }
  },

  // --- LINES CATEGORY ---
  {
    path: 'cac:InvoiceLine/cbc:ID',
    bt: 'BT-126',
    name: 'Line ID',
    category: 'Lines',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'A unique sequential string identifying the invoice line. Recommended starting from "1".',
      om: 'A unique sequential string identifying the invoice line. Recommended starting from "1".'
    }
  },
  {
    path: 'cac:InvoiceLine/cbc:InvoicedQuantity',
    bt: 'BT-129',
    name: 'Invoiced Quantity',
    category: 'Lines',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The quantity of items or services supplied in this line.',
      om: 'The quantity of items or services supplied in this line.'
    }
  },
  {
    path: 'cac:InvoiceLine/cbc:LineExtensionAmount',
    bt: 'BT-131',
    name: 'Line Net Amount',
    category: 'Lines',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The net amount of the line (Quantity * UnitPrice minus line discount).',
      om: 'The net amount of the line (Quantity * UnitPrice minus line discount).'
    }
  },
  {
    path: 'cac:InvoiceLine/cac:Price/cbc:PriceAmount',
    bt: 'BT-146',
    name: 'Item Net Price',
    category: 'Lines',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'The price of a single item unit, net of item discounts.',
      om: 'The price of a single item unit, net of item discounts.'
    }
  },
  {
    path: 'cac:InvoiceLine/cac:Item/cbc:Name',
    bt: 'BT-153',
    name: 'Item Name',
    category: 'Lines',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Brief description or commercial name of the item or service.',
      om: 'Brief description or commercial name of the item or service.'
    }
  },
  {
    path: 'cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory/cbc:ID',
    bt: 'BT-151',
    name: 'Line VAT Category Code',
    category: 'Lines',
    req: { ae: 'mandatory', om: 'mandatory' },
    rules: {
      ae: 'Must use codes: S, Z, E, O corresponding to the line item VAT rate.',
      om: 'Must use codes: S, Z, E, O corresponding to the line item VAT rate.'
    }
  }
];

// Helper functions for statistics
export const getStats = () => {
  return {
    ae: {
      mandatory: 53,
      total: 189
    },
    om: {
      mandatory: 73,
      total: 213
    }
  };
};
