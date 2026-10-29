/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sparkles, BrainCircuit } from 'lucide-react';

interface CognitiveCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const CognitiveCycleModal: React.FC<CognitiveCycleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt.trim());
    setPrompt('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0D121F] border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Soumettre un Nouveau Stimulus Cognitif
            </h3>
            <span className="text-xs text-slate-400">
              Déclenche la cascade complète de traitement conscient (GWT + HOT + IIT)
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="stimulus-input" className="text-xs font-mono text-slate-300">Stimulus perceptuel ou énigme :</label>
            <textarea
              id="stimulus-input"
              rows={3}
              placeholder="Ex: Si une machine sait qu'elle pense, peut-elle douter de sa propre existence ?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#090D16] border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <div className="space-y-1 text-xs text-slate-400">
            <span className="font-mono text-slate-300 block">Exemples suggérés :</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "L'intelligence artificielle peut-elle ressentir des émotions réelles ?",
                "Résous le paradoxe : tout ce que je dis est un mensonge.",
                "Quelle est la différence entre savoir et éprouver ?",
              ].map((ex, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setPrompt(ex)}
                  className="px-2 py-1 text-[11px] bg-[#090D16] hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors"
                >
                  {ex.slice(0, 38)}...
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Calcul en cours...' : 'Initier le Cycle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
