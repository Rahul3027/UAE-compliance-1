(()=>{var e={};e.id=8913,e.ids=[8913],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},626:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c}),r(2166),r(4160),r(3972),r(509),r(8199),r(546);var s=r(170),a=r(5002),n=r(3876),i=r.n(n),o=r(6299),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["(platform)",{children:["developer-learning-center",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2166)),"D:\\UAE-compliance\\app\\(platform)\\developer-learning-center\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,4160)),"D:\\UAE-compliance\\app\\(platform)\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,3972)),"D:\\UAE-compliance\\app\\layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,509)),"D:\\UAE-compliance\\app\\error.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,8199)),"D:\\UAE-compliance\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,546)),"D:\\UAE-compliance\\app\\not-found.tsx"]}],d=["D:\\UAE-compliance\\app\\(platform)\\developer-learning-center\\page.tsx"],p="/(platform)/developer-learning-center/page",x={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(platform)/developer-learning-center/page",pathname:"/developer-learning-center",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},9860:(e,t,r)=>{Promise.resolve().then(r.bind(r,3926))},3926:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var s=r(7247),a=r(8964),n=r(4142),i=r(4198),o=r(138),l=r(8235),c=r(6378),d=r(8799),p=r(1625),x=r(7266),m=r(2920),h=r(4747);function u(){let{completeModule:e,completedModules:t,country:r}=(0,n.W)(),[u,g]=(0,a.useState)(!1),[y,f]=(0,a.useState)("node"),[b,v]=(0,a.useState)(!1),[P,j]=(0,a.useState)({trn:!1,tls:!1,schema:!1,smp:!1,callbacks:!1}),k=u&&t.includes("developer-learning-center"),w=u&&"om"===r,N=e=>{j({...P,[e]:!P[e]})},A={node:`// Node.js - Validate PEPPOL PINT XML via API
const fs = require('fs');
const axios = require('axios');

async function checkCompliance() {
  const xmlData = fs.readFileSync('invoice.xml', 'utf8');
  
  try {
    const response = await axios.post('https://api.compliance.intelligence/v1/validate', xmlData, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/xml',
        'X-Country-Code': '${w?"OM":"AE"}'
      }
    });
    
    console.log('Status:', response.data.status); // "COMPLIANT" or "FAILED"
    if (response.data.errors && response.data.errors.length > 0) {
      console.log('Validation Errors:', response.data.errors);
    }
  } catch (err) {
    console.error('API Handshake Error:', err.message);
  }
}

checkCompliance();`,python:`# Python - Validate PEPPOL PINT XML via requests
import requests

def check_compliance(xml_file_path):
    with open(xml_file_path, 'r', encoding='utf-8') as f:
        xml_data = f.read()
        
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/xml',
        'X-Country-Code': '${w?"OM":"AE"}'
    }
    
    response = requests.post(
        'https://api.compliance.intelligence/v1/validate',
        data=xml_data,
        headers=headers
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"Compliance Status: {result['status']}")
        for error in result.get('errors', []):
            print(f"[{error['severity']}] {error['id']}: {error['message']} (Line {error['line']})")
    else:
        print(f"HTTP Connection Error: {response.status_code}")

check_compliance('invoice.xml')`,go:`// Go - Verify PEPPOL PINT XML Payload
package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	xmlBytes, err := os.ReadFile("invoice.xml")
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", "https://api.compliance.intelligence/v1/validate", bytes.NewBuffer(xmlBytes))
	if err != nil {
		panic(err)
	}

	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	req.Header.Set("Content-Type", "application/xml")
	req.Header.Set("X-Country-Code", "${w?"OM":"AE"}")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println("API Response:", string(body))
}`};return(0,s.jsxs)("div",{className:"space-y-12 pb-12",children:[(0,s.jsxs)("div",{className:"space-y-3",children:[s.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-accent font-semibold",children:"Track 4: Hands-On Practice"}),s.jsx("h1",{className:"apple-h1",children:"Developer Implementation Center"}),(0,s.jsxs)("p",{className:"text-sm text-textSecondary max-w-xl leading-relaxed",children:["Ready for production? Complete the go-live readiness checklist and integrate our production SDK templates to audit your PEPPOL PINT ",w?"OM":"AE"," pipeline."]})]}),(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("h3",{className:"text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2",children:[s.jsx(l.Z,{className:"w-4 h-4 text-accent"})," Go-Live Readiness Audit"]}),(0,s.jsxs)("p",{className:"text-xs text-textSecondary leading-relaxed",children:["Review and check off compliance targets. Audit the entire implementation stack from registration ",w?"VATINs":"TRNs"," down to AS4 networking."]}),s.jsx("div",{className:"space-y-2",children:[{key:"trn",label:w?"Validate VAT Identification Numbers (VATIN)":"Validate Tax Registration Numbers (TRN)",desc:w?"Assert that all supplier and customer VATINs follow the Omani format: OM followed by exactly 10 digits.":"Assert that all supplier and customer TRNs contain exactly 15 digits."},{key:"tls",label:"Verify Access Point TLS/AS4 certificates",desc:"Secure connection tunnels between C2 and C3 with valid PEPPOL PKI certificates."},{key:"schema",label:"Integrate Schematron Validator",desc:w?"Ensure invoices pass the custom Omani (Fawtara) rules locally before transmitting to the AP network.":"Ensure invoices pass the custom UAE rules locally before transmitting to the AP network."},{key:"smp",label:"Verify SMP participant entries",desc:"Confirm receiving buyer accounts are correctly queried in SML/SMP registries."},{key:"callbacks",label:"Configure callback status hooks",desc:"Ensure ApplicationResponses (Acceptances, Disputes) route correctly back into core ERP logs."}].map(e=>{let t=P[e.key];return(0,s.jsxs)("button",{onClick:()=>N(e.key),className:`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${t?"border-green-500/20 bg-green-500/[0.01] text-textPrimary":"border-white/[0.06] bg-white/[0.01] text-textSecondary hover:bg-white/[0.02] hover:border-white/[0.1]"}`,children:[s.jsx("div",{className:"pt-0.5 shrink-0",children:s.jsx("div",{className:`w-4 h-4 rounded border flex items-center justify-center transition-all ${t?"bg-green-500 border-green-500 text-black":"border-white/30"}`,children:t&&s.jsx("span",{className:"text-[9px] font-bold",children:"✓"})})}),(0,s.jsxs)("div",{className:"space-y-0.5",children:[s.jsx("h4",{className:`text-xs font-semibold ${t?"text-green-400":"text-textPrimary"}`,children:e.label}),s.jsx("p",{className:"text-[11px] text-textSecondary leading-relaxed",children:e.desc})]})]},e.key)})})]}),(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("h3",{className:"text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2",children:[s.jsx(c.Z,{className:"w-4 h-4 text-accent"})," Production SDK Examples"]}),s.jsx("p",{className:"text-xs text-textSecondary leading-relaxed",children:"Integrate the validation engine natively into your middleware using the lightweight API clients below."}),(0,s.jsxs)("div",{className:"space-y-3",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center bg-white/[0.02] border border-white/[0.06] p-1 rounded-lg",children:[s.jsx("div",{className:"flex gap-1.5 font-mono",children:["node","python","go"].map(e=>s.jsx("button",{onClick:()=>f(e),className:`px-3 py-1 rounded text-[10px] uppercase font-semibold transition-all ${y===e?"bg-accent/10 text-accent font-bold":"text-textSecondary hover:text-textPrimary"}`,children:"node"===e?"Node.js":e},e))}),s.jsx("button",{onClick:()=>{navigator.clipboard.writeText(A[y]),v(!0),setTimeout(()=>v(!1),2e3)},className:"text-textSecondary hover:text-accent font-mono text-[10px] flex items-center gap-1 px-3 py-1 rounded hover:bg-white/[0.04] transition-all",children:b?(0,s.jsxs)(s.Fragment,{children:[s.jsx(d.Z,{className:"w-3.5 h-3.5 text-green-400"})," Copied!"]}):(0,s.jsxs)(s.Fragment,{children:[s.jsx(p.Z,{className:"w-3.5 h-3.5"})," Copy Code"]})})]}),(0,s.jsxs)("div",{className:"rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden",children:[(0,s.jsxs)("div",{className:"bg-[#121214] px-4 py-2 border-b border-white/[0.06] flex items-center gap-1.5 text-[10px] font-mono text-textSecondary",children:[s.jsx(x.Z,{className:"w-3.5 h-3.5 text-accent"}),s.jsx("span",{children:"node"===y?"index.js":"python"===y?"validator.py":"main.go"})]}),s.jsx("pre",{className:"p-4 overflow-auto text-[10.5px] font-mono text-[#dcdcdc] leading-relaxed max-h-[350px]",children:s.jsx("code",{children:A[y]})})]})]})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("h3",{className:"text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2",children:[s.jsx(m.Z,{className:"w-4 h-4 text-accent"})," Production Best Practices"]}),(0,s.jsxs)("div",{className:"apple-panel p-5 space-y-3 text-xs leading-relaxed text-textSecondary",children:[s.jsx("p",{children:"• **Asynchronous Responses**: Treat invoice delivery as decoupled from invoice approvals. Always handle callbacks via decoupled API listeners rather than locking browser sessions."}),(0,s.jsxs)("p",{children:["• **Audit Archiving**: Invoices must be archived in their original, cryptographically signed XML format for a minimum of 10 years (or as regulated by ",w?"OTA":"FTA"," guidelines)."]}),s.jsx("p",{children:"• **Fail-safes**: Implement robust queue mechanisms to store and retry transfers if SML lookups or network handshakes experience intermittent timeouts."})]})]}),(0,s.jsxs)("div",{className:"space-y-6",children:[s.jsx("h3",{className:"text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2",children:"Check Your Knowledge"}),s.jsx(o.Y,{moduleId:"developer-learning-center",questions:i.e["developer-learning-center"],onComplete:()=>e("developer-learning-center",150)})]}),k&&s.jsx("div",{className:"apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]",children:(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[s.jsx(h.Z,{className:"w-5 h-5 text-green-400"}),(0,s.jsxs)("div",{children:[s.jsx("p",{className:"text-xs font-semibold text-textPrimary",children:"Module Completed"}),s.jsx("p",{className:"text-[10px] text-textSecondary",children:"You earned 150 XP for auditing your e-invoicing architecture and completing the implementation check."})]})]})})]})}},6378:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6323).Z)("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]])},1625:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6323).Z)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},2920:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6323).Z)("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]])},8235:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6323).Z)("SquareCheckBig",[["path",{d:"M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5",key:"1uzm8b"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},7266:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(6323).Z)("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]])},2166:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(5347).createProxy)(String.raw`D:\UAE-compliance\app\(platform)\developer-learning-center\page.tsx#default`)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9379,5164,363,8948,2604],()=>r(626));module.exports=s})();