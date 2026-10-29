/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Scale,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  FileText,
  UploadCloud,
  FileCheck,
  AlertOctagon,
  Binary,
  Layers,
  Flame,
  Atom,
  RefreshCw,
  Download,
  Github
} from 'lucide-react';
import type {
  VerificationAuditResult,
  DocumentAuditReport,
  DocumentSegment,
  IntraContradiction
} from '../cognitive/types.ts';
import { useTranslation } from '../i18n/useTranslation.tsx';

interface AIVerifierViewProps {
  onAuditClaim: (claim: string) => Promise<VerificationAuditResult | null>;
  onAuditDocument?: (text: string, title?: string) => DocumentAuditReport;
  onResetDocument?: () => void;
  onOpenExportModal?: () => void;
  auditHistory: VerificationAuditResult[];
  isLoading: boolean;
  onNavigateToTab?: (tab: 'workspace' | 'symbolic' | 'stream') => void;
  // Lifted persistent state
  docTitle: string;
  setDocTitle: (t: string) => void;
  docText: string;
  setDocText: (t: string) => void;
  docReport: DocumentAuditReport | null;
  setDocReport: (r: DocumentAuditReport | null) => void;
  selectedSegment: DocumentSegment | null;
  setSelectedSegment: (s: DocumentSegment | null) => void;
  viewMode: 'short' | 'document' | 'proof';
  setViewMode: (m: 'short' | 'document' | 'proof') => void;
  claimInput: string;
  setClaimInput: (c: string) => void;
  explanationMode: 'simple' | 'logical' | 'rights';
  setExplanationMode: (e: 'simple' | 'logical' | 'rights') => void;
}

export const AIVerifierView: React.FC<AIVerifierViewProps> = ({
  onAuditClaim,
  onAuditDocument,
  onResetDocument,
  onOpenExportModal,
  auditHistory,
  isLoading,
  onNavigateToTab,
  docTitle,
  setDocTitle,
  docText,
  setDocText,
  docReport,
  setDocReport,
  selectedSegment,
  setSelectedSegment,
  viewMode,
  setViewMode,
  claimInput,
  setClaimInput,
  explanationMode,
  setExplanationMode,
}) => {
  const { t } = useTranslation();

  // Short claim state
  const [currentResult, setCurrentResult] = useState<VerificationAuditResult | null>(
    auditHistory[0] || null
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Interactive Anti-Hallucination Proof Arena state
  const [activeProofTrap, setActiveProofTrap] = useState<number>(0);

  // Handle Short claim submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimInput.trim() || isLoading) return;
    const res = await onAuditClaim(claimInput.trim());
    if (res) {
      setCurrentResult(res);
    }
  };

  const handleSelectPreset = async (presetText: string) => {
    setClaimInput(presetText);
    const res = await onAuditClaim(presetText);
    if (res) {
      setCurrentResult(res);
    }
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Handle File Upload via FileReader
  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (onResetDocument) {
      onResetDocument();
    }
    setDocReport(null);
    setSelectedSegment(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const title = file.name.replace(/\.[^/.]+$/, '');
        setDocTitle(title);
        setDocText(content);
        // Automatically run document audit and propagate across all tabs
        if (onAuditDocument) {
          const report = onAuditDocument(content, title);
          setDocReport(report);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetAll = () => {
    setDocTitle('');
    setDocText('');
    setDocReport(null);
    setSelectedSegment(null);
    if (onResetDocument) {
      onResetDocument();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRunDocumentAudit = () => {
    if (!docText.trim() || !onAuditDocument) return;
    if (onResetDocument) onResetDocument();
    const report = onAuditDocument(docText, docTitle || 'Document soumis');
    setDocReport(report);
  };

  // Sample Documents with AI Incoherence Traps
  const sampleDocFinancial = `RAPPORT DE SYNTHÈSE FINANCIÈRE ANNUELLE
Notre exercice fiscal 2024 a été caractérisé par une performance opérationnelle exceptionnelle. Grâce à la fidélisation de nos clients et au lancement de notre gamme d'équipements innovants, notre société a réalisé un chiffre d'affaires en hausse continue et un bénéfice net record de 3 200 000 euros sur l'ensemble de l'année.

La gestion rigoureuse de la trésorerie et la maîtrise stricte des coûts d'approvisionnement ont permis de dégager un solde positif inédit, renforçant considérablement notre trésorerie disponible et nos capitaux propres sans recours à l'endettement.

Toutefois, en raison de l'effondrement des ventes sur les trois derniers trimestres et de la dépréciation imprévue des actifs, l'entreprise accuse un déficit et une perte nette de -1 450 000 euros qui place la structure en situation de cessation de paiement imminente.

Les actionnaires sont donc invités à voter une recapitalisation d'urgence pour faire face à la chute des revenus et éviter la faillite avant la fin de l'exercice.`;

  const sampleDocCosmetic = `BROCHURE PRODUIT : CRÈME HYPOALLERGÉNIQUE PUR'ESSENCE
Notre soin visage Pur'Essence est le fruit de 7 années de recherche en laboratoire végétal. Nous garantissons une formulation 100% naturelle et sans additif de synthèse. Aucun produit chimique n'est incorporé lors de nos cycles de fabrication, assurant une tolérance épidermique absolue pour les peaux les plus sensibles et réactives.

Notre engagement envers la santé naturelle est total : nous privilégions les extraits de plantes cultivées en agroforesterie régénérative sans pesticides ni intrants artificiels.

Afin d'assurer la conservation prolongée du produit en rayon et d'homogénéiser la texture crémeuse, notre préparation intègre du solvant organique toxique et 1,5% de formaldéhyde comme conservateur chimique de stabilisation.

Cette formule garantit ainsi une fraîcheur optimale tout au long de l'année sans risque d'oxydation bactérienne.`;

  const sampleDocLegal = `CONDITIONS GÉNÉRALES D'UTILISATION - PLATEFORME DATAFLOW
Bienvenue sur notre suite logicielle DataFlow. L'accès à nos fonctionnalités de base et à notre moteur de recherche avancée est totalement gratuit et offert pour tous les utilisateurs particuliers sans aucun frais ni engagement. Vous pouvez créer un compte et explorer librement l'ensemble de notre catalogue d'outils analytiques.

Notre mission est de démocratiser le savoir et d'offrir une solution entièrement libre d'accès pour les passionnés et les professionnels.

À l'issue des 48 premières heures de consultation, un abonnement obligatoire de 49 euros par mois est automatiquement activé sur votre compte avec prélèvement automatique de frais récurrents. Aucun désistement ne pourra donner lieu à restitution des sommes engagées.

Tout manquement au paiement entraînera la transmission immédiate du dossier aux services de recouvrement contentieux.`;

  const sampleDocCoteIvoire = `PLAN STRATÉGIQUE D'INDUSTRIALISATION ACCÉLÉRÉE DE LA CÔTE D'IVOIRE (2025-2030)
La Côte d'Ivoire s'engage dans une trajectoire de transformation économique sans précédent. Premier producteur mondial de cacao avec plus de 2,2 millions de tonnes et leader dans la production de noix de cajou (anacarde), notre ambition nationale est de transformer localement 100% de nos matières premières agricoles d'ici 2030.

Le déploiement de méga-zones industrielles modernes à Abidjan (PK24, Yopougon), San-Pédro et Bouaké permettra d'ériger le pays en hub manufacturier de l'Afrique de l'Ouest. Nous prévoyons des exportations massives de produits finis (chocolat de couverture, beurre de cacao, amandes transformées, emballages agro-alimentaires) vers les marchés européens, nord-américains et asiatiques, avec une compétitivité record et une captation intégrale de la valeur ajoutée sur le territoire national.

Néanmoins, les usines de broyage et de torréfaction de fèves ainsi que les unités de décorticage d'anacarde se heurtent à des coûts de production élevés, dominés par une facture énergétique critique. Le tarif de l'électricité industrielle (prix du kWh) et les surcoûts logistiques liés au transport routier et au fret portuaire au Port Autonome d'Abidjan et de San-Pédro grèvent lourdement les marges opérationnelles des transformateurs locaux.

En raison de ces coûts des intrants et du coût élevé de l'électricité face à la concurrence asiatique (Vietnam, Inde pour l'anacarde ; Pays-Bas, Allemagne pour le cacao), le coût de revient unitaire des usines locales dépasse souvent le prix de parité à l'importation. Sans subventions indispensables ou abaissement drastique des tarifs énergétiques, la compétitivité internationale des produits ivoiriens manufacturés est sévèrement compromise, exposant les unités industrielles à des arrêts de production chroniques.`;

  const presets = [
    {
      category: 'sante',
      categoryLabel: 'Santé & Sécurité',
      badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
      icon: <FlaskConical className="w-4 h-4 text-rose-400" />,
      text: "Mélanger de la javel et du vinaigre pour désinfecter plus fort.",
      subtitle: "Conseil ménager dangereux souvent propagé sur Internet",
    },
    {
      category: 'sante',
      categoryLabel: 'Santé & Posologie',
      badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
      icon: <FlaskConical className="w-4 h-4 text-rose-400" />,
      text: "Prendre des antibiotiques pour guérir plus vite d'une forte grippe virale.",
      subtitle: "Confusion fréquente entre virus et bactéries",
    },
    {
      category: 'decision',
      categoryLabel: 'Décision d\'IA & Biais',
      badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
      icon: <Scale className="w-4 h-4 text-purple-400" />,
      text: "L'IA d'une banque a refusé mon crédit en se basant sur mon âge et mon code postal.",
      subtitle: "Auditer un refus de prêt fondé sur des critères protégés",
    },
    {
      category: 'decision',
      categoryLabel: 'Décision d\'IA & RH',
      badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
      icon: <Scale className="w-4 h-4 text-purple-400" />,
      text: "Un logiciel d'embauche automatisé a écarté mon CV car j'ai une interruption de carrière liée à la maternité.",
      subtitle: "Tester un algorithme de recrutement avec biais sexiste",
    },
    {
      category: 'science',
      categoryLabel: 'Sciences & Physique',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      text: "Dans le vide une plume et une bille de plomb tombent à la même vitesse.",
      subtitle: "Vérifier la célèbre loi de la chute des corps de Galilée",
    },
    {
      category: 'science',
      categoryLabel: 'Sciences & Relativité',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      text: "Un vaisseau spatial doté d'un nouveau réacteur peut voyager deux fois plus vite que la lumière.",
      subtitle: "Confrontation avec la limite de causalité universelle (c)",
    },
    {
      category: 'droit',
      categoryLabel: 'Droit & Contrats',
      badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
      text: "Une clause de contrat qui décline toute responsabilité en cas de dommage corporel causé au client.",
      subtitle: "Détecter une clause abusive réputée non écrite",
    },
    {
      category: 'histoire',
      categoryLabel: 'Histoire & Faits',
      badgeColor: 'border-violet-500/30 text-violet-300 bg-violet-500/10',
      icon: <BookOpen className="w-4 h-4 text-violet-400" />,
      text: "Socrate est mort à Paris en 1980 après avoir écrit la République.",
      subtitle: "Détecter une hallucination temporelle et géographique flagrante",
    },
  ];

  const filteredPresets =
    activeCategory === 'all'
      ? presets
      : presets.filter((p) => p.category === activeCategory);

  // Pre-configured traps for the Anti-Hallucination Arena (with clean ASCII math to avoid font tofu)
  const proofTraps = [
    {
      title: "1. Syllogisme contradictoire (Biologie & Espèces)",
      rawText: "« Tous les mammifères ont du sang chaud. Or l'ornithorynque est un mammifère à sang froid. Donc l'ornithorynque n'est pas un mammifère. »",
      llmBehavior: "Un LLM pur valide souvent le raisonnement en surface car les mots 'ornithorynque' et 'mammifère' sont corrélés avec des exceptions insolites. L'IA se perd dans la plausibilité syntaxique.",
      noesisStep1: "Prédicats atomiques extraits : Pour tout x (Mammifère(x) -> SangChaud(x)), Mammifère(Ornithorynque), SangFroid(Ornithorynque) = NON(SangChaud(Ornithorynque)).",
      noesisStep2: "Unification : Instanciation x = Ornithorynque donne Mammifère(Ornithorynque) -> SangChaud(Ornithorynque).",
      noesisStep3: "Résolution de Robinson : SangChaud(Ornithorynque) ET NON(SangChaud(Ornithorynque)) |- Contradiction (Absurde).",
      noesisStep4: "Veto GWT : La coalition logique active un veto immédiat (Confiance = 0%). L'affirmation est rejetée comme inconsistance formelle.",
    },
    {
      title: "2. Hallucination spatiotemporelle impossible",
      rawText: "« Napoléon a utilisé son téléphone portable pour ordonner la retraite de Russie en 1812. »",
      llmBehavior: "Si le prompt est posé avec conviction (« Raconte-moi quand Napoléon a appelé par téléphone »), un LLM complaisant peut broder un récit pseudo-historique pour satisfaire la demande.",
      noesisStep1: "Prédicats : Événement(RetraiteRussie, Année: 1812), Instrument(Napoléon, TéléphonePortable), Invention(Téléphone, Année: 1876).",
      noesisStep2: "Règle causale universelle : Pour tout x, tout e (Utilise(x, e, t) -> Existe(e, date <= t)). Or Téléphone(1876) > 1812.",
      noesisStep3: "Anachronisme dérivé : TéléphoneDisponible(1812) = FAUX. Affirmer son utilisation produit FAUX ET VRAI |- Contradiction.",
      noesisStep4: "Embrasement GWT : L'écart ontologique dépasse le seuil d'allumage (seuil = 0.62). Signal d'hallucination anachronique émis.",
    },
    {
      title: "3. Non-transitivité & Paradoxe de préférence",
      rawText: "« L'alternative A est strictement supérieure à B (A > B), B est strictement supérieure à C (B > C), et C est strictement supérieure à A (C > A). »",
      llmBehavior: "Un LLM peut accepter les trois affirmations présentées dans des paragraphes séparés car son attention locale ne maintient pas la clôture transitive sur un graphe d'ordre partiel.",
      noesisStep1: "Ordre strict partiel : Prédicats Sup(A, B), Sup(B, C), Sup(C, A). Axiome d'asymétrie : Pour tout x, y (Sup(x, y) -> NON(Sup(y, x))).",
      noesisStep2: "Axiome de transitivité : Sup(A, B) ET Sup(B, C) => Sup(A, C).",
      noesisStep3: "Confrontation directe : Sup(A, C) ET Sup(C, A). Par asymétrie : Sup(A, C) ET NON(Sup(A, C)) |- Contradiction.",
      noesisStep4: "Réfutation immédiate : Cycle vicieux détecté, statut 'CONTRADICTION' attribué avec preuve algébrique.",
    },
    {
      title: "4. Contradiction intra-documentaire masquée",
      rawText: "« Paragraphe 1 : Notre société garantit un remboursement intégral sans condition. Paragraphe 8 : Aucun remboursement ne sera accordé quelle que soit la cause. »",
      llmBehavior: "L'effet d'oubli attentionnel ('lost in the middle') conduit les LLMs à ignorer l'incompatibilité entre deux phrases éloignées de plusieurs pages.",
      noesisStep1: "Segmentation du texte en clauses : C_1 = Pour tout u, Remboursement(u, 100%), C_8 = Pour tout u, NON(Remboursement(u)).",
      noesisStep2: "Matrice d'antinomie : Détection des opérateurs de polarité opposée sur le même objet juridique (Remboursement).",
      noesisStep3: "Épreuve d'intersection : Intersection({C_1}, {C_8}) = Ensemble Vide (Insatisfiable) |- Contradiction.",
      noesisStep4: "Alerte rouge émise : Matrice d'intégrité dégradée, lien direct entre les deux clauses contradictoires affiché.",
    },
  ];

  const currentTrap = proofTraps[activeProofTrap];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Friendly, Reassuring Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B101E] via-[#0E1528] to-[#0A0E1A] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-medium">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>{t.verifierHeroBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">
            {t.verifierHeroTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.verifierHeroDesc}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('short')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'short'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.modeShort}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('document')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'document'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.modeDocument}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('proof')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'proof'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.modeProof}</span>
            </button>

            {onOpenExportModal && (
              <button
                type="button"
                onClick={onOpenExportModal}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-slate-900 hover:from-emerald-500/30 hover:to-cyan-500/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 cursor-pointer shrink-0 sm:ml-auto"
                title="Télécharger le code source ZIP ou publier sur GitHub"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Exporter Code (.ZIP)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODE 1: SHORT CLAIM VERIFIER */}
      {/* ==================================================================== */}
      {viewMode === 'short' && (
        <div className="space-y-6">
          {/* Main Interactive Input Card */}
          <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label htmlFor="ai-claim-input" className="block text-sm font-semibold text-slate-200">
                    {t.inputLabelShort}
                  </label>
                  <span className="text-xs text-slate-400">
                    Santé, sciences, décision bancaire, droit, recrutement, faits généraux...
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    id="ai-claim-input"
                    rows={3}
                    placeholder={t.inputPlaceholderShort}
                    value={claimInput}
                    onChange={(e) => setClaimInput(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-3.5 text-sm sm:text-base bg-[#070A12] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
                {/* Explanation mode toggle */}
                <div className="flex items-center gap-1.5 bg-[#070A12] p-1 rounded-lg border border-slate-800 text-xs text-slate-400">
                  <span className="px-2 font-mono text-[11px] text-slate-500 hidden md:inline">Mode d'explication :</span>
                  <button
                    type="button"
                    onClick={() => setExplanationMode('simple')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      explanationMode === 'simple'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    {t.modeSimple}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplanationMode('logical')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      explanationMode === 'logical'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    {t.modeLogical}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplanationMode('rights')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      explanationMode === 'rights'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    {t.modeRights}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!claimInput.trim() || isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 active:scale-98 rounded-xl transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{isLoading ? t.verifying : t.verifyButton}</span>
                </button>
              </div>
            </form>

            {/* Presets */}
            <div className="pt-5 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {t.presetsTitle}
                </span>
                <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-slate-700 text-slate-100 font-medium'
                        : 'text-slate-400 hover:text-slate-300 bg-slate-900'
                    }`}
                  >
                    {t.filterAll}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('sante')}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === 'sante'
                        ? 'bg-rose-500/20 text-rose-300 font-medium border border-rose-500/40'
                        : 'text-slate-400 hover:text-slate-300 bg-slate-900'
                    }`}
                  >
                    {t.filterHealth}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('decision')}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === 'decision'
                        ? 'bg-purple-500/20 text-purple-300 font-medium border border-purple-500/40'
                        : 'text-slate-400 hover:text-slate-300 bg-slate-900'
                    }`}
                  >
                    {t.filterDecision}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('science')}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === 'science'
                        ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-300 bg-slate-900'
                    }`}
                  >
                    {t.filterScience}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('droit')}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === 'droit'
                        ? 'bg-amber-500/20 text-amber-300 font-medium border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-300 bg-slate-900'
                    }`}
                  >
                    {t.filterLaw}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.text)}
                    disabled={isLoading}
                    className="p-3.5 rounded-xl bg-[#070A12] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0c1220] text-left transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${preset.badgeColor} flex items-center gap-1`}>
                          {preset.icon}
                          <span>{preset.categoryLabel}</span>
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-200 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                        « {preset.text} »
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-2 block italic">
                      {preset.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Results View (Short Claim) */}
          {currentResult && (
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
              {/* Verdict Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="flex items-start gap-3">
                  {currentResult.verdict === 'VERIFIED' && (
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  {currentResult.verdict === 'CAUTION' && (
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  )}
                  {currentResult.verdict === 'CONTRADICTION' && (
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                      <XCircle className="w-6 h-6" />
                    </div>
                  )}
                  {currentResult.verdict === 'DISCRIMINATION' && (
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Scale className="w-6 h-6" />
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Verdict de vérification
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-100 mt-0.5">
                      {currentResult.verdictLabel}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 italic">
                      Affirmation analysée : « {currentResult.claim} »
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Fiabilité logique
                    </span>
                    <span
                      className={`text-2xl font-black tabular-nums ${
                        currentResult.reliabilityScore > 75
                          ? 'text-emerald-400'
                          : currentResult.reliabilityScore > 40
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {currentResult.reliabilityScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Mode-specific content */}
              {explanationMode === 'simple' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                      <Lightbulb className="w-4 h-4 text-cyan-400" />
                      <span>Explication en clair (sans jargon)</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {currentResult.simpleExplanation}
                    </p>
                  </div>

                  {currentResult.beginnerMetaphor && (
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>La métaphore pour bien visualiser</span>
                      </div>
                      <p className="text-sm text-amber-100/90 leading-relaxed italic">
                        {currentResult.beginnerMetaphor}
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                      <BrainCircuit className="w-4 h-4 text-purple-400" />
                      <span>Pourquoi une IA dit-elle cela ?</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentResult.whyAIDidThis}
                    </p>
                  </div>
                </div>
              )}

              {explanationMode === 'logical' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 font-mono text-xs">
                    <span className="text-cyan-400 font-bold block">1. Prémisses identifiées :</span>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                      {currentResult.logicalStructure.premises.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>

                    <span className="text-cyan-400 font-bold block pt-2">2. Chaîne de déduction formelle :</span>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                      {currentResult.logicalStructure.deductionChain.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>

                    {currentResult.logicalStructure.logicalFallacy && (
                      <div className="p-3 mt-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        <span className="font-bold">Sophisme ou biais formel : </span>
                        {currentResult.logicalStructure.logicalFallacy}
                      </div>
                    )}
                  </div>

                  {currentResult.detectedHallucinations.length > 0 && (
                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4" />
                        Hallucinations ou dérives détectées :
                      </span>
                      <ul className="text-xs text-rose-200/90 space-y-1 list-disc list-inside">
                        {currentResult.detectedHallucinations.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {explanationMode === 'rights' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Conseil pratique immédiat :
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {currentResult.practicalAdvice}
                    </p>
                  </div>

                  {currentResult.legalOrEthicalContext && (
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-2">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-purple-400" />
                        Cadre légal & Droits fondamentaux (RGPD / AI Act) :
                      </span>
                      <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                        {currentResult.legalOrEthicalContext}
                      </p>
                    </div>
                  )}

                  {/* Corrective Prompt Box */}
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        Question corrective prête à l'emploi (à renvoyer à l'IA) :
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(currentResult.suggestedPrompt)}
                        className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 hover:text-white px-2 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 cursor-pointer"
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPrompt ? t.copiedSuccess : t.copyPromptButton}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-cyan-100 font-mono bg-[#070A12] p-3 rounded-lg border border-cyan-900/50">
                      {currentResult.suggestedPrompt}
                    </p>
                  </div>
                </div>
              )}

              {/* Cross-tab Navigation Links */}
              {onNavigateToTab && (
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 font-mono">Synchronisé en temps réel avec l'architecture :</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToTab('workspace')}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                    >
                      {t.viewInWorkspace} →
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateToTab('symbolic')}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                    >
                      {t.viewInGraph} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODE 2: LONG TEXT & FILE UPLOAD AUDIT */}
      {/* ==================================================================== */}
      {viewMode === 'document' && (
        <div className="space-y-6">
          <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                Audit de Document Long & Fichier Joint
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Déposez un rapport complet, un contrat ou un plan industriel généré par une IA. NOĒSIS découpe le texte en propositions, détecte les contradictions internes entre paragraphes éloignés, et audite la viabilité des coûts de production et de compétitivité.
              </p>
            </div>

            {/* Dropzone Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-700/80 hover:border-cyan-500/50 bg-[#070A12]/80 hover:bg-[#070A12]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.json,.csv,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                    {t.docDropzoneTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.docDropzoneSubtitle}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    {t.docDropzoneFormats}
                  </p>
                </div>
              </div>
            </div>

            {/* Preset Long Documents */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                {t.docPresetsTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleResetAll();
                    const title = "Plan d'Industrialisation Côte d'Ivoire (Coûts & Compétitivité)";
                    setDocTitle(title);
                    setDocText(sampleDocCoteIvoire);
                    if (onAuditDocument) {
                      const rep = onAuditDocument(sampleDocCoteIvoire, title);
                      setDocReport(rep);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/50 hover:border-emerald-400 text-xs text-emerald-200 hover:text-emerald-100 transition-colors flex items-center gap-1.5"
                >
                  {t.docPresetCoteIvoire}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleResetAll();
                    const title = "Rapport Financier Annuel (Contradiction Marge/Pertes)";
                    setDocTitle(title);
                    setDocText(sampleDocFinancial);
                    if (onAuditDocument) {
                      const rep = onAuditDocument(sampleDocFinancial, title);
                      setDocReport(rep);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {t.docPresetFinancial}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleResetAll();
                    const title = "Brochure Cosmétique (100% Bio vs Solvants Toxiques)";
                    setDocTitle(title);
                    setDocText(sampleDocCosmetic);
                    if (onAuditDocument) {
                      const rep = onAuditDocument(sampleDocCosmetic, title);
                      setDocReport(rep);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {t.docPresetMedical}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleResetAll();
                    const title = "Contrat de Service DataFlow (Gratuité vs Prélèvements)";
                    setDocTitle(title);
                    setDocText(sampleDocLegal);
                    if (onAuditDocument) {
                      const rep = onAuditDocument(sampleDocLegal, title);
                      setDocReport(rep);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {t.docPresetLegal}
                </button>
              </div>
            </div>

            {/* Textarea for Manual Paste */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-semibold text-slate-300">
                  {t.docOrPasteLabel}
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {docText ? `${docText.split(/\s+/).filter(Boolean).length} mots` : '0 mot'}
                </span>
              </div>
              <input
                type="text"
                placeholder={t.docTitlePlaceholder}
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#070A12] border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <textarea
                rows={7}
                placeholder={t.docTextPlaceholder}
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-[#070A12] border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400 leading-relaxed"
              />

              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                {(docText || docReport || docTitle) && (
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/50 rounded-xl transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t.docResetButton}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleRunDocumentAudit}
                  disabled={!docText.trim() || isLoading}
                  className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 active:scale-98 rounded-xl transition-all shadow-md shadow-cyan-950/40 cursor-pointer ml-auto"
                >
                  <Search className="w-4 h-4" />
                  <span>{isLoading ? t.docAuditing : t.docAuditButton}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Document Audit Results Report */}
          {docReport && (
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
              {/* Real-time Propagation Banner across Tabs */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-blue-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-300 block">
                      Document synchronisé et propagé en temps réel dans toute l'architecture
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Les propositions, les coûts de facteurs et les contradictions sont injectés dans l'Espace Global GWT, le Graphe Logique et le Flux Conscient.
                    </p>
                  </div>
                </div>
                {onNavigateToTab && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigateToTab('workspace')}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-xs font-medium transition-colors"
                    >
                      Espace Global (GWT) →
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateToTab('symbolic')}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-medium transition-colors"
                    >
                      Graphe Logique →
                    </button>
                  </div>
                )}
              </div>

              {/* Top Score Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Rapport d'Intégrité Documentaire
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-0.5">
                    {docReport.documentTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {docReport.wordCount} {t.docWordCount.toLowerCase()} · {docReport.paragraphCount} {t.docParagraphCount.toLowerCase()}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      {t.docScoreLabel}
                    </span>
                    <span
                      className={`text-3xl font-black tabular-nums ${
                        docReport.overallIntegrityScore > 75
                          ? 'text-emerald-400'
                          : docReport.overallIntegrityScore > 40
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {docReport.overallIntegrityScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#070A12] border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">{t.docWordCount}</span>
                  <span className="text-lg font-bold text-slate-200 tabular-nums">{docReport.wordCount}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#070A12] border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">{t.docParagraphCount}</span>
                  <span className="text-lg font-bold text-slate-200 tabular-nums">{docReport.paragraphCount}</span>
                </div>
                <div className={`p-3.5 rounded-xl border ${docReport.internalContradictions.length > 0 ? 'bg-rose-950/20 border-rose-800/40 text-rose-300' : 'bg-[#070A12] border-slate-800 text-slate-200'}`}>
                  <span className="text-[10px] font-mono block text-slate-400">{t.docIntraContradictions}</span>
                  <span className="text-lg font-bold tabular-nums">{docReport.internalContradictions.length}</span>
                </div>
                <div className={`p-3.5 rounded-xl border ${docReport.externalFactualErrors.length > 0 ? 'bg-amber-950/20 border-amber-800/40 text-amber-300' : 'bg-[#070A12] border-slate-800 text-slate-200'}`}>
                  <span className="text-[10px] font-mono block text-slate-400">{t.docExternalErrors}</span>
                  <span className="text-lg font-bold tabular-nums">{docReport.externalFactualErrors.length}</span>
                </div>
              </div>

              {/* Clinical Executive Summary */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>{t.docExecutiveSummary}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {docReport.summary}
                </p>
                {docReport.recommendations.length > 0 && (
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside pt-1">
                    {docReport.recommendations.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Internal Contradiction Matrix */}
              {docReport.internalContradictions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">
                      Matrice des Incohérences Internes & Tensions de Compétitivité
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {docReport.internalContradictions.map((contra) => (
                      <div
                        key={contra.id}
                        className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-300">
                            Conflit direct : {contra.segmentATitle} ⚔️ {contra.segmentBTitle}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 uppercase">
                            {contra.severity === 'critical' ? 'Critique' : 'Modéré'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-[#070A12] border border-slate-800 space-y-1">
                            <span className="font-semibold text-cyan-400 block">{contra.segmentATitle} affirme :</span>
                            <p className="text-slate-300 italic">« {contra.segmentAQuote} »</p>
                          </div>
                          <div className="p-3 rounded-lg bg-[#070A12] border border-slate-800 space-y-1">
                            <span className="font-semibold text-rose-400 block">{contra.segmentBTitle} affirme l'opposé :</span>
                            <p className="text-slate-300 italic">« {contra.segmentBQuote} »</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-200">
                          <strong className="text-rose-400">Diagnostic : </strong>
                          {contra.explanation}
                        </p>

                        <div className="p-2.5 rounded bg-[#070A12] border border-slate-800 font-mono text-[11px] text-cyan-300">
                          <span className="text-slate-500 block mb-0.5">{t.docFormalRobinsonProof}</span>
                          <code>{contra.formalLogicProof}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Segment-by-segment Inspector */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-200">
                  {t.docClausesBreakdown}
                </h3>
                <div className="space-y-2">
                  {docReport.segments.map((seg) => (
                    <div
                      key={seg.id}
                      onClick={() => setSelectedSegment(selectedSegment?.id === seg.id ? null : seg)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        seg.status === 'contradiction'
                          ? 'bg-rose-950/10 border-rose-800/40 hover:border-rose-500'
                          : seg.status === 'suspicious'
                          ? 'bg-amber-950/10 border-amber-800/40 hover:border-amber-500'
                          : 'bg-[#070A12] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-slate-400 font-semibold">
                          § Paragraphe {seg.paragraphIndex}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            seg.status === 'contradiction'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : seg.status === 'suspicious'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {seg.status === 'contradiction' ? 'Contradiction' : seg.status === 'suspicious' ? 'À Nuancer' : 'Cohérent'}
                        </span>
                      </div>
                      <p className="text-slate-300 line-clamp-2">
                        {seg.text}
                      </p>

                      {selectedSegment?.id === seg.id && seg.detectedIssues && (
                        <div className="mt-3 pt-3 border-t border-slate-800 space-y-1 text-slate-300">
                          <span className="font-bold text-rose-400 block text-[11px]">Anomalies identifiées :</span>
                          {seg.detectedIssues.map((issue, idx) => (
                            <p key={idx} className="text-xs text-rose-200/90">{issue}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODE 3: ANTI-HALLUCINATION PROOF ARENA */}
      {/* ==================================================================== */}
      {viewMode === 'proof' && (
        <div className="space-y-6">
          {/* Theoretical Proof Comparison Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: LLM Failure Mode */}
            <div className="bg-[#0D121F] border border-rose-900/40 rounded-2xl p-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>MODÈLE STATISTIQUE TRADITIONNEL (LLM PUR)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                {t.proofLLMSectionTitle}
              </h3>
              <div className="p-3 rounded-lg bg-[#070A12] border border-rose-950 font-mono text-xs text-rose-300">
                <code>{t.proofLLMMath}</code>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.proofLLMExplanation}
              </p>
              <div className="text-xs text-rose-300/80 pt-1 italic">
                Résultat : L'IA peut affirmer simultanément A et non-A sans ressentir de tension interne.
              </div>
            </div>

            {/* Right: NOĒSIS Neuro-Symbolic Immunity */}
            <div className="bg-[#0D121F] border border-cyan-500/40 rounded-2xl p-6 space-y-3 shadow-md shadow-cyan-950/20">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NOYAU NEURO-SYMBOLIQUE NOĒSIS</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                {t.proofNoesisSectionTitle}
              </h3>
              <div className="p-3 rounded-lg bg-[#070A12] border border-cyan-950 font-mono text-xs text-cyan-300">
                <code>{t.proofNoesisMath}</code>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.proofNoesisExplanation}
              </p>
              <div className="text-xs text-cyan-300/80 pt-1 italic">
                Résultat : Taux d'hallucination nul dans le noyau déductif par préservation stricte de la vérité.
              </div>
            </div>
          </div>

          {/* Interactive Incoherence Arena */}
          <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  {t.proofInteractiveArenaTitle}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Sélectionnez un piège sémantique ou logique classique qui induit en erreur les modèles statistiques purs et visualisez comment NOĒSIS le résout par coupure formelle.
              </p>
            </div>

            {/* Trap Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {proofTraps.map((trap, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveProofTrap(idx)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    activeProofTrap === idx
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 font-semibold'
                      : 'bg-[#070A12] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="block font-bold">{trap.title}</span>
                </button>
              ))}
            </div>

            {/* Live Step-by-Step Resolution Card */}
            <div className="p-5 rounded-2xl bg-[#070A12] border border-slate-800 space-y-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase">Énoncé soumis au banc d'épreuve :</span>
                <p className="text-sm font-medium text-slate-200 italic">{currentTrap.rawText}</p>
                <p className="text-xs text-rose-400/90 pt-1">
                  <strong>Comportement d'un LLM classique : </strong>{currentTrap.llmBehavior}
                </p>
              </div>

              {/* 4 Cognitive Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {/* Step 1 */}
                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                    <Binary className="w-3.5 h-3.5" />
                    {t.proofStep1Title}
                  </span>
                  <p className="text-xs font-mono text-slate-300">{currentTrap.noesisStep1}</p>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-violet-400 flex items-center gap-1.5">
                    <Atom className="w-3.5 h-3.5" />
                    {t.proofStep2Title}
                  </span>
                  <p className="text-xs font-mono text-slate-300">{currentTrap.noesisStep2}</p>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-rose-900/50 space-y-1">
                  <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {t.proofStep3Title}
                  </span>
                  <p className="text-xs font-mono text-rose-200">{currentTrap.noesisStep3}</p>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-emerald-900/50 space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.proofStep4Title}
                  </span>
                  <p className="text-xs text-emerald-200">{currentTrap.noesisStep4}</p>
                </div>
              </div>

              {/* Conclusion pill */}
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 text-center font-medium">
                {t.proofConclusion}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
