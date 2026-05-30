(()=>{var e={};e.id=793,e.ids=[793],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9577:(e,c,a)=>{"use strict";a.r(c),a.d(c,{GlobalError:()=>s.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>d,routeModule:()=>x,tree:()=>l}),a(802),a(4160),a(996),a(4403);var t=a(170),n=a(5002),i=a(3876),s=a.n(i),r=a(6299),o={};for(let e in r)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>r[e]);a.d(c,o);let l=["",{children:["(platform)",{children:["validation-engine-simulator",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,802)),"D:\\UAE-compliance\\app\\(platform)\\validation-engine-simulator\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,4160)),"D:\\UAE-compliance\\app\\(platform)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,996,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,4403)),"D:\\UAE-compliance\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,996,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\UAE-compliance\\app\\(platform)\\validation-engine-simulator\\page.tsx"],m="/(platform)/validation-engine-simulator/page",u={require:a,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/(platform)/validation-engine-simulator/page",pathname:"/validation-engine-simulator",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},7187:(e,c,a)=>{Promise.resolve().then(a.bind(a,481))},9726:(e,c,a)=>{Promise.resolve().then(a.bind(a,7636))},6285:(e,c,a)=>{Promise.resolve().then(a.t.bind(a,3642,23)),Promise.resolve().then(a.t.bind(a,7586,23)),Promise.resolve().then(a.t.bind(a,7838,23)),Promise.resolve().then(a.t.bind(a,8057,23)),Promise.resolve().then(a.t.bind(a,7741,23)),Promise.resolve().then(a.t.bind(a,3118,23))},8688:()=>{},481:(e,c,a)=>{"use strict";a.r(c),a.d(c,{default:()=>x});var t=a(7247),n=a(8964),i=a(4142),s=a(6323);let r=(0,s.Z)("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);var o=a(721),l=a(8799);let d=(0,s.Z)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);var m=a(4747);let u=[{id:"standard-invoice",name:"Standard B2B Tax Invoice (AED)",description:"A standard compliance invoice issued by a UAE supplier to a UAE buyer, with 5% VAT in local currency.",code:`<?xml version="1.0" encoding="UTF-8"?>
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
</Invoice>`},{id:"simplified-invoice",name:"Simplified B2C Invoice (AED)",description:"A simplified e-invoice typically generated for retail consumers where the buyer's TRN is not required.",code:`<?xml version="1.0" encoding="UTF-8"?>
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
</Invoice>`}];function x(){let{completeModule:e,completedModules:c}=(0,i.W)(),[a,s]=(0,n.useState)(!1),[x,p]=(0,n.useState)(""),[b,h]=(0,n.useState)(!1),[y,f]=(0,n.useState)(null),g=a&&c.includes("validation-engine-simulator");return(0,t.jsxs)("div",{className:"space-y-12 pb-12",children:[(0,t.jsxs)("div",{className:"space-y-3",children:[t.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-accent font-semibold",children:"Track 4: Hands-On Practice"}),t.jsx("h1",{className:"apple-h1",children:"Validation Engine Simulator"}),t.jsx("p",{className:"text-sm text-textSecondary max-w-xl leading-relaxed",children:"Test XML payloads against UAE Schematron rules. Paste your own UBL invoice XML or load templates with intentional errors to see the validator block delivery."})]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[t.jsx("button",{onClick:()=>{p(u[0].code),f(null)},className:"btn-apple-secondary text-[10px] py-1.5",children:"Load Standard Invoice"}),t.jsx("button",{onClick:()=>{p(u[0].code.replace("100234567800003","1002345")),f(null)},className:"btn-apple-secondary text-[10px] py-1.5 text-red-400 border-red-500/20",children:"Load Invalid TRN (Failure)"}),t.jsx("button",{onClick:()=>{p(u[0].code.replace("urn:peppol:pint:billing-ae:1.0","urn:peppol:pint:billing-eu:1.0")),f(null)},className:"btn-apple-secondary text-[10px] py-1.5 text-red-400 border-red-500/20",children:"Load Invalid Customization ID (Failure)"})]}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-[1.2fr_1fr] gap-6 items-start",children:[(0,t.jsxs)("div",{className:"rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden",children:[(0,t.jsxs)("div",{className:"bg-[#121214] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between",children:[(0,t.jsxs)("span",{className:"text-[10px] font-mono text-textSecondary flex items-center gap-1.5",children:[t.jsx(r,{className:"w-3.5 h-3.5"})," UBL XML Editor"]}),(0,t.jsxs)("button",{onClick:()=>{h(!0),f(null),setTimeout(()=>{let c=[],a=x.includes("urn:peppol:pint:billing-ae:1.0");c.push({id:"AE-VAL-001",name:"UAE Customization Specification Match",status:a?"pass":"fail",msg:a?"CustomizationID matches UAE PINT billing specifications.":'FATAL: CustomizationID must be exactly "urn:peppol:pint:billing-ae:1.0".'});let t=x.match(/<cac:AccountingSupplierParty>[\s\S]*?<\/cac:AccountingSupplierParty>/),n=null;if(t){let e=t[0].match(/<cbc:CompanyID>(.*?)<\/cbc:CompanyID>/);e&&(n=e[1])}let i=n&&/^\d{15}$/.test(n);c.push({id:"UAE-R-002",name:"Supplier Tax Registration Number (TRN) Format",status:i?"pass":"fail",msg:i?`Supplier TRN "${n}" contains exactly 15 digits.`:`FATAL: TRN must be exactly 15 digits. Found: "${n||"None"}"`});let s=x.match(/<cbc:InvoiceTypeCode>(.*?)<\/cbc:InvoiceTypeCode>/),r=s?s[1]:"",o=["380","381","388","480"].includes(r);c.push({id:"UAE-R-008",name:"UBL Document Type Code validation",status:o?"pass":"fail",msg:o?`Document Type code "${r}" is supported in the UAE.`:`FATAL: Document Type code "${r||"None"}" is unsupported. Use 380, 381, 388, or 480.`});let l=x.match(/<cbc:DocumentCurrencyCode>(.*?)<\/cbc:DocumentCurrencyCode>/),d=l?l[1]:"",m="AED"===d||x.includes("<cbc:TaxCurrencyCode>AED</cbc:TaxCurrencyCode>");c.push({id:"UAE-R-003",name:"Mandatory UAE Dirham (AED) Reporting",status:m?"pass":"fail",msg:m?`Document reports in standard UAE currency: "${d||"AED"}".`:"FATAL: The invoice must report in AED or include a TaxCurrencyCode converting foreign totals to AED."}),f(c),h(!1),c.every(e=>"pass"===e.status)&&e&&e("validation-engine-simulator",150)},1200)},disabled:b||!x,className:"btn-apple-primary text-[10px] px-4 py-1 flex items-center gap-1.5 disabled:opacity-40",children:[t.jsx(o.Z,{className:"w-3 h-3"})," Validate XML"]})]}),t.jsx("textarea",{value:x,onChange:e=>p(e.target.value),spellCheck:!1,className:"w-full h-[400px] p-4 bg-black text-[#dcdcdc] font-mono text-[11px] leading-relaxed resize-none focus:outline-none"})]}),t.jsx("div",{className:"space-y-4",children:(0,t.jsxs)("div",{className:"apple-panel p-5 space-y-4 min-h-[300px]",children:[t.jsx("h4",{className:"text-xs font-semibold text-textPrimary",children:"Validation Report"}),b&&(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center py-12 space-y-3 font-mono text-xs text-textSecondary",children:[t.jsx("div",{className:"w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"}),t.jsx("span",{children:"Running Schematron Assertions..."})]}),!b&&null===y&&t.jsx("p",{className:"text-xs text-textSecondary leading-relaxed text-center py-12",children:'Click "Validate XML" to audit the editor contents against UAE compliance constraints.'}),!b&&null!==y&&(0,t.jsxs)("div",{className:"space-y-3",children:[y.map(e=>(0,t.jsxs)("div",{className:`p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-3 ${"pass"===e.status?"border-green-500/10 bg-green-500/[0.01] text-green-400":"border-red-500/10 bg-red-500/[0.01] text-red-400"}`,children:[t.jsx("div",{className:"shrink-0 mt-0.5",children:"pass"===e.status?t.jsx(l.Z,{className:"w-4 h-4"}):t.jsx(d,{className:"w-4 h-4"})}),(0,t.jsxs)("div",{className:"space-y-0.5",children:[(0,t.jsxs)("p",{className:"font-semibold text-textPrimary",children:[e.name," (",e.id,")"]}),t.jsx("p",{className:"text-textSecondary text-[11px]",children:e.msg})]})]},e.id)),y.every(e=>"pass"===e.status)?t.jsx("div",{className:"p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center text-xs font-semibold",children:"Success: Invoice matches UAE compliance requirements!"}):t.jsx("div",{className:"p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center text-xs font-semibold",children:"Failed: Correct the errors in the XML and validate again."})]})]})})]}),g&&t.jsx("div",{className:"apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[t.jsx(m.Z,{className:"w-5 h-5 text-green-400"}),(0,t.jsxs)("div",{children:[t.jsx("p",{className:"text-xs font-semibold text-textPrimary",children:"Module Completed"}),t.jsx("p",{className:"text-[10px] text-textSecondary",children:"You earned 150 XP for verifying a fully compliant invoice."})]})]})})]})}},7636:(e,c,a)=>{"use strict";a.d(c,{PlatformShell:()=>y});var t=a(7247),n=a(9906),i=a(4178);let s=[{groupLabel:"Getting Started",items:[{label:"Dashboard",href:"/dashboard",moduleId:"dashboard"},{label:"UAE E-Invoicing Overview",href:"/uae-overview",moduleId:"uae-overview"},{label:"PEPPOL 5-Corner Model",href:"/peppol-5-corner",moduleId:"peppol-5-corner"},{label:"Glossary & Terms",href:"/glossary-technical-terms",moduleId:"glossary-technical-terms"}]},{groupLabel:"Core Concepts",items:[{label:"PINT AE Architecture",href:"/pint-ae-architecture",moduleId:"pint-ae-architecture"},{label:"E-Invoice Lifecycle",href:"/invoice-lifecycle",moduleId:"invoice-lifecycle"},{label:"UAE VAT & Tax Logic",href:"/tax-logic-visualization",moduleId:"tax-logic-visualization"}]},{groupLabel:"Technical Deep-Dives",items:[{label:"XML Structure Explorer",href:"/xml-structure-explorer",moduleId:"xml-structure-explorer"},{label:"Business Rules Explorer",href:"/business-rules-explorer",moduleId:"business-rules-explorer"},{label:"API & Data Flow",href:"/api-data-flow",moduleId:"api-data-flow"},{label:"ASP Communication Flow",href:"/asp-communication-flow",moduleId:"asp-communication-flow"},{label:"Response Status Lifecycle",href:"/response-status-lifecycle",moduleId:"response-status-lifecycle"}]},{groupLabel:"Hands-On Practice",items:[{label:"Validation Simulator",href:"/validation-engine-simulator",moduleId:"validation-engine-simulator"},{label:"Sandbox Testing Center",href:"/sandbox-testing-center",moduleId:"sandbox-testing-center"},{label:"Error Rejection Debugger",href:"/error-rejection-simulator",moduleId:"error-rejection-simulator"},{label:"ERP Integration Center",href:"/erp-integration-center",moduleId:"erp-integration-center"},{label:"Developer Learning Center",href:"/developer-learning-center",moduleId:"developer-learning-center"}]}];var r=a(8964),o=a(4142),l=a(5571),d=a(1621),m=a(8339),u=a(4747),x=a(7013),p=a(6683),b=a(7078),h=a(165);function y({children:e}){let c=(0,i.usePathname)(),{completedModules:a,xp:y,resetProgress:f}=(0,o.W)(),[g,v]=(0,r.useState)(!1),[A,I]=(0,r.useState)(!1),P=()=>v(!1),C=(0,t.jsxs)("div",{className:"flex flex-col h-full bg-[#09090b] border-r border-white/[0.06] text-[#f5f5f7]",children:[t.jsx("div",{className:"p-5 border-b border-white/[0.06] flex items-center justify-between",children:(0,t.jsxs)(n.default,{href:"/dashboard",className:"flex items-center gap-2",onClick:P,children:[t.jsx(l.Z,{className:"w-5 h-5 text-accent"}),t.jsx("span",{className:"font-semibold text-sm tracking-tight font-sans",children:"UAE PEPPOL Lab"})]})}),A&&(0,t.jsxs)("div",{className:"px-5 py-4 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[t.jsx(d.Z,{className:"w-4 h-4 text-accent"}),(0,t.jsxs)("span",{className:"text-xs font-medium text-textSecondary font-mono",children:[y," XP"]})]}),(0,t.jsxs)("button",{onClick:()=>{confirm("Are you sure you want to reset all compliance progress?")&&f()},className:"text-[10px] text-textSecondary/60 hover:text-red-400 flex items-center gap-1 transition-colors",title:"Reset Progress",children:[t.jsx(m.Z,{className:"w-2.5 h-2.5"}),"Reset"]})]}),t.jsx("nav",{className:"flex-1 overflow-y-auto px-3 py-4 space-y-6",children:s.map(e=>(0,t.jsxs)("div",{className:"space-y-1.5",children:[t.jsx("h3",{className:"px-3 text-[10px] font-semibold text-textSecondary/50 uppercase tracking-widest font-mono",children:e.groupLabel}),t.jsx("div",{className:"space-y-0.5",children:e.items.map(e=>{let i=c===e.href,s=A&&a.includes(e.moduleId);return(0,t.jsxs)(n.default,{href:e.href,onClick:P,className:`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${i?"bg-white/[0.06] text-textPrimary font-medium border-l-2 border-accent":"text-textSecondary hover:bg-white/[0.03] hover:text-textPrimary"}`,children:[t.jsx("span",{className:"truncate pr-2",children:e.label}),s&&t.jsx(u.Z,{className:"w-3.5 h-3.5 text-green-400 shrink-0"})]},e.href)})})]},e.groupLabel))})]});return(0,t.jsxs)("div",{className:"min-h-screen flex flex-col md:grid md:grid-cols-[260px_1fr] bg-black text-[#f5f5f7]",children:[(0,t.jsxs)("header",{className:"md:hidden flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-[#09090b] sticky top-0 z-40",children:[(0,t.jsxs)(n.default,{href:"/dashboard",className:"flex items-center gap-2",children:[t.jsx(l.Z,{className:"w-4 h-4 text-accent"}),t.jsx("span",{className:"font-semibold text-xs tracking-tight",children:"UAE PEPPOL Lab"})]}),t.jsx("button",{onClick:()=>v(!g),className:"text-textPrimary hover:text-accent transition-colors",children:g?t.jsx(x.Z,{className:"w-5 h-5"}):t.jsx(p.Z,{className:"w-5 h-5"})})]}),t.jsx("aside",{className:"hidden md:block sticky top-0 h-screen overflow-hidden",children:C}),t.jsx(b.M,{children:g&&t.jsx(h.E.div,{initial:{opacity:0,x:-50},animate:{opacity:1,x:0},exit:{opacity:0,x:-50},transition:{duration:.2},className:"fixed inset-0 top-[53px] z-30 md:hidden overflow-hidden",children:C})}),t.jsx("main",{className:"w-full flex-1 overflow-x-hidden p-6 md:p-10 max-w-4xl mx-auto",children:t.jsx("div",{className:"space-y-12",children:e})})]})}},4142:(e,c,a)=>{"use strict";a.d(c,{W:()=>i});var t=a(9713),n=a(2377);let i=(0,t.U)()((0,n.tJ)(e=>({completedModules:[],xp:0,quizScores:{},completeModule:(c,a=100)=>e(e=>e.completedModules.includes(c)?{}:{completedModules:[...e.completedModules,c],xp:e.xp+a}),saveQuizScore:(c,a,t)=>e(e=>{let n=e.quizScores[c],i=a-(n?.score||0);return{quizScores:{...e.quizScores,[c]:{score:a,total:t}},xp:e.xp+(n?i>0?50*i:0:50*a)}}),resetProgress:()=>e({completedModules:[],xp:0,quizScores:{}})}),{name:"uae-compliance-learning-progress"}))},8799:(e,c,a)=>{"use strict";a.d(c,{Z:()=>t});let t=(0,a(6323).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},721:(e,c,a)=>{"use strict";a.d(c,{Z:()=>t});let t=(0,a(6323).Z)("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]])},4160:(e,c,a)=>{"use strict";a.r(c),a.d(c,{default:()=>i});var t=a(2051);let n=(0,a(5347).createProxy)(String.raw`D:\UAE-compliance\components\layout\platform-shell.tsx#PlatformShell`);function i({children:e}){return t.jsx(n,{children:e})}},802:(e,c,a)=>{"use strict";a.r(c),a.d(c,{default:()=>t});let t=(0,a(5347).createProxy)(String.raw`D:\UAE-compliance\app\(platform)\validation-engine-simulator\page.tsx#default`)},4403:(e,c,a)=>{"use strict";a.r(c),a.d(c,{default:()=>i,metadata:()=>n});var t=a(2051);a(7633);let n={title:"UAE PEPPOL PINT AE Learning Platform",description:"Interactive compliance learning platform"};function i({children:e}){return t.jsx("html",{lang:"en",className:"dark",children:t.jsx("body",{children:e})})}},7633:()=>{}};var c=require("../../../webpack-runtime.js");c.C(e);var a=e=>c(c.s=e),t=c.X(0,[138,697],()=>a(9577));module.exports=t})();