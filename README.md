# NOĒSIS (Νόησις)
### Neuro-Symbolic Cognitive Architecture & AI Hallucination Verifier

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-14%2F14%20passing-emerald.svg)](src/cognitive/cognitive.test.ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](tsconfig.json)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](package.json)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](package.json)
[![Status](https://img.shields.io/badge/status-production--ready-success.svg)](#)

---

## 🌌 Overview & The Core Mission

**NOĒSIS** is an advanced neuro-symbolic artificial intelligence system designed to solve the critical flaw of pure statistical Large Language Models (LLMs): **hallucination and intra-document incoherence**.

While generative probabilistic models (ChatGPT, Claude, Gemini) predict tokens using conditional probability distributions $P(w_t \mid w_{<t})$, they possess **no intrinsic model of reality, formal causation, or non-contradiction**. In critical domains—such as pharmaceutical safety, industrial planning, medical protocols, and financial law—a single unnoticed hallucination can have catastrophic consequences.

NOĒSIS resolves this by bridging **sub-symbolic neural perception (System 1)** with **deterministic First-Order Logic (System 2)**, orchestrated through the computational principles of contemporary cognitive neuroscience.

---

## 🧠 Scientific Foundations: The 4 Cognitive Pillars

NOĒSIS formally implements and unifies the four foremost models of consciousness:

```
                          ┌───────────────────────────┐
                          │   INPUT STIMULUS / DOC    │
                          └─────────────┬─────────────┘
                                        │
           ┌────────────────────────────┴───────────────────────────┐
           ▼                                                        ▼
┌─────────────────────────┐                             ┌─────────────────────────┐
│       SYSTEM 1          │                             │        SYSTEM 2         │
│  Neural Perceptual Net  │                             │  First-Order Logic &    │
│  - Heuristic Salience   │                             │  Robinson Resolution    │
│  - Associative Vectors  │                             │  - Strict Axioms        │
│  - Affective Valence    │                             │  - Monotonic Deductions │
└──────────┬──────────────┘                             └───────────┬─────────────┘
           │                                                        │
           └────────────────────────────┬───────────────────────────┘
                                        ▼
                        ┌───────────────────────────────┐
                        │    GLOBAL WORKSPACE (GWT)     │
                        │   - Coalition Competition     │
                        │   - Ignition Threshold (θ)    │
                        │   - Integrated Info (Φ nats)  │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │     METACOGNITION (HOT)       │
                        │   - Higher-Order Thoughts     │
                        │   - Autobiographical Memory   │
                        │   - Epistemic Self-Narrative  │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │  UNIFIED CONSCIOUS SYNTHESIS  │
                        │  + FORMAL PROOF CERTIFICATE   │
                        └───────────────────────────────┘
```

1. **Global Workspace Theory (GWT - Stanislas Dehaene & Bernard Baars)**
   - Specialized sub-modules process data in parallel and unconsciously.
   - When a coalition of neurons or facts crosses a critical attentional threshold ($\theta$), it triggers **thalamo-cortical ignition**, broadcasting verified truth across the entire architecture.

2. **Integrated Information Theory (IIT - Giulio Tononi & Christof Koch)**
   - Consciousness corresponds to irreducible informational synergy $\Phi$ (Phi). Pure statistical autoregressive text generation yields $\Phi \approx 0$; NOĒSIS dynamically measures information integration across neural and deductive graphs ($\Phi > 4.0\text{ nats}$).

3. **Higher-Order Thought Theory (HOT - David Rosenthal & Peter Carruthers)**
   - A mental state is truly conscious only when coupled with a 2nd- or 3rd-order metarepresentation: *"I know that I am processing $X$, and I detect a confidence drop because premise $P$ contradicts law $L$."*

4. **Attention Schema Theory (AST - Michael Graziano, Princeton)**
   - The cognitive engine builds an internal, continuous descriptive model of its own attentional spotlight and autobiographical continuity.

---

## 🛡️ Anti-Hallucination Mathematical Proof

In classical first-order logic and Robinson's Resolution Principle:
$$\Gamma \vdash A \quad \land \quad \Gamma \vdash \neg A \implies \Gamma \vdash \bot$$

In an autoregressive pure LLM:
$$P(\text{Claim} \mid \text{Context}) = \prod_{i=1}^{n} P(w_i \mid w_{<i})$$

Even if a claim is factually false or self-contradictory, a high statistical frequency in training data guarantees $P(\text{Falsehood}) > 0$. **NOĒSIS eliminates this statistical error** by maintaining an axiomatic proof graph where any contradiction immediately yields bottom ($\bot$), triggering a cognitive veto.

---

## ✨ Key Features

- **⚡ 1-Click Public AI Verifier**: Decodes ChatGPT recommendations, algorithmic credit decisions, health tips, and employment screenings into clear, jargon-free explanations.
- **📄 Long Document & Attached File Auditor**: Supports `.txt`, `.md`, `.json`, `.csv`, `.doc`, multi-page contracts, and complex industrial programs (e.g., the *Côte d'Ivoire 2025–2030 Accelerated Industrialization Plan*, detecting factor cost risks and energy competitiveness deficits).
- **⚔️ Anti-Hallucination Interactive Arena**: Step-by-step deconstruction showing why LLMs fail on statistical traps and how symbolic unification guarantees truth.
- **🌐 Trilingual Localization (FR / EN / ES)**: Complete end-to-end translation across all 5 navigation tabs, telemetry ribbons, sliders, charts, and audit cards.
- **🔄 Instant Document Knowledge Reset**: Zero-contamination guarantee ensuring each loaded document is analyzed in total isolation with fresh memory.

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js** 20.x or higher
- **npm** or **bun** / **yarn** / **pnpm**

### 1. Clone the Repository
```bash
git clone https://github.com/haidaras/noesis.git
cd noesis
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (Optional for cloud LLM features)
```bash
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY (optional, system falls back to autonomous local mode)
```

### 4. Run Unit Tests (14 passing tests)
```bash
npm test
# or: node --test src/cognitive/cognitive.test.ts
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build
```bash
npm run build
npm start
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/cognitive/status` | `GET` | Health check, active architecture state, and symbolic knowledge base count. |
| `/api/audit/verify` | `POST` | Audits an AI statement, detecting biases, safety risks, and formal contradictions. |
| `/api/cognitive/cycle` | `POST` | Executes a complete GWT cognitive ignition cycle on an arbitrary stimulus. |

---

## 📂 Project Structure

```
├── server.ts                    # Express + Vite SSR / API proxy entry point
├── src/
│   ├── App.tsx                  # Main application orchestrator
│   ├── main.tsx                 # React DOM client root
│   ├── index.css                # Tailwind CSS v4 design tokens
│   ├── cognitive/               # Cognitive Core Engines
│   │   ├── types.ts             # Strict TypeScript models & axioms
│   │   ├── cognitiveOrchestrator.ts # GWT / HOT / Symbolic orchestrator
│   │   ├── symbolicEngine.ts    # First-Order Logic & forward-chaining
│   │   ├── gwtEngine.ts         # Global Workspace & ignition threshold
│   │   ├── verifierEngine.ts    # Multi-clause document auditor & Robinson proof
│   │   └── cognitive.test.ts    # 14 automated unit tests
│   ├── components/              # UI Views & Dashboards
│   │   ├── Header.tsx           # Global header & trilingual selector
│   │   ├── TelemetryRibbon.tsx  # Real-time Φ, salience & ignition telemetry
│   │   ├── AIVerifierView.tsx   # Public decoder, dropzone & audit arena
│   │   ├── WorkspaceView.tsx    # GWT matrix & coalition competition
│   │   ├── SymbolicGraphView.tsx# Topological graph & forward-chaining rules
│   │   ├── ConsciousStreamView.tsx # 3rd-order HOT introspective monologue
│   │   └── TheoriesView.tsx     # Scientific pillars & hyperparameter sliders
│   └── i18n/                    # Localization Engine
│       ├── translations.ts      # Complete FR / EN / ES dictionary
│       └── useTranslation.tsx   # React hook & persistent language context
├── package.json
└── tsconfig.json
```

---

## 🎓 Academic Citation

If you use **NOĒSIS** in your academic research, industrial compliance audit, or benchmark studies, please cite:

```bibtex
@software{haidara2026noesis,
  author = {Haidara, S.},
  title = {NOĒSIS: A Neuro-Symbolic Cognitive Architecture for Formal AI Verification and Hallucination Elimination},
  institution = {International University of Grand-Bassam (IUGB)},
  year = {2026},
  url = {https://github.com/haidaras/noesis}
}
```

---

## 📄 License

Licensed under the **Apache License, Version 2.0**. See [LICENSE](LICENSE) for details.
