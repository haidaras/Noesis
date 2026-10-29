/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';
import type { CognitiveCycleResult, ArchitectureConfig } from '../cognitive/types.ts';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface TelemetryRibbonProps {
  latestResult: CognitiveCycleResult | null;
  config: ArchitectureConfig;
  isLoading: boolean;
  onQuickCycle: () => void;
}

export const TelemetryRibbon: React.FC<TelemetryRibbonProps> = ({
  latestResult,
  config,
  isLoading,
  onQuickCycle,
}) => {
  const { t } = useTranslation();
  const isIgnited = latestResult?.globalWorkspace?.isIgnited ?? true;
  const phi = latestResult?.phiMetrics?.phi ?? 4.28;
  const confidence = latestResult?.metacognition?.epistemicConfidence ?? 91;
  const activeCoalition = latestResult?.globalWorkspace?.activeCoalition?.label ?? 'Structure Logique & Axiomatique';
  const consistency = latestResult?.symbolicDeduction?.isConsistent ?? true;

  return (
    <div className="bg-[#0B0F19] border-b border-slate-800/80 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
      {/* State & Primary metric */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-mono">
          <span className={`inline-block w-2 h-2 rounded-full ${isIgnited ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-amber-400'}`} />
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            {isLoading ? t.telemetryProcessing : isIgnited ? t.telemetryIgnited : t.telemetryPreconscious}
          </span>
        </div>

        <span aria-hidden="true" className="text-slate-700">·</span>

        <div className="flex items-center gap-1 font-mono">
          <span className="text-slate-400">{t.telemetryPhiLabel}</span>
          <span className="text-cyan-300 font-bold tabular-nums text-sm">
            {phi.toFixed(2)}
          </span>
          <span className="text-slate-400 text-[10px]">nats</span>
        </div>

        <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>

        <div className="hidden sm:flex items-center gap-1 font-mono">
          <span className="text-slate-400">{t.telemetryConfidenceLabel}</span>
          <span className="text-slate-200 font-semibold tabular-nums">
            {confidence}%
          </span>
        </div>
      </div>

      {/* Subsystem Telemetry */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="hidden md:flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">{t.telemetryCoalitionLabel}</span>
          <span className="text-slate-200 truncate max-w-[200px]">{activeCoalition}</span>
        </div>

        <span aria-hidden="true" className="text-slate-700 hidden md:inline">·</span>

        <div className="flex items-center gap-1.5">
          <ShieldCheck className={`w-3.5 h-3.5 ${consistency ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="text-slate-400">{t.telemetrySymbolicLabel}</span>
          <span className={consistency ? 'text-emerald-400' : 'text-amber-400'}>
            {consistency ? t.telemetryVerified : t.telemetryTension}
          </span>
        </div>

        <button
          onClick={onQuickCycle}
          disabled={isLoading}
          className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors ml-2 disabled:opacity-50 cursor-pointer"
        >
          <Activity className="w-3 h-3" />
          <span>{t.telemetryIterate}</span>
        </button>
      </div>
    </div>
  );
};
