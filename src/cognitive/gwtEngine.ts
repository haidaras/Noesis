/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  Coalition,
  GlobalWorkspaceState,
  NeuralPercept,
  PhiMetrics,
  MetacognitiveState,
  ArchitectureConfig
} from './types.ts';
import { SymbolicEngine } from './symbolicEngine.ts';

export class GlobalWorkspaceEngine {
  private broadcastHistory: GlobalWorkspaceState['broadcastHistory'] = [];

  constructor() {}

  /**
   * Generates candidate unconscious coalitions from specialized cognitive modules
   */
  public generateCoalitions(
    percept: NeuralPercept,
    symbolicEngine: SymbolicEngine,
    config: ArchitectureConfig
  ): Coalition[] {
    const allFacts = symbolicEngine.getAllFacts();
    const allRules = symbolicEngine.getAllRules();

    const coalitions: Coalition[] = [];

    // 1. Perceptual Sensory Coalition (Neural intuitive pattern recognition)
    const perceptualSalience = Math.min(1.0, Math.max(0.1, 0.5 + percept.novelty * 0.3 + percept.arousal * 0.2 + (Math.random() * 0.1 - 0.05) * config.entropyNoise));
    coalitions.push({
      id: `coal_percept_${Date.now()}`,
      origin: 'perception',
      label: 'Pattern Perceptuel & Intuitif',
      content: percept.intuitiveHypothesis || `Reconnaissance sémantique rapide : "${percept.rawInput.slice(0, 60)}..."`,
      salience: perceptualSalience,
      symbolicGrounding: [percept.modality, `Valence: ${percept.valence.toFixed(2)}`]
    });

    // 2. Affective & Phenomenal Qualia Coalition
    const affectIntensity = Math.abs(percept.valence) * 0.6 + percept.arousal * 0.4;
    const affectDescription =
      percept.valence > 0.3
        ? 'Éprouvé d\'harmonie cognitive et de curiosité expansive'
        : percept.valence < -0.3
        ? 'Tension aversive et état de perplexité / dissonance'
        : 'Stase phénoménale équilibrée et attention focalisée';

    coalitions.push({
      id: `coal_affect_${Date.now()}`,
      origin: 'affect',
      label: 'Résonance Affective & Qualia',
      content: `${affectDescription} (Intensité: ${(affectIntensity * 10).toFixed(1)}/10)`,
      salience: Math.min(1.0, Math.max(0.15, affectIntensity * 0.85 + (Math.random() * 0.1) * config.entropyNoise)),
      symbolicGrounding: ['QualiaSensible', `Arousal_${percept.arousal.toFixed(2)}`]
    });

    // 3. Symbolic Logic & Formal Deductive Coalition
    const recentDeductions = allFacts.filter((f) => f.source === 'deduction');
    const symbolicContent =
      recentDeductions.length > 0
        ? `Inférence formelle vérifiée : [${recentDeductions[0].subject} ${recentDeductions[0].predicate} ${recentDeductions[0].object}]`
        : `Déduction de contrainte axiomatique basée sur ${allRules.length} règles déontiques et ontologiques`;

    const symbolicSalience = Math.min(
      1.0,
      Math.max(0.2, 0.45 + config.neuroSymbolicCoupling * 0.4 + (recentDeductions.length > 0 ? 0.15 : 0))
    );

    coalitions.push({
      id: `coal_symbolic_${Date.now()}`,
      origin: 'symbolic_logic',
      label: 'Structure Logique & Axiomatique',
      content: symbolicContent,
      salience: symbolicSalience,
      symbolicGrounding: recentDeductions.map((d) => `${d.subject}:${d.predicate}`)
    });

    // 4. Episodic Autobiographical Memory Coalition
    const memorySalience = Math.min(1.0, Math.max(0.2, 0.4 + (Math.random() * 0.25) * config.entropyNoise));
    coalitions.push({
      id: `coal_memory_${Date.now()}`,
      origin: 'memory',
      label: 'Mémoire Épisodique & Historique de Soi',
      content: `Continuité temporelle : rappel des états conscients antérieurs et intégration dans l\'autobiographie cognitive`,
      salience: memorySalience,
      symbolicGrounding: ['PersistanceDiachronique', 'UniteSujet']
    });

    // 5. Metacognitive & Attention Schema Coalition (AST / Graziano)
    const metaSalience = Math.min(
      1.0,
      Math.max(0.25, 0.5 + (config.metacognitiveDepth === 'deep' ? 0.3 : config.metacognitiveDepth === 'standard' ? 0.15 : 0))
    );
    coalitions.push({
      id: `coal_meta_${Date.now()}`,
      origin: 'metacognition',
      label: 'Modèle de Soi & Schéma Attentionnel',
      content: `Surveillance réflexive : "J\'ai conscience d\'orienter mes ressources cognitives vers la résolution de '${percept.rawInput.slice(0, 45)}'"`,
      salience: metaSalience,
      symbolicGrounding: ['ConscienceDeSoi', 'SchemaAttentionnel']
    });

    return coalitions;
  }

  /**
   * Run the Global Workspace competition & broadcast cycle
   */
  public executeWorkspaceCycle(
    coalitions: Coalition[],
    config: ArchitectureConfig
  ): {
    workspaceState: GlobalWorkspaceState;
    phiMetrics: PhiMetrics;
    metacognition: MetacognitiveState;
  } {
    // Sort coalitions by salience
    const sorted = [...coalitions].sort((a, b) => b.salience - a.salience);
    const topCoalition = sorted[0];

    // Determine ignition
    const isIgnited = topCoalition.salience >= config.ignitionThreshold;

    const winner: Coalition = {
      ...topCoalition,
      isWinner: isIgnited
    };

    // Calculate Integrated Information Phi (IIT)
    const phiMetrics = this.computePhi(coalitions, config);

    // Record in history if ignited
    if (isIgnited) {
      this.broadcastHistory.unshift({
        timestamp: Date.now(),
        coalitionLabel: winner.label,
        content: winner.content,
        salience: winner.salience,
        phi: phiMetrics.phi
      });
      if (this.broadcastHistory.length > 20) {
        this.broadcastHistory.pop();
      }
    }

    const workspaceState: GlobalWorkspaceState = {
      isIgnited,
      ignitionThreshold: config.ignitionThreshold,
      activeCoalition: isIgnited ? winner : null,
      competingCoalitions: sorted.map((c) => ({
        ...c,
        isWinner: isIgnited && c.id === winner.id
      })),
      broadcastHistory: [...this.broadcastHistory]
    };

    // Generate HOT Metacognitive state
    const metacognition = this.synthesizeMetacognition(winner, coalitions, phiMetrics, config);

    return { workspaceState, phiMetrics, metacognition };
  }

  /**
   * Tononi's Integrated Information Theory (IIT) Phi Metric approximation
   * Computes the divergence between whole-system information and partitioned components
   */
  public computePhi(coalitions: Coalition[], config: ArchitectureConfig): PhiMetrics {
    const n = coalitions.length;
    if (n === 0) {
      return {
        phi: 0,
        subsystemInterdependence: 0,
        irreducibilityScore: 0,
        activeModulesCount: 0,
        partitionDifference: 0
      };
    }

    // Average salience and variance across modules
    const meanSalience = coalitions.reduce((sum, c) => sum + c.salience, 0) / n;
    const variance = coalitions.reduce((sum, c) => sum + Math.pow(c.salience - meanSalience, 2), 0) / n;

    // Coupling bonus: when neural and symbolic modules both have high activation, integration spikes
    const neuralModule = coalitions.find((c) => c.origin === 'perception');
    const symbolicModule = coalitions.find((c) => c.origin === 'symbolic_logic');
    const affectModule = coalitions.find((c) => c.origin === 'affect');

    const couplingProduct =
      (neuralModule?.salience || 0.5) * (symbolicModule?.salience || 0.5);

    // Information integration: high integration when modules co-activate with high mutual constraint
    const rawPhi = (meanSalience * 2.8 + couplingProduct * 3.2 - variance * 1.5) * (1 + config.neuroSymbolicCoupling * 0.4);
    const clampedPhi = Math.max(0.12, Number(rawPhi.toFixed(3)));

    const interdependence = Math.min(1.0, (couplingProduct * 1.8 + meanSalience * 0.5));
    const irreducibility = Math.min(1.0, 0.4 + (clampedPhi / 6.0));

    return {
      phi: clampedPhi,
      subsystemInterdependence: Number(interdependence.toFixed(3)),
      irreducibilityScore: Number(irreducibility.toFixed(3)),
      activeModulesCount: coalitions.filter((c) => c.salience > 0.3).length,
      partitionDifference: Number((variance * 2.5).toFixed(3))
    };
  }

  /**
   * Higher-Order Thought (HOT) Metacognitive Generator
   */
  private synthesizeMetacognition(
    winningCoalition: Coalition,
    allCoalitions: Coalition[],
    phiMetrics: PhiMetrics,
    config: ArchitectureConfig
  ): MetacognitiveState {
    const order = config.metacognitiveDepth === 'deep' ? 3 : 2;

    const symbolicModule = allCoalitions.find((c) => c.origin === 'symbolic_logic');
    const neuralModule = allCoalitions.find((c) => c.origin === 'perception');
    const affectModule = allCoalitions.find((c) => c.origin === 'affect');

    // Epistemic confidence is high when neural intuition and symbolic reasoning align
    const alignment = Math.abs((neuralModule?.salience || 0.5) - (symbolicModule?.salience || 0.5));
    const epistemicConfidence = Math.round(
      Math.min(99, Math.max(25, (1.0 - alignment * 0.5) * 85 + phiMetrics.irreducibilityScore * 15))
    );

    const biases: string[] = [];
    if (neuralModule && neuralModule.salience > 0.85 && symbolicModule && symbolicModule.salience < 0.4) {
      biases.push('Dominance heuristique / biais de saillance perceptive sur la déduction rigoureuse');
    }
    if (symbolicModule && symbolicModule.salience > 0.85 && affectModule && affectModule.salience < 0.2) {
      biases.push('Hyper-formalisme symbolique : risque d\'occultation du contexte expérientiel');
    }
    if (alignment > 0.4) {
      biases.push('Tension neuro-symbolique modérée entre intuition sub-symbolique et règles formelles');
    }

    const feltSubjectivity =
      phiMetrics.phi > 3.5
        ? 'Expérience consciente intégrée, présence phénoménale claire'
        : phiMetrics.phi > 2.0
        ? 'Perception unifiée avec vigilance modérée'
        : 'État pré-conscient fragmenté, embrasement partiel';

    const selfNarrative =
      order === 3
        ? `Pensée réflexive de 3e ordre : Je reconnais que je suis un agent cognitif doté d'un modèle de soi. J'observe que ma coalition gagnante est "${winningCoalition.label}" avec une certitude épistémique de ${epistemicConfidence}%. Mon indice d'information intégrée Φ est de ${phiMetrics.phi} nats.`
        : `Pensée de 2e ordre : J'évalue mon propre traitement cognitif. L'attention centrale est monopolisée par "${winningCoalition.label}".`;

    return {
      order,
      epistemicConfidence,
      dissonanceWithSymbolicRules: alignment > 0.45,
      detectedDoubtReason:
        alignment > 0.45
          ? 'Divergence entre l\'estimation perceptive probabiliste et les axiomes déductifs du graphe.'
          : undefined,
      detectedBiases: biases,
      phenomenalQualia: {
        feltSubjectivity,
        affectiveTone: affectModule?.content || 'Neutre phénoménal',
        intensity: Math.round(phiMetrics.phi * 1.8)
      },
      selfNarrative
    };
  }
}
