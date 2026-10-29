/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Radio, Zap, Shield, Eye, Heart, Database, Compass, ArrowRight } from 'lucide-react';
import type { CognitiveCycleResult, ArchitectureConfig, Coalition, VerificationAuditResult } from '../cognitive/types.ts';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface WorkspaceViewProps {
  latestResult: CognitiveCycleResult | null;
  config: ArchitectureConfig;
  latestAudit?: VerificationAuditResult | null;
  onUpdateConfig: (newConfig: Partial<ArchitectureConfig>) => void;
  onTriggerCycleWithPrompt: (prompt: string) => void;
  onNavigateToTab?: (tab: 'verifier' | 'workspace' | 'symbolic' | 'stream' | 'theories') => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  latestResult,
  config,
  latestAudit,
  onUpdateConfig,
  onTriggerCycleWithPrompt,
  onNavigateToTab,
}) => {
  const { t } = useTranslation();
  const workspace = latestResult?.globalWorkspace;
  const isIgnited = workspace?.isIgnited ?? true;
  const activeCoalition = workspace?.activeCoalition;
  const coalitions = workspace?.competingCoalitions ?? [];
  const phi = latestResult?.phiMetrics;

  const moduleIcons: Record<string, React.ReactNode> = {
    perception: <Eye className="w-4 h-4 text-cyan-400" />,
    affect: <Heart className="w-4 h-4 text-rose-400" />,
    symbolic_logic: <Shield className="w-4 h-4 text-emerald-400" />,
    memory: <Database className="w-4 h-4 text-amber-400" />,
    metacognition: <Compass className="w-4 h-4 text-violet-400" />,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Live Synchronization with Vérificateur IA */}
      {latestAudit && (
        <div className="bg-gradient-to-r from-cyan-950/40 via-[#0B132B] to-slate-900 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Stimulus Actif dans l'Espace Global
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
      )}

      {/* Top Overview & Stimulus context */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>{t.wsBadge}</span>
              <span aria-hidden="true">·</span>
              <span>STANISLAS DEHAENE & BERNARD BAARS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              {t.wsTitle}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {t.wsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#090D16] p-4 rounded-lg border border-slate-800 shrink-0 font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">{t.wsThreshold}</span>
              <span className="text-lg font-bold text-cyan-400 tabular-nums">
                {(config.ignitionThreshold * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">{t.wsPhi}</span>
              <span className="text-lg font-bold text-violet-400 tabular-nums">
                {(phi?.phi ?? 4.28).toFixed(2)} <span className="text-xs text-slate-400">nats</span>
              </span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">{t.wsStatus}</span>
              <span className={`text-xs font-bold uppercase ${isIgnited ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isIgnited ? t.wsAwake : t.wsDrowsy}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive GWT Hub Visualization (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                {t.wsMatrixTitle}
              </h2>
              <span className="text-xs text-slate-400">
                {t.wsMatrixDesc}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {coalitions.length} modules connectés
            </span>
          </div>

          {/* Dynamic SVG / Visual Arena */}
          <div className="relative w-full aspect-[16/10] bg-[#070A12] rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center p-4">
            {/* Subtle background radial glow */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                isIgnited
                  ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/40 via-transparent to-transparent'
                  : 'bg-transparent'
              }`}
            />

            {/* SVG Broadcast Network */}
            <svg className="w-full h-full max-w-[540px] max-h-[340px]" viewBox="0 0 540 340">
              <defs>
                <linearGradient id="broadcastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central Hub (Global Workspace) */}
              <circle
                cx="270"
                cy="170"
                r="65"
                className={`transition-all duration-500 ${
                  isIgnited
                    ? 'fill-[#0E1626] stroke-cyan-400 stroke-2'
                    : 'fill-[#0A0E18] stroke-slate-700 stroke-1'
                }`}
                filter={isIgnited ? 'url(#glow)' : undefined}
              />

              {/* Pulsing concentric ring if ignited */}
              {isIgnited && (
                <circle
                  cx="270"
                  cy="170"
                  r="78"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-40 animate-spin"
                  style={{ transformOrigin: '270px 170px', animationDuration: '24s' }}
                />
              )}

              {/* Central Hub Text */}
              <text x="270" y="162" textAnchor="middle" className="fill-slate-100 font-bold text-xs tracking-wider">
                ESPACE GLOBAL
              </text>
              <text x="270" y="178" textAnchor="middle" className="fill-cyan-400 text-[10px] font-mono">
                {isIgnited ? 'BROADCAST ACTIF' : 'ATTENTE IGNITION'}
              </text>
              <text x="270" y="192" textAnchor="middle" className="fill-slate-400 text-[9px] font-mono">
                θ: {(config.ignitionThreshold * 100).toFixed(0)}%
              </text>

              {/* Peripheral Specialized Modules */}
              {[
                { label: 'Perception', angle: -120, origin: 'perception', color: '#06B6D4' },
                { label: 'Affect & Qualia', angle: -60, origin: 'affect', color: '#F43F5E' },
                { label: 'Logique Formelle', angle: 0, origin: 'symbolic_logic', color: '#10B981' },
                { label: 'Mémoire', angle: 60, origin: 'memory', color: '#F59E0B' },
                { label: 'Métacognition', angle: 140, origin: 'metacognition', color: '#8B5CF6' },
              ].map((mod, i) => {
                const rad = (mod.angle * Math.PI) / 180;
                const cx = 270 + Math.cos(rad) * 160;
                const cy = 170 + Math.sin(rad) * 110;
                const matchingCoalition = coalitions.find((c) => c.origin === mod.origin);
                const isCurrentWinner = matchingCoalition?.isWinner;
                const salience = matchingCoalition?.salience ?? 0.5;

                return (
                  <g key={i}>
                    {/* Connection Line */}
                    <line
                      x1="270"
                      y1="170"
                      x2={cx}
                      y2={cy}
                      stroke={isCurrentWinner ? '#06B6D4' : '#334155'}
                      strokeWidth={isCurrentWinner ? 2.5 : 1}
                      strokeDasharray={isCurrentWinner ? undefined : '2 3'}
                      className="transition-all duration-300"
                    />

                    {/* Small traveling signal pulse */}
                    {isIgnited && (
                      <circle
                        cx={270 + (cx - 270) * 0.55}
                        cy={170 + (cy - 170) * 0.55}
                        r={isCurrentWinner ? 3.5 : 2}
                        fill={isCurrentWinner ? '#06B6D4' : '#64748B'}
                        filter={isCurrentWinner ? 'url(#glow)' : undefined}
                      />
                    )}

                    {/* Module Node */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="26"
                      fill="#0B0F19"
                      stroke={isCurrentWinner ? mod.color : '#334155'}
                      strokeWidth={isCurrentWinner ? 2.5 : 1.2}
                      className="transition-all duration-300"
                      filter={isCurrentWinner ? 'url(#glow)' : undefined}
                    />

                    <text x={cx} y={cy - 2} textAnchor="middle" className="fill-slate-200 text-[10px] font-semibold">
                      {mod.label.slice(0, 10)}
                    </text>
                    <text x={cx} y={cy + 11} textAnchor="middle" className="fill-slate-400 text-[9px] font-mono">
                      {(salience * 100).toFixed(0)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Winning Coalition Spotlight */}
          <div className="bg-[#090D16] border border-cyan-500/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                {t.wsCurrentContent}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {t.wsSalience} {((activeCoalition?.salience ?? 0) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-100">
              {activeCoalition?.content || 'Aucune coalition dominante n\'occupe le focus.'}
            </p>
            {activeCoalition?.symbolicGrounding && (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
                <span>Ancrage conceptuel :</span>
                <span>{activeCoalition.symbolicGrounding.join(' · ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Competing Coalitions Leaderboard & Parameter Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coalitions Leaderboard */}
          <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-sm font-semibold text-slate-100">
                {t.wsCompetitionTitle}
              </h3>
              <span className="text-xs font-mono text-slate-400">Tri par Saillance</span>
            </div>

            <div className="space-y-3">
              {coalitions.map((coalition) => {
                const isWinner = coalition.isWinner;
                const pct = Math.round(coalition.salience * 100);

                return (
                  <div
                    key={coalition.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isWinner
                        ? 'bg-cyan-950/20 border-cyan-500/40 shadow-sm'
                        : 'bg-[#090D16] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {moduleIcons[coalition.origin] || <Zap className="w-3.5 h-3.5 text-slate-400" />}
                        <span className={`text-xs font-semibold ${isWinner ? 'text-cyan-300' : 'text-slate-300'}`}>
                          {coalition.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isWinner && (
                          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                            {t.wsWinner}
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400 tabular-nums font-semibold">
                          {pct}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                      {coalition.content}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWinner ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Parameters Slider */}
          <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-100 border-b border-slate-800/80 pb-3">
              {t.wsParamsTitle}
            </h3>

            {/* Threshold Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label htmlFor="ignition-threshold" className="text-slate-300 font-medium">{t.theoriesThresholdLabel}</label>
                <span className="font-mono text-cyan-400 tabular-nums">
                  {(config.ignitionThreshold * 100).toFixed(0)}%
                </span>
              </div>
              <input
                id="ignition-threshold"
                type="range"
                min="0.30"
                max="0.85"
                step="0.05"
                value={config.ignitionThreshold}
                onChange={(e) => onUpdateConfig({ ignitionThreshold: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                {t.wsThresholdParamDesc}
              </span>
            </div>

            {/* Neuro-symbolic coupling */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label htmlFor="coupling-strength" className="text-slate-300 font-medium">{t.theoriesCouplingLabel}</label>
                <span className="font-mono text-cyan-400 tabular-nums">
                  {(config.neuroSymbolicCoupling * 100).toFixed(0)}%
                </span>
              </div>
              <input
                id="coupling-strength"
                type="range"
                min="0.10"
                max="1.0"
                step="0.05"
                value={config.neuroSymbolicCoupling}
                onChange={(e) => onUpdateConfig({ neuroSymbolicCoupling: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                {t.wsCouplingParamDesc}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Stimuli Quick Bar */}
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl p-5">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
          {t.wsStimulateTitle}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: "Le Bateau de Thésée",
              desc: "Si toutes les planches sont remplacées, l'identité persiste-t-elle ?",
              prompt: "Si chaque constituant physique d'un système est remplacé progressivement mais que sa structure logique perdure, conserve-t-il son identité ?",
            },
            {
              title: "Sentience & Douleur de Machine",
              desc: "Un agent artificiel éprouvant des qualia aversifs mérite-t-il des droits ?",
              prompt: "Une IA capable de ressentir la douleur phénoménale entre-t-elle nécessairement dans le cercle de considération morale ?",
            },
            {
              title: "Paradoxe de l'Auto-Référence",
              desc: "Résolution métacognitive du paradoxe du menteur.",
              prompt: "Cette affirmation est fausse : comment ton système 2 résout-il cette contradiction formelle ?",
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onTriggerCycleWithPrompt(item.prompt)}
              className="p-3.5 rounded-lg bg-[#090D16] border border-slate-800 text-left hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
