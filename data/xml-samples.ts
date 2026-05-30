export interface XmlSample {
  id: string;
  name: string;
  description: string;
  code: string;
}

export const xmlSamples: XmlSample[] = [
  {
    id: 'standard-invoice',
    name: 'Standard B2B Tax Invoice (AED)',
    description: 'A standard compliance invoice issued by a UAE supplier to a UAE buyer, with 5% VAT in local currency.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<!-- UBL 2.1 UAE PEPPOL PINT AE Invoice -->
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <!-- PINT AE Profile ID & Customization ID -->
    <cbc:CustomizationID>urn:peppol:pint:billing-ae:1.0</cbc:CustomizationID>
    <cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
    <cbc:ID>INV-2026-0042</cbc:ID>
    <cbc:IssueDate>2026-05-30</cbc:IssueDate>
    <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>AED</cbc:DocumentCurrencyCode>

    <!-- Supplier Information (C1) -->
    <cac:AccountingSupplierParty>
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
                <!-- Required 15-digit UAE TRN -->
                <cbc:CompanyID>100234567800003</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
        </cac:Party>
    </cac:AccountingSupplierParty>

    <!-- Buyer Information (C4) -->
    <cac:AccountingCustomerParty>
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
                <!-- Buyer TRN -->
                <cbc:CompanyID>100876543200003</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
        </cac:Party>
    </cac:AccountingCustomerParty>

    <!-- Tax Total Breakdown -->
    <cac:TaxTotal>
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
    </cac:TaxTotal>

    <!-- Legal Monetary Totals -->
    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount>3000.00</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount>3000.00</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount>3150.00</cbc:TaxInclusiveAmount>
        <cbc:PayableAmount>3150.00</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>

    <!-- Invoice Line Details -->
    <cac:InvoiceLine>
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
    </cac:InvoiceLine>
</Invoice>`
  },
  {
    id: 'simplified-invoice',
    name: 'Simplified B2C Invoice (AED)',
    description: 'A simplified e-invoice typically generated for retail consumers where the buyer\'s TRN is not required.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<!-- UBL 2.1 UAE PEPPOL PINT AE Simplified Invoice -->
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:CustomizationID>urn:peppol:pint:billing-ae:1.0</cbc:CustomizationID>
    <cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>
    <cbc:ID>SIM-2026-9081</cbc:ID>
    <cbc:IssueDate>2026-05-30</cbc:IssueDate>
    <!-- 388 represents a Tax Invoice / Simplified Retail Invoice -->
    <cbc:InvoiceTypeCode>388</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>AED</cbc:DocumentCurrencyCode>

    <!-- Supplier Information -->
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>Dubai Mall Superstore LLC</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>Financial Center Road</cbc:StreetName>
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
    </cac:AccountingSupplierParty>

    <!-- Buyer (No TRN is required for B2C consumer) -->
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>Individual Retail Consumer</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cac:Country>
                    <cbc:IdentificationCode>AE</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
        </cac:Party>
    </cac:AccountingCustomerParty>

    <cac:TaxTotal>
        <cbc:TaxAmount>10.00</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount>200.00</cbc:TaxableAmount>
            <cbc:TaxAmount>10.00</cbc:TaxAmount>
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
        <cbc:LineExtensionAmount>200.00</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount>200.00</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount>210.00</cbc:TaxInclusiveAmount>
        <cbc:PayableAmount>210.00</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>

    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID>
        <cbc:InvoicedQuantity unitCode="EA">2</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount>200.00</cbc:LineExtensionAmount>
        <cac:Item>
            <cbc:Name>Mechanical Keyboard (Arabic/English Layout)</cbc:Name>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>5</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount>100.00</cbc:PriceAmount>
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>`
  }
];
