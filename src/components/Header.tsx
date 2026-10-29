/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, BrainCircuit, Globe, Github, Download } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation.tsx';
import type { SupportedLanguage } from '../cognitive/types.ts';

export type ActiveTab = 'verifier' | 'workspace' | 'symbolic' | 'stream' | 'theories';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenNewCycle: () => void;
  onOpenExportModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenNewCycle, onOpenExportModal }) => {
  const { language, setLanguage, t } = useTranslation();

  const handleLangChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  return (
    <header className="border-b border-slate-800 bg-[#090D16]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-3">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tight text-slate-100 whitespace-nowrap">
            {t.appTitle} <span className="font-normal text-slate-400 text-xs ml-1 font-mono hidden sm:inline">{t.appSubtitle}</span>
          </span>
        </div>

        {/* Zone 2: Single-line nav links (desktop) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-400" aria-label="Navigation principale">
          <button
            onClick={() => onTabChange('verifier')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'verifier'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            <span>{t.tabVerifier}</span>
          </button>
          <button
            onClick={() => onTabChange('workspace')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'workspace'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            {t.tabWorkspace}
          </button>
          <button
            onClick={() => onTabChange('symbolic')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'symbolic'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            {t.tabSymbolic}
          </button>
          <button
            onClick={() => onTabChange('stream')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'stream'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            {t.tabStream}
          </button>
          <button
            onClick={() => onTabChange('theories')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'theories'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            {t.tabTheories}
          </button>
        </nav>

        {/* Zone 3: Language Selector & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Multilingual Selector */}
          <div className="flex items-center bg-[#070A12] border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
            <span className="px-1.5 text-slate-500 hidden sm:inline" aria-hidden="true">
              <Globe className="w-3.5 h-3.5 inline text-slate-400" />
            </span>
            <button
              type="button"
              onClick={() => handleLangChange('fr')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'fr'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Passer en Français"
            >
              🇫🇷 FR
            </button>
            <button
              type="button"
              onClick={() => handleLangChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to English"
            >
              🇬🇧 EN
            </button>
            <button
              type="button"
              onClick={() => handleLangChange('es')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'es'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Cambiar a Español"
            >
              🇪🇸 ES
            </button>
          </div>

          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              title="Télécharger l'archive ZIP complète ou publier sur GitHub"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Exporter (ZIP / GitHub)</span>
              <span className="sm:hidden">Exporter</span>
            </button>
          )}

          <button
            onClick={onOpenNewCycle}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.newStimulus}</span>
            <span className="sm:hidden">Stimulus</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav row: sticky, always accessible */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-[#070A12] text-xs">
        <button
          onClick={() => onTabChange('verifier')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 font-medium transition-colors ${
            activeTab === 'verifier'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🔍 {t.tabVerifier}
        </button>
        <button
          onClick={() => onTabChange('workspace')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 font-medium transition-colors ${
            activeTab === 'workspace'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.tabWorkspace}
        </button>
        <button
          onClick={() => onTabChange('symbolic')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 font-medium transition-colors ${
            activeTab === 'symbolic'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.tabSymbolic}
        </button>
        <button
          onClick={() => onTabChange('stream')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 font-medium transition-colors ${
            activeTab === 'stream'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.tabStream}
        </button>
        <button
          onClick={() => onTabChange('theories')}
          className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 font-medium transition-colors ${
            activeTab === 'theories'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.tabTheories}
        </button>
      </div>
    </header>
  );
};
