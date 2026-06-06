'use client';
import { useEffect, useState } from 'react';
import { useLearningStore } from '@/hooks/use-learning-store';
import { quizzes } from '@/data/quiz-data';
import { QuizCard } from '@/components/ui/quiz-card';
import { CheckCircle2, ShieldAlert, CheckSquare, Code2, Terminal, Copy, Check } from 'lucide-react';

export default function DevLearningCenter() {
  const { completeModule, completedModules, country } = useLearningStore();
  const [mounted, setMounted] = useState(false);
  const [activeSdk, setActiveSdk] = useState<'node' | 'python' | 'go'>('node');
  const [copied, setCopied] = useState(false);

  // Checklist states
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({
    trn: false,
    tls: false,
    schema: false,
    smp: false,
    callbacks: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && completedModules.includes('developer-learning-center');
  const isOman = mounted && country === 'om';

  const toggleCheck = (key: string) => {
    const updated = { ...checkedList, [key]: !checkedList[key] };
    setCheckedList(updated);
  };

  const checklistItems = [
    { 
      key: 'trn', 
      label: isOman ? 'Validate VAT Identification Numbers (VATIN)' : 'Validate Tax Registration Numbers (TRN)', 
      desc: isOman 
        ? 'Assert that all supplier and customer VATINs follow the Omani format: OM followed by exactly 10 digits.' 
        : 'Assert that all supplier and customer TRNs contain exactly 15 digits.' 
    },
    { key: 'tls', label: 'Verify Access Point TLS/AS4 certificates', desc: 'Secure connection tunnels between C2 and C3 with valid PEPPOL PKI certificates.' },
    { 
      key: 'schema', 
      label: 'Integrate Schematron Validator', 
      desc: isOman 
        ? 'Ensure invoices pass the custom Omani (Fawtara) rules locally before transmitting to the AP network.' 
        : 'Ensure invoices pass the custom UAE rules locally before transmitting to the AP network.' 
    },
    { key: 'smp', label: 'Verify SMP participant entries', desc: 'Confirm receiving buyer accounts are correctly queried in SML/SMP registries.' },
    { key: 'callbacks', label: 'Configure callback status hooks', desc: 'Ensure ApplicationResponses (Acceptances, Disputes) route correctly back into core ERP logs.' }
  ];

  const sdkCode = {
    node: `// Node.js - Validate PEPPOL PINT XML via API
const fs = require('fs');
const axios = require('axios');

async function checkCompliance() {
  const xmlData = fs.readFileSync('invoice.xml', 'utf8');
  
  try {
    const response = await axios.post('https://api.compliance.intelligence/v1/validate', xmlData, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/xml',
        'X-Country-Code': '${isOman ? 'OM' : 'AE'}'
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

checkCompliance();`,
    python: `# Python - Validate PEPPOL PINT XML via requests
import requests

def check_compliance(xml_file_path):
    with open(xml_file_path, 'r', encoding='utf-8') as f:
        xml_data = f.read()
        
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/xml',
        'X-Country-Code': '${isOman ? 'OM' : 'AE'}'
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

check_compliance('invoice.xml')`,
    go: `// Go - Verify PEPPOL PINT XML Payload
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
	req.Header.Set("X-Country-Code", "${isOman ? "OM" : "AE"}")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println("API Response:", string(body))
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sdkCode[activeSdk]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">Track 4: Hands-On Practice</span>
        <h1 className="apple-h1">Developer Implementation Center</h1>
        <p className="text-sm text-textSecondary max-w-xl leading-relaxed">
          Ready for production? Complete the go-live readiness checklist and integrate our production SDK templates to audit your PEPPOL PINT {isOman ? 'OM' : 'AE'} pipeline.
        </p>
      </div>

      {/* Checklist Audit */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-accent" /> Go-Live Readiness Audit
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Review and check off compliance targets. Audit the entire implementation stack from registration {isOman ? 'VATINs' : 'TRNs'} down to AS4 networking.
        </p>

        <div className="space-y-2">
          {checklistItems.map((item) => {
            const isChecked = checkedList[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${
                  isChecked
                    ? 'border-green-500/20 bg-green-500/[0.01] text-textPrimary'
                    : 'border-white/[0.06] bg-white/[0.01] text-textSecondary hover:bg-white/[0.02] hover:border-white/[0.1]'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-green-500 border-green-500 text-black'
                      : 'border-white/30'
                  }`}>
                    {isChecked && <span className="text-[9px] font-bold">✓</span>}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <h4 className={`text-xs font-semibold ${isChecked ? 'text-green-400' : 'text-textPrimary'}`}>
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-textSecondary leading-relaxed">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Production SDK Templates */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent" /> Production SDK Examples
        </h3>
        <p className="text-xs text-textSecondary leading-relaxed">
          Integrate the validation engine natively into your middleware using the lightweight API clients below.
        </p>

        <div className="space-y-3">
          {/* Tab selectors */}
          <div className="flex justify-between items-center bg-white/[0.02] border border-white/[0.06] p-1 rounded-lg">
            <div className="flex gap-1.5 font-mono">
              {(['node', 'python', 'go'] as const).map((sdk) => (
                <button
                  key={sdk}
                  onClick={() => setActiveSdk(sdk)}
                  className={`px-3 py-1 rounded text-[10px] uppercase font-semibold transition-all ${
                    activeSdk === sdk
                      ? 'bg-accent/10 text-accent font-bold'
                      : 'text-textSecondary hover:text-textPrimary'
                  }`}
                >
                  {sdk === 'node' ? 'Node.js' : sdk}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleCopy}
              className="text-textSecondary hover:text-accent font-mono text-[10px] flex items-center gap-1 px-3 py-1 rounded hover:bg-white/[0.04] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </div>

          {/* Code block */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
            <div className="bg-[#121214] px-4 py-2 border-b border-white/[0.06] flex items-center gap-1.5 text-[10px] font-mono text-textSecondary">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>{activeSdk === 'node' ? 'index.js' : activeSdk === 'python' ? 'validator.py' : 'main.go'}</span>
            </div>
            <pre className="p-4 overflow-auto text-[10.5px] font-mono text-[#dcdcdc] leading-relaxed max-h-[350px]">
              <code>{sdkCode[activeSdk]}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Production Guidelines */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-accent" /> Production Best Practices
        </h3>
        <div className="apple-panel p-5 space-y-3 text-xs leading-relaxed text-textSecondary">
          <p>
            • **Asynchronous Responses**: Treat invoice delivery as decoupled from invoice approvals. Always handle callbacks via decoupled API listeners rather than locking browser sessions.
          </p>
          <p>
            • **Audit Archiving**: Invoices must be archived in their original, cryptographically signed XML format for a minimum of 10 years (or as regulated by {isOman ? 'OTA' : 'FTA'} guidelines).
          </p>
          <p>
            • **Fail-safes**: Implement robust queue mechanisms to store and retry transfers if SML lookups or network handshakes experience intermittent timeouts.
          </p>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-semibold text-textSecondary uppercase tracking-widest font-mono border-b border-white/[0.06] pb-2">
          Check Your Knowledge
        </h3>
        <QuizCard 
          moduleId="developer-learning-center" 
          questions={quizzes['developer-learning-center']} 
          onComplete={() => completeModule('developer-learning-center', 150)} 
        />
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="apple-panel p-5 flex items-center justify-between border-green-500/20 bg-green-500/[0.02]">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-semibold text-textPrimary">Module Completed</p>
              <p className="text-[10px] text-textSecondary">You earned 150 XP for auditing your e-invoicing architecture and completing the implementation check.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
