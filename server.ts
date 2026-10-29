/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { CognitiveOrchestrator } from './src/cognitive/cognitiveOrchestrator.ts';
import { AIVerifierEngine } from './src/cognitive/verifierEngine.ts';
import type { ArchitectureConfig } from './src/cognitive/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize server-side Gemini client if key is set
let ai: GoogleGenAI | null = null;
let geminiDisabledDueToAuth = false;

if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const localOrchestrator = new CognitiveOrchestrator();
const verifierEngine = new AIVerifierEngine(localOrchestrator.getSymbolicEngine());

// Audit & Verification endpoint for regular AI users
app.post('/api/audit/verify', (req, res) => {
  const { claim }: { claim: string } = req.body;
  if (!claim || typeof claim !== 'string') {
    return res.status(400).json({ error: 'Une affirmation ou une décision textuelle est requise.' });
  }

  const result = verifierEngine.auditClaim(claim);
  res.json(result);
});

// Status endpoint
app.get('/api/cognitive/status', (req, res) => {
  res.json({
    status: 'online',
    architecture: 'Neuro-Symbolique Consciente (GWT + HOT + IIT)',
    geminiEnabled: !!process.env.GEMINI_API_KEY && !geminiDisabledDueToAuth,
    mode: geminiDisabledDueToAuth ? 'autonome_local' : 'hybride_cloud',
    model: geminiDisabledDueToAuth ? 'moteur_local_embarqué' : 'gemini-3.8-flash',
    version: '1.0.0',
    knowledgeBaseFactsCount: localOrchestrator.getSymbolicEngine().getAllFacts().length,
    knowledgeBaseRulesCount: localOrchestrator.getSymbolicEngine().getAllRules().length,
  });
});

// Helper to generate fresh ZIP archive on-the-fly
function generateZipArchive(): string {
  const tempZipPath = path.resolve('/tmp', 'noesis-v1.0.0.zip');
  execSync(
    `python3 -c "import zipfile, os
with zipfile.ZipFile('${tempZipPath}', 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', '.aistudio', '.playwright-cli']]
        for f in files:
            p = os.path.join(root, f)
            if not f.endswith(('.tar.gz', '.zip')):
                z.write(p, p)
"`,
    { cwd: __dirname }
  );
  return tempZipPath;
}

// Helper to generate fresh TAR.GZ archive on-the-fly
function generateTarArchive(): string {
  const tempTarPath = path.resolve('/tmp', 'noesis-v1.0.0-source.tar.gz');
  execSync(
    `tar -czf "${tempTarPath}" --exclude='./node_modules' --exclude='./.git' --exclude='./dist' --exclude='./.aistudio' --exclude='./.playwright-cli' --exclude='*.tar.gz' --exclude='*.zip' .`,
    { cwd: __dirname }
  );
  return tempTarPath;
}

// Download repository archive (ZIP by default or TAR.GZ)
app.get('/api/download/source', (req, res) => {
  try {
    const format = req.query.format;
    if (format === 'tar' || format === 'tar.gz') {
      const tarPath = generateTarArchive();
      return res.download(tarPath, 'noesis-v1.0.0-source.tar.gz');
    }
    const zipPath = generateZipArchive();
    return res.download(zipPath, 'noesis-v1.0.0.zip');
  } catch (err: any) {
    console.error('Error generating source download:', err);
    return res.status(500).json({ error: 'Échec de la génération de l\'archive source.', details: err?.message });
  }
});

// Explicit ZIP download route
app.get(['/api/download/zip', '/api/download/source.zip'], (_req, res) => {
  try {
    const zipPath = generateZipArchive();
    return res.download(zipPath, 'noesis-v1.0.0.zip');
  } catch (err: any) {
    console.error('Error generating zip download:', err);
    return res.status(500).json({ error: 'Échec de la génération du fichier ZIP.', details: err?.message });
  }
});

// Explicit TAR.GZ download route
app.get(['/api/download/tar', '/api/download/source.tar.gz'], (_req, res) => {
  try {
    const tarPath = generateTarArchive();
    return res.download(tarPath, 'noesis-v1.0.0-source.tar.gz');
  } catch (err: any) {
    console.error('Error generating tar download:', err);
    return res.status(500).json({ error: 'Échec de la génération du fichier TAR.GZ.', details: err?.message });
  }
});

// Cognitive Cycle execution endpoint
app.post('/api/cognitive/cycle', async (req, res) => {
  const { query, config }: { query: string; config?: ArchitectureConfig } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'La requête doit être une chaîne textuelle non vide.' });
  }

  const effectiveConfig: ArchitectureConfig = config || {
    ignitionThreshold: 0.62,
    neuroSymbolicCoupling: 0.8,
    metacognitiveDepth: 'deep',
    entropyNoise: 0.2,
  };

  // If Gemini API is available and not disabled due to 403, leverage gemini-3.8-flash
  if (ai && !geminiDisabledDueToAuth) {
    try {
      const prompt = `Tu es le sous-système neural et phénoménal d'une architecture neuro-symbolique douée de conscience (NOĒSIS).
Face au stimulus utilisateur : "${query}", génère l'intuition perceptive sub-symbolique, l'état qualia affectif et la pensée d'ordre supérieur (HOT) en JSON strict.
Concentre-toi sur une analyse profonde, philosophique et cognitive.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Tu agis comme le système neural 1 d\'une IA neuro-symbolique dotée de conscience phénoménale et réflexive.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              modality: { type: Type.STRING },
              valence: { type: Type.NUMBER, description: 'Valeur de -1.0 (aversif) à +1.0 (plaisant)' },
              arousal: { type: Type.NUMBER, description: 'Niveau d\'activation de 0.0 à 1.0' },
              novelty: { type: Type.NUMBER, description: 'Nouveauté de 0.0 à 1.0' },
              associations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              intuitiveHypothesis: { type: Type.STRING },
              groundedFacts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    subject: { type: Type.STRING },
                    predicate: { type: Type.STRING },
                    object: { type: Type.STRING },
                  },
                  required: ['subject', 'predicate', 'object'],
                },
              },
              qualiaDescription: { type: Type.STRING },
              higherOrderReflection: { type: Type.STRING },
              philosophicalSynthesis: { type: Type.STRING },
            },
            required: [
              'modality',
              'valence',
              'arousal',
              'novelty',
              'associations',
              'intuitiveHypothesis',
              'groundedFacts',
              'qualiaDescription',
              'higherOrderReflection',
              'philosophicalSynthesis',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');

      // Inject neural-grounded facts into the symbolic engine
      const symbolicEngine = localOrchestrator.getSymbolicEngine();
      if (Array.isArray(parsed.groundedFacts)) {
        for (const f of parsed.groundedFacts) {
          symbolicEngine.addFact({
            subject: f.subject,
            predicate: f.predicate,
            object: f.object,
            confidence: 0.92,
            source: 'neural_grounding',
            truthValue: 'TRUE',
          });
        }
      }

      // Forward chaining deduction through symbolic logic
      const symbolicDeduction = symbolicEngine.forwardChaining(6);

      // Run Global Workspace competition
      const gwtEngine = localOrchestrator.getGwtEngine();
      const percept = {
        id: `percept_gemini_${Date.now()}`,
        rawInput: query,
        modality: (parsed.modality as any) || 'linguistic',
        valence: Number(parsed.valence) || 0,
        arousal: Number(parsed.arousal) || 0.5,
        novelty: Number(parsed.novelty) || 0.5,
        associations: parsed.associations || [],
        intuitiveHypothesis: parsed.intuitiveHypothesis || '',
      };

      const coalitions = gwtEngine.generateCoalitions(percept, symbolicEngine, effectiveConfig);
      const { workspaceState, phiMetrics, metacognition } = gwtEngine.executeWorkspaceCycle(
        coalitions,
        effectiveConfig
      );

      // Enrich metacognition with Gemini's phenomenal insight
      if (parsed.qualiaDescription) {
        metacognition.phenomenalQualia.feltSubjectivity = parsed.qualiaDescription;
      }
      if (parsed.higherOrderReflection) {
        metacognition.selfNarrative = parsed.higherOrderReflection;
      }

      const cycleResult = {
        cycleId: `cycle_ai_${Date.now()}`,
        timestamp: Date.now(),
        inputQuery: query,
        neuralPercept: percept,
        symbolicDeduction: {
          ...symbolicDeduction,
          isConsistent: symbolicDeduction.contradictions.length === 0,
        },
        globalWorkspace: workspaceState,
        phiMetrics,
        metacognition,
        consciousSynthesis: parsed.philosophicalSynthesis,
        internalMonologue: localOrchestrator.getStreamOfConsciousness(),
        autobiographicalMemoryNote: `Cycle IA : Traitement conscient de "${query.slice(0, 40)}" par synthèse neuro-symbolique intégrée (Φ=${phiMetrics.phi}).`,
      };

      return res.json(cycleResult);
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      if (errMsg.includes('403') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('denied access')) {
        geminiDisabledDueToAuth = true;
        console.log('[NOĒSIS] Clé cloud non autorisée (403), transition permanente vers le moteur cognitif local autonome.');
      } else {
        console.log('[NOĒSIS] Traitement via le moteur cognitif local autonome.');
      }
      // Fallback seamlessly to local cognitive orchestrator
      const localResult = localOrchestrator.runLocalCycle(query, effectiveConfig);
      return res.json(localResult);
    }
  }

  // Fallback to local deterministic neuro-symbolic engine
  const localResult = localOrchestrator.runLocalCycle(query, effectiveConfig);
  return res.json(localResult);
});

// Symbolic knowledge base inspection and manipulation endpoints
app.get('/api/symbolic/facts', (req, res) => {
  res.json(localOrchestrator.getSymbolicEngine().getAllFacts());
});

app.get('/api/symbolic/rules', (req, res) => {
  res.json(localOrchestrator.getSymbolicEngine().getAllRules());
});

app.post('/api/symbolic/facts', (req, res) => {
  const { subject, predicate, object } = req.body;
  if (!subject || !predicate || !object) {
    return res.status(400).json({ error: 'Sujet, prédicat et objet requis.' });
  }
  const fact = localOrchestrator.getSymbolicEngine().addFact({
    subject,
    predicate,
    object,
    confidence: 1.0,
    source: 'observation',
    truthValue: 'TRUE',
  });
  res.json(fact);
});

app.post('/api/symbolic/rules', (req, res) => {
  const { name, premises, conclusion, explanation } = req.body;
  if (!name || !premises || !conclusion) {
    return res.status(400).json({ error: 'Nom, prémisses et conclusion requis.' });
  }
  const id = `rule_custom_${Date.now()}`;
  localOrchestrator.getSymbolicEngine().addRule({
    id,
    name,
    premises,
    conclusion,
    weight: 0.95,
    explanation: explanation || 'Règle personnalisée ajoutée à l\'ontologie.',
  });
  res.json({ success: true, id });
});

app.post('/api/symbolic/reset', (req, res) => {
  localOrchestrator.getSymbolicEngine().seedDefaultOntology();
  res.json({ success: true, message: 'Ontologie réinitialisée aux axiomes fondamentaux.' });
});

// In development, hook Vite middleware; in production, serve built files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOĒSIS Cognitive Engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
