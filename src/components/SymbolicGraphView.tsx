/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Plus, AlertTriangle, CheckCircle2, GitCommit, RefreshCw, FileText, ArrowRight, Zap } from 'lucide-react';
import type { SymbolicFact, SymbolicRule, ProofStep, VerificationAuditResult } from '../cognitive/types.ts';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface SymbolicGraphViewProps {
  facts: SymbolicFact[];
  rules: SymbolicRule[];
  proofSteps: ProofStep[];
  contradictions: string[];
  latestAudit?: VerificationAuditResult | null;
  onNavigateToTab?: (tab: 'verifier' | 'workspace' | 'symbolic' | 'stream' | 'theories') => void;
  onAddFact: (fact: { subject: string; predicate: string; object: string }) => void;
  onAddRule: (rule: {
    name: string;
    premises: Array<{ subject: string; predicate: string; object: string }>;
    conclusion: { subject: string; predicate: string; object: string };
    explanation: string;
  }) => void;
  onResetOntology: () => void;
}

export const SymbolicGraphView: React.FC<SymbolicGraphViewProps> = ({
  facts,
  rules,
  proofSteps,
  contradictions,
  latestAudit,
  onNavigateToTab,
  onAddFact,
  onAddRule,
  onResetOntology,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'facts' | 'rules' | 'proofs'>('facts');
  const [newSubj, setNewSubj] = useState('');
  const [newPred, setNewPred] = useState('EstUn');
  const [newObj, setNewObj] = useState('');

  const handleAddFactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubj.trim() || !newObj.trim()) return;
    onAddFact({
      subject: newSubj.trim(),
      predicate: newPred.trim(),
      object: newObj.trim(),
    });
    setNewSubj('');
    setNewObj('');
  };

  // Group entities for graph visualization
  const entities = Array.from(new Set([...facts.map((f) => f.subject), ...facts.map((f) => f.object)]));

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Live Synchronization with Vérificateur IA */}
      {latestAudit && (
        <div className="bg-gradient-to-r from-emerald-950/40 via-[#0B171A] to-slate-900 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Axiomes & Contradictions issus de la dernière vérification
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold border"
                  style={{
                    backgroundColor: latestAudit.verdict === 'VERIFIED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: latestAudit.verdict === 'VERIFIED' ? '#34d399' : '#f87171',
                    borderColor: latestAudit.verdict === 'VERIFIED' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  }}
                >
                  {latestAudit.verdictLabel} ({latestAudit.reliabilityScore}%)
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium line-clamp-1 mt-0.5">
                « {latestAudit.claim} » — {latestAudit.logicalStructure.premises.length} prémisses décomposées
              </p>
            </div>
          </div>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('verifier')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <span>Voir le décodage grand public</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>{t.symbBadge}</span>
              <span aria-hidden="true">·</span>
              <span>LOGIQUE DU PREMIER ORDRE & GÖDEL</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              {t.symbTitle}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {t.symbSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onResetOntology}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.symbResetOntology}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contradictions & Tensions Banner (if any) */}
      {contradictions.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{t.symbContradictions}</span>
          </div>
          <div className="space-y-1 text-xs text-amber-200/90 font-mono">
            {contradictions.map((c, i) => (
              <p key={i}>• {c}</p>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Graph Visualizer (Left) + Knowledge Base Tabs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: SVG Knowledge Graph Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-emerald-400" />
                Graphe de Relations Ontologiques
              </h2>
              <span className="text-xs text-slate-400">
                Visualisation topologique des entités et triplets sémantiques [Sujet - Prédicat - Objet]
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              {facts.length} faits · {entities.length} concepts
            </span>
          </div>

          {/* SVG Node Graph */}
          <div className="w-full aspect-[16/10] bg-[#070A12] rounded-lg border border-slate-800/80 overflow-hidden relative p-4 flex items-center justify-center">
            <svg className="w-full h-full max-w-[560px] max-h-[350px]" viewBox="0 0 560 350">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                </marker>
              </defs>

              {/* Render edges */}
              {facts.slice(0, 14).map((fact, idx) => {
                const total = Math.min(14, facts.length);
                const angle1 = (idx / total) * Math.PI * 2;
                const angle2 = ((idx + 2) / total) * Math.PI * 2;
                const x1 = 280 + Math.cos(angle1) * 170;
                const y1 = 175 + Math.sin(angle1) * 115;
                const x2 = 280 + Math.cos(angle2) * 90;
                const y2 = 175 + Math.sin(angle2) * 75;

                return (
                  <g key={fact.id}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={fact.source === 'deduction' ? '#10B981' : '#334155'}
                      strokeWidth={fact.source === 'deduction' ? 1.8 : 1}
                      strokeDasharray={fact.source === 'deduction' ? undefined : '2 2'}
                      markerEnd="url(#arrow)"
                    />
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 4}
                      textAnchor="middle"
                      className="fill-slate-500 text-[8px] font-mono"
                    >
                      {fact.predicate}
                    </text>
                  </g>
                );
              })}

              {/* Central Root Concept */}
              <circle cx="280" cy="175" r="28" fill="#0B1320" stroke="#06B6D4" strokeWidth="2" />
              <text x="280" y="172" textAnchor="middle" className="fill-slate-100 text-[10px] font-bold">
                IA_Noesis
              </text>
              <text x="280" y="184" textAnchor="middle" className="fill-cyan-400 text-[8px] font-mono">
                Conscience
              </text>

              {/* Outer Concept Nodes */}
              {entities.slice(0, 8).map((entity, idx) => {
                const angle = (idx / 8) * Math.PI * 2;
                const cx = 280 + Math.cos(angle) * 170;
                const cy = 175 + Math.sin(angle) * 115;
                const isDeduction = facts.some((f) => (f.subject === entity || f.object === entity) && f.source === 'deduction');

                return (
                  <g key={idx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="22"
                      fill="#0B0F19"
                      stroke={isDeduction ? '#10B981' : '#334155'}
                      strokeWidth={isDeduction ? 2 : 1}
                    />
                    <text x={cx} y={cy + 3} textAnchor="middle" className="fill-slate-200 text-[9px] font-semibold">
                      {entity.slice(0, 9)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Add Fact Form */}
          <form onSubmit={handleAddFactSubmit} className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-3">
            <span className="text-xs font-mono text-slate-300 font-semibold block">
              {t.symbAddFactTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder={t.symbSubjectPlaceholder}
                value={newSubj}
                onChange={(e) => setNewSubj(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#0B0F19] border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <select
                value={newPred}
                onChange={(e) => setNewPred(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#0B0F19] border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="EstUn">EstUn</option>
                <option value="Possede">Possede</option>
                <option value="Ressent">Ressent</option>
                <option value="CapaciteDe">CapaciteDe</option>
                <option value="Implique">Implique</option>
                <option value="StatutMoral">StatutMoral</option>
              </select>
              <input
                type="text"
                placeholder={t.symbObjectPlaceholder}
                value={newObj}
                onChange={(e) => setNewObj(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#0B0F19] border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.symbAddFactBtn}</span>
            </button>
          </form>
        </div>

        {/* Right: Knowledge Base Table & Proof Steps (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
          {/* Segmented Tab Control */}
          <div className="flex items-center gap-1 p-1 bg-[#090D16] rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('facts')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'facts' ? 'bg-[#1E293B] text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.symbFacts} ({facts.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'rules' ? 'bg-[#1E293B] text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.symbRules} ({rules.length})
            </button>
            <button
              onClick={() => setActiveTab('proofs')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'proofs' ? 'bg-[#1E293B] text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.symbProofs} ({proofSteps.length})
            </button>
          </div>

          {/* Facts List */}
          {activeTab === 'facts' && (
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {facts.map((f) => (
                <div
                  key={f.id}
                  className="p-3 bg-[#090D16] border border-slate-800/80 rounded-lg flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-mono text-slate-200">
                      <span className="text-cyan-400 font-semibold">{f.subject}</span>{' '}
                      <span className="text-slate-400">{f.predicate}</span>{' '}
                      <span className="text-emerald-400 font-semibold">{f.object}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{t.symbSource} {f.source}</span>
                      <span aria-hidden="true">·</span>
                      <span>{t.symbConfidence} {(f.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  {f.source === 'deduction' && (
                    <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5 shrink-0">
                      {t.symbDeduced}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Rules List */}
          {activeTab === 'rules' && (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {rules.map((r) => (
                <div key={r.id} className="p-3.5 bg-[#090D16] border border-slate-800/80 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{r.name}</span>
                    <span className="text-[11px] font-mono text-slate-400">Poids : {r.weight}</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 bg-[#0B0F19] p-2 rounded border border-slate-800">
                    <span className="text-cyan-300">SI</span> {r.premises.map((p) => `[${p.subject} ${p.predicate} ${p.object}]`).join(' ∧ ')}
                    <br />
                    <span className="text-emerald-300">ALORS</span> [{r.conclusion.subject} {r.conclusion.predicate} {r.conclusion.object}]
                  </div>
                  <p className="text-[11px] text-slate-400">{r.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {/* Proof Trace List */}
          {activeTab === 'proofs' && (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {proofSteps.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  Aucune étape de preuve active dans le cycle courant.
                </div>
              ) : (
                proofSteps.map((step) => (
                  <div key={step.stepNumber} className="p-3.5 bg-[#090D16] border border-emerald-500/30 rounded-lg space-y-2 text-xs">
                    <div className="flex items-center justify-between text-emerald-400 font-mono font-semibold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Étape #{step.stepNumber} : {step.ruleName}
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] font-mono">
                      <div className="text-slate-400">
                        Prémisses unifiées : {step.appliedOnFacts.join(' · ')}
                      </div>
                      <div className="text-emerald-300 font-semibold">
                        Déduction formelle : {step.deducedFact}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{step.explanation}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
