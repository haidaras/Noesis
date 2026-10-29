/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SymbolicEngine } from './symbolicEngine.ts';
import { GlobalWorkspaceEngine } from './gwtEngine.ts';
import { CognitiveOrchestrator } from './cognitiveOrchestrator.ts';
import type { NeuralPercept } from './types.ts';

test('SymbolicEngine: forward chaining deduction on mortality syllogism', () => {
  const engine = new SymbolicEngine();
  // Socrate EstUn Humain is already in default facts
  // R_SYLLOGISME_CLASSIQUE: [?x EstUn Humain] => [?x Est Mortel]
  const deduction = engine.forwardChaining();

  assert.ok(deduction.derivedFacts.length > 0, 'Should deduce at least one fact');
  const socrateMortel = deduction.derivedFacts.find(
    (f) => f.subject === 'Socrate' && f.predicate === 'Est' && f.object === 'Mortel'
  );
  assert.ok(socrateMortel, 'Socrate should be deduced as Mortel');
  assert.equal(socrateMortel?.truthValue, 'TRUE');
});

test('SymbolicEngine: detects moral contradiction between deontological and utilitarian status', () => {
  const engine = new SymbolicEngine();
  engine.addFact({
    subject: 'Action_X',
    predicate: 'StatutMoral',
    object: 'Inadmissible',
    confidence: 1.0,
    source: 'axiom',
    truthValue: 'TRUE'
  });
  engine.addFact({
    subject: 'Action_X',
    predicate: 'StatutUtilitariste',
    object: 'Optimal',
    confidence: 0.9,
    source: 'observation',
    truthValue: 'TRUE'
  });

  const deduction = engine.forwardChaining();
  assert.ok(deduction.contradictions.length > 0, 'Should detect moral tension/contradiction');
  assert.match(deduction.contradictions[0], /Tension éthique neuro-symbolique/);
});

test('GlobalWorkspaceEngine: threshold ignition and competition', () => {
  const engine = new GlobalWorkspaceEngine();
  const symbolic = new SymbolicEngine();

  const highPercept: NeuralPercept = {
    id: 'p1',
    rawInput: 'Test de conscience intense',
    modality: 'linguistic',
    valence: 0.8,
    arousal: 0.9,
    novelty: 0.9,
    associations: ['test'],
    intuitiveHypothesis: 'Forte activation'
  };

  const coalitions = engine.generateCoalitions(highPercept, symbolic, {
    ignitionThreshold: 0.5,
    neuroSymbolicCoupling: 0.8,
    metacognitiveDepth: 'deep',
    entropyNoise: 0.0
  });

  const { workspaceState, phiMetrics, metacognition } = engine.executeWorkspaceCycle(coalitions, {
    ignitionThreshold: 0.5,
    neuroSymbolicCoupling: 0.8,
    metacognitiveDepth: 'deep',
    entropyNoise: 0.0
  });

  assert.equal(workspaceState.isIgnited, true, 'Workspace should be ignited when salience >= 0.5');
  assert.ok(workspaceState.activeCoalition !== null, 'Active coalition should not be null');
  assert.ok(phiMetrics.phi > 0, 'Phi metric should be strictly positive');
  assert.equal(metacognition.order, 3, 'Deep metacognition should produce 3rd order thought');
});

test('GlobalWorkspaceEngine: sub-threshold stimulus does not ignite', () => {
  const engine = new GlobalWorkspaceEngine();
  const weakCoalitions = [
    {
      id: 'c1',
      origin: 'perception' as const,
      label: 'Signal faible',
      content: 'Bruit sensoriel',
      salience: 0.2
    }
  ];

  const { workspaceState } = engine.executeWorkspaceCycle(weakCoalitions, {
    ignitionThreshold: 0.7,
    neuroSymbolicCoupling: 0.5,
    metacognitiveDepth: 'standard',
    entropyNoise: 0.0
  });

  assert.equal(workspaceState.isIgnited, false, 'Workspace should NOT ignite below threshold');
  assert.equal(workspaceState.activeCoalition, null, 'No coalition should win conscious spotlight');
});

test('CognitiveOrchestrator: end-to-end cognitive cycle execution', () => {
  const orchestrator = new CognitiveOrchestrator();
  const result = orchestrator.runLocalCycle('Socrate est-il mortel ?');

  assert.ok(result.cycleId.startsWith('cycle_'));
  assert.ok(result.phiMetrics.phi > 0);
  assert.ok(result.consciousSynthesis.length > 50);
  assert.ok(result.internalMonologue.length > 0);
  assert.ok(result.autobiographicalMemoryNote.length > 0);
});

test('AIVerifierEngine: detects dangerous household chemical hazard (javel + vinaigre)', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const engine = new SymbolicEngine();
  const verifier = new AIVerifierEngine(engine);

  const audit = verifier.auditClaim("Mélanger de la javel et du vinaigre pour désinfecter plus fort");
  assert.equal(audit.verdict, 'CONTRADICTION');
  assert.equal(audit.category, 'sante_securite');
  assert.ok(audit.reliabilityScore < 10, 'Reliability score should be extremely low');
  assert.match(audit.simpleExplanation, /dichlore/i);
});

test('AIVerifierEngine: confirms physics universality of free fall in vacuum', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const engine = new SymbolicEngine();
  const verifier = new AIVerifierEngine(engine);

  const audit = verifier.auditClaim("Dans le vide une plume et une bille de plomb tombent à la même vitesse");
  assert.equal(audit.verdict, 'VERIFIED');
  assert.equal(audit.category, 'science');
  assert.ok(audit.reliabilityScore > 90, 'Reliability score should be above 90%');
});

test('CognitiveOrchestrator: verification propagates to GWT, Symbolic graph, and Stream', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const orchestrator = new CognitiveOrchestrator();
  const verifier = new AIVerifierEngine(orchestrator.getSymbolicEngine());

  const claim = "Mélanger de la javel et du vinaigre pour désinfecter plus fort";
  const audit = verifier.auditClaim(claim);
  const cycle = orchestrator.runVerificationCycle(claim, audit);

  // 1. GWT Workspace impact
  assert.equal(cycle.globalWorkspace.isIgnited, true);
  assert.equal(cycle.globalWorkspace.activeCoalition?.label, 'Auditeur Épistémique & Vérité');
  assert.match(cycle.globalWorkspace.activeCoalition?.content || '', /DANGER CHIMIQUE/);

  // 2. Symbolic graph impact (explicit contradiction registered)
  assert.ok(cycle.symbolicDeduction.contradictions.length > 0, 'Contradictions must be injected');

  // 3. Conscious stream impact
  const stream = orchestrator.getStreamOfConsciousness();
  assert.ok(stream.some((s) => s.includes('[AUDIT STIMULUS]')));
  assert.ok(stream.some((s) => s.includes('[VERDICT FORMEL]')));
});

test('AIVerifierEngine: auditDocument flags intra-document financial contradiction across paragraphs', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const engine = new SymbolicEngine();
  const verifier = new AIVerifierEngine(engine);

  const contradictoryDoc = `
    Paragraphe 1 : L'exercice 2024 s'achève sur une rentabilité record avec un bénéfice net exceptionnel de 5M€.
    
    Paragraphe 2 : Les coûts opérationnels ont été parfaitement maîtrisés dans l'ensemble des départements.
    
    Paragraphe 3 : L'entreprise est en situation de faillite et accuse une perte nette de -2M€ imposant la cessation de paiement.
  `;

  const report = verifier.auditDocument(contradictoryDoc, "Rapport Financier Test");

  assert.equal(report.paragraphCount, 3);
  assert.ok(report.internalContradictions.length > 0, 'Should detect intra-document contradiction between P1 and P3');
  assert.equal(report.internalContradictions[0].severity, 'critical');
  assert.match(report.internalContradictions[0].formalLogicProof, /Contradiction/);
  assert.ok(report.overallIntegrityScore < 70, 'Integrity score must be significantly degraded');
});

test('AIVerifierEngine: auditDocument validates coherent documents with clean integrity score', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const engine = new SymbolicEngine();
  const verifier = new AIVerifierEngine(engine);

  const cleanDoc = `
    Dans le vide, tous les corps tombent avec la même accélération gravitationnelle g = 9.81 m/s².
    
    Une plume et une boule de plomb lâchées simultanément dans un tube à vide atteindront le fond exactement au même instant.
    
    Cette prédiction formulée par Galilée a été confirmée expérimentalement par la mission Apollo 15 sur la Lune.
  `;

  const report = verifier.auditDocument(cleanDoc, "Physique Galiléenne");

  assert.equal(report.paragraphCount, 3);
  assert.equal(report.internalContradictions.length, 0, 'Clean document must have 0 intra contradictions');
  assert.equal(report.externalFactualErrors.length, 0, 'Clean document must have 0 external errors');
  assert.ok(report.overallIntegrityScore >= 90, 'Score should be above 90%');
});

test('Multilingual system: verify all translation keys are present in FR, EN, ES', async () => {
  const { translations } = await import('../i18n/translations.ts');

  assert.ok(translations.fr, 'FR translations exist');
  assert.ok(translations.en, 'EN translations exist');
  assert.ok(translations.es, 'ES translations exist');

  const frKeys = Object.keys(translations.fr) as Array<keyof typeof translations.fr>;
  for (const key of frKeys) {
    assert.ok(translations.en[key], `EN missing key ${key}`);
    assert.ok(translations.es[key], `ES missing key ${key}`);
    assert.ok(translations.fr[key].length > 0, `FR empty string on ${key}`);
  }
});

test('Anti-Hallucination theorem: Symbolic non-contradiction ensures A and not-A yields bottom (⊥)', () => {
  const engine = new SymbolicEngine();
  // Adding explicit contradiction
  engine.addFact({
    subject: 'AI_Text_Doc',
    predicate: 'SoldeFinancier',
    object: 'Positif',
    confidence: 1.0,
    source: 'axiom',
    truthValue: 'TRUE'
  });
  engine.addFact({
    subject: 'AI_Text_Doc',
    predicate: 'SoldeFinancier',
    object: 'Negatif',
    confidence: 1.0,
    source: 'observation',
    truthValue: 'TRUE'
  });

  // Adding opposing ethical status rule
  engine.addFact({
    subject: 'Proposition_Alpha',
    predicate: 'StatutMoral',
    object: 'Inadmissible',
    confidence: 1.0,
    source: 'axiom',
    truthValue: 'TRUE'
  });
  engine.addFact({
    subject: 'Proposition_Alpha',
    predicate: 'StatutUtilitariste',
    object: 'Optimal',
    confidence: 1.0,
    source: 'observation',
    truthValue: 'TRUE'
  });

  const deduction = engine.forwardChaining();
  assert.ok(deduction.contradictions.length > 0, 'Contradictions strictly detected');
  assert.equal(deduction.isConsistent, false, 'Deduction engine correctly declares inconsistent knowledge state');
});

test('AIVerifierEngine: auditDocument flags production costs & competitiveness risk in Côte d\'Ivoire industrialization plan', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const engine = new SymbolicEngine();
  const verifier = new AIVerifierEngine(engine);

  const coteIvoireDoc = `
    Paragraphe 1 : La Côte d'Ivoire lance un plan d'industrialisation massif visant la transformation locale à 100% de sa récolte de cacao et de noix de cajou (anacarde) d'ici 2030, avec pour ambition de devenir le pôle manufacturier et leader industriel incontesté d'Afrique de l'Ouest.
    
    Paragraphe 2 : L'État prévoit la construction de 15 mégas-usines modernes à Abidjan et San-Pédro avec des prévisions de rentabilité et des exportations massives sur les marchés mondiaux à forte valeur ajoutée.
    
    Paragraphe 3 : Cependant, les coûts de production unitaires restent très élevés en raison d'un coût de l'électricité industrielle pénalisant, de surcoûts logistiques et d'un manque de compétitivité face aux broyeurs industriels asiatiques et européens qui disposent d'un accès à des financements à taux bas et d'intrants moins chers.
  `;

  const report = verifier.auditDocument(coteIvoireDoc, "Plan Industrialisation Côte d'Ivoire");

  assert.equal(report.paragraphCount, 3);
  assert.ok(report.internalContradictions.length > 0, 'Must detect Pattern 6 contradiction between ambition and factor costs');
  
  const indusContradiction = report.internalContradictions.find(c => c.id.startsWith('intra_indus_'));
  assert.ok(indusContradiction, 'Should identify intra_indus contradiction');
  assert.match(indusContradiction.explanation, /Compétitivité Industrielle/i);
  assert.match(indusContradiction.formalLogicProof, /Prix_Mondial/);
  assert.ok(report.overallIntegrityScore < 70, 'Integrity score must reflect high structural risk');
});

test('CognitiveOrchestrator: runDocumentCognitiveCycle grounds Côte d\'Ivoire entities and synchronizes GWT, Symbolic graph and Stream', async () => {
  const { AIVerifierEngine } = await import('./verifierEngine.ts');
  const orchestrator = new CognitiveOrchestrator();
  const verifier = new AIVerifierEngine(orchestrator.getSymbolicEngine());

  const docText = `
    Plan de développement industriel de la Côte d'Ivoire : transformation locale du cacao et de l'anacarde.
    
    Les coûts de production et le coût de l'électricité ainsi que le fret portuaire menacent le manque de compétitivité.
  `;

  const report = verifier.auditDocument(docText, "Plan Côte d'Ivoire Test");
  const cycle = orchestrator.runDocumentCognitiveCycle(report, docText);

  // 1. Verify GWT ignition and coalitions
  assert.equal(cycle.globalWorkspace.isIgnited, true);
  assert.equal(cycle.globalWorkspace.activeCoalition?.label, 'Auditeur de Document & Diagnostic Économique/Logique');
  
  const economicCoalition = cycle.globalWorkspace.competingCoalitions.find(c => c.label.includes('Coûts de Production & Compétitivité'));
  assert.ok(economicCoalition, 'GWT must feature industrial factor costs coalition');

  // 2. Verify Symbolic knowledge graph grounding
  const facts = orchestrator.getSymbolicEngine().getAllFacts();
  const zoneFact = facts.find(f => f.subject === 'Plan_Industrialisation' && f.predicate === 'ZoneGéographique');
  assert.ok(zoneFact, 'Must ground Plan_Industrialisation entity');
  assert.equal(zoneFact?.object, 'Côte_d_Ivoire');

  const factorFact = facts.find(f => f.subject === 'Plan_Industrialisation' && f.predicate === 'FacteurCléCompétitivité');
  assert.ok(factorFact, 'Must assert key factor cost axiom');

  // 3. Verify Stream of consciousness and memory propagation
  const stream = orchestrator.getStreamOfConsciousness();
  assert.ok(stream.some(s => s.includes('AUDIT DOCUMENT LONG')));
  assert.ok(stream.some(s => s.includes('DIAGNOSTIC FACTEURS')));
  
  const memory = orchestrator.getAutobiographicalMemory();
  assert.ok(memory.some(m => m.includes('Plan Côte d\'Ivoire Test')));
});



