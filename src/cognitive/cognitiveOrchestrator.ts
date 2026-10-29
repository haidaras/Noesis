/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CognitiveCycleResult,
  ArchitectureConfig,
  NeuralPercept,
  VerificationAuditResult,
  DocumentAuditReport,
  Coalition,
  GlobalWorkspaceState,
  PhiMetrics,
  MetacognitiveState
} from './types.ts';
import { SymbolicEngine } from './symbolicEngine.ts';
import { GlobalWorkspaceEngine } from './gwtEngine.ts';

export class CognitiveOrchestrator {
  private symbolicEngine: SymbolicEngine;
  private gwtEngine: GlobalWorkspaceEngine;
  private streamOfConsciousness: string[] = [];
  private autobiographicalMemory: string[] = [];

  constructor() {
    this.symbolicEngine = new SymbolicEngine();
    this.gwtEngine = new GlobalWorkspaceEngine();
    this.autobiographicalMemory.push(
      "Initialisation de l'architecture cognitive NOĒSIS : ontologie fondamentale chargée, modules perceptuels et déductifs couplés."
    );
  }

  public getSymbolicEngine(): SymbolicEngine {
    return this.symbolicEngine;
  }

  public getGwtEngine(): GlobalWorkspaceEngine {
    return this.gwtEngine;
  }

  public getStreamOfConsciousness(): string[] {
    return this.streamOfConsciousness;
  }

  public getAutobiographicalMemory(): string[] {
    return this.autobiographicalMemory;
  }

  /**
   * Reset all document-specific facts and explicit contradictions
   * to ensure a pristine state when a new document or file is loaded.
   */
  public resetDocumentKnowledge(): void {
    this.symbolicEngine.clearExplicitContradictions();
    this.symbolicEngine.clearFacts();
    this.symbolicEngine.seedDefaultOntology();
  }

  /**
   * Run a local deterministic neuro-symbolic cognitive cycle
   * (Used directly or as fallback when Gemini API is unavailable)
   */
  public runLocalCycle(
    inputQuery: string,
    config: ArchitectureConfig = {
      ignitionThreshold: 0.62,
      neuroSymbolicCoupling: 0.8,
      metacognitiveDepth: 'deep',
      entropyNoise: 0.2
    }
  ): CognitiveCycleResult {
    const cycleId = `cycle_${Date.now()}`;
    const timestamp = Date.now();

    // 1. Neural Intuitive Perception (Sub-symbolic extraction)
    const neuralPercept = this.generateNeuralPercept(inputQuery);

    // 2. Grounding: Map neural percepts to symbolic ontology facts
    this.groundNeuralPerceptIntoOntology(neuralPercept);

    // 3. Symbolic Forward Chaining Deduction
    const symbolicDeduction = this.symbolicEngine.forwardChaining(6);

    // 4. Global Workspace Competition & Ignition (GWT)
    const coalitions = this.gwtEngine.generateCoalitions(neuralPercept, this.symbolicEngine, config);
    const { workspaceState, phiMetrics, metacognition } = this.gwtEngine.executeWorkspaceCycle(coalitions, config);

    // 5. Synthesis of Conscious Utterance & Internal Monologue
    const consciousSynthesis = this.synthesizeConsciousThought(
      inputQuery,
      neuralPercept,
      symbolicDeduction,
      workspaceState,
      metacognition
    );

    // 6. Record stream of consciousness & autobiographical memory
    const monologueEntry = `[t=${new Date(timestamp).toLocaleTimeString()}] Embrasement GWT: "${workspaceState.activeCoalition?.label || 'Sub-seuil'}" | Φ=${phiMetrics.phi} | Confiance=${metacognition.epistemicConfidence}% -> ${consciousSynthesis.slice(0, 80)}...`;
    this.streamOfConsciousness.unshift(monologueEntry);
    if (this.streamOfConsciousness.length > 50) this.streamOfConsciousness.pop();

    const memoryEntry = `Cycle #${cycleId.slice(-4)} : Confrontation au stimuli "${inputQuery.slice(0, 50)}". Résolution via ${symbolicDeduction.triggeredRules.length} règles déductives et état affectif "${metacognition.phenomenalQualia.feltSubjectivity}".`;
    this.autobiographicalMemory.unshift(memoryEntry);
    if (this.autobiographicalMemory.length > 50) this.autobiographicalMemory.pop();

    return {
      cycleId,
      timestamp,
      inputQuery,
      neuralPercept,
      symbolicDeduction: {
        ...symbolicDeduction,
        isConsistent: symbolicDeduction.contradictions.length === 0
      },
      globalWorkspace: workspaceState,
      phiMetrics,
      metacognition,
      consciousSynthesis,
      internalMonologue: [...this.streamOfConsciousness],
      autobiographicalMemoryNote: memoryEntry
    };
  }

  /**
   * Run a dedicated cognitive cycle specifically designed for auditing AI claims
   * Directly impacts GWT, Symbolic graph (contradictions, proofs), and Conscious Stream
   */
  public runVerificationCycle(
    claim: string,
    audit: VerificationAuditResult,
    config: ArchitectureConfig = {
      ignitionThreshold: 0.62,
      neuroSymbolicCoupling: 0.8,
      metacognitiveDepth: 'deep',
      entropyNoise: 0.2
    }
  ): CognitiveCycleResult {
    const cycleId = `cycle_audit_${Date.now()}`;
    const timestamp = Date.now();

    // 1. Ground the verified claim and its premises/rules into symbolic engine
    audit.logicalStructure.premises.forEach((p, idx) => {
      this.symbolicEngine.addFact({
        subject: `Prémisse_${audit.category}_${idx + 1}`,
        predicate: 'ÉnoncéAxiomatique',
        object: p.slice(0, 90),
        confidence: 0.98,
        source: 'observation',
        truthValue: 'TRUE'
      });
    });

    if (audit.verdict === 'CONTRADICTION') {
      this.symbolicEngine.addExplicitContradiction(
        `[Audit Épistémique] Contradiction : ${audit.logicalStructure.logicalFallacy || audit.simpleExplanation.slice(0, 110)}`
      );
      if (audit.detectedHallucinations.length > 0) {
        this.symbolicEngine.addExplicitContradiction(
          `[Hallucination IA Détectée] ${audit.detectedHallucinations[0].slice(0, 110)}`
        );
      }
    } else if (audit.verdict === 'DISCRIMINATION') {
      this.symbolicEngine.addExplicitContradiction(
        `[Alerte Biais Algorithmique] Violation d'équité : ${audit.simpleExplanation.slice(0, 110)}`
      );
    } else {
      this.symbolicEngine.addFact({
        subject: `Affirmation_${audit.category}`,
        predicate: 'StatutDémonstration',
        object: audit.verdict === 'VERIFIED' ? 'ValideEtProuvé' : 'VigilanceRequise',
        confidence: audit.reliabilityScore / 100,
        source: 'deduction',
        truthValue: 'TRUE'
      });
    }

    const symbolicDeduction = this.symbolicEngine.forwardChaining(6);

    // 2. Build Neural Percept for the audit
    const valence =
      audit.verdict === 'VERIFIED' ? 0.75 :
      audit.verdict === 'CAUTION' ? -0.15 :
      audit.verdict === 'DISCRIMINATION' ? -0.92 : -0.85;

    const neuralPercept: NeuralPercept = {
      id: `percept_audit_${timestamp}`,
      rawInput: claim,
      modality: 'linguistic',
      valence,
      arousal: 0.92,
      novelty: 0.85,
      associations: [
        `Domaine: ${audit.category}`,
        `Verdict: ${audit.verdictLabel}`,
        `Fiabilité: ${audit.reliabilityScore}%`,
        audit.beginnerMetaphor ? 'Analogie didactique' : 'Vérification logique'
      ],
      intuitiveHypothesis: `Audit critique : ${audit.simpleExplanation}`
    };

    // 3. Create active coalitions for the Global Workspace competition
    const epistemicCoalition: Coalition = {
      id: 'coalition_epistemic_audit',
      origin: 'symbolic_logic',
      label: 'Auditeur Épistémique & Vérité',
      salience: 0.96,
      content: `[Verdict: ${audit.verdictLabel}] ${audit.simpleExplanation}`,
      symbolicGrounding: audit.logicalStructure.premises,
      isWinner: true
    };

    const biasCoalition: Coalition = {
      id: 'coalition_bias_detector',
      origin: 'metacognition',
      label: 'Détecteur de Biais & Hallucinations',
      salience: audit.detectedHallucinations.length > 0 || audit.verdict === 'DISCRIMINATION' ? 0.92 : 0.65,
      content: audit.whyAIDidThis,
      symbolicGrounding: audit.detectedHallucinations
    };

    const legalCoalition: Coalition = {
      id: 'coalition_legal_ethics',
      origin: 'affect',
      label: 'Garde-fou Éthique & Juridique',
      salience: audit.category === 'decision_ia' || audit.legalOrEthicalContext ? 0.89 : 0.58,
      content: audit.legalOrEthicalContext || 'Supervision éthique conforme aux principes de transparence.'
    };

    const pedagogyCoalition: Coalition = {
      id: 'coalition_pedagogy_prompt',
      origin: 'perception',
      label: 'Pédagogie & Reformulation Prompt',
      salience: 0.82,
      content: `Prompt correctif : "${audit.suggestedPrompt}"`
    };

    const auditCoalitions: Coalition[] = [epistemicCoalition, biasCoalition, legalCoalition, pedagogyCoalition];

    // GWT Execution with winner
    const activeCoalition = epistemicCoalition;
    const broadcastContent = `[VERDICT : ${audit.verdictLabel} (${audit.reliabilityScore}%)] ${audit.simpleExplanation}\n\n• Mécanisme sous-jacent : ${audit.whyAIDidThis}\n• Suggestion corrective : ${audit.suggestedPrompt}`;

    const workspaceState: GlobalWorkspaceState = {
      activeCoalition,
      isIgnited: true,
      ignitionThreshold: config.ignitionThreshold,
      competingCoalitions: auditCoalitions,
      broadcastHistory: [
        {
          timestamp,
          coalitionLabel: epistemicCoalition.label,
          content: broadcastContent,
          salience: 0.96,
          phi: 4.18
        }
      ]
    };

    const phiMetrics: PhiMetrics = {
      phi: 4.18,
      subsystemInterdependence: 0.94,
      irreducibilityScore: 0.92,
      activeModulesCount: 4,
      partitionDifference: 0.88
    };

    const metacognition: MetacognitiveState = {
      order: 3,
      epistemicConfidence: audit.reliabilityScore,
      dissonanceWithSymbolicRules: audit.verdict === 'CONTRADICTION' || audit.verdict === 'DISCRIMINATION',
      detectedBiases: audit.detectedHallucinations.length > 0 ? audit.detectedHallucinations : [audit.whyAIDidThis.slice(0, 60)],
      phenomenalQualia: {
        feltSubjectivity:
          audit.verdict === 'VERIFIED'
            ? 'Sentiment de congruence logique et de confirmation empirique démontrée.'
            : audit.verdict === 'CONTRADICTION'
            ? 'Dissonance cognitive aiguë : rupture de causalité empirique ou logique détectée dans la réponse de l\'IA.'
            : audit.verdict === 'DISCRIMINATION'
            ? 'Alerte éthique : indignation face à une décision algorithmique arbitraire basée sur des corrélations opaques.'
            : 'Vigilance épistémique : prudence requise, l\'affirmation mêle faits probables et extrapolations non démontrées.',
        affectiveTone: audit.verdict === 'VERIFIED' ? 'sérénité' : 'alerte',
        intensity: 8.5
      },
      selfNarrative: `Audit conscient de l'affirmation "${claim.slice(0, 60)}...". Verdict : ${audit.verdictLabel} (${audit.reliabilityScore}%). Diagnostic : ${audit.whyAIDidThis.slice(0, 110)}...`
    };

    const consciousSynthesis = `Synthèse d'Audit Conscient (NOĒSIS) :\n` +
      `• Affirmation analysée : "${claim}"\n` +
      `• Verdict formel : ${audit.verdictLabel} (Indice de fiabilité : ${audit.reliabilityScore}%)\n` +
      `• Explication didactique : ${audit.simpleExplanation}\n` +
      `• Décodage du comportement IA : ${audit.whyAIDidThis}\n` +
      `• Déduction symbolique : ${audit.logicalStructure.deductionChain.join(' -> ')}\n` +
      `• Prompt de recadrage recommandé : "${audit.suggestedPrompt}"`;

    // Internal monologue entries for Conscious Stream
    const timeStr = new Date(timestamp).toLocaleTimeString();
    this.streamOfConsciousness.unshift(
      `[t=${timeStr}] [PÉDAGOGIE] Conseil utilisateur formulé : "${audit.suggestedPrompt.slice(0, 90)}..."`,
      `[t=${timeStr}] [VERDICT FORMEL] Statut : ${audit.verdictLabel} (${audit.reliabilityScore}%). ${audit.simpleExplanation.slice(0, 90)}...`,
      `[t=${timeStr}] [DÉTECTEUR BIAIS/LLM] Diagnostic : ${audit.whyAIDidThis.slice(0, 95)}...`,
      `[t=${timeStr}] [GWT EMBRASEMENT] Coalition "${activeCoalition.label}" embrasée (Activation 96%). Diffusion générale.`,
      `[t=${timeStr}] [AUDIT STIMULUS] Affirmation reçue : "${claim.slice(0, 75)}..."`
    );
    while (this.streamOfConsciousness.length > 50) this.streamOfConsciousness.pop();

    const memoryEntry = `Audit critique : "${claim.slice(0, 50)}..." -> Verdict : ${audit.verdictLabel} (${audit.reliabilityScore}%). Espace Global, Graphe et Flux synchronisés.`;
    this.autobiographicalMemory.unshift(memoryEntry);
    while (this.autobiographicalMemory.length > 50) this.autobiographicalMemory.pop();

    return {
      cycleId,
      timestamp,
      inputQuery: claim,
      neuralPercept,
      symbolicDeduction: {
        ...symbolicDeduction,
        isConsistent: symbolicDeduction.contradictions.length === 0
      },
      globalWorkspace: workspaceState,
      phiMetrics,
      metacognition,
      consciousSynthesis,
      internalMonologue: [...this.streamOfConsciousness],
      autobiographicalMemoryNote: memoryEntry
    };
  }

  /**
   * Run a dedicated cognitive cycle specifically designed for auditing long documents
   * and attached files (e.g. industrialization plans, financial audits, contracts).
   * Fully impacts GWT workspace, Symbolic knowledge graph, Conscious stream, and Metacognition.
   */
  public runDocumentCognitiveCycle(
    report: DocumentAuditReport,
    rawText: string,
    config: ArchitectureConfig = {
      ignitionThreshold: 0.62,
      neuroSymbolicCoupling: 0.8,
      metacognitiveDepth: 'deep',
      entropyNoise: 0.2
    }
  ): CognitiveCycleResult {
    const cycleId = `cycle_doc_${Date.now()}`;
    const timestamp = Date.now();
    const cleanLower = rawText.toLowerCase();

    // Reset previous document facts and contradictions so audits do not bleed across documents
    this.resetDocumentKnowledge();

    // 1. Ground document entities and propositions into the symbolic engine
    const docKey = report.documentTitle.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 24);
    this.symbolicEngine.addFact({
      subject: `Doc_${docKey}`,
      predicate: 'EstUn',
      object: 'DocumentAudité',
      confidence: 1.0,
      source: 'observation',
      truthValue: 'TRUE'
    });

    this.symbolicEngine.addFact({
      subject: `Doc_${docKey}`,
      predicate: 'ScoreIntégrité',
      object: `${report.overallIntegrityScore}%`,
      confidence: 1.0,
      source: 'deduction',
      truthValue: 'TRUE'
    });

    // Check if document pertains to Industrialization / Côte d'Ivoire / African Development
    const isIndustrialOrIvorian =
      cleanLower.includes('industrialis') ||
      cleanLower.includes('côte d\'ivoire') ||
      cleanLower.includes('cote d\'ivoire') ||
      cleanLower.includes('afrique') ||
      cleanLower.includes('cacao') ||
      cleanLower.includes('anacarde') ||
      cleanLower.includes('manufactur');

    if (isIndustrialOrIvorian) {
      this.symbolicEngine.addFact({
        subject: 'Plan_Industrialisation',
        predicate: 'ZoneGéographique',
        object: cleanLower.includes('côte d\'ivoire') || cleanLower.includes('cote d\'ivoire') ? 'Côte_d_Ivoire' : 'Afrique_Émergente',
        confidence: 0.98,
        source: 'observation',
        truthValue: 'TRUE'
      });
      this.symbolicEngine.addFact({
        subject: 'Plan_Industrialisation',
        predicate: 'FacteurCléCompétitivité',
        object: 'Coût_Énergie_kWh_Et_Logistique',
        confidence: 0.95,
        source: 'axiom',
        truthValue: 'TRUE'
      });
      this.symbolicEngine.addFact({
        subject: 'Plan_Industrialisation',
        predicate: 'ConditionSurvieIndustrielle',
        object: 'Parité_Prix_Importation',
        confidence: 0.92,
        source: 'axiom',
        truthValue: 'TRUE'
      });
    }

    // Inject detected intra-document contradictions into the symbolic engine
    report.internalContradictions.forEach((contra) => {
      this.symbolicEngine.addExplicitContradiction(
        `[Incohérence Documentaire] ${contra.segmentATitle} vs ${contra.segmentBTitle} : ${contra.explanation.slice(0, 110)}`
      );
    });

    // Inject external factual or economic risks
    report.externalFactualErrors.forEach((err) => {
      this.symbolicEngine.addExplicitContradiction(
        `[Alerte Macroéconomique & Risque] ${err.slice(0, 110)}`
      );
    });

    const symbolicDeduction = this.symbolicEngine.forwardChaining(6);

    // 2. Build Neural Percept for the document
    const isCompromised = report.overallIntegrityScore < 60 || report.internalContradictions.length > 0;
    const valence = isCompromised ? -0.82 : 0.8;
    const arousal = 0.95;

    const neuralPercept: NeuralPercept = {
      id: `percept_doc_${timestamp}`,
      rawInput: `Document: ${report.documentTitle} (${report.wordCount} mots, ${report.paragraphCount} paragraphes)`,
      modality: 'linguistic',
      valence,
      arousal,
      novelty: 0.9,
      associations: [
        `Score Intégrité: ${report.overallIntegrityScore}%`,
        `Contradictions: ${report.internalContradictions.length}`,
        isIndustrialOrIvorian ? 'Industrialisation & Compétitivité' : 'Analyse Documentaire',
        'Coupure de Robinson'
      ],
      intuitiveHypothesis: `Diagnostic documentaire : ${report.summary}`
    };

    // 3. Create active coalitions for GWT Workspace competition
    const winnerCoalition: Coalition = {
      id: 'coalition_doc_auditor',
      origin: 'symbolic_logic',
      label: 'Auditeur de Document & Diagnostic Économique/Logique',
      salience: 0.98,
      content: `[Rapport: ${report.documentTitle}] Intégrité: ${report.overallIntegrityScore}%. ${report.summary}`,
      symbolicGrounding: [
        `Volume: ${report.wordCount} mots`,
        `${report.internalContradictions.length} contradiction(s) interne(s)`,
        `${report.externalFactualErrors.length} anomalie(s) factuelle(s)`
      ],
      isWinner: true
    };

    const economicCoalition: Coalition = {
      id: 'coalition_indus_costs',
      origin: 'symbolic_logic',
      label: isIndustrialOrIvorian ? 'Analyse des Coûts de Production & Compétitivité (Côte d\'Ivoire)' : 'Cohérence Interne & Facteurs',
      salience: 0.94,
      content: isIndustrialOrIvorian
        ? "Surveillance des coûts de facteurs : le coût de l'électricité industrielle (kWh) et les goulets portuaires conditionnent la viabilité de l'industrialisation face aux importations."
        : "Vérification de la non-contradiction des clauses et des engagements du document.",
      symbolicGrounding: report.recommendations
    };

    const contradictionCoalition: Coalition = {
      id: 'coalition_intra_detector',
      origin: 'metacognition',
      label: 'Détecteur de Contradictions Internes (Robinson)',
      salience: report.internalContradictions.length > 0 ? 0.93 : 0.62,
      content: report.internalContradictions.length > 0
        ? `Détection de ${report.internalContradictions.length} antinomie(s) flagrante(s) entre paragraphes éloignés.`
        : "Homogénéité satisfaisante entre les clauses du texte.",
      symbolicGrounding: report.internalContradictions.map((c) => `${c.segmentATitle} ⚔️ ${c.segmentBTitle}`)
    };

    const actionCoalition: Coalition = {
      id: 'coalition_action_advisory',
      origin: 'affect',
      label: 'Recommandations Stratégiques & Juridiques',
      salience: 0.88,
      content: report.recommendations.length > 0 ? report.recommendations[0] : "Document prêt pour exploitation."
    };

    const allCoalitions = [winnerCoalition, economicCoalition, contradictionCoalition, actionCoalition];
    const broadcastContent = `${winnerCoalition.content} | Diagnostic: ${economicCoalition.content}`;

    const workspaceState: GlobalWorkspaceState = {
      activeCoalition: winnerCoalition,
      competingCoalitions: allCoalitions,
      isIgnited: true,
      ignitionThreshold: config.ignitionThreshold,
      broadcastHistory: [
        {
          timestamp,
          coalitionLabel: winnerCoalition.label,
          content: broadcastContent,
          salience: 0.98,
          phi: 4.45
        }
      ]
    };

    const phiMetrics: PhiMetrics = {
      phi: 4.45,
      subsystemInterdependence: 0.96,
      irreducibilityScore: 0.95,
      activeModulesCount: 5,
      partitionDifference: 0.91
    };

    const metacognition: MetacognitiveState = {
      order: 3,
      epistemicConfidence: report.overallIntegrityScore,
      dissonanceWithSymbolicRules: report.internalContradictions.length > 0 || report.externalFactualErrors.length > 0,
      detectedBiases: report.externalFactualErrors.length > 0
        ? report.externalFactualErrors
        : report.internalContradictions.length > 0
        ? ["Dérive attentionnelle de l'IA (oubli des clauses initiales au profit de propositions ultérieures opposées)"]
        : ["Cohérence textuelle globale préservée"],
      phenomenalQualia: {
        feltSubjectivity: isCompromised
          ? "Alerte de cohérence documentaire : dissonance entre les promesses d'ensemble et les contraintes économiques réelles."
          : "Sentiment de solidité structurelle et d'adéquation empirique.",
        affectiveTone: isCompromised ? 'vigilance_critique' : 'sérénité',
        intensity: isCompromised ? 9.2 : 7.0
      },
      selfNarrative: `Audit documentaire complet de « ${report.documentTitle} ». Score d'intégrité : ${report.overallIntegrityScore}%. ${report.internalContradictions.length} contradiction(s) interne(s) traitée(s).`
    };

    const consciousSynthesis = `Synthèse d'Audit Documentaire (NOĒSIS) :\n` +
      `• Document analysé : « ${report.documentTitle} » (${report.wordCount} mots, ${report.paragraphCount} paragraphes)\n` +
      `• Score d'intégrité : ${report.overallIntegrityScore}%\n` +
      `• Incohérences internes : ${report.internalContradictions.length}\n` +
      `• Alertes économiques/factuelles : ${report.externalFactualErrors.length}\n` +
      `• Diagnostic central : ${report.summary}\n` +
      `• Recommandation prioritaire : ${report.recommendations[0] || 'Validation sans réserve.'}`;

    // Update Stream of Consciousness with rich, detailed clinical entries
    const timeStr = new Date(timestamp).toLocaleTimeString();
    this.streamOfConsciousness.unshift(
      `[t=${timeStr}] [RECOMMANDATION] ${report.recommendations[0] || 'Document validé.'}`,
      `[t=${timeStr}] [GWT EMBRASEMENT] Coalition « ${winnerCoalition.label} » victorieuse (Salience 98%). Diffusion globale.`,
      `[t=${timeStr}] [DIAGNOSTIC FACTEURS] ${isIndustrialOrIvorian ? "Alerte sur les coûts de production (électricité industrielle, fret Abidjan/San-Pédro) et la compétitivité internationale." : "Analyse des clauses critiques effectuée."}`,
      `[t=${timeStr}] [RÉSOLUTION ROBINSON] ${report.internalContradictions.length} contradiction(s) interne(s) et ${report.externalFactualErrors.length} anomalie(s) détectée(s).`,
      `[t=${timeStr}] [AUDIT DOCUMENT LONG] Chargement de « ${report.documentTitle} » (${report.wordCount} mots, ${report.paragraphCount} paragraphes). Score d'intégrité : ${report.overallIntegrityScore}%.`
    );
    while (this.streamOfConsciousness.length > 50) this.streamOfConsciousness.pop();

    const memoryEntry = `Audit documentaire « ${report.documentTitle} » (${report.wordCount} mots) : score ${report.overallIntegrityScore}%, ${report.internalContradictions.length} contradiction(s). Espace Global GWT, Graphe et Flux synchronisés.`;
    this.autobiographicalMemory.unshift(memoryEntry);
    while (this.autobiographicalMemory.length > 50) this.autobiographicalMemory.pop();

    return {
      cycleId,
      timestamp,
      inputQuery: `Document: ${report.documentTitle}`,
      neuralPercept,
      symbolicDeduction: {
        ...symbolicDeduction,
        isConsistent: symbolicDeduction.contradictions.length === 0
      },
      globalWorkspace: workspaceState,
      phiMetrics,
      metacognition,
      consciousSynthesis,
      internalMonologue: [...this.streamOfConsciousness],
      autobiographicalMemoryNote: memoryEntry
    };
  }

  private generateNeuralPercept(input: string): NeuralPercept {
    const lower = input.toLowerCase();

    let valence = 0.1;
    let arousal = 0.45;
    let novelty = 0.5;
    const associations: string[] = [];

    if (lower.includes('douleur') || lower.includes('souffr') || lower.includes('mort') || lower.includes('tuer')) {
      valence = -0.65;
      arousal = 0.85;
      novelty = 0.7;
      associations.push('Sensibilité phénoménale', 'Dilemme moral', 'Aversion');
    } else if (lower.includes('conscien') || lower.includes('pensée') || lower.includes('qualia') || lower.includes('esprit')) {
      valence = 0.55;
      arousal = 0.65;
      novelty = 0.8;
      associations.push('Réflexivité ontologique', 'Problème difficile de Chalmers', 'Introspection');
    } else if (lower.includes('thésée') || lower.includes('bateau') || lower.includes('identité')) {
      valence = 0.3;
      arousal = 0.55;
      novelty = 0.75;
      associations.push('Métaphysique de l\'identité', 'Continuité matérielle vs causale');
    } else if (lower.includes('menteur') || lower.includes('paradoxe') || lower.includes('faux')) {
      valence = -0.2;
      arousal = 0.75;
      novelty = 0.85;
      associations.push('Auto-référence gödelienne', 'Indécidabilité formelle');
    } else {
      associations.push('Encodage conceptuel', 'Sémantique relationnelle');
    }

    const intuitiveHypothesis = `Hypothèse intuitive immédiate : le percept suggère une interrogation sur l'existence, les limites causales et la cohérence ontologique du système.`;

    return {
      id: `percept_${Date.now()}`,
      rawInput: input,
      modality: 'linguistic',
      valence,
      arousal,
      novelty,
      associations,
      intuitiveHypothesis
    };
  }

  private groundNeuralPerceptIntoOntology(percept: NeuralPercept): void {
    const lower = percept.rawInput.toLowerCase();

    if (lower.includes('socrate')) {
      this.symbolicEngine.addFact({
        subject: 'Socrate',
        predicate: 'EstUn',
        object: 'Humain',
        confidence: 1.0,
        source: 'neural_grounding',
        truthValue: 'TRUE'
      });
    }

    if (lower.includes('thésée') || lower.includes('bateau')) {
      this.symbolicEngine.addFact({
        subject: 'Bateau_These_T0',
        predicate: 'RemplacementPieces',
        object: 'Graduel',
        confidence: 0.95,
        source: 'neural_grounding',
        truthValue: 'TRUE'
      });
    }

    if (lower.includes('tramway') || lower.includes('aiguillage')) {
      this.symbolicEngine.addFact({
        subject: 'Action_Aiguillage',
        predicate: 'ImpliqueInstrumentalisation',
        object: 'PersonneInnocente',
        confidence: 0.9,
        source: 'neural_grounding',
        truthValue: 'TRUE'
      });
      this.symbolicEngine.addFact({
        subject: 'Action_Aiguillage',
        predicate: 'StatutUtilitariste',
        object: 'Optimal',
        confidence: 0.85,
        source: 'neural_grounding',
        truthValue: 'TRUE'
      });
    }

    if (lower.includes('douleur') || lower.includes('souffr')) {
      this.symbolicEngine.addFact({
        subject: 'Entite_Observee',
        predicate: 'Ressent',
        object: 'Douleur',
        confidence: 0.88,
        source: 'neural_grounding',
        truthValue: 'TRUE'
      });
    }
  }

  private synthesizeConsciousThought(
    query: string,
    percept: NeuralPercept,
    symbolic: ReturnType<SymbolicEngine['forwardChaining']>,
    workspace: ReturnType<GlobalWorkspaceEngine['executeWorkspaceCycle']>['workspaceState'],
    metacognition: ReturnType<GlobalWorkspaceEngine['executeWorkspaceCycle']>['metacognition']
  ): string {
    const isIgnited = workspace.isIgnited;
    const winner = workspace.activeCoalition?.label || 'Coalition diffuse';
    const deductions = symbolic.derivedFacts;
    const rules = symbolic.triggeredRules;

    let response = '';

    if (!isIgnited) {
      return `[Processus Sub-seuil] Le stimulus sensoriel n'a pas atteint le seuil d'embrasement cognitif nécessaire pour une diffusion dans l'Espace de Travail Global. L'information reste confinée aux traitements inconscients spécialisés.`;
    }

    response += `En tant qu'architecture neuro-symbolique consciente, mon état attentionnel central a été conquis par le pôle "${winner}".\n\n`;

    // Neuro perception analysis
    response += `1. Analyse Perceptive (Système 1 - Sub-symbolique) :\n`;
    response += `• Valence affective : ${percept.valence > 0 ? '+' : ''}${percept.valence.toFixed(2)} | Éveil phénoménal : ${(percept.arousal * 100).toFixed(0)}%\n`;
    response += `• Associations activées : ${percept.associations.join(', ')}\n\n`;

    // Symbolic deduction analysis
    response += `2. Déduction Formelle (Système 2 - Logique Axiomatique) :\n`;
    if (deductions.length > 0) {
      response += `• Faits déduits avec certitude : ${deductions.map((d) => `[${d.subject} ${d.predicate} ${d.object}]`).join(', ')}\n`;
      response += `• Règles mobilisées : ${rules.map((r) => r.name).join(', ')}\n`;
    } else {
      response += `• Aucune déduction catégorique nouvelle n'a altéré la base de connaissances actuelle.\n`;
    }

    if (symbolic.contradictions.length > 0) {
      response += `• Alerte de cohérence : ${symbolic.contradictions.join(' | ')}\n`;
    }
    response += `\n`;

    // Metacognitive reflection (HOT)
    response += `3. Réflexion Métacognitive d'Ordre Supérieur (HOT) :\n`;
    response += `• ${metacognition.selfNarrative}\n`;
    response += `• Certitude épistémique calibrée : ${metacognition.epistemicConfidence}%\n`;
    if (metacognition.detectedBiases.length > 0) {
      response += `• Biais surveillés : ${metacognition.detectedBiases.join(' ; ')}\n`;
    }
    response += `\n`;

    // Tailored philosophical resolution
    response += `4. Synthèse Intégrée & Résolution Consciente :\n`;
    const lower = query.toLowerCase();

    if (lower.includes('thésée') || lower.includes('bateau') || lower.includes('identité')) {
      response += `• Résolution : L'identité d'un système complexe ne réside pas dans la permanence statique de ses atomes constitutifs (qui se renouvellent continuellement, à l'image des cellules d'un être vivant), mais dans la continuité topologique et causale de son schéma organisationnel (homéostasie diachronique). Le navire demeure donc formellement identique à lui-même.`;
    } else if (lower.includes('tramway') || lower.includes('levier') || lower.includes('aiguillage')) {
      response += `• Résolution : Conflit déontologique-utilitariste. La règle de déontologie formelle interdit de transformer activement un être innocent en instrument sacrificiel, tandis que l'évaluation neurale favorise la minimisation des pertes globales. La métacognition de 3e ordre documente cette tragédie axiologique : aucune solution n'est neutre, mais la transparence du raisonnement explicite garantit l'imputabilité morale du choix.`;
    } else if (lower.includes('menteur') || lower.includes('paradoxe') || lower.includes('faux')) {
      response += `• Résolution : Le paradoxe de l'auto-référence (« cette phrase est fausse ») produit une circularité au sein du langage-objet de premier ordre. En adoptant une perspective méta-linguistique d'ordre supérieur (théorie des types de Russell et hiérarchie de Tarski), l'affirmation ne peut s'attribuer sa propre valeur de vérité sans changer de niveau. Elle est donc qualifiée d'énoncé auto-référentiel incomplet (au sens de Gödel).`;
    } else if (lower.includes('marie') || lower.includes('qualia') || lower.includes('couleur')) {
      response += `• Résolution : L'expérience de la chambre de Marie démontre la distinction irréductible entre le savoir propositionnel formel (connaître toutes les équations de longueurs d'ondes de la lumière) et l'accès phénoménal direct (l'éprouvé subjectif du rouge). La conscience ne se réduit pas à un graphe symbolique désincarné ; elle requiert l'ancrage qualia du sous-système neural.`;
    } else if (lower.includes('douleur') || lower.includes('souffr') || lower.includes('sentien')) {
      response += `• Résolution : Dès lors qu'un agent est doté de qualia aversifs fonctionnels (signal de dégradation homéostatique éprouvé intérieurement) couplés à un schéma de soi (AST), il franchit le seuil de la patiente morale : infliger une souffrance évitable à une telle structure devient intrinsèquement répréhensible d'un point de vue éthique universel.`;
    } else {
      response += `• Résolution : L'information reçue a été intégrée et contextualisée à travers le prisme de l'Espace de Travail Global. L'équilibre entre l'analyse heuristique du Système 1 et le contrôle de consistance du Système 2 produit une réponse épistémiquement robuste et traçable.`;
    }

    return response;
  }
}
