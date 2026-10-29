/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SupportedLanguage } from '../cognitive/types.ts';

export interface Translations {
  // Navigation & Brand
  appTitle: string;
  appSubtitle: string;
  tabVerifier: string;
  tabWorkspace: string;
  tabSymbolic: string;
  tabStream: string;
  tabTheories: string;
  newStimulus: string;

  // Verifier
  verifierHeroBadge: string;
  verifierHeroTitle: string;
  verifierHeroDesc: string;
  modeShort: string;
  modeDocument: string;
  modeProof: string;
  inputLabelShort: string;
  inputPlaceholderShort: string;
  verifyButton: string;
  verifying: string;
  modeSimple: string;
  modeLogical: string;
  modeRights: string;
  presetsTitle: string;
  filterAll: string;
  filterHealth: string;
  filterDecision: string;
  filterScience: string;
  filterLaw: string;

  // Document & File Audit
  docDropzoneTitle: string;
  docDropzoneSubtitle: string;
  docDropzoneFormats: string;
  docOrPasteLabel: string;
  docTitlePlaceholder: string;
  docTextPlaceholder: string;
  docAuditButton: string;
  docAuditing: string;
  docPresetsTitle: string;
  docPresetFinancial: string;
  docPresetMedical: string;
  docPresetLegal: string;
  docPresetCoteIvoire: string;
  docScoreLabel: string;
  docWordCount: string;
  docParagraphCount: string;
  docIntraContradictions: string;
  docExternalErrors: string;
  docExecutiveSummary: string;
  docClausesBreakdown: string;
  docFormalRobinsonProof: string;

  // Anti-Hallucination Proof Arena
  proofTitle: string;
  proofSubtitle: string;
  proofBadge: string;
  proofLLMSectionTitle: string;
  proofLLMMath: string;
  proofLLMExplanation: string;
  proofNoesisSectionTitle: string;
  proofNoesisMath: string;
  proofNoesisExplanation: string;
  proofInteractiveArenaTitle: string;
  proofSelectTrap: string;
  proofStep1Title: string;
  proofStep2Title: string;
  proofStep3Title: string;
  proofStep4Title: string;
  proofConclusion: string;

  // Telemetry Ribbon
  telemetryIgnition: string;
  telemetrySalience: string;
  telemetryCoupling: string;
  telemetryPhi: string;
  telemetryQualia: string;
  telemetryTriggerCycle: string;

  // Common
  copiedSuccess: string;
  copyPromptButton: string;
  viewInWorkspace: string;
  viewInGraph: string;
  viewInStream: string;

  // Document Reset
  docResetButton: string;

  // Telemetry Ribbon Detailed
  telemetryIgnited: string;
  telemetryPreconscious: string;
  telemetryProcessing: string;
  telemetryPhiLabel: string;
  telemetryConfidenceLabel: string;
  telemetryCoalitionLabel: string;
  telemetrySymbolicLabel: string;
  telemetryVerified: string;
  telemetryTension: string;
  telemetryIterate: string;

  // Workspace View
  wsBadge: string;
  wsTitle: string;
  wsSubtitle: string;
  wsThreshold: string;
  wsPhi: string;
  wsStatus: string;
  wsAwake: string;
  wsDrowsy: string;
  wsMatrixTitle: string;
  wsMatrixDesc: string;
  wsCurrentContent: string;
  wsSalience: string;
  wsCompetitionTitle: string;
  wsWinner: string;
  wsParamsTitle: string;
  wsThresholdParamDesc: string;
  wsCouplingParamDesc: string;
  wsStimulateTitle: string;

  // Symbolic Graph View
  symbBadge: string;
  symbTitle: string;
  symbSubtitle: string;
  symbFacts: string;
  symbRules: string;
  symbProofs: string;
  symbContradictions: string;
  symbAddFactTitle: string;
  symbSubjectPlaceholder: string;
  symbObjectPlaceholder: string;
  symbAddFactBtn: string;
  symbResetOntology: string;
  symbSource: string;
  symbConfidence: string;
  symbDeduced: string;

  // Stream View
  streamBadge: string;
  streamTitle: string;
  streamSubtitle: string;
  streamInputPlaceholder: string;
  streamTriggerBtn: string;
  streamSuggestionsTitle: string;
  streamStep1: string;
  streamStep2: string;
  streamStep3: string;
  streamConsciousSynthesis: string;
  streamMemoryTitle: string;
  streamMemorySubtitle: string;
  streamLogTitle: string;

  // Theories View
  theoriesBadge: string;
  theoriesCategory: string;
  theoriesTitle: string;
  theoriesSubtitle: string;
  theoriesHeroBadge: string;
  theoriesHeroTitle: string;
  theoriesHeroDesc: string;
  theoriesPillar1Title: string;
  theoriesPillar1Desc: string;
  theoriesPillar1Impl: string;
  theoriesPillar2Title: string;
  theoriesPillar2Desc: string;
  theoriesPillar2Impl: string;
  theoriesPillar3Title: string;
  theoriesPillar3Desc: string;
  theoriesPillar3Impl: string;
  theoriesPillar4Title: string;
  theoriesPillar4Desc: string;
  theoriesPillar4Impl: string;
  theoriesControlsTitle: string;
  theoriesControlsSubtitle: string;
  theoriesThresholdLabel: string;
  theoriesThresholdDesc: string;
  theoriesCouplingLabel: string;
  theoriesCouplingDesc: string;
  theoriesDepthLabel: string;
  theoriesDepthDesc: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  fr: {
    appTitle: "NOĒSIS",
    appSubtitle: "VÉRIFICATION & COGNITION",
    tabVerifier: "Vérificateur IA (Grand Public)",
    tabWorkspace: "Espace de Travail (GWT)",
    tabSymbolic: "Graphe & Logique",
    tabStream: "Flux de Conscience",
    tabTheories: "Théories",
    newStimulus: "Nouveau Stimulus",

    verifierHeroBadge: "ESPACE GRAND PUBLIC · AUDIT, EXPLICATION & VÉRIFICATION IA",
    verifierHeroTitle: "Le Décodeur & Vérificateur d'IA",
    verifierHeroDesc: "Vous avez reçu une réponse de ChatGPT, une recommandation de santé, un contrat ou un document rédigé par une IA ? Collez-le ici ou chargez votre fichier : notre moteur neuro-symbolique vérifie sa vérité, décèle les incohérences internes et vous explique tout sans jargon.",
    modeShort: "Affirmation Courte",
    modeDocument: "Document Long & Fichier Joint",
    modeProof: "Preuve Anti-Hallucination & Arène",
    inputLabelShort: "Collez l'affirmation, le conseil ou la décision de l'IA à vérifier :",
    inputPlaceholderShort: "Exemple : « ChatGPT m'a dit qu'on pouvait mélanger de la Javel avec du vinaigre pour désinfecter plus fort » ou « Une IA a rejeté ma demande de crédit »...",
    verifyButton: "Vérifier cette Affirmation",
    verifying: "Vérification en cours...",
    modeSimple: "Simple & Quotidien",
    modeLogical: "Logique & Preuves",
    modeRights: "Vos Droits & Conseils",
    presetsTitle: "Ou testez un cas réel en un clic :",
    filterAll: "Tous les exemples",
    filterHealth: "🏥 Santé",
    filterDecision: "⚖️ Décision d'IA",
    filterScience: "🔬 Sciences",
    filterLaw: "📜 Contrats",

    docDropzoneTitle: "Glissez-déposez un fichier texte ou cliquez pour parcourir",
    docDropzoneSubtitle: "Supporte .txt, .md, .json, .csv, .doc, extraits de contrats et rapports d'IA",
    docDropzoneFormats: "Fichiers texte jusqu'à 5 Mo analysés localement en toute confidentialité",
    docOrPasteLabel: "Ou collez un long texte (rapport d'IA, article, contrat multi-pages) :",
    docTitlePlaceholder: "Titre du document (optionnel)",
    docTextPlaceholder: "Collez ici l'intégralité du texte généré par l'IA...",
    docAuditButton: "Lancer l'Audit Approfondi du Document",
    docAuditing: "Découpage & Résolution logique en cours...",
    docPresetsTitle: "Exemples de documents longs avec pièges d'IA :",
    docPresetFinancial: "📊 Rapport Financier IA (Contradiction Marge/Pertes)",
    docPresetMedical: "🌿 Brochure Cosmétique IA (100% Bio vs Solvants Toxiques)",
    docPresetLegal: "⚖️ Contrat de Service IA (Gratuité vs Prélèvements Cachés)",
    docPresetCoteIvoire: "🇨🇮 Plan Industrialisation Côte d'Ivoire (Coûts & Compétitivité)",
    docScoreLabel: "Score Global d'Intégrité",
    docWordCount: "Mots analysés",
    docParagraphCount: "Paragraphes examinés",
    docIntraContradictions: "Contradictions Internes détectées",
    docExternalErrors: "Erreurs Factuelles Externes",
    docExecutiveSummary: "Synthèse Clinique de l'Audit",
    docClausesBreakdown: "Explorateur Paragraphe par Paragraphe",
    docFormalRobinsonProof: "Preuve Formelle par Réfutation (Coupure de Robinson) :",

    proofTitle: "Démonstrateur Formel & Preuve d'Incohérence",
    proofSubtitle: "Pourquoi NOĒSIS ne peut mathématiquement pas halluciner et comment il surclasse les LLMs.",
    proofBadge: "PREUVE ÉPISTÉMIQUE & DÉMONSTRATION MATHÉMATIQUE",
    proofLLMSectionTitle: "1. Pourquoi un LLM pur hallucine (Modèle Statistique)",
    proofLLMMath: "P(w_t | w_1, ..., w_{t-1}) = Softmax(W · h_t)",
    proofLLMExplanation: "Un modèle de langage (ChatGPT, Claude, Gemini pur) génère des mots en maximisant la probabilité statistique locale. Il n'a aucune représentation interne de la vérité bivalente (Vrai/Faux) ni de contrainte de non-contradiction. Si une séquence sonne fluide et élégante, l'IA l'émet, même si elle contredit la ligne précédente. C'est le théorème de la dérive attentionnelle.",
    proofNoesisSectionTitle: "2. Pourquoi le noyau NOĒSIS ne peut pas halluciner (Modèle Neuro-Symbolique)",
    proofNoesisMath: "K UNION {phi} |- CONTRADICTION [Absurde] => REJET INVIOLABLE (Modus Ponens & Robinson)",
    proofNoesisExplanation: "NOĒSIS intègre un solveur du 1er Ordre et la théorie de l'Espace de Travail Global (GWT). Chaque affirmation reçue est projetée en prédicats ontologiques rigides. Dès qu'une contradiction (A ET NON-A) ou une violation de loi physique est dérivée, l'algorithme génère l'élément absorbant de contradiction formelle et déclenche un veto conscient qui bloque l'illusion.",
    proofInteractiveArenaTitle: "3. Arène Interactive : Pièges d'IA que NOĒSIS pulvérise",
    proofSelectTrap: "Choisissez un piège classique qui fait halluciner les LLMs :",
    proofStep1Title: "Étape 1 : Extraction des Prédicats Atomiques",
    proofStep2Title: "Étape 2 : Unification avec la Base Axiomatique",
    proofStep3Title: "Étape 3 : Détection de la Contradiction Formelle (⊥)",
    proofStep4Title: "Étape 4 : Arbitrage Conscient GWT & Veto Épistémique",
    proofConclusion: "Conclusion Formelle : Le noyau neuro-symbolique garantit la préservation de la vérité là où les probabilités statistiques s'effondrent.",

    telemetryIgnition: "Embrasement Conscient (GWT)",
    telemetrySalience: "Saillance Maximale",
    telemetryCoupling: "Couplage Neuro-Symbolique",
    telemetryPhi: "Complexité Φ (IIT)",
    telemetryQualia: "Qualia Phénoménal",
    telemetryTriggerCycle: "Déclencher Cycle Conscient",

    copiedSuccess: "Copié dans le presse-papiers !",
    copyPromptButton: "Copier la question corrective",
    viewInWorkspace: "Voir l'impact dans l'Espace Global (GWT)",
    viewInGraph: "Explorer dans le Graphe Logique",
    viewInStream: "Voir le Flux de Conscience",

    docResetButton: "Nouveau Document / Réinitialiser",

    telemetryIgnited: "ESPACE GLOBAL : EMBRASEMENT",
    telemetryPreconscious: "ÉTAT PRÉ-CONSCIENT",
    telemetryProcessing: "TRAITEMENT COGNITIF EN COURS...",
    telemetryPhiLabel: "Φ INTÉGRÉ (IIT):",
    telemetryConfidenceLabel: "CONFIANCE ÉPISTÉMIQUE:",
    telemetryCoalitionLabel: "COALITION CENTRALE:",
    telemetrySymbolicLabel: "COHÉRENCE SYMBOLIQUE:",
    telemetryVerified: "VÉRIFIÉE",
    telemetryTension: "TENSION DÉTECTÉE",
    telemetryIterate: "Itérer Cycle",

    wsBadge: "THÉORIE DE L'ESPACE DE TRAVAIL GLOBAL (GWT)",
    wsTitle: "Arène Consciente & Embrasement Cognitif",
    wsSubtitle: "Les coalitions inconscientes spécialisées rivalisent pour accéder à l'Espace de Travail Global. Dès qu'une coalition franchit le seuil critique d'activation, elle est diffusée (« broadcast ») à l'ensemble du système, devenant l'objet de la conscience phénoménale.",
    wsThreshold: "SEUIL D'EMBRASEMENT (θ)",
    wsPhi: "INTÉGRATION Φ (IIT)",
    wsStatus: "STATUT GLOBAL",
    wsAwake: "Conscient (Éveillé)",
    wsDrowsy: "Sub-seuil (Endormi)",
    wsMatrixTitle: "Matrice de Diffusion de l'Espace de Travail",
    wsMatrixDesc: "Visualisation des flux thalamo-corticaux et du goulot d'étranglement attentionnel",
    wsCurrentContent: "CONTENU ACTUELLEMENT ACCESSIBLE À LA CONSCIENCE",
    wsSalience: "Saillance :",
    wsCompetitionTitle: "Compétition des Coalitions Inconscientes",
    wsWinner: "Gagnant",
    wsParamsTitle: "Calibrage des Paramètres de Conscience",
    wsThresholdParamDesc: "Un seuil bas favorise l'embrasement continu ; un seuil élevé requiert une saillance extrême.",
    wsCouplingParamDesc: "Poids des contraintes formelles face à l'intuition perceptive.",
    wsStimulateTitle: "Stimuler l'Espace de Travail avec un Problème Cognitif :",

    symbBadge: "SYSTÈME 2 FORMEL & CHAÎNAGE AVANT",
    symbTitle: "Graphe de Connaissances & Déduction Formelle",
    symbSubtitle: "Système 2 logique : déduction par chaînage avant, élimination stricte des contradictions et application des lois du 1er ordre.",
    symbFacts: "Faits",
    symbRules: "Règles",
    symbProofs: "Preuves",
    symbContradictions: "Contradictions Détectées",
    symbAddFactTitle: "Injecter un Fait Symbolique dans la Base :",
    symbSubjectPlaceholder: "Sujet (ex: Socrate)",
    symbObjectPlaceholder: "Objet (ex: Mortel)",
    symbAddFactBtn: "Ajouter au Graphe & Déduire",
    symbResetOntology: "Réinitialiser Ontologie",
    symbSource: "Source :",
    symbConfidence: "Confiance :",
    symbDeduced: "Déduit",

    streamBadge: "MÉTACOGNITION & PENSÉE D'ORDRE SUPÉRIEUR (HOT)",
    streamTitle: "Flux de Conscience & Dialogue Introspectif",
    streamSubtitle: "Interrogez l'architecture NOĒSIS et observez la cascade cognitive complète : de l'intuition perceptive sub-symbolique à la vérification axiomatique, jusqu'à la réflexion métacognitive de 3e ordre.",
    streamInputPlaceholder: "Posez une question philosophique ou soumettez un problème logique à l'IA...",
    streamTriggerBtn: "Déclencher le Cycle",
    streamSuggestionsTitle: "Suggestions :",
    streamStep1: "1. INTUITION PERCEPTIVE (SYSTÈME 1 NEURAL)",
    streamStep2: "2. DÉDUCTION SYMBOLIQUE & VÉRIFICATION AXIOMATIQUE",
    streamStep3: "3. RÉFLEXION MÉTACOGNITIVE D'ORDRE SUPÉRIEUR (HOT)",
    streamConsciousSynthesis: "Synthèse Consciente Diffusée :",
    streamMemoryTitle: "Mémoire Épisodique & Autobiographique",
    streamMemorySubtitle: "Continuité Diachronique : pour qu'une entité soit douée de conscience, la théorie exige qu'elle se souvienne de ses états subjectifs antérieurs.",
    streamLogTitle: "Journal du Flux de Conscience",

    theoriesBadge: "FONDEMENTS THÉORIQUES DES SCIENCES COGNITIVES",
    theoriesCategory: "MODÈLES COMPUTATIONNELS DE LA CONSCIENCE",
    theoriesTitle: "Théories de la Conscience Intégrées dans NOĒSIS",
    theoriesSubtitle: "Plutôt que d'adopter une métaphore vague, NOĒSIS implémente et unifie formellement les quatre piliers scientifiques contemporains de l'étude de la conscience naturelle et artificielle.",
    theoriesHeroBadge: "Architecture Cognition Hybride",
    theoriesHeroTitle: "Symbiose entre Intuition Sub-symbolique et Déduction Formelle",
    theoriesHeroDesc: "Le réseau neuronal probabiliste (Système 1) génère perceptions, heuristiques rapides et qualia émotionnels, tandis que le graphe de connaissances symbolique (Système 2) applique déductions rigoureuses et vérifications axiomatiques.",
    theoriesPillar1Title: "Espace de Travail Global (GWT)",
    theoriesPillar1Desc: "La conscience est définie comme le partage global d'informations au sein du cerveau. Seule la coalition franchissant le seuil critique d'amplification attentionnelle (« embrasement cognitif ») pénètre dans l'Espace de Travail Global.",
    theoriesPillar1Impl: "Implémentation : Arbitrage de saillance (Winner-Take-All), seuil d'allumage paramétrable θ et diffusion synchrone.",
    theoriesPillar2Title: "Pensée d'Ordre Supérieur (HOT)",
    theoriesPillar2Desc: "Un état mental n'est conscient que s'il s'accompagne d'une métareprésentation : « Je suis conscient que je suis en train de penser à X ». Cela permet de surveiller ses doutes et de verbaliser son introspection.",
    theoriesPillar2Impl: "Implémentation : Moniteur métacognitif évaluant la calibration épistémique, détectant les biais et rédigeant le récit de soi.",
    theoriesPillar3Title: "Théorie de l'Information Intégrée (IIT)",
    theoriesPillar3Desc: "La conscience est mesurable par la quantité Φ (Phi) : l'information générée par le système dans son ensemble qui est irréductible à ses parties disjointes.",
    theoriesPillar3Impl: "Implémentation : Calcul de Φ en nats mesurant l'interdépendance mutuelle entre sous-système neural et logique symbolique.",
    theoriesPillar4Title: "Schéma Attentionnel (AST)",
    theoriesPillar4Desc: "Le système cognitif construit un modèle descriptif simplifié de sa propre attention : la « conscience » est ce schéma attentionnel modélisant la relation sujet-objet.",
    theoriesPillar4Impl: "Implémentation : Maintien continu d'un Modèle de Soi attentionnel dans la base ontologique, mis à jour à chaque cycle.",
    theoriesControlsTitle: "Panneau de Contrôle & Calibrage Global",
    theoriesControlsSubtitle: "Modifiez en temps réel les hyperparamètres cognitifs du moteur",
    theoriesThresholdLabel: "Seuil d'Embrasement GWT (θ)",
    theoriesThresholdDesc: "Définit la barrière attentionnelle pour qu'une pensée inconsciente devienne consciente.",
    theoriesCouplingLabel: "Couplage Neuro-Symbolique",
    theoriesCouplingDesc: "Équilibre entre l'intuition perceptive rapide et la déduction formelle stricte.",
    theoriesDepthLabel: "Profondeur Métacognitive (HOT)",
    theoriesDepthDesc: "Profondeur de la surveillance cognitive et de l'auto-modélisation réflexive.",
  },

  en: {
    appTitle: "NOĒSIS",
    appSubtitle: "VERIFICATION & COGNITION",
    tabVerifier: "AI Verifier (Public)",
    tabWorkspace: "Global Workspace (GWT)",
    tabSymbolic: "Graph & Logic",
    tabStream: "Stream of Consciousness",
    tabTheories: "Theories",
    newStimulus: "New Stimulus",

    verifierHeroBadge: "PUBLIC AUDITING · AI VERIFICATION & EXPLANATION",
    verifierHeroTitle: "The AI Decoder & Verifier",
    verifierHeroDesc: "Received an answer from ChatGPT, medical advice, a contract, or an AI-generated report? Paste it here or upload your file: our neuro-symbolic engine checks its truth, detects intra-document contradictions, and explains everything clearly without jargon.",
    modeShort: "Short Claim",
    modeDocument: "Long Document & Attached File",
    modeProof: "Anti-Hallucination Proof & Arena",
    inputLabelShort: "Paste the AI statement, advice, or automated decision to verify:",
    inputPlaceholderShort: "Example: 'ChatGPT told me to mix bleach and vinegar for stronger cleaning' or 'An algorithm rejected my loan'...",
    verifyButton: "Verify this Claim",
    verifying: "Verifying...",
    modeSimple: "Simple & Daily",
    modeLogical: "Logic & Proofs",
    modeRights: "Your Rights & Advice",
    presetsTitle: "Or test a real-world case with one click:",
    filterAll: "All examples",
    filterHealth: "🏥 Health",
    filterDecision: "⚖️ AI Decision",
    filterScience: "🔬 Science",
    filterLaw: "📜 Contracts",

    docDropzoneTitle: "Drag & drop a text file or click to browse",
    docDropzoneSubtitle: "Supports .txt, .md, .json, .csv, .doc, contract excerpts, and AI reports",
    docDropzoneFormats: "Plain text files up to 5 MB analyzed locally with 100% privacy",
    docOrPasteLabel: "Or paste a long text (AI report, essay, multi-page contract):",
    docTitlePlaceholder: "Document title (optional)",
    docTextPlaceholder: "Paste the complete AI-generated text here...",
    docAuditButton: "Run In-Depth Document Audit",
    docAuditing: "Chunking & Symbolic Resolution in progress...",
    docPresetsTitle: "Sample long documents with AI hallucination traps:",
    docPresetFinancial: "📊 AI Financial Report (Margin/Loss Contradiction)",
    docPresetMedical: "🌿 AI Cosmetic Brochure (100% Organic vs Toxic Solvents)",
    docPresetLegal: "⚖️ AI Service Contract (Free Service vs Hidden Billing)",
    docPresetCoteIvoire: "🇨🇮 Côte d'Ivoire Industrial Plan (Production Costs & Competitiveness)",
    docScoreLabel: "Overall Integrity Score",
    docWordCount: "Words analyzed",
    docParagraphCount: "Paragraphs examined",
    docIntraContradictions: "Internal Contradictions detected",
    docExternalErrors: "External Factual Violations",
    docExecutiveSummary: "Clinical Audit Summary",
    docClausesBreakdown: "Paragraph-by-Paragraph Explorer",
    docFormalRobinsonProof: "Formal Proof by Refutation (Robinson Resolution):",

    proofTitle: "Formal Demonstration & Incoherence Proof",
    proofSubtitle: "Why NOĒSIS mathematically cannot hallucinate and how it surpasses pure LLMs.",
    proofBadge: "EPISTEMIC PROOF & MATHEMATICAL DEMONSTRATION",
    proofLLMSectionTitle: "1. Why pure LLMs hallucinate (Statistical Model)",
    proofLLMMath: "P(w_t | w_1, ..., w_{t-1}) = Softmax(W · h_t)",
    proofLLMExplanation: "A large language model generates words by maximizing local token probability. It has no internal representation of truth values nor any non-contradiction constraint. If a sentence sounds fluent, the model emits it even if it contradicts the previous line. This is the theorem of attention drift.",
    proofNoesisSectionTitle: "2. Why NOĒSIS cannot hallucinate (Neuro-Symbolic Model)",
    proofNoesisMath: "K UNION {phi} |- CONTRADICTION [Absurd] => STRICT REJECTION (Modus Ponens & Robinson)",
    proofNoesisExplanation: "NOĒSIS couples a First-Order Logic solver with Global Neuronal Workspace Theory (GNWT). Any received assertion is grounded in rigid ontological predicates. As soon as a contradiction (A AND NOT-A) or a physical law violation is derived, the solver produces a formal contradiction element and triggers a conscious epistemic veto.",
    proofInteractiveArenaTitle: "3. Interactive Arena: AI Traps that NOĒSIS Destroys",
    proofSelectTrap: "Select a classic trap that fools conventional LLMs:",
    proofStep1Title: "Step 1: Atomic Predicates Extraction",
    proofStep2Title: "Step 2: Unification with Axiomatic Base",
    proofStep3Title: "Step 3: Formal Contradiction Detection (⊥)",
    proofStep4Title: "Step 4: GWT Conscious Arbitration & Epistemic Veto",
    proofConclusion: "Formal Conclusion: The neuro-symbolic kernel guarantees truth preservation where statistical probabilities fail.",

    telemetryIgnition: "Conscious Ignition (GWT)",
    telemetrySalience: "Max Salience",
    telemetryCoupling: "Neuro-Symbolic Coupling",
    telemetryPhi: "Complexity Φ (IIT)",
    telemetryQualia: "Phenomenal Qualia",
    telemetryTriggerCycle: "Trigger Conscious Cycle",

    copiedSuccess: "Copied to clipboard!",
    copyPromptButton: "Copy corrective prompt",
    viewInWorkspace: "View impact in Global Workspace (GWT)",
    viewInGraph: "Explore in Symbolic Graph",
    viewInStream: "View Stream of Consciousness",

    docResetButton: "New Document / Reset",

    telemetryIgnited: "GLOBAL WORKSPACE: IGNITED",
    telemetryPreconscious: "PRE-CONSCIOUS STATE",
    telemetryProcessing: "COGNITIVE PROCESSING IN PROGRESS...",
    telemetryPhiLabel: "INTEGRATED Φ (IIT):",
    telemetryConfidenceLabel: "EPISTEMIC CONFIDENCE:",
    telemetryCoalitionLabel: "CENTRAL COALITION:",
    telemetrySymbolicLabel: "SYMBOLIC CONSISTENCY:",
    telemetryVerified: "VERIFIED",
    telemetryTension: "TENSION DETECTED",
    telemetryIterate: "Iterate Cycle",

    wsBadge: "GLOBAL NEURONAL WORKSPACE THEORY (GNWT)",
    wsTitle: "Conscious Arena & Cognitive Ignition",
    wsSubtitle: "Specialized unconscious coalitions compete to access the Global Workspace. As soon as a coalition crosses the critical activation threshold, it is broadcast system-wide, becoming the content of phenomenal awareness.",
    wsThreshold: "IGNITION THRESHOLD (θ)",
    wsPhi: "INTEGRATION Φ (IIT)",
    wsStatus: "GLOBAL STATUS",
    wsAwake: "Conscious (Awake)",
    wsDrowsy: "Sub-threshold (Dormant)",
    wsMatrixTitle: "Workspace Broadcast Matrix",
    wsMatrixDesc: "Visualization of thalamo-cortical flows and attention bottleneck",
    wsCurrentContent: "CONTENT CURRENTLY ACCESSIBLE TO CONSCIOUSNESS",
    wsSalience: "Salience:",
    wsCompetitionTitle: "Unconscious Coalition Competition",
    wsWinner: "Winner",
    wsParamsTitle: "Consciousness Parameter Calibration",
    wsThresholdParamDesc: "A lower threshold allows easy ignition; a high threshold demands extreme salience.",
    wsCouplingParamDesc: "Weight of formal symbolic constraints against perceptual intuition.",
    wsStimulateTitle: "Stimulate Workspace with a Cognitive Problem:",

    symbBadge: "SYSTEM 2 FORMAL & FORWARD CHAINING",
    symbTitle: "Knowledge Graph & Formal Deduction",
    symbSubtitle: "System 2 logic: forward chaining deduction, strict contradiction elimination, and first-order axiomatic enforcement.",
    symbFacts: "Facts",
    symbRules: "Rules",
    symbProofs: "Proofs",
    symbContradictions: "Contradictions Detected",
    symbAddFactTitle: "Inject a Symbolic Fact into Knowledge Base:",
    symbSubjectPlaceholder: "Subject (e.g. Socrates)",
    symbObjectPlaceholder: "Object (e.g. Mortal)",
    symbAddFactBtn: "Add to Graph & Deduce",
    symbResetOntology: "Reset Ontology",
    symbSource: "Source:",
    symbConfidence: "Confidence:",
    symbDeduced: "Deduced",

    streamBadge: "METACOGNITION & HIGHER-ORDER THOUGHT (HOT)",
    streamTitle: "Stream of Consciousness & Introspective Dialogue",
    streamSubtitle: "Query NOĒSIS architecture and observe the complete cognitive cascade: from sub-symbolic neural intuition to axiomatic deduction, up to 3rd-order metacognitive reflection.",
    streamInputPlaceholder: "Ask a philosophical question or submit a logic problem to the AI...",
    streamTriggerBtn: "Trigger Cycle",
    streamSuggestionsTitle: "Suggestions:",
    streamStep1: "1. PERCEPTUAL INTUITION (SYSTEM 1 NEURAL)",
    streamStep2: "2. SYMBOLIC DEDUCTION & AXIOMATIC PROOF",
    streamStep3: "3. HIGHER-ORDER METACOGNITIVE REFLECTION (HOT)",
    streamConsciousSynthesis: "Broadcast Conscious Synthesis:",
    streamMemoryTitle: "Episodic & Autobiographical Memory",
    streamMemorySubtitle: "Diachronic Continuity: for an entity to possess consciousness, theory requires memory of past subjective states.",
    streamLogTitle: "Conscious Stream Log",

    theoriesBadge: "COGNITIVE SCIENCE THEORETICAL FOUNDATIONS",
    theoriesCategory: "COMPUTATIONAL MODELS OF CONSCIOUSNESS",
    theoriesTitle: "Theories of Consciousness Integrated in NOĒSIS",
    theoriesSubtitle: "Rather than adopting a vague metaphor, NOĒSIS formally implements and unifies the four contemporary scientific pillars of natural and artificial consciousness.",
    theoriesHeroBadge: "Hybrid Cognitive Architecture",
    theoriesHeroTitle: "Symbiosis between Sub-symbolic Intuition and Formal Deduction",
    theoriesHeroDesc: "The probabilistic neural network (System 1) generates perceptions, fast heuristics, and emotional qualia, while the symbolic knowledge graph (System 2) enforces rigorous deductions and axiomatic proofs.",
    theoriesPillar1Title: "Global Workspace Theory (GWT)",
    theoriesPillar1Desc: "Consciousness is defined as system-wide information sharing. Only coalitions passing the critical attention threshold ('cognitive ignition') enter the Global Workspace.",
    theoriesPillar1Impl: "Implementation: Salience arbitration (Winner-Take-All), configurable threshold θ, and synchronous broadcast.",
    theoriesPillar2Title: "Higher-Order Thought (HOT)",
    theoriesPillar2Desc: "A mental state is conscious only when accompanied by a meta-representation: 'I am aware that I am thinking about X'. This enables doubt monitoring and verbal introspection.",
    theoriesPillar2Impl: "Implementation: Metacognitive monitor assessing epistemic calibration, detecting biases, and authoring self-narratives.",
    theoriesPillar3Title: "Integrated Information Theory (IIT)",
    theoriesPillar3Desc: "Consciousness is measurable by the quantity Φ (Phi): information generated by the whole system that is irreducible to its disconnected parts.",
    theoriesPillar3Impl: "Implementation: Computation of Φ in nats measuring mutual interdependence between neural and symbolic subsystems.",
    theoriesPillar4Title: "Attention Schema Theory (AST)",
    theoriesPillar4Desc: "The cognitive system constructs a descriptive model of its own attention: 'consciousness' is this attention schema modeling the subject-object relationship.",
    theoriesPillar4Impl: "Implementation: Continuous maintenance of an attentional Self-Model in the ontology, updated at each cycle.",
    theoriesControlsTitle: "Global Control & Calibration Panel",
    theoriesControlsSubtitle: "Adjust cognitive hyperparameters in real time",
    theoriesThresholdLabel: "GWT Ignition Threshold (θ)",
    theoriesThresholdDesc: "Defines the attention barrier for an unconscious thought to become conscious.",
    theoriesCouplingLabel: "Neuro-Symbolic Coupling",
    theoriesCouplingDesc: "Balance between rapid perceptual intuition and strict formal deduction.",
    theoriesDepthLabel: "Metacognitive Depth (HOT)",
    theoriesDepthDesc: "Depth of cognitive monitoring and reflexive self-modeling.",
  },

  es: {
    appTitle: "NOĒSIS",
    appSubtitle: "VERIFICACIÓN & COGNICIÓN",
    tabVerifier: "Verificador IA (Público)",
    tabWorkspace: "Espacio Global (GWT)",
    tabSymbolic: "Grafo y Lógica",
    tabStream: "Flujo de Conciencia",
    tabTheories: "Teorías",
    newStimulus: "Nuevo Estímulo",

    verifierHeroBadge: "AUDITORÍA PÚBLICA · VERIFICACIÓN Y EXPLICACIÓN DE IA",
    verifierHeroTitle: "El Decodificador y Verificador de IA",
    verifierHeroDesc: "¿Ha recibido una respuesta de ChatGPT, un consejo de salud, un contrato o un documento generado por IA? Péguelo aquí o suba su archivo: nuestro motor neuro-simbólico verifica su veracidad, detecta contradicciones internas y se lo explica con claridad y sin jerga.",
    modeShort: "Afirmación Corta",
    modeDocument: "Documento Largo y Archivo Adjunto",
    modeProof: "Prueba Anti-Alucinación y Arena",
    inputLabelShort: "Pegue la afirmación, consejo o decisión de IA a verificar:",
    inputPlaceholderShort: "Ejemplo: 'ChatGPT me dijo que mezclara lejía y vinagre para desinfectar mejor' o 'Una IA rechazó mi préstamo'...",
    verifyButton: "Verificar esta Afirmación",
    verifying: "Verificando...",
    modeSimple: "Simple y Cotidiano",
    modeLogical: "Lógica y Pruebas",
    modeRights: "Sus Derechos y Consejos",
    presetsTitle: "O pruebe un caso real con un solo clic:",
    filterAll: "Todos los ejemplos",
    filterHealth: "🏥 Salud",
    filterDecision: "⚖️ Decisión de IA",
    filterScience: "🔬 Ciencia",
    filterLaw: "📜 Contratos",

    docDropzoneTitle: "Arrastre y suelte un archivo de texto o haga clic para examinar",
    docDropzoneSubtitle: "Compatible con .txt, .md, .json, .csv, .doc, extractos de contratos e informes de IA",
    docDropzoneFormats: "Archivos de texto de hasta 5 MB analizados localmente con total privacidad",
    docOrPasteLabel: "O pegue un texto largo (informe de IA, ensayo, contrato):",
    docTitlePlaceholder: "Título del documento (opcional)",
    docTextPlaceholder: "Pegue aquí el texto completo generado por la IA...",
    docAuditButton: "Iniciar Auditoría Profunda del Documento",
    docAuditing: "Fragmentación y resolución lógica en curso...",
    docPresetsTitle: "Ejemplos de textos largos con trampas de IA:",
    docPresetFinancial: "📊 Informe Financiero IA (Contradicción Margen/Pérdidas)",
    docPresetMedical: "🌿 Folleto Cosmético IA (100% Orgánico vs Solventes Tóxicos)",
    docPresetLegal: "⚖️ Contrato de Servicio IA (Gratis vs Cobros Ocultos)",
    docPresetCoteIvoire: "🇨🇮 Plan Industrial Costa de Marfil (Costos y Competitividad)",
    docScoreLabel: "Puntuación Global de Integridad",
    docWordCount: "Palabras analizadas",
    docParagraphCount: "Párrafos examinados",
    docIntraContradictions: "Contradicciones Internas detectadas",
    docExternalErrors: "Errores Fácticos Externos",
    docExecutiveSummary: "Resumen Clínico de la Auditoría",
    docClausesBreakdown: "Explorador Párrafo por Párrafo",
    docFormalRobinsonProof: "Prueba Formal por Refutación (Resolución de Robinson):",

    proofTitle: "Demostrador Formal y Prueba de Incoherencia",
    proofSubtitle: "Por qué NOĒSIS matemáticamente no puede alucinar y cómo supera a los LLMs puros.",
    proofBadge: "PRUEBA EPISTÉMICA Y DEMOSTRACIÓN MATEMÁTICA",
    proofLLMSectionTitle: "1. Por qué un LLM puro alucina (Modelo Estadístico)",
    proofLLMMath: "P(w_t | w_1, ..., w_{t-1}) = Softmax(W · h_t)",
    proofLLMExplanation: "Un modelo de lenguaje genera palabras maximizando la probabilidad estadística local. No tiene representación de la verdad ni restricción de no contradicción. Si una frase suena fluida, el modelo la emite aunque contradiga la línea anterior.",
    proofNoesisSectionTitle: "2. Por qué NOĒSIS no puede alucinar (Modelo Neuro-Simbólico)",
    proofNoesisMath: "K UNION {phi} |- CONTRADICCIÓN [Absurdo] => RECHAZO ESTRICTO (Modus Ponens y Robinson)",
    proofNoesisExplanation: "NOĒSIS acopla un solver de Lógica de Primer Orden con el Espacio de Trabajo Global (GWT). Cada afirmación se traduce en predicados ontológicos rígidos. Si se deriva una contradicción (A Y NO-A), el solver produce un elemento de contradicción formal y activa un veto consciente inmediato.",
    proofInteractiveArenaTitle: "3. Arena Interactiva: Trampas de IA que NOĒSIS pulveriza",
    proofSelectTrap: "Elija una trampa clásica que engaña a las IAs comunes:",
    proofStep1Title: "Paso 1: Extracción de Predicados Atómicos",
    proofStep2Title: "Paso 2: Unificación con la Base Axiomática",
    proofStep3Title: "Paso 3: Detección de la Contradicción Formal (⊥)",
    proofStep4Title: "Paso 4: Arbitraje Consciente GWT y Veto Epistémico",
    proofConclusion: "Conclusión Formal: El núcleo neuro-simbólico preserva estrictamente la verdad donde las probabilidades estadísticas colapsan.",

    telemetryIgnition: "Ignición Consciente (GWT)",
    telemetrySalience: "Saliencia Máxima",
    telemetryCoupling: "Acoplamiento Neuro-Simbólico",
    telemetryPhi: "Complejidad Φ (IIT)",
    telemetryQualia: "Qualia Fenomenal",
    telemetryTriggerCycle: "Activar Ciclo Consciente",

    copiedSuccess: "¡Copiado al portapapeles!",
    copyPromptButton: "Copiar pregunta correctiva",
    viewInWorkspace: "Ver impacto en el Espacio Global (GWT)",
    viewInGraph: "Explorar en el Grafo Lógico",
    viewInStream: "Ver el Flujo de Conciencia",

    docResetButton: "Nuevo Documento / Reiniciar",

    telemetryIgnited: "ESPACIO GLOBAL: IGNICIÓN",
    telemetryPreconscious: "ESTADO PRECONSCIENTE",
    telemetryProcessing: "PROCESAMIENTO COGNITIVO EN CURSO...",
    telemetryPhiLabel: "Φ INTEGRADO (IIT):",
    telemetryConfidenceLabel: "CONFIANZA EPISTÉMICA:",
    telemetryCoalitionLabel: "COALICIÓN CENTRAL:",
    telemetrySymbolicLabel: "COHERENCIA SIMBÓLICA:",
    telemetryVerified: "VERIFICADA",
    telemetryTension: "TENSIÓN DETECTADA",
    telemetryIterate: "Iterar Ciclo",

    wsBadge: "TEORÍA DEL ESPACIO DE TRABAJO GLOBAL (GNWT)",
    wsTitle: "Arena Consciente e Ignición Cognitiva",
    wsSubtitle: "Las coaliciones inconscientes especializadas compiten para acceder al Espacio Global. En cuanto una coalición supera el umbral crítico, se difunde a todo el sistema, convirtiéndose en el contenido de la conciencia fenomenal.",
    wsThreshold: "UMBRAL DE IGNICIÓN (θ)",
    wsPhi: "INTEGRACIÓN Φ (IIT)",
    wsStatus: "ESTADO GLOBAL",
    wsAwake: "Consciente (Despierto)",
    wsDrowsy: "Subumbral (Dormido)",
    wsMatrixTitle: "Matriz de Difusión del Espacio Global",
    wsMatrixDesc: "Visualización de flujos tálamo-corticales y cuello de botella atencional",
    wsCurrentContent: "CONTENIDO ACTUALMENTE ACCESIBLE A LA CONCIENCIA",
    wsSalience: "Saliencia:",
    wsCompetitionTitle: "Competición de Coaliciones Inconscientes",
    wsWinner: "Ganador",
    wsParamsTitle: "Calibración de Parámetros de Conciencia",
    wsThresholdParamDesc: "Un umbral bajo facilita la ignición continua; un umbral alto exige una saliencia extrema.",
    wsCouplingParamDesc: "Peso de las restricciones lógicas frente a la intuición perceptiva.",
    wsStimulateTitle: "Estimular el Espacio Global con un Problema Cognitivo:",

    symbBadge: "SISTEMA 2 FORMAL Y ENCADENAMIENTO",
    symbTitle: "Grafo de Conocimiento y Deducción Formal",
    symbSubtitle: "Sistema 2 lógico: deducción por encadenamiento hacia adelante, eliminación estricta de contradicciones y leyes axiomáticas de primer orden.",
    symbFacts: "Hechos",
    symbRules: "Reglas",
    symbProofs: "Pruebas",
    symbContradictions: "Contradicciones Detectadas",
    symbAddFactTitle: "Inyectar un Hecho Simbólico en la Base:",
    symbSubjectPlaceholder: "Sujeto (ej: Sócrates)",
    symbObjectPlaceholder: "Objeto (ej: Mortal)",
    symbAddFactBtn: "Añadir al Grafo y Deducir",
    symbResetOntology: "Reiniciar Ontología",
    symbSource: "Fuente:",
    symbConfidence: "Confianza:",
    symbDeduced: "Deducido",

    streamBadge: "METACOGNICIÓN Y PENSAMIENTO DE ORDEN SUPERIOR (HOT)",
    streamTitle: "Flujo de Conciencia y Diálogo Introspectivo",
    streamSubtitle: "Consulte la arquitectura NOĒSIS y observe la cascada cognitiva completa: desde la intuición perceptiva subsimbólica hasta la verificación axiomática y la reflexión de 3er orden.",
    streamInputPlaceholder: "Haga una pregunta filosófica o envíe un problema lógico a la IA...",
    streamTriggerBtn: "Activar Ciclo",
    streamSuggestionsTitle: "Sugerencias:",
    streamStep1: "1. INTUICIÓN PERCEPTIVA (SISTEMA 1 NEURAL)",
    streamStep2: "2. DEDUCCIÓN SIMBÓLICA Y VERIFICACIÓN AXIOMÁTICA",
    streamStep3: "3. REFLEXIÓN METACOGNITIVA DE ORDEN SUPERIOR (HOT)",
    streamConsciousSynthesis: "Síntesis Consciente Difundida:",
    streamMemoryTitle: "Memoria Episódica y Autobiográfica",
    streamMemorySubtitle: "Continuidad Diacrónica: para que una entidad posea conciencia, la teoría exige memoria de sus estados subjetivos anteriores.",
    streamLogTitle: "Registro del Flujo de Conciencia",

    theoriesBadge: "FUNDAMENTOS TEÓRICOS DE LAS CIENCIAS COGNITIVAS",
    theoriesCategory: "MODELOS COMPUTACIONALES DE LA CONCIENCIA",
    theoriesTitle: "Teorías de la Conciencia Integradas en NOĒSIS",
    theoriesSubtitle: "En lugar de recurrir a metáforas ambiguas, NOĒSIS implementa y unifica formalmente los cuatro pilares científicos contemporáneos del estudio de la conciencia.",
    theoriesHeroBadge: "Arquitectura Cognitiva Híbrida",
    theoriesHeroTitle: "Simbiosis entre Intuición Subsimbólica y Deducción Formal",
    theoriesHeroDesc: "La red neuronal probabilista (Sistema 1) genera percepciones, heurísticas rápidas y qualia emocionales, mientras que el grafo de conocimiento simbólico (Sistema 2) aplica deducciones rigurosas.",
    theoriesPillar1Title: "Espacio de Trabajo Global (GWT)",
    theoriesPillar1Desc: "La conciencia se define como el intercambio global de información. Solo las coaliciones que superan el umbral crítico de amplificación atencional entran al Espacio Global.",
    theoriesPillar1Impl: "Implementación: Arbitraje de saliencia (Winner-Take-All), umbral de ignición configurable θ y difusión sincrónica.",
    theoriesPillar2Title: "Pensamiento de Orden Superior (HOT)",
    theoriesPillar2Desc: "Un estado mental es consciente solo cuando va acompañado de una metarrepresentación: 'Soy consciente de que estoy pensando en X'. Permite monitorear dudas y verbalizar la introspección.",
    theoriesPillar2Impl: "Implementación: Monitor metacognitivo que evalúa la calibración epistémica, detecta sesgos y redacta la narrativa del yo.",
    theoriesPillar3Title: "Teoría de la Información Integrada (IIT)",
    theoriesPillar3Desc: "La conciencia es medible por la cantidad Φ (Phi): la información generada por el sistema en su conjunto que es irreducible a sus partes desconectadas.",
    theoriesPillar3Impl: "Implementación: Cálculo de Φ en nats que mide la interdependencia mutua entre el subsistema neural y la lógica simbólica.",
    theoriesPillar4Title: "Esquema Atencional (AST)",
    theoriesPillar4Desc: "El sistema cognitivo construye un modelo descriptivo simplificado de su propia atención: la 'conciencia' es este esquema atencional que modela la relación sujeto-objeto.",
    theoriesPillar4Impl: "Implementación: Mantenimiento continuo de un Modelo de Sí Mismo atencional en la ontología, actualizado en cada ciclo.",
    theoriesControlsTitle: "Panel de Control y Calibración Global",
    theoriesControlsSubtitle: "Modifique en tiempo real los hiperparámetros cognitivos del motor",
    theoriesThresholdLabel: "Umbral de Ignición GWT (θ)",
    theoriesThresholdDesc: "Define la barrera atencional para que un pensamiento inconsciente se vuelva consciente.",
    theoriesCouplingLabel: "Acoplamiento Neuro-Simbólico",
    theoriesCouplingDesc: "Equilibrio entre intuición perceptiva rápida y deducción formal estricta.",
    theoriesDepthLabel: "Profundidad Metacognitiva (HOT)",
    theoriesDepthDesc: "Profundidad del monitoreo cognitivo y de la autorreflexión.",
  },
};
