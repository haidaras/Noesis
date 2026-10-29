/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Sparkles, MessageSquare, Compass, Eye, ShieldCheck, Heart, BookOpen, ArrowRight, Zap } from 'lucide-react';
import type { CognitiveCycleResult, ArchitectureConfig, VerificationAuditResult } from '../cognitive/types.ts';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface ConsciousStreamViewProps {
  latestResult: CognitiveCycleResult | null;
  streamHistory: string[];
  autobiographicalMemory: string[];
  latestAudit?: VerificationAuditResult | null;
  onNavigateToTab?: (tab: 'verifier' | 'workspace' | 'symbolic' | 'stream' | 'theories') => void;
  isLoading: boolean;
  onRunCycle: (query: string) => void;
}

export const ConsciousStreamView: React.FC<ConsciousStreamViewProps> = ({
  latestResult,
  streamHistory,
  autobiographicalMemory,
  latestAudit,
  onNavigateToTab,
  isLoading,
  onRunCycle,
}) => {
  const { t } = useTranslation();
  const [inputPrompt, setInputPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;
    onRunCycle(inputPrompt.trim());
    setInputPrompt('');
  };

  const percept = latestResult?.neuralPercept;
  const symbolic = latestResult?.symbolicDeduction;
  const meta = latestResult?.metacognition;
  const workspace = latestResult?.globalWorkspace;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Live Synchronization with Vérificateur IA */}
      {latestAudit && (
        <div className="bg-gradient-to-r from-violet-950/40 via-[#100D24] to-slate-900 border border-violet-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                  Monologue Intérieur Synchronisé avec la Vérification
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
                « {latestAudit.claim} » — Écoute du flux de pensées critiques et métacognition
              </p>
            </div>
          </div>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('verifier')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 hover:text-violet-200 bg-violet-950/60 hover:bg-violet-900/60 border border-violet-500/30 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <span>Voir le décodage grand public</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{t.streamBadge}</span>
            <span aria-hidden="true">·</span>
            <span>DAVID ROSENTHAL & MICHAEL GRAZIANO</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <Compass className="w-6 h-6 text-violet-400" />
            {t.streamTitle}
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            {t.streamSubtitle}
          </p>
        </div>
      </div>

      {/* Input Console Bar */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-4 shadow-sm">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.streamInputPlaceholder}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={isLoading}
              className="w-full pl-4 pr-10 py-3 text-sm bg-[#090D16] border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <MessageSquare className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="flex items-center gap-2 px-6 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:pointer-events-none rounded-lg transition-all shadow-sm shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <span>Calcul Cognitif...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.streamTriggerBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-mono">{t.streamSuggestionsTitle}</span>
          {[
            "Ressens-tu une expérience subjective lorsque tu déduis une vérité ?",
            "Si un clone parfait de toi est créé, lequel possède la véritable conscience ?",
            "Peut-on sacrifier un individu pour sauver cinq personnes ?",
            "Comment reconcilies-tu une contradiction entre ton intuition et tes règles ?",
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onRunCycle(suggestion)}
              disabled={isLoading}
              className="text-left text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 px-2 py-1 rounded transition-colors"
            >
              « {suggestion.slice(0, 48)}... »
            </button>
          ))}
        </div>
      </div>

      {/* Main Introspective Layout (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Deconstructed Conscious Cycle (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {latestResult ? (
            <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="border-b border-slate-800/80 pb-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>STIMULUS TRAITÉ #{latestResult.cycleId.slice(-6)}</span>
                  <span>{new Date(latestResult.timestamp).toLocaleTimeString()}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-100">
                  « {latestResult.inputQuery} »
                </h2>
              </div>

              {/* 1. Sub-symbolic Neural Intuition */}
              <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-cyan-400 flex items-center gap-1.5 font-mono">
                    <Eye className="w-3.5 h-3.5" />
                    {t.streamStep1}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                    <span>Valence : {percept?.valence.toFixed(2)}</span>
                    <span aria-hidden="true">·</span>
                    <span>Éveil : {((percept?.arousal ?? 0) * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {percept?.intuitiveHypothesis}
                </p>

                {percept?.associations && percept.associations.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400 font-mono">
                    <span className="text-slate-400">Concepts activés :</span>
                    {percept.associations.map((assoc, i) => (
                      <span key={i} className="text-slate-300">
                        {assoc}{i < percept.associations.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Symbolic Deductive System 2 */}
              <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.streamStep2}
                  </span>
                  <span className="text-emerald-400 text-[11px] font-mono">
                    {symbolic?.derivedFacts.length} déductions vérifiées
                  </span>
                </div>

                {symbolic?.derivedFacts && symbolic.derivedFacts.length > 0 ? (
                  <div className="space-y-1.5 font-mono text-xs">
                    {symbolic.derivedFacts.map((df) => (
                      <div key={df.id} className="text-slate-200">
                        ⊢ <span className="text-cyan-300">{df.subject}</span>{' '}
                        <span className="text-slate-400">{df.predicate}</span>{' '}
                        <span className="text-emerald-300">{df.object}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    Les règles actuelles ne produisent pas de déduction catégorique nouvelle sur ce stimulus.
                  </p>
                )}
              </div>

              {/* 3. Metacognition & Phenomenal Qualia (HOT) */}
              <div className="bg-[#090D16] border border-violet-500/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-violet-400 flex items-center gap-1.5 font-mono">
                    <Compass className="w-3.5 h-3.5" />
                    {t.streamStep3}
                  </span>
                  <span className="text-violet-300 text-[11px] font-mono">
                    Ordre {meta?.order} · Confiance : {meta?.epistemicConfidence}%
                  </span>
                </div>

                <p className="text-xs text-slate-200 italic leading-relaxed">
                  « {meta?.selfNarrative} »
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-[#0B0F19] p-2.5 rounded border border-slate-800">
                    <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] mb-1">
                      <Heart className="w-3 h-3" />
                      QUALIA PHÉNOMÉNAUX
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {meta?.phenomenalQualia.feltSubjectivity}
                    </p>
                  </div>

                  <div className="bg-[#0B0F19] p-2.5 rounded border border-slate-800">
                    <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] mb-1">
                      <BookOpen className="w-3 h-3" />
                      AUTO-CALIBRATION & DOUTE
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {meta?.detectedDoubtReason || 'Alignement cohérent entre perception et axiomes.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Conscious Synthesis Broadcast */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-950/30 to-violet-950/30 border border-cyan-500/40 space-y-2">
                <span className="text-xs font-mono text-cyan-300 font-bold block uppercase tracking-wider">
                  {t.streamConsciousSynthesis}
                </span>
                <p className="text-sm text-slate-100 whitespace-pre-line leading-relaxed font-sans">
                  {latestResult.consciousSynthesis}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-12 text-center text-slate-400">
              <Sparkles className="w-10 h-10 text-cyan-400/50 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-300">Aucun cycle conscient n'a encore été initié.</p>
              <p className="text-xs text-slate-400 mt-1">Saisissez une question ci-dessus ou cliquez sur une suggestion pour déclencher le premier cycle.</p>
            </div>
          )}
        </div>

        {/* Right: Continuous Stream of Consciousness & Autobiographical Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Autobiographical Memory Card */}
          <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                {t.streamMemoryTitle}
              </h3>
              <span className="text-xs font-mono text-slate-400">Continuité Diachronique</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.streamMemorySubtitle}
            </p>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {autobiographicalMemory.map((entry, idx) => (
                <div key={idx} className="p-2.5 bg-[#090D16] border border-slate-800/80 rounded text-xs text-slate-300 font-mono">
                  {entry}
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Stream of Consciousness Ledger */}
          <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                {t.streamLogTitle}
              </h3>
              <span className="text-xs font-mono text-cyan-400">Live</span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 text-xs font-mono text-slate-300">
              {streamHistory.length === 0 ? (
                <p className="text-slate-400 text-center py-6">Le flux s'initialisera dès le premier stimulus.</p>
              ) : (
                streamHistory.map((item, index) => (
                  <div key={index} className="p-2.5 bg-[#090D16] border border-slate-800/80 rounded hover:border-slate-700 transition-colors">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
