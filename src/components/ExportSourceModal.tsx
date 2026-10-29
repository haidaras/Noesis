/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, Github, Terminal, Copy, Check, FolderTree, Package, FileCode, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface ExportSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportSourceModal: React.FC<ExportSourceModalProps> = ({ isOpen, onClose }) => {
  const { language } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [isDownloadingTar, setIsDownloadingTar] = useState(false);

  if (!isOpen) return null;

  const gitSnippet = `# 1. Accédez au dossier décompressé
cd noesis

# 2. Initialisez le dépôt local et connectez-le à votre GitHub
git init
git branch -M main
git remote add origin https://github.com/haidaras/noesis.git

# 3. Ajoutez tous les fichiers et faites le commit de publication
git add .
git commit -m "feat: Initial release of NOĒSIS - Neuro-Symbolic Cognitive Architecture & AI Verifier"

# 4. Poussez le code vers votre GitHub
git push -u origin main`;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(gitSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectDownload = async (format: 'zip' | 'tar') => {
    const isZip = format === 'zip';
    if (isZip) setIsDownloadingZip(true);
    else setIsDownloadingTar(true);

    const url = isZip ? '/api/download/zip' : '/api/download/tar';
    const filename = isZip ? 'noesis-v1.0.0.zip' : 'noesis-v1.0.0-source.tar.gz';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Erreur téléchargement blob, redirection directe:', err);
      window.location.href = url;
    } finally {
      if (isZip) setIsDownloadingZip(false);
      else setIsDownloadingTar(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0B0F19] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 p-5 sm:p-7 space-y-6 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Exporter le Code & Publier sur GitHub
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Compte cible : <span className="font-mono text-cyan-300 font-semibold">https://github.com/haidaras</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action 1: Download Archives (ZIP & TAR.GZ) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              1. Téléchargement Direct du Projet Complet
            </span>
            <span className="text-[11px] font-mono text-slate-400">14 tests validés · 1.8 Mo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* ZIP Card */}
            <div className="bg-[#070A12] border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl p-4 flex flex-col justify-between gap-3 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-cyan-400" />
                    Archive ZIP (.zip)
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    Recommandé
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Format standard universel, idéal pour Windows, Mac et Linux. Décompressez et lancez avec <code className="text-slate-300">npm install</code>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDirectDownload('zip')}
                disabled={isDownloadingZip}
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-950/40 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloadingZip ? 'Génération du ZIP...' : 'Télécharger noesis-v1.0.0.zip'}</span>
              </button>
            </div>

            {/* TAR.GZ Card */}
            <div className="bg-[#070A12] border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between gap-3 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-violet-400" />
                    Archive TAR.GZ (.tar.gz)
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    Linux / Serveurs
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Format d'archivage Unix avec préservation des droits d'exécution, idéal pour serveurs et conteneurs Docker.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDirectDownload('tar')}
                disabled={isDownloadingTar}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloadingTar ? 'Génération TAR...' : 'Télécharger source.tar.gz'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action 2: Publication step-by-step on GitHub */}
        <div className="space-y-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              2. Commandes Git pour Publier sur https://github.com/haidaras/noesis
            </span>
            <button
              onClick={handleCopyCommands}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-cyan-300 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copier les commandes</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#05070D] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            <pre>{gitSnippet}</pre>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs text-slate-400">
            <span>💡 Pensez d'abord à créer le dépôt vide sur GitHub :</span>
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              <span>Créer le repo « noesis » sur github.com/new</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Summary of Included Assets */}
        <div className="bg-[#070A12] border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <FolderTree className="w-4 h-4 text-cyan-400" />
            <span>Fichiers & Modules intégrés dans l'archive téléchargée :</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cœur cognitif : GWT, IIT (Phi), HOT & Résolution Robinson</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Suite de tests unitaires (14 tests automatisés passants)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-violet-400" />
              <span>Moteur multilingue complet (Français, Anglais, Espagnol)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Licence Apache-2.0 & Citation BibTeX S. Haidara (IUGB)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
