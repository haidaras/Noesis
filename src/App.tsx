/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useTransition } from 'react';
import { Header, ActiveTab } from './components/Header.tsx';
import { TelemetryRibbon } from './components/TelemetryRibbon.tsx';
import { WorkspaceView } from './components/WorkspaceView.tsx';
import { SymbolicGraphView } from './components/SymbolicGraphView.tsx';
import { ConsciousStreamView } from './components/ConsciousStreamView.tsx';
import { TheoriesView } from './components/TheoriesView.tsx';
import { CognitiveCycleModal } from './components/CognitiveCycleModal.tsx';
import { ExportSourceModal } from './components/ExportSourceModal.tsx';
import { AIVerifierView } from './components/AIVerifierView.tsx';
import { CognitiveOrchestrator } from './cognitive/cognitiveOrchestrator.ts';
import { AIVerifierEngine } from './cognitive/verifierEngine.ts';
import type {
  CognitiveCycleResult,
  ArchitectureConfig,
  SymbolicFact,
  SymbolicRule,
  ProofStep,
  VerificationAuditResult,
  DocumentAuditReport,
  DocumentSegment,
} from './cognitive/types.ts';
import { LanguageProvider } from './i18n/useTranslation.tsx';

// Local resilient client-side orchestrator fallback
const localOrchestrator = new CognitiveOrchestrator();
const localVerifier = new AIVerifierEngine(localOrchestrator.getSymbolicEngine());

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('verifier');
  const [latestResult, setLatestResult] = useState<CognitiveCycleResult | null>(null);
  const [auditHistory, setAuditHistory] = useState<VerificationAuditResult[]>([]);
  const [streamHistory, setStreamHistory] = useState<string[]>([]);
  const [autobiographicalMemory, setAutobiographicalMemory] = useState<string[]>([]);
  const [facts, setFacts] = useState<SymbolicFact[]>([]);
  const [rules, setRules] = useState<SymbolicRule[]>([]);
  const [proofSteps, setProofSteps] = useState<ProofStep[]>([]);
  const [contradictions, setContradictions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<ArchitectureConfig>({
    ignitionThreshold: 0.62,
    neuroSymbolicCoupling: 0.8,
    metacognitiveDepth: 'deep',
    entropyNoise: 0.2,
  });

  // Persistent document & verifier states across tab changes
  const [docTitle, setDocTitle] = useState<string>('');
  const [docText, setDocText] = useState<string>('');
  const [docReport, setDocReport] = useState<DocumentAuditReport | null>(null);
  const [selectedDocSegment, setSelectedDocSegment] = useState<DocumentSegment | null>(null);
  const [verifierViewMode, setVerifierViewMode] = useState<'short' | 'document' | 'proof'>('short');
  const [claimInput, setClaimInput] = useState<string>('');
  const [explanationMode, setExplanationMode] = useState<'simple' | 'logical' | 'rights'>('simple');

  const [isPending, startTransition] = useTransition();

  // Initial seed on mount
  useEffect(() => {
    // Initial seed for verification space
    const seedAudit = localVerifier.auditClaim(
      "Dans le vide une plume et une bille de plomb tombent à la même vitesse."
    );
    setAuditHistory([seedAudit]);

    // Initial foundational cognitive cycle seeded directly from verification
    const initialSeed = localOrchestrator.runVerificationCycle(
      seedAudit.claim,
      seedAudit,
      config
    );

    setLatestResult(initialSeed);
    setStreamHistory(localOrchestrator.getStreamOfConsciousness());
    setAutobiographicalMemory(localOrchestrator.getAutobiographicalMemory());
    setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
    setRules(localOrchestrator.getSymbolicEngine().getAllRules());
    setProofSteps(initialSeed.symbolicDeduction.proofSteps);
    setContradictions(initialSeed.symbolicDeduction.contradictions);
  }, []);

  const runCognitiveCycle = async (query: string) => {
    setIsLoading(true);

    try {
      // Attempt server-side API first
      const res = await fetch('/api/cognitive/cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, config }),
      });

      if (res.ok) {
        const result: CognitiveCycleResult = await res.json();
        startTransition(() => {
          setLatestResult(result);
          setStreamHistory(result.internalMonologue);
          setAutobiographicalMemory((prev) => [result.autobiographicalMemoryNote, ...prev].slice(0, 30));
          setProofSteps(result.symbolicDeduction.proofSteps);
          setContradictions(result.symbolicDeduction.contradictions);
          setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
        });
      } else {
        throw new Error('Erreur de réponse serveur');
      }
    } catch {
      // Local deterministic fallback
      const localResult = localOrchestrator.runLocalCycle(query, config);
      startTransition(() => {
        setLatestResult(localResult);
        setStreamHistory(localOrchestrator.getStreamOfConsciousness());
        setAutobiographicalMemory(localOrchestrator.getAutobiographicalMemory());
        setProofSteps(localResult.symbolicDeduction.proofSteps);
        setContradictions(localResult.symbolicDeduction.contradictions);
        setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFact = (newFact: { subject: string; predicate: string; object: string }) => {
    localOrchestrator.getSymbolicEngine().addFact({
      subject: newFact.subject,
      predicate: newFact.predicate,
      object: newFact.object,
      confidence: 1.0,
      source: 'observation',
      truthValue: 'TRUE',
    });

    // Re-run deduction to update graph
    const deduction = localOrchestrator.getSymbolicEngine().forwardChaining();
    setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
    setProofSteps(deduction.proofSteps);
    setContradictions(deduction.contradictions);

    // Sync to server silently
    fetch('/api/symbolic/facts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFact),
    }).catch(() => {});
  };

  const handleAddRule = (newRule: {
    name: string;
    premises: Array<{ subject: string; predicate: string; object: string }>;
    conclusion: { subject: string; predicate: string; object: string };
    explanation: string;
  }) => {
    const id = `rule_ui_${Date.now()}`;
    localOrchestrator.getSymbolicEngine().addRule({
      id,
      name: newRule.name,
      premises: newRule.premises,
      conclusion: newRule.conclusion,
      weight: 0.95,
      explanation: newRule.explanation,
    });

    const deduction = localOrchestrator.getSymbolicEngine().forwardChaining();
    setRules(localOrchestrator.getSymbolicEngine().getAllRules());
    setProofSteps(deduction.proofSteps);
    setContradictions(deduction.contradictions);

    fetch('/api/symbolic/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRule),
    }).catch(() => {});
  };

  const handleResetOntology = () => {
    localOrchestrator.getSymbolicEngine().seedDefaultOntology();
    setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
    setRules(localOrchestrator.getSymbolicEngine().getAllRules());
    setProofSteps([]);
    setContradictions([]);

    fetch('/api/symbolic/reset', { method: 'POST' }).catch(() => {});
  };

  const handleAuditClaim = async (claim: string): Promise<VerificationAuditResult | null> => {
    setIsLoading(true);
    try {
      let audit: VerificationAuditResult;
      const res = await fetch('/api/audit/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim }),
      });
      if (res.ok) {
        audit = await res.json();
      } else {
        audit = localVerifier.auditClaim(claim);
      }

      // Synchronize with ALL tabs in the cognitive architecture:
      // Run full verification cognitive cycle (GWT, Symbolic Graph, Monologue, Theories)
      const cycleResult = localOrchestrator.runVerificationCycle(claim, audit, config);

      startTransition(() => {
        setAuditHistory((prev) => [audit, ...prev.filter((a) => a.id !== audit.id)].slice(0, 20));
        setLatestResult(cycleResult);
        setStreamHistory([...localOrchestrator.getStreamOfConsciousness()]);
        setAutobiographicalMemory([...localOrchestrator.getAutobiographicalMemory()]);
        setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
        setRules(localOrchestrator.getSymbolicEngine().getAllRules());
        setProofSteps(cycleResult.symbolicDeduction.proofSteps);
        setContradictions(cycleResult.symbolicDeduction.contradictions);
      });

      return audit;
    } catch {
      const audit = localVerifier.auditClaim(claim);
      const cycleResult = localOrchestrator.runVerificationCycle(claim, audit, config);

      startTransition(() => {
        setAuditHistory((prev) => [audit, ...prev.filter((a) => a.id !== audit.id)].slice(0, 20));
        setLatestResult(cycleResult);
        setStreamHistory([...localOrchestrator.getStreamOfConsciousness()]);
        setAutobiographicalMemory([...localOrchestrator.getAutobiographicalMemory()]);
        setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
        setRules(localOrchestrator.getSymbolicEngine().getAllRules());
        setProofSteps(cycleResult.symbolicDeduction.proofSteps);
        setContradictions(cycleResult.symbolicDeduction.contradictions);
      });

      return audit;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuditDocument = (text: string, title?: string): DocumentAuditReport => {
    setIsLoading(true);
    try {
      const report = localVerifier.auditDocument(text, title);
      setDocReport(report);
      setDocText(text);
      if (title) setDocTitle(title);

      // Trigger full cognitive cycle for document (GWT, Symbolic Graph, Stream, Theories)
      const cycleResult = localOrchestrator.runDocumentCognitiveCycle(report, text, config);

      startTransition(() => {
        setLatestResult(cycleResult);
        setStreamHistory([...localOrchestrator.getStreamOfConsciousness()]);
        setAutobiographicalMemory([...localOrchestrator.getAutobiographicalMemory()]);
        setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
        setRules(localOrchestrator.getSymbolicEngine().getAllRules());
        setProofSteps(cycleResult.symbolicDeduction.proofSteps);
        setContradictions(cycleResult.symbolicDeduction.contradictions);
      });

      return report;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDocument = () => {
    setDocTitle('');
    setDocText('');
    setDocReport(null);
    setSelectedDocSegment(null);
    localOrchestrator.resetDocumentKnowledge();
    startTransition(() => {
      setFacts(localOrchestrator.getSymbolicEngine().getAllFacts());
      setRules(localOrchestrator.getSymbolicEngine().getAllRules());
      setContradictions([]);
      setProofSteps([]);
    });
  };

  const handleUpdateConfig = (partial: Partial<ArchitectureConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const latestAudit = auditHistory[0] || null;

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* 3-zone Top Bar Contract */}
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenNewCycle={() => setIsModalOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        {/* Top Clinical Precision Telemetry Ribbon */}
        <TelemetryRibbon
          latestResult={latestResult}
          config={config}
          isLoading={isLoading}
          onQuickCycle={() => {
            if (latestResult) {
              runCognitiveCycle(latestResult.inputQuery);
            } else {
              runCognitiveCycle("Itération de réflexion introspective sur l'état conscient actuel.");
            }
          }}
        />

        {/* Main Dynamic Viewport Stage */}
        <main className="flex-1 pb-16">
          {activeTab === 'verifier' && (
            <AIVerifierView
              onAuditClaim={handleAuditClaim}
              onAuditDocument={handleAuditDocument}
              onResetDocument={handleResetDocument}
              onOpenExportModal={() => setIsExportModalOpen(true)}
              auditHistory={auditHistory}
              isLoading={isLoading}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              docTitle={docTitle}
              setDocTitle={setDocTitle}
              docText={docText}
              setDocText={setDocText}
              docReport={docReport}
              setDocReport={setDocReport}
              selectedSegment={selectedDocSegment}
              setSelectedSegment={setSelectedDocSegment}
              viewMode={verifierViewMode}
              setViewMode={setVerifierViewMode}
              claimInput={claimInput}
              setClaimInput={setClaimInput}
              explanationMode={explanationMode}
              setExplanationMode={setExplanationMode}
            />
          )}

        {activeTab === 'workspace' && (
          <WorkspaceView
            latestResult={latestResult}
            config={config}
            latestAudit={latestAudit}
            onUpdateConfig={handleUpdateConfig}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onTriggerCycleWithPrompt={(prompt) => {
              runCognitiveCycle(prompt);
            }}
          />
        )}

        {activeTab === 'symbolic' && (
          <SymbolicGraphView
            facts={facts}
            rules={rules}
            proofSteps={proofSteps}
            contradictions={contradictions}
            latestAudit={latestAudit}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onAddFact={handleAddFact}
            onAddRule={handleAddRule}
            onResetOntology={handleResetOntology}
          />
        )}

        {activeTab === 'stream' && (
          <ConsciousStreamView
            latestResult={latestResult}
            streamHistory={streamHistory}
            autobiographicalMemory={autobiographicalMemory}
            latestAudit={latestAudit}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            isLoading={isLoading}
            onRunCycle={runCognitiveCycle}
          />
        )}

        {activeTab === 'theories' && (
          <TheoriesView
            config={config}
            latestAudit={latestAudit}
            latestResult={latestResult}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onUpdateConfig={handleUpdateConfig}
          />
        )}
      </main>

      {/* Interactive Modal */}
      <CognitiveCycleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={runCognitiveCycle}
        isLoading={isLoading}
      />

      {/* Export & GitHub Modal */}
      <ExportSourceModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Quiet scientific footer */}
      <footer className="border-t border-slate-800/80 bg-[#07090F] py-6 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>NOĒSIS Cognitive Architecture · GWT, HOT, IIT & Logique du 1er Ordre</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Stanislas Dehaene (GWT)</span>
            <span aria-hidden="true">·</span>
            <span>Giulio Tononi (IIT)</span>
            <span aria-hidden="true">·</span>
            <span>David Rosenthal (HOT)</span>
          </div>
        </div>
      </footer>
    </div>
  </LanguageProvider>
  );
}
