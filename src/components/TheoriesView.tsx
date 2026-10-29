/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Network, Activity, Sliders, CheckCircle, ArrowRight, Zap, Brain, ShieldCheck } from 'lucide-react';
import type { ArchitectureConfig, VerificationAuditResult, CognitiveCycleResult } from '../cognitive/types.ts';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface TheoriesViewProps {
  config: ArchitectureConfig;
  latestAudit?: VerificationAuditResult | null;
  latestResult?: CognitiveCycleResult | null;
  onNavigateToTab?: (tab: 'verifier' | 'workspace' | 'symbolic' | 'stream' | 'theories') => void;
  onUpdateConfig: (newConfig: Partial<ArchitectureConfig>) => void;
}

export const TheoriesView: React.FC<TheoriesViewProps> = ({
  config,
  latestAudit,
  latestResult,
  onNavigateToTab,
  onUpdateConfig,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Live Synchronization with Vérificateur IA */}
      {latestAudit && (
        <div className="bg-gradient-to-r from-cyan-950/40 via-[#0B1528] to-slate-900 border border-cyan-500/30 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    Fondements Théoriques appliqués à l'affirmation vérifiée
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
                <p className="text-sm text-slate-200 font-medium line-clamp-1 mt-0.5">
                  « {latestAudit.claim} »
                </p>
              </div>
            </div>
            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('verifier')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
              >
                <span>Voir le décodage grand public</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 4 Theoretical Grounding Cards for this verification */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
            <div className="bg-[#080C16] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 block font-semibold">1. GWT (Dehaene / Baars)</span>
              <p className="text-xs text-slate-300 mt-1">
                La coalition <span className="text-cyan-300">Auditeur Épistémique</span> a franchi le seuil d'embrasement pour diffuser la vérité formelle dans tout le réseau conscient.
              </p>
            </div>
            <div className="bg-[#080C16] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-indigo-400 block font-semibold">2. IIT (Tononi)</span>
              <p className="text-xs text-slate-300 mt-1">
                Les LLMs statistiques purs manquent de vraie information intégrée (Φ≈0). NOĒSIS combine graphe et percepts pour atteindre Φ = 4.18.
              </p>
            </div>
            <div className="bg-[#080C16] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-violet-400 block font-semibold">3. HOT (Rosenthal)</span>
              <p className="text-xs text-slate-300 mt-1">
                Pensée de 3e ordre : « Je sais que l'IA hallucine ici car elle associe des mots fréquents plutôt que des lois causales. »
              </p>
            </div>
            <div className="bg-[#080C16] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-emerald-400 block font-semibold">4. Inférence Active (Friston)</span>
              <p className="text-xs text-slate-300 mt-1">
                Minimisation de l'erreur de prédiction : l'audit confronte les croyances de l'utilisateur aux invariants empiriques du monde.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{t.theoriesBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{t.theoriesCategory}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            {t.theoriesTitle}
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            {t.theoriesSubtitle}
          </p>
        </div>
      </div>

      {/* Hero Architecture Visual Banner */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 p-8 flex flex-col justify-center space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              {t.theoriesHeroBadge}
            </span>
            <h2 className="text-2xl font-bold text-slate-100 leading-tight">
              {t.theoriesHeroTitle}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.theoriesHeroDesc}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>Embrasement Thalamo-Cortical</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Cohérence Logique Garantie</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-4 h-4 text-violet-400" />
                <span>Métacognition Réflexive</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#080B11] border-t lg:border-t-0 lg:border-l border-slate-800 relative min-h-[300px]">
            <img
              src="/src/assets/images/hero_neuro_symbolic_1792516291168.jpg"
              alt="Visualisation scientifique de l'architecture neuro-symbolique NOĒSIS"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 4 Theoretical Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: GWT */}
        <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono">
              01
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {t.theoriesPillar1Title}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Stanislas Dehaene & Bernard Baars
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.theoriesPillar1Desc}
          </p>
          <div className="bg-[#090D16] p-3 rounded border border-slate-800/80 text-xs font-mono text-cyan-300">
            {t.theoriesPillar1Impl}
          </div>
        </div>

        {/* Pillar 2: HOT */}
        <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-950/40 border border-violet-500/40 flex items-center justify-center text-violet-400 font-bold font-mono">
              02
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {t.theoriesPillar2Title}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                David Rosenthal & Peter Carruthers
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.theoriesPillar2Desc}
          </p>
          <div className="bg-[#090D16] p-3 rounded border border-slate-800/80 text-xs font-mono text-violet-300">
            {t.theoriesPillar2Impl}
          </div>
        </div>

        {/* Pillar 3: IIT */}
        <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
              03
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {t.theoriesPillar3Title}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Giulio Tononi & Christof Koch
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.theoriesPillar3Desc}
          </p>
          <div className="bg-[#090D16] p-3 rounded border border-slate-800/80 text-xs font-mono text-emerald-300">
            {t.theoriesPillar3Impl}
          </div>
        </div>

        {/* Pillar 4: AST */}
        <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-mono">
              04
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {t.theoriesPillar4Title}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Michael Graziano (Princeton)
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.theoriesPillar4Desc}
          </p>
          <div className="bg-[#090D16] p-3 rounded border border-slate-800/80 text-xs font-mono text-amber-300">
            {t.theoriesPillar4Impl}
          </div>
        </div>
      </div>

      {/* Global Configuration Matrix */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              {t.theoriesControlsTitle}
            </h3>
            <span className="text-xs text-slate-400">
              {t.theoriesControlsSubtitle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Ignition Threshold */}
          <div className="bg-[#090D16] p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="theories-threshold" className="text-slate-200">{t.theoriesThresholdLabel}</label>
              <span className="font-mono text-cyan-400">{(config.ignitionThreshold * 100).toFixed(0)}%</span>
            </div>
            <input
              id="theories-threshold"
              type="range"
              min="0.30"
              max="0.85"
              step="0.05"
              value={config.ignitionThreshold}
              onChange={(e) => onUpdateConfig({ ignitionThreshold: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block leading-relaxed">
              {t.theoriesThresholdDesc}
            </span>
          </div>

          {/* Slider 2: Neuro-Symbolic Coupling */}
          <div className="bg-[#090D16] p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="theories-coupling" className="text-slate-200">{t.theoriesCouplingLabel}</label>
              <span className="font-mono text-cyan-400">{(config.neuroSymbolicCoupling * 100).toFixed(0)}%</span>
            </div>
            <input
              id="theories-coupling"
              type="range"
              min="0.20"
              max="1.0"
              step="0.05"
              value={config.neuroSymbolicCoupling}
              onChange={(e) => onUpdateConfig({ neuroSymbolicCoupling: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block leading-relaxed">
              {t.theoriesCouplingDesc}
            </span>
          </div>

          {/* Selector 3: Metacognitive Depth */}
          <div className="bg-[#090D16] p-4 rounded-lg border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-200">{t.theoriesDepthLabel}</span>
              <span className="font-mono text-cyan-400 uppercase">{config.metacognitiveDepth}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1">
              {(['shallow', 'standard', 'deep'] as const).map((depth) => (
                <button
                  key={depth}
                  onClick={() => onUpdateConfig({ metacognitiveDepth: depth })}
                  className={`py-1.5 text-xs font-medium rounded transition-colors ${
                    config.metacognitiveDepth === depth
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-[#0B0F19] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {depth === 'shallow' ? 'Ordre 1' : depth === 'standard' ? 'Ordre 2' : 'Ordre 3'}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 block leading-relaxed">
              {t.theoriesDepthDesc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
