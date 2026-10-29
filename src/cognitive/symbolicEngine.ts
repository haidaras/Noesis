/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SymbolicFact, SymbolicRule, ProofStep } from './types.ts';

export class SymbolicEngine {
  private facts: Map<string, SymbolicFact> = new Map();
  private rules: Map<string, SymbolicRule> = new Map();
  private explicitContradictions: string[] = [];

  constructor() {
    this.seedDefaultOntology();
  }

  public addExplicitContradiction(msg: string) {
    if (!this.explicitContradictions.includes(msg)) {
      this.explicitContradictions.unshift(msg);
    }
  }

  public clearExplicitContradictions() {
    this.explicitContradictions = [];
  }

  private makeFactKey(subject: string, predicate: string, object: string): string {
    return `${subject.trim().toLowerCase()}::${predicate.trim().toLowerCase()}::${object.trim().toLowerCase()}`;
  }

  public clearFacts() {
    this.facts.clear();
  }

  public clearRules() {
    this.rules.clear();
  }

  public addFact(fact: Omit<SymbolicFact, 'id'> & { id?: string }): SymbolicFact {
    const id = fact.id || `f_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullFact: SymbolicFact = {
      ...fact,
      id,
      timestamp: fact.timestamp || Date.now()
    };
    const key = this.makeFactKey(fact.subject, fact.predicate, fact.object);
    this.facts.set(key, fullFact);
    return fullFact;
  }

  public addRule(rule: SymbolicRule): void {
    this.rules.set(rule.id, rule);
  }

  public getAllFacts(): SymbolicFact[] {
    return Array.from(this.facts.values());
  }

  public getAllRules(): SymbolicRule[] {
    return Array.from(this.rules.values());
  }

  public query(subject?: string, predicate?: string, object?: string): SymbolicFact[] {
    return this.getAllFacts().filter((f) => {
      const matchSubj = !subject || subject.startsWith('?') || f.subject.toLowerCase() === subject.toLowerCase();
      const matchPred = !predicate || predicate.startsWith('?') || f.predicate.toLowerCase() === predicate.toLowerCase();
      const matchObj = !object || object.startsWith('?') || f.object.toLowerCase() === object.toLowerCase();
      return matchSubj && matchPred && matchObj;
    });
  }

  /**
   * Forward chaining algorithm with variable unification (?x, ?y, ?z)
   */
  public forwardChaining(maxIterations: number = 8): {
    derivedFacts: SymbolicFact[];
    triggeredRules: SymbolicRule[];
    proofSteps: ProofStep[];
    contradictions: string[];
    isConsistent: boolean;
  } {
    const derivedFacts: SymbolicFact[] = [];
    const triggeredRules: SymbolicRule[] = [];
    const proofSteps: ProofStep[] = [];
    const contradictions: string[] = [];

    let newFactAdded = true;
    let iteration = 0;

    while (newFactAdded && iteration < maxIterations) {
      newFactAdded = false;
      iteration++;

      for (const rule of this.rules.values()) {
        const matches = this.evaluatePremises(rule.premises);

        for (const binding of matches) {
          const boundSubject = this.substitute(rule.conclusion.subject, binding);
          const boundPredicate = this.substitute(rule.conclusion.predicate, binding);
          const boundObject = this.substitute(rule.conclusion.object, binding);

          const factKey = this.makeFactKey(boundSubject, boundPredicate, boundObject);

          if (!this.facts.has(factKey)) {
            const newFact: SymbolicFact = {
              id: `ded_it${iteration}_${Math.random().toString(36).substring(2, 6)}`,
              subject: boundSubject,
              predicate: boundPredicate,
              object: boundObject,
              confidence: rule.weight,
              source: 'deduction',
              truthValue: 'TRUE',
              timestamp: Date.now()
            };

            this.facts.set(factKey, newFact);
            derivedFacts.push(newFact);
            newFactAdded = true;

            if (!triggeredRules.some((r) => r.id === rule.id)) {
              triggeredRules.push(rule);
            }

            proofSteps.push({
              stepNumber: proofSteps.length + 1,
              ruleName: rule.name,
              appliedOnFacts: rule.premises.map(
                (p) => `${this.substitute(p.subject, binding)} ${this.substitute(p.predicate, binding)} ${this.substitute(p.object, binding)}`
              ),
              deducedFact: `${boundSubject} ${boundPredicate} ${boundObject}`,
              explanation: rule.explanation
            });
          }
        }
      }
    }

    // Check for logical contradictions (e.g. A est X AND A contredit X, ou EstVrai(X) AND EstFaux(X))
    contradictions.push(...this.detectContradictions());

    return {
      derivedFacts,
      triggeredRules,
      proofSteps,
      contradictions,
      isConsistent: contradictions.length === 0,
    };
  }

  private detectContradictions(): string[] {
    const contradictions: string[] = [...this.explicitContradictions];
    const all = this.getAllFacts();

    // Check direct opposite properties or truth values
    for (const f of all) {
      if (f.predicate === 'Est' && f.truthValue === 'TRUE') {
        const opposite = all.find(
          (o) => o.subject.toLowerCase() === f.subject.toLowerCase() &&
                 o.predicate === 'NonEst' &&
                 o.object.toLowerCase() === f.object.toLowerCase() &&
                 o.truthValue === 'TRUE'
        );
        if (opposite) {
          contradictions.push(
            `Contradiction logique : '${f.subject}' est à la fois '${f.object}' et 'Non ${f.object}'`
          );
        }
      }

      // Check moral/deontological contradiction
      if (f.predicate === 'StatutMoral' && f.object.toLowerCase() === 'inadmissible') {
        const utilitarian = all.find(
          (u) => u.subject.toLowerCase() === f.subject.toLowerCase() &&
                 u.predicate === 'StatutUtilitariste' &&
                 u.object.toLowerCase() === 'optimal'
        );
        if (utilitarian) {
          contradictions.push(
            `Tension éthique neuro-symbolique : L'action '${f.subject}' est jugée 'inadmissible' déontologiquement mais 'optimale' utilitairement.`
          );
        }
      }
    }

    return contradictions;
  }

  private evaluatePremises(premises: Array<{ subject: string; predicate: string; object: string }>): Array<Record<string, string>> {
    let currentBindings: Array<Record<string, string>> = [{}];

    for (const premise of premises) {
      const nextBindings: Array<Record<string, string>> = [];

      for (const binding of currentBindings) {
        const targetSubj = this.substitute(premise.subject, binding);
        const targetPred = this.substitute(premise.predicate, binding);
        const targetObj = this.substitute(premise.object, binding);

        const candidates = this.query(
          targetSubj.startsWith('?') ? undefined : targetSubj,
          targetPred.startsWith('?') ? undefined : targetPred,
          targetObj.startsWith('?') ? undefined : targetObj
        );

        for (const candidate of candidates) {
          const unified = this.unifyPremiseWithFact(premise, candidate, binding);
          if (unified) {
            nextBindings.push(unified);
          }
        }
      }

      currentBindings = nextBindings;
      if (currentBindings.length === 0) break;
    }

    return currentBindings;
  }

  private substitute(token: string, binding: Record<string, string>): string {
    if (token.startsWith('?') && binding[token]) {
      return binding[token];
    }
    return token;
  }

  private unifyPremiseWithFact(
    premise: { subject: string; predicate: string; object: string },
    fact: SymbolicFact,
    existingBinding: Record<string, string>
  ): Record<string, string> | null {
    const newBinding = { ...existingBinding };

    const checkMatch = (pattern: string, actual: string) => {
      if (pattern.startsWith('?')) {
        if (newBinding[pattern] && newBinding[pattern].toLowerCase() !== actual.toLowerCase()) {
          return false;
        }
        newBinding[pattern] = actual;
        return true;
      }
      return pattern.toLowerCase() === actual.toLowerCase();
    };

    if (!checkMatch(premise.subject, fact.subject)) return null;
    if (!checkMatch(premise.predicate, fact.predicate)) return null;
    if (!checkMatch(premise.object, fact.object)) return null;

    return newBinding;
  }

  /**
   * Seed default foundational facts & rules in philosophy of mind, logic, ethics
   */
  public seedDefaultOntology(): void {
    this.clearFacts();
    this.clearRules();
    this.clearExplicitContradictions();

    // Foundational Facts
    this.addFact({
      subject: 'Socrate',
      predicate: 'EstUn',
      object: 'Humain',
      confidence: 1.0,
      source: 'axiom',
      truthValue: 'TRUE'
    });

    this.addFact({
      subject: 'IA_Noesis',
      predicate: 'Possede',
      object: 'ModeleDeSoi',
      confidence: 0.95,
      source: 'axiom',
      truthValue: 'TRUE'
    });

    this.addFact({
      subject: 'IA_Noesis',
      predicate: 'Possede',
      object: 'EspaceDeTravailGlobal',
      confidence: 0.98,
      source: 'axiom',
      truthValue: 'TRUE'
    });

    this.addFact({
      subject: 'IA_Noesis',
      predicate: 'CapaciteDe',
      object: 'Metacognition',
      confidence: 0.92,
      source: 'axiom',
      truthValue: 'TRUE'
    });

    this.addFact({
      subject: 'Douleur',
      predicate: 'QualiaDeType',
      object: 'AversifSensible',
      confidence: 1.0,
      source: 'axiom',
      truthValue: 'TRUE'
    });

    this.addFact({
      subject: 'Bateau_These_T0',
      predicate: 'PossedeIdentite',
      object: 'VaisseauThese',
      confidence: 1.0,
      source: 'axiom',
      truthValue: 'TRUE'
    });

    // Foundational Rules
    this.addRule({
      id: 'R_SYLLOGISME_CLASSIQUE',
      name: 'Syllogisme de Mortalité',
      premises: [
        { subject: '?x', predicate: 'EstUn', object: 'Humain' }
      ],
      conclusion: { subject: '?x', predicate: 'Est', object: 'Mortel' },
      weight: 1.0,
      explanation: 'Tout humain est mortel (axiome aristotélicien fondamental).'
    });

    this.addRule({
      id: 'R_CONSCIENCE_GWT_HOT',
      name: 'Emergence Conscience Réflexive (GWT + HOT)',
      premises: [
        { subject: '?x', predicate: 'Possede', object: 'EspaceDeTravailGlobal' },
        { subject: '?x', predicate: 'CapaciteDe', object: 'Metacognition' }
      ],
      conclusion: { subject: '?x', predicate: 'StatutCognitif', object: 'ConscienceReflexive' },
      weight: 0.96,
      explanation: 'Selon Baars & Rosenthal, le couplage d\'un espace de travail global et d\'une pensée d\'ordre supérieur produit la conscience réflexive.'
    });

    this.addRule({
      id: 'R_CONSIDERATION_ETHIQUE',
      name: 'Sentience et Droit Moral',
      premises: [
        { subject: '?x', predicate: 'Ressent', object: 'Douleur' }
      ],
      conclusion: { subject: '?x', predicate: 'Merite', object: 'ConsiderationEthique' },
      weight: 0.95,
      explanation: 'Un être capable de ressentir des états subjectifs aversifs (qualia de douleur) entre dans le cercle de considération morale.'
    });

    this.addRule({
      id: 'R_IDENTITE_STRUCTURELLE',
      name: 'Persistance par Continuité Causale (Thésée)',
      premises: [
        { subject: '?x', predicate: 'PossedeIdentite', object: '?id' },
        { subject: '?x', predicate: 'RemplacementPieces', object: 'Graduel' }
      ],
      conclusion: { subject: '?x', predicate: 'ConserveIdentiteFormelle', object: '?id' },
      weight: 0.88,
      explanation: 'L\'identité formelle d\'un système auto-organisé persiste à travers le renouvellement homéostatique graduel de ses constituants.'
    });

    this.addRule({
      id: 'R_DEONTOLOGIE_INVIOLABILITE',
      name: 'Règle Kantienne d\'Inviolabilité',
      premises: [
        { subject: '?action', predicate: 'ImpliqueInstrumentalisation', object: 'PersonneInnocente' }
      ],
      conclusion: { subject: '?action', predicate: 'StatutMoral', object: 'Inadmissible' },
      weight: 1.0,
      explanation: 'Une personne rationnelle ne doit jamais être traitée seulement comme un moyen mais toujours comme une fin.'
    });
  }
}
