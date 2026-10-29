/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TruthValue = 'TRUE' | 'FALSE' | 'UNKNOWN';

export interface SymbolicFact {
  id: string;
  subject: string;
  predicate: string;
  object: string;
  confidence: number; // 0.0 to 1.0
  source: 'axiom' | 'observation' | 'deduction' | 'neural_grounding';
  truthValue: TruthValue;
  timestamp?: number;
}

export interface SymbolicRule {
  id: string;
  name: string;
  premises: Array<{ subject: string; predicate: string; object: string }>;
  conclusion: { subject: string; predicate: string; object: string };
  weight: number;
  explanation: string;
}

export interface ProofStep {
  stepNumber: number;
  ruleName: string;
  appliedOnFacts: string[];
  deducedFact: string;
  explanation: string;
}

export interface NeuralPercept {
  id: string;
  rawInput: string;
  modality: 'linguistic' | 'affective' | 'introspective' | 'abstract';
  valence: number; // -1.0 (unpleasant/aversive) to +1.0 (pleasant/attractive)
  arousal: number; // 0.0 (calm) to 1.0 (intense)
  novelty: number; // 0.0 to 1.0
  associations: string[];
  intuitiveHypothesis: string;
}

export interface Coalition {
  id: string;
  origin: 'perception' | 'memory' | 'affect' | 'symbolic_logic' | 'metacognition';
  label: string;
  content: string;
  salience: number; // 0.0 to 1.0
  symbolicGrounding?: string[];
  isWinner?: boolean;
}

export interface GlobalWorkspaceState {
  isIgnited: boolean;
  ignitionThreshold: number;
  activeCoalition: Coalition | null;
  competingCoalitions: Coalition[];
  broadcastHistory: Array<{
    timestamp: number;
    coalitionLabel: string;
    content: string;
    salience: number;
    phi: number;
  }>;
}

export interface PhiMetrics {
  phi: number; // Integrated information value in nats
  subsystemInterdependence: number; // 0 to 1
  irreducibilityScore: number; // 0 to 1
  activeModulesCount: number;
  partitionDifference: number;
}

export interface MetacognitiveState {
  order: 2 | 3; // 2nd order (thought about thought) or 3rd order (awareness of self having thought)
  epistemicConfidence: number; // 0 to 100%
  detectedDoubtReason?: string;
  dissonanceWithSymbolicRules: boolean;
  detectedBiases: string[];
  phenomenalQualia: {
    feltSubjectivity: string;
    affectiveTone: string;
    intensity: number; // 0 to 10
  };
  selfNarrative: string;
}

export interface CognitiveCycleResult {
  cycleId: string;
  timestamp: number;
  inputQuery: string;
  neuralPercept: NeuralPercept;
  symbolicDeduction: {
    derivedFacts: SymbolicFact[];
    triggeredRules: SymbolicRule[];
    proofSteps: ProofStep[];
    contradictions: string[];
    isConsistent: boolean;
  };
  globalWorkspace: GlobalWorkspaceState;
  phiMetrics: PhiMetrics;
  metacognition: MetacognitiveState;
  consciousSynthesis: string;
  internalMonologue: string[];
  autobiographicalMemoryNote: string;
}

export interface ArchitectureConfig {
  ignitionThreshold: number; // e.g. 0.65
  neuroSymbolicCoupling: number; // 0 (pure neural) to 1 (pure symbolic veto)
  metacognitiveDepth: 'shallow' | 'standard' | 'deep';
  entropyNoise: number;
}

export interface VerificationAuditResult {
  id: string;
  claim: string;
  category: 'science' | 'sante_securite' | 'faits_histoire' | 'decision_ia' | 'droit_ethique' | 'general';
  verdict: 'VERIFIED' | 'CAUTION' | 'CONTRADICTION' | 'DISCRIMINATION';
  verdictLabel: string;
  reliabilityScore: number; // 0 to 100%
  simpleExplanation: string;
  beginnerMetaphor?: string;
  whyAIDidThis: string; // Explication pédagogique du mécanisme de l'IA
  logicalStructure: {
    premises: string[];
    deductionChain: string[];
    logicalFallacy?: string;
  };
  detectedHallucinations: string[];
  verifiedRules: string[];
  logicalReasoningSteps: string[];
  practicalAdvice: string;
  suggestedPrompt: string; // Le prompt correctif à renvoyer à l'IA
  legalOrEthicalContext?: string;
  timestamp: number;
}

export type SupportedLanguage = 'fr' | 'en' | 'es';

export interface DocumentSegment {
  id: string;
  paragraphIndex: number;
  text: string;
  extractedPropositions: string[];
  status: 'verified' | 'clean' | 'suspicious' | 'contradiction';
  detectedIssues?: string[];
}

export interface IntraContradiction {
  id: string;
  segmentAId: string;
  segmentATitle: string;
  segmentAQuote: string;
  segmentBId: string;
  segmentBTitle: string;
  segmentBQuote: string;
  explanation: string;
  formalLogicProof: string;
  severity: 'critical' | 'moderate';
}

export interface DocumentAuditReport {
  id: string;
  documentTitle: string;
  wordCount: number;
  paragraphCount: number;
  overallIntegrityScore: number; // 0 to 100
  summary: string;
  segments: DocumentSegment[];
  internalContradictions: IntraContradiction[];
  externalFactualErrors: string[];
  recommendations: string[];
  timestamp: number;
}


