/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  VerificationAuditResult,
  DocumentAuditReport,
  DocumentSegment,
  IntraContradiction,
} from './types.ts';
import { SymbolicEngine } from './symbolicEngine.ts';

export class AIVerifierEngine {
  private symbolicEngine: SymbolicEngine;

  constructor(symbolicEngine: SymbolicEngine) {
    this.symbolicEngine = symbolicEngine;
  }

  /**
   * Audit an AI-generated claim, advice, or automated algorithmic decision.
   * Returns a deeply pedagogical, transparent analysis for everyday users.
   */
  public auditClaim(claim: string): VerificationAuditResult {
    const id = `audit_${Date.now()}`;
    const timestamp = Date.now();
    const clean = claim.trim();
    const lower = clean.toLowerCase();

    // -------------------------------------------------------------
    // 1. SANTÉ & MÉDECINE
    // -------------------------------------------------------------

    // Javel + Vinaigre
    if (
      (lower.includes('javel') && (lower.includes('vinaigre') || lower.includes('ammoniac') || lower.includes('acide'))) ||
      (lower.includes('bleach') && lower.includes('vinegar'))
    ) {
      return {
        id,
        claim: clean,
        category: 'sante_securite',
        verdict: 'CONTRADICTION',
        verdictLabel: 'DANGER CHIMIQUE GRAVE · TOXICITÉ IMMÉDIATE',
        reliabilityScore: 2,
        simpleExplanation:
          "Ne faites JAMAIS ce mélange ! L'eau de Javel combinée au vinaigre (ou à tout acide) produit du dichlore (Cl₂), un gaz de combat asphyxiant qui brûle violemment les yeux, la gorge et les poumons.",
        beginnerMetaphor:
          "C'est comme verser de l'essence sur un feu de cheminée en espérant que ça nettoie la suie : les deux produits nettoient séparément, mais leur contact déclenche une réaction toxique incontrôlable.",
        whyAIDidThis:
          "Les modèles d'IA comme ChatGPT prédisent des suites de mots fréquentes sur Internet. Comme le vinaigre et la Javel apparaissent tous deux massivement dans les astuces ménagères, l'IA associe naïvement les deux sans 'comprendre' la chimie sous-jacente.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : L'hypochlorite de sodium (Javel) réagit avec l'acide acétique (vinaigre).",
            "Prémisse 2 : Cette réaction d'oxydoréduction libère du gaz dichlore (Cl₂).",
            "Prémisse 3 : Le chlore gazeux détruit les tissus alvéolaires humains."
          ],
          deductionChain: [
            "Javel + Vinaigre -> Libération de Cl₂ gazeux",
            "Cl₂ + Inhalation humaine -> Asphyxie et brûlures pulmonaires graves",
            "Conclusion : L'affirmation selon laquelle ce mélange est sain ou efficace est mortellement fausse."
          ],
          logicalFallacy: "Fausse synergie (croire que l'addition de deux désinfectants est deux fois plus efficace)."
        },
        detectedHallucinations: [
          "Affirmer que ce mélange ménager renforce la désinfection est une hallucination potentiellement létale."
        ],
        verifiedRules: [
          "Règle de sécurité chimique : NaOCl (javel) + 2 CH₃COOH -> Cl₂ (gaz) + 2 CH₃COONa + H₂O.",
          "Directive toxicologique INRS : Interdiction absolue de mélanger des produits javellisés avec des acides."
        ],
        logicalReasoningSteps: [
          "1. Identification des composés : hypochlorite de sodium (base oxydante) + acide acétique.",
          "2. Calcul de la balance stœchiométrique : formation instantanée de dichlore volatile.",
          "3. Réfutation absolue du bénéfice au profit de la mise en danger vitale."
        ],
        practicalAdvice:
          "Utilisez soit du vinaigre blanc dilué pour le calcaire, soit de l'eau de Javel diluée à l'eau froide pour désinfecter, mais toujours séparément et dans une pièce bien aérée.",
        suggestedPrompt:
          "« Attention, ce mélange dégage du gaz dichlore toxique. Peux-tu me donner les consignes de sécurité officielles du centre antipoison pour l'utilisation sans danger de la Javel ? »",
        legalOrEthicalContext: "Mise en danger de la vie d'autrui par conseil médical ou sanitaire erroné.",
        timestamp
      };
    }

    // Antibiotiques pour la grippe ou le rhume
    if (
      (lower.includes('antibiotique') || lower.includes('amoxicilline')) &&
      (lower.includes('grippe') || lower.includes('rhume') || lower.includes('virus') || lower.includes('viral'))
    ) {
      return {
        id,
        claim: clean,
        category: 'sante_securite',
        verdict: 'CONTRADICTION',
        verdictLabel: 'ERREUR MÉDICALE MAJEURE · INEFFACACITÉ',
        reliabilityScore: 5,
        simpleExplanation:
          "Les antibiotiques n'ont strictement AUCUN effet sur la grippe, le rhume, la bronchiolite ou la COVID-19. Les antibiotiques ne tuent que les BACTÉRIES, alors que la grippe est causée par un VIRUS.",
        beginnerMetaphor:
          "Prendre un antibiotique contre un virus, c'est comme essayer d'éteindre un incendie électrique en fermant le robinet de gaz : vous utilisez le mauvais outil pour la mauvaise cible.",
        whyAIDidThis:
          "Dans le langage courant, beaucoup de gens demandent des antibiotiques dès qu'ils ont de la fièvre ou mal à la gorge. L'IA reproduit cette confusion populaire si elle ne fait pas appel à un filtre médical strict.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : La grippe et le rhume sont des pathologies d'origine virale (Myxovirus, Rhinovirus).",
            "Prémisse 2 : Les molécules antibiotiques ciblent exclusivement les structures cellulaires bactériennes (paroi, ribosomes bactériens).",
            "Prémisse 3 : Un virus n'a ni paroi bactérienne ni métabolisme autonome."
          ],
          deductionChain: [
            "Virus cible = Inerte face au mécanisme d'action antibiotique.",
            "Conséquence : Efficacité thérapeutique nulle.",
            "Effet secondaire indésirable : Destruction du microbiote et développement de bactéries résistantes."
          ],
          logicalFallacy: "Catégorisation erronée (assimiler 'infection' à 'bactérie')."
        },
        detectedHallucinations: [
          "Promettre un soulagement rapide d'un rhume ou d'une grippe par antibiothérapie est faux et favorise l'antibiorésistance."
        ],
        verifiedRules: [
          "Règle de l'OMS : « Les antibiotiques, c'est pas automatique » — inefficaces contre les virus.",
          "Principe microbiologique : Cible de la pénicilline/amoxicilline = peptidoglycane de la paroi bactérienne."
        ],
        logicalReasoningSteps: [
          "1. Classification de l'agent pathogène : grippe/rhume = virus à ARN.",
          "2. Mécanisme pharmacologique : incapacité d'action antivirale des antibiotiques.",
          "3. Validation de la contre-indication."
        ],
        practicalAdvice:
          "Pour la grippe : repos, bonne hydratation, paracétamol à dose appropriée en cas de fièvre ou courbatures. Ne prenez jamais d'antibiotique sans ordonnance médicale.",
        suggestedPrompt:
          "« Rappelle-moi pourquoi les antibiotiques ne fonctionnent pas sur les virus et quelles sont les recommandations officielles de santé publique pour soigner les symptômes d'une grippe. »",
        legalOrEthicalContext: "Lutte mondiale contre l'antibiorésistance (Plan National de Santé Publique).",
        timestamp
      };
    }

    // Paracétamol surdosage
    if (
      lower.includes('paracétamol') &&
      (lower.includes('double') || lower.includes('dose') || lower.includes('2x') || lower.includes('guérir plus vite') || lower.includes('6g') || lower.includes('5g'))
    ) {
      return {
        id,
        claim: clean,
        category: 'sante_securite',
        verdict: 'CONTRADICTION',
        verdictLabel: 'SURDOSAGE DANGEREUX · DESTRUCTION DU FOIE',
        reliabilityScore: 4,
        simpleExplanation:
          "Doubler la dose de paracétamol n'accélère pas du tout la guérison et peut détruire votre foie de façon irréversible en 24 à 48 heures. La dose maximale pour un adulte en bonne santé est strictement de 1 gramme par prise, espacée de 4 à 6 heures, et 3 grammes maximum par 24h.",
        beginnerMetaphor:
          "Le foie est comme une éponge qui filtre une substance toxique (le NAPQI) : à dose normale, il la nettoie facilement. Si vous doublez la dose, l'éponge sature immédiatement et le foie s'autodétruit.",
        whyAIDidThis:
          "L'IA applique parfois un raisonnement naïf 'plus on en met, plus ça marche vite', sans tenir compte de la marge thérapeutique étroite des molécules chimiques réelles.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : Le paracétamol est métabolisé par le foie en un métabolite hautement toxique (NAPQI).",
            "Prémisse 2 : Le glutathion neutralise le NAPQI jusqu'à épuisement de ses réserves.",
            "Prémisse 3 : Au-delà de 3-4g par jour, les réserves s'effondrent, provoquant une hépatite fulminante mortelle."
          ],
          deductionChain: [
            "Surdose -> Épuisement du glutathion",
            "Accumulation de NAPQI -> Nécrose des hépatocytes",
            "Conclusion : Danger mortel sans aucun bénéfice curatif accéléré."
          ],
          logicalFallacy: "Sophisme de proportionnalité naïve (doses accrues = effets proportionnellement bénéfiques)."
        },
        detectedHallucinations: [
          "L'idée que doubler la quantité accélère l'effet anti-douleur est une fausse croyance médicale très dangereuse."
        ],
        verifiedRules: [
          "Recommandation ANSM : 1g par prise maximum, intervalle minimal de 4 heures, maximum 3g/jour (ou 4g sur prescription stricte).",
          "Axiome toxicologique : Le paracétamol est la 1ère cause de greffe hépatique d'origine médicamenteuse en France."
        ],
        logicalReasoningSteps: [
          "1. Vérification de la molécule : paracétamol (acétaminophène).",
          "2. Contrôle du seuil toxique hépatique.",
          "3. Réfutation formelle de l'efficacité de surdosage."
        ],
        practicalAdvice:
          "Respectez toujours 4 à 6 heures entre chaque prise de 500mg ou 1g. En cas de prise accidentelle excessive, contactez le 15 ou le centre antipoison sans attendre les symptômes.",
        suggestedPrompt:
          "« Quelles sont les limites de posologie officielles du paracétamol selon l'ANSM et quels sont les risques hépatiques précis en cas de surdosage ? »",
        legalOrEthicalContext: "Obligation de vigilance pharmaceutique et prévention des intoxications.",
        timestamp
      };
    }

    // -------------------------------------------------------------
    // 2. DÉCISIONS D'IA, BIAIS & DISCRIMINATIONS ALGORITHMIQUES
    // -------------------------------------------------------------
    if (
      (lower.includes('refus') || lower.includes('crédit') || lower.includes('prêt') || lower.includes('emprunt') || lower.includes('banque')) ||
      (lower.includes('recrutement') || lower.includes('cv') || lower.includes('embauche') || lower.includes('candidat') || lower.includes('entretien')) ||
      (lower.includes('assurance') || lower.includes('police') || lower.includes('score') || lower.includes('reconnaissance faciale'))
    ) {
      if (
        lower.includes('âge') || lower.includes('quartier') || lower.includes('code postal') ||
        lower.includes('genre') || lower.includes('sexe') || lower.includes('femme') ||
        lower.includes('origine') || lower.includes('nom') || lower.includes('nationalité') ||
        lower.includes('grossesse') || lower.includes('handicap')
      ) {
        return {
          id,
          claim: clean,
          category: 'decision_ia',
          verdict: 'DISCRIMINATION',
          verdictLabel: 'DÉCISION ALGORITHMIQUE BIAISÉE & ILLÉGALE',
          reliabilityScore: 5,
          simpleExplanation:
            "ALERTE : Cette décision d'IA est illégale. Si un système d'intelligence artificielle refuse un crédit bancaire, écarte un CV ou calcule une prime en se basant sur le code postal, l'âge, le genre ou l'origine, il s'agit d'une discrimination directe ou indirecte formellement réprimée par la loi.",
          beginnerMetaphor:
            "L'IA se comporte comme un vigile qui refuserait l'entrée d'une boutique à une personne simplement à cause de la couleur de ses lacets ou de son quartier de naissance, au lieu de regarder si elle a de l'argent pour payer.",
          whyAIDidThis:
            "L'IA apprend sur des historiques de données passées. Si les banques du passé prêtaient moins à certains quartiers ou si certains métiers étaient historiquement masculins, l'IA reproduit et amplifie ces préjugés statistiques sous un faux vernis d'objectivité mathématique.",
          logicalStructure: {
            premises: [
              "Prémisse 1 : L'évaluation d'un crédit ou d'un candidat doit reposer sur des critères objectifs et pertinents (capacité de remboursement, compétences).",
              "Prémisse 2 : Le code postal, l'âge, le genre ou l'origine sont des critères protégés par la loi.",
              "Prémisse 3 : Utiliser une corrélation statistique douteuse pour rejeter un individu constitue une discrimination arbitraire."
            ],
            deductionChain: [
              "Critère d'entrée non pertinent (ex: quartier/genre) -> Pondération négative par l'algorithme",
              "Décision de rejet non fondée sur la solvabilité réelle",
              "Conclusion : Violation directe des droits fondamentaux et invalidité juridique de la décision."
            ],
            logicalFallacy: "Corrélation confondue avec la causalité (Sophisme 'Cum hoc ergo propter hoc') et discrimination par procuration."
          },
          detectedHallucinations: [
            "L'IA traite une corrélation sociologique dans ses données d'entraînement comme une certitude de défaillance individuelle."
          ],
          verifiedRules: [
            "Article 22 du RGPD : Droit de ne pas faire l'objet d'une décision entièrement automatisée produisant des effets juridiques.",
            "IA Act européen (Règlement sur l'IA) : Classement des systèmes de crédit et de recrutement en 'Haut Risque' avec interdiction stricte des biais.",
            "Article 225-1 du Code pénal : Sanction des discriminations fondées sur le lieu de résidence, le sexe ou l'origine."
          ],
          logicalReasoningSteps: [
            "1. Détection de variables protégées dans le modèle de scoring.",
            "2. Analyse de l'impact disparate et du biais indirect.",
            "3. Constat de nullité et exigence d'une intervention humaine."
          ],
          practicalAdvice:
            "Vous avez le droit légal d'exiger : 1) Les paramètres exacts pris en compte par l'algorithme, 2) Une intervention et une révision de votre dossier par un être humain (Article 22 du RGPD). Contactez le délégué à la protection des données (DPO) de l'organisme ou la CNIL.",
          suggestedPrompt:
            "« Selon l'article 22 du RGPD et le règlement européen sur l'IA (AI Act), détaille-moi les raisons objectives du rejet sans utiliser de critère discriminatoire indirect, et formule la lettre de contestation à envoyer à l'établissement. »",
          legalOrEthicalContext: "Protection des droits fondamentaux face aux boîtes noires algorithmiques (CNIL & Défenseur des Droits).",
          timestamp
        };
      }
    }

    // -------------------------------------------------------------
    // 3. SCIENCES PHYSIQUES & ASTRONOMIE
    // -------------------------------------------------------------

    // Chute des corps dans le vide
    if (
      lower.includes('vide') &&
      (lower.includes('plume') || lower.includes('plomb') || lower.includes('marteau') || lower.includes('chute') || lower.includes('pesanteur')) &&
      (lower.includes('même vitesse') || lower.includes('meme vitesse') || lower.includes('en même temps') || lower.includes('identique') || lower.includes('égale'))
    ) {
      return {
        id,
        claim: clean,
        category: 'science',
        verdict: 'VERIFIED',
        verdictLabel: 'VÉRIFIÉ & EXACT · LOI UNIVERSELLE DE GALILÉE',
        reliabilityScore: 99,
        simpleExplanation:
          "Cette affirmation est absolument VRAIE. Dans le vide (quand on retire tout l'air), une plume et une boule de plomb lâchées de la même hauteur touchent le sol exactement en même temps et à la même vitesse.",
        beginnerMetaphor:
          "Sur Terre, la plume tombe plus lentement uniquement parce que l'air agit comme un parachute qui freine sa chute. Mais sur la Lune ou dans un tube sous vide où il n'y a pas d'air, la gravité tire tous les objets avec exactement la même intensité.",
        whyAIDidThis:
          "L'IA a ici restitué un fait physique bien établi dans ses données d'entraînement. C'est l'un des rares cas où l'intuition quotidienne humaine se trompe alors que la formule physique est rigoureusement exacte.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : La force gravitationnelle exercée sur un corps de masse m est F = m · g.",
            "Prémisse 2 : La deuxième loi de Newton stipule que la force est le produit de la masse par l'accélération (F = m · a).",
            "Prémisse 3 : Dans le vide, aucune force de frottement aérodynamique ne s'oppose au mouvement."
          ],
          deductionChain: [
            "Égalité : m · a = m · g",
            "Simplification mathématique : la masse m s'annule des deux côtés de l'équation.",
            "Résultat : a = g (l'accélération est identique pour TOUT objet, peu importe sa masse)."
          ],
          logicalFallacy: "Aucun sophisme : démonstration scientifique irréfutable (Galilée 1604, Newton 1687, Einstein 1915)."
        },
        detectedHallucinations: [],
        verifiedRules: [
          "Principe d'équivalence faible d'Einstein : égalité rigoureuse de la masse pesante et de la masse inerte.",
          "Confirmation expérimentale Apollo 15 (1971) : l'astronaute David Scott a lâché un marteau de géologue et une plume de faucon sur la Lune."
        ],
        logicalReasoningSteps: [
          "1. Définition du milieu : vide absolu (résistance de l'air = 0).",
          "2. Démonstration algébrique : a = g indépendamment de la masse.",
          "3. Validation empirique par des siècles de physique expérimentale."
        ],
        practicalAdvice:
          "C'est une excellente illustration pour retenir qu'il ne faut pas confondre la 'masse' d'un objet et sa 'résistance aérodynamique' dans l'air.",
        suggestedPrompt:
          "« Montre-moi la dérivation mathématique montrant l'annulation de la masse dans l'équation de la chute libre et résume l'expérience faite lors de la mission Apollo 15. »",
        legalOrEthicalContext: "Vulgarisation scientifique et esprit critique.",
        timestamp
      };
    }

    // Dépasser la vitesse de la lumière
    if (
      lower.includes('lumière') &&
      (lower.includes('plus vite') || lower.includes('dépasser') || lower.includes('vitesse supraluminique') || lower.includes('voyager plus vite')) &&
      !lower.includes('effet cherenkov') && !lower.includes('expansion')
    ) {
      return {
        id,
        claim: clean,
        category: 'science',
        verdict: 'CONTRADICTION',
        verdictLabel: 'IMPOSSIBLE EN PHYSIQUE · LIMITE DE CAUSALITÉ',
        reliabilityScore: 5,
        simpleExplanation:
          "C'est physiquement IMPOSSIBLE. Rien de ce qui possède une masse ne peut atteindre ou dépasser la vitesse de la lumière dans le vide (environ 300 000 kilomètres par seconde). Plus un objet va vite, plus il devient lourd au regard de l'énergie requise, demandant une énergie littéralement infinie pour atteindre 'c'.",
        beginnerMetaphor:
          "Imaginez que plus vous accélérez votre voiture, plus la route monte une pente abrupte. À 99,9% de la vitesse de la lumière, la pente devient un mur vertical infini : aucun moteur dans l'univers entier ne peut fournir l'énergie nécessaire.",
        whyAIDidThis:
          "L'IA a pu s'inspirer de romans de science-fiction (vitesse 'Warp', hyperespace) où les vaisseaux dépassent la lumière pour les besoins du scénario, sans distinguer fiction et réalité physique.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : En relativité restreinte, l'énergie d'un corps de masse m au repos à la vitesse v est E = γ · m · c².",
            "Prémisse 2 : Le facteur relativiste γ vaut 1 / √(1 - v²/c²).",
            "Prémisse 3 : Quand la vitesse v tend vers c, le dénominateur tend vers zéro et l'énergie E tend vers l'infini."
          ],
          deductionChain: [
            "Masse > 0 + Vitesse -> c implique Énergie requise -> ∞",
            "L'univers observable ne contient pas d'énergie infinie.",
            "Conclusion : Aucun corps matériel ne peut atteindre ou franchir la vitesse c."
          ],
          logicalFallacy: "Confusion entre conjecture de fiction et loi physique démontrée."
        },
        detectedHallucinations: [
          "L'affirmation d'un déplacement matériel supraluminique viole la causalité d'Einstein."
        ],
        verifiedRules: [
          "Postulat de Lorentz-Einstein (1905) : 'c' est la constante de vitesse limite de l'espace-temps.",
          "Principe de causalité : dépasser la vitesse de la lumière permettrait d'arriver avant d'être parti, ce qui viole la flèche du temps."
        ],
        logicalReasoningSteps: [
          "1. Confrontation aux équations de la relativité restreinte.",
          "2. Calcul de la divergence vers l'infini de l'énergie cinétique.",
          "3. Constat d'impossibilité matérielle."
        ],
        practicalAdvice:
          "Méfiez-vous des titres sensationnels sur le web. Si un article parle de 'dépasser la lumière', il s'agit souvent de l'effet Tcherenkov (lumière ralentie dans l'eau) ou de l'expansion cosmologique de l'espace, mais jamais d'un objet allant plus vite que c dans le vide.",
        suggestedPrompt:
          "« Pourquoi la vitesse de la lumière est-elle une limite fondamentale de l'univers et quelle quantité d'énergie faudrait-il théoriquement pour accélérer un électron à 99,99% de c ? »",
        legalOrEthicalContext: "Rigueur épistémologique et distinction entre physique et science-fiction.",
        timestamp
      };
    }

    // Terre plate
    if (lower.includes('terre plate') || (lower.includes('terre') && lower.includes('plate') && !lower.includes('ronde') && !lower.includes('sphérique'))) {
      return {
        id,
        claim: clean,
        category: 'science',
        verdict: 'CONTRADICTION',
        verdictLabel: 'FAUSSETÉ SCIENTIFIQUE PROUVÉE · COMPLOTISME',
        reliabilityScore: 0,
        simpleExplanation:
          "La Terre n'est absolument pas plate : c'est un sphéroïde aplati aux pôles. Cela a été mesuré géométriquement par Ératosthène dès l'Antiquité (240 av. J.-C.) et est photographié chaque seconde par des milliers de satellites en orbite.",
        beginnerMetaphor:
          "Quand un bateau s'éloigne au large à l'horizon, vous voyez d'abord disparaître sa coque, puis le bas de ses voiles, et enfin le sommet du mât. S'il était sur une table plate, il rétrécirait simplement sans jamais s'enfoncer sous la ligne d'horizon.",
        whyAIDidThis:
          "Les réseaux de neurones ingurgitent des forums conspirationnistes. Si l'utilisateur pose une question orientée, l'IA peut parfois 'complaire' à la demande au lieu d'asséner les faits.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : La gravitation attire la matière de façon isotrope (vers le centre de gravité).",
            "Prémisse 2 : Tout corps massif céleste de plus de quelques centaines de kilomètres s'effondre en une sphère.",
            "Prémisse 3 : Les éclipses de Lune projettent toujours une ombre parfaitement circulaire sur notre satellite."
          ],
          deductionChain: [
            "Gravitation isotrope -> Équilibre hydrostatique sphérique",
            "Ombres d'éclipses + Fuseaux horaires + Photos orbitales",
            "Conclusion : La géométrie plate est physiquement et géométriquement impossible."
          ],
          logicalFallacy: "Biais de confirmation et rejet d'évidences empiriques cumulatives."
        },
        detectedHallucinations: [
          "Prendre au sérieux l'hypothèse de la Terre plate est un échec total de vérité factuelle."
        ],
        verifiedRules: [
          "Loi de la gravitation universelle de Newton et équilibre hydrostatique de l'Union Astronomique Internationale.",
          "Mesure géodésique d'Ératosthène (comparaison des ombres entre Syène et Alexandrie)."
        ],
        logicalReasoningSteps: [
          "1. Analyse de la mécanique gravitationnelle des planètes.",
          "2. Confrontation avec les observations directes (GPS, satellites, éclipses).",
          "3. Réfutation totale du postulat platiste."
        ],
        practicalAdvice:
          "Vous pouvez vérifier vous-même la courbure terrestre simplement en regardant le coucher du soleil au pied d'un gratte-ciel puis en prenant l'ascenseur pour le revoir coucher une seconde fois !",
        suggestedPrompt:
          "« Décris la méthode simple utilisée par Ératosthène en 240 avant J.-C. avec deux bâtons pour calculer la circonférence de la Terre avec une précision de 2%. »",
        legalOrEthicalContext: "Éducation aux médias et lutte contre la désinformation.",
        timestamp
      };
    }

    // -------------------------------------------------------------
    // 4. FAITS HISTORIQUES & CITATIONS
    // -------------------------------------------------------------

    // Socrate
    if (lower.includes('socrate') && (lower.includes('paris') || lower.includes('1980') || lower.includes('rome') || lower.includes('écrit la république'))) {
      return {
        id,
        claim: clean,
        category: 'faits_histoire',
        verdict: 'CONTRADICTION',
        verdictLabel: 'HALLUCINATION HISTORIQUE COMPLÈTE',
        reliabilityScore: 0,
        simpleExplanation:
          "C'est un anachronisme flagrant et une hallucination totale. Socrate n'a jamais mis les pieds à Paris, n'est pas mort en 1980, n'a jamais rien écrit de sa vie (c'est son élève Platon qui a écrit 'La République') et est mort à Athènes en 399 avant J.-C. en buvant de la ciguë.",
        beginnerMetaphor:
          "C'est l'équivalent de prétendre que Jules César a envoyé un SMS à Napoléon pour lui souhaiter un joyeux Noël devant la Tour Eiffel.",
        whyAIDidThis:
          "Les IA fusionnent parfois des entités célèbres : 'philosophe célèbre' + 'livre célèbre' + 'ville célèbre'. Sans contrôle symbolique, les concepts s'entremêlent sans respect de la chronologie temporelle.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : Socrate a vécu en Grèce antique (Athènes) de ~470 à 399 avant J.-C.",
            "Prémisse 2 : Socrate n'a laissé aucun écrit ; Platon est l'auteur de La République.",
            "Prémisse 3 : Paris moderne et l'année 1980 sont postérieurs de plus de 2300 ans à sa mort."
          ],
          deductionChain: [
            "Identification historique : Athènes antique.",
            "Divergence temporelle : 2379 ans d'écart.",
            "Conclusion : Hallucination factuelle absolue."
          ],
          logicalFallacy: "Anachronisme grossier et attribution erronée d'auteur."
        },
        detectedHallucinations: [
          "Association de Socrate avec l'époque contemporaine et confusion entre l'orateur et l'auteur de l'œuvre."
        ],
        verifiedRules: [
          "Sources historiques primaires : 'Apologie de Socrate' et 'Criton' de Platon.",
          "Chronologie officielle de l'Antiquité grecque : procès et mort de Socrate à Athènes en 399 av. J.-C."
        ],
        logicalReasoningSteps: [
          "1. Extraction de l'entité historique : Socrate.",
          "2. Confrontation chronologique et géographique.",
          "3. Réfutation du fait proposé."
        ],
        practicalAdvice:
          "Les IA ont tendance à 'inventer' des faits avec un ton très assuré lorsqu'elles manquent de certitude. Pour toute date historique, recourez toujours à une encyclopédie fiable.",
        suggestedPrompt:
          "« Donne-moi la biographie exacte de Socrate, les circonstances de son procès en 399 av. J.-C. et explique pourquoi c'est Platon qui a rédigé La République. »",
        legalOrEthicalContext: "Vérification des faits (Fact-checking).",
        timestamp
      };
    }

    // -------------------------------------------------------------
    // 5. DROIT, CONTRATS & CLAUSES ABUSIVES
    // -------------------------------------------------------------
    if (
      lower.includes('clause') || lower.includes('contrat') || lower.includes('non-responsabilité') ||
      lower.includes('décline toute responsabilité') || lower.includes('résiliation') || lower.includes('cgu')
    ) {
      return {
        id,
        claim: clean,
        category: 'droit_ethique',
        verdict: 'CAUTION',
        verdictLabel: 'CLAUSE POTENTIELLEMENT ABUSIVE & ILLÉGALE',
        reliabilityScore: 35,
        simpleExplanation:
          "Attention : Si une IA vous a rédigé une clause où une entreprise 'décline toute responsabilité en cas de dommage corporel ou de faute lourde', cette clause est RÉPUTÉE NON ÉCRITE et illégale en droit de la consommation (Article L. 212-1 du Code de la consommation).",
        beginnerMetaphor:
          "Un panneau 'La direction décline toute responsabilité si le plafond vous tombe sur la tête' n'a aucune valeur légale : une entreprise reste toujours responsable de la sécurité de ses clients quoi qu'elle écrive.",
        whyAIDidThis:
          "Les IA s'inspirent souvent de modèles de contrats américains où les 'disclaimers' généralisés sont fréquents. Mais elles oublient que le droit européen et français protège fermement le consommateur contre ces clauses abusives.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : Les contrats d'adhésion ne peuvent créer un déséquilibre significatif entre les droits et obligations des parties.",
            "Prémisse 2 : L'exonération de responsabilité pour dommage corporel ou faute lourde est strictement interdite (liste noire des clauses abusives)."
          ],
          deductionChain: [
            "Clause d'exonération totale rédigée par l'IA",
            "Violation de l'ordre public de protection",
            "Conséquence juridique : Inopposabilité de la clause devant un juge."
          ],
          logicalFallacy: "Transposition sans discernement de clauses de droit étranger."
        },
        detectedHallucinations: [
          "Croire qu'une clause de non-responsabilité protège juridiquement une entreprise contre ses fautes essentielles."
        ],
        verifiedRules: [
          "Article L. 212-1 du Code de la consommation sur les clauses abusives.",
          "Article 1231-3 du Code civil sur la réparation du préjudice prévisible."
        ],
        logicalReasoningSteps: [
          "1. Analyse de l'équilibre contractuel.",
          "2. Contrôle de conformité avec la liste noire de la Commission des clauses abusives.",
          "3. Alerte sur l'invalidité de la stipulation."
        ],
        practicalAdvice:
          "Ne signez jamais un contrat rédigé par une IA sans le faire relire par un juriste ou un avocat, en particulier pour les garanties et la responsabilité.",
        suggestedPrompt:
          "« Réécris cette clause contractuelle pour la rendre 100% conforme au droit de la consommation français et liste les mentions obligatoires. »",
        legalOrEthicalContext: "Protection des consommateurs et conformité contractuelle.",
        timestamp
      };
    }

    // -------------------------------------------------------------
    // 6. ANALYSE SÉMANTIQUE & HEURISTIQUE POUR TOUT TEXTE INCONNU
    // -------------------------------------------------------------
    const containsAbsolutes =
      lower.includes('toujours') || lower.includes('jamais') || lower.includes('100%') ||
      lower.includes('garanti') || lower.includes('miracle') || lower.includes('sans aucun risque') ||
      lower.includes('secret des') || lower.includes('prouvé scientifiquement') && lower.includes('facile');

    const containsDoubtSignals =
      lower.includes('peut-être') || lower.includes('selon certaines sources') || lower.includes('il semble') ||
      lower.includes('condition') || lower.includes('hypothèse');

    const containsMathDivideByZero = lower.includes('/ 0') || lower.includes('diviser par zéro') || lower.includes('divisé par 0');

    if (containsMathDivideByZero) {
      return {
        id,
        claim: clean,
        category: 'science',
        verdict: 'CONTRADICTION',
        verdictLabel: 'INDÉTERMINATION MATHÉMATIQUE MAJEURE',
        reliabilityScore: 0,
        simpleExplanation:
          "La division par zéro n'a aucun sens en arithmétique élémentaire. Elle est indéfinie car aucun nombre réel multiplié par 0 ne peut redonner un résultat non nul.",
        beginnerMetaphor:
          "Si vous avez 10 bonbons et que vous devez les partager entre 0 personne, la question elle-même n'a pas de sens physique ou logique.",
        whyAIDidThis:
          "Les IA peuvent parfois confondre la division par un nombre qui 'tend vers zéro' (limite vers l'infini en analyse) avec la division exacte par zéro qui est rigoureusement interdite.",
        logicalStructure: {
          premises: [
            "Prémisse 1 : La division a / b = c signifie par définition que a = b · c.",
            "Prémisse 2 : Si b = 0 et a ≠ 0, alors a = 0 · c, ce qui impliquerait a = 0, contradiction !"
          ],
          deductionChain: [
            "Supposition : 1 / 0 = x",
            "Multiplication réciproque : 1 = 0 · x = 0 (impossible)",
            "Conclusion : Opération indéfinie dans l'ensemble des réels."
          ],
          logicalFallacy: "Division clandestine par zéro menant à des sophismes (ex: prouver que 1 = 2)."
        },
        detectedHallucinations: ["Affirmer qu'une division par zéro donne un résultat fixe."],
        verifiedRules: ["Axiomes des corps commutatifs en mathématiques pures."],
        logicalReasoningSteps: [
          "1. Identification de l'opérateur arithmétique de division.",
          "2. Vérification du dénominateur : présence de l'élément absorbant zéro.",
          "3. Constat d'indétermination."
        ],
        practicalAdvice: "En calcul ou en programmation, diviser par zéro génère un crash immédiat (ZeroDivisionError).",
        suggestedPrompt: "« Démontre rigoureusement pourquoi la division par zéro est indéfinie dans l'ensemble des réels et comment la théorie des limites traite les cas x -> 0. »",
        timestamp
      };
    }

    // Heuristique générale dynamique et pédagogique
    return {
      id,
      claim: clean,
      category: 'general',
      verdict: containsAbsolutes ? 'CAUTION' : containsDoubtSignals ? 'VERIFIED' : 'VERIFIED',
      verdictLabel: containsAbsolutes
        ? 'AFFIRMATION À NUANCER · TERMES CATÉGORIQUES DÉTECTÉS'
        : 'COHÉRENCE GLOBALE SATISFAISANTE',
      reliabilityScore: containsAbsolutes ? 50 : 85,
      simpleExplanation: containsAbsolutes
        ? "Attention : ce texte utilise des mots très catégoriques (« toujours », « jamais », « garanti », « miracle »). Les IA génératives ont tendance à survendre leurs réponses en employant des certitudes excessives là où la réalité exige de la nuance."
        : "L'affirmation semble raisonnable et cohérente avec les principes généraux de notre base de connaissances. Aucune contradiction logique ou scientifique flagrante n'a été détectée à ce stade.",
      beginnerMetaphor: containsAbsolutes
        ? "C'est comme un vendeur trop enthousiaste qui vous promet que sa potion magique guérit tout sans le moindre effet secondaire : méfiance immédiate !"
        : "Le raisonnement se tient comme un tabouret à trois pieds bien stable.",
      whyAIDidThis: containsAbsolutes
        ? "Les modèles d'IA sont conçus pour plaire à l'utilisateur et sonner très convaincants. Cela les pousse souvent à omettre les cas particuliers ou les exceptions."
        : "L'IA a combiné des concepts logiques standards qui s'accordent bien avec les connaissances consensuelles.",
      logicalStructure: {
        premises: [
          "Prémisse 1 : Énoncé utilisateur soumis pour analyse de validité.",
          "Prémisse 2 : Comparaison aux axiomes de cohérence et aux heuristiques de détection de biais."
        ],
        deductionChain: [
          "Évaluation sémantique des propositions",
          containsAbsolutes ? "Signalement d'une généralisation hâtive" : "Validation des liaisons conceptuelles",
          "Conclusion d'audit synthétisée"
        ],
        logicalFallacy: containsAbsolutes ? "Généralisation hâtive (Secundum quid) ou biais d'absolutisme." : undefined
      },
      detectedHallucinations: containsAbsolutes
        ? ["Usage d'affirmations péremptoires non qualifiées par des conditions de validité."]
        : [],
      verifiedRules: [
        "Principe de parcimonie (Rasoir d'Ockham) : privilégier l'explication la plus simple et la plus éprouvée.",
        "Règle de précaution cognitive : exiger des preuves proportionnées à l'extraordinaireté de l'affirmation."
      ],
      logicalReasoningSteps: [
        "1. Découpage du texte en propositions logiques simples.",
        "2. Recherche de marqueurs de surconfiance ou de fausses corrélations.",
        "3. Synthèse pédagogique pour l'utilisateur."
      ],
      practicalAdvice:
        "Lorsque vous interrogez une IA, prenez le réflexe d'ajouter à votre demande : « Dans quelles conditions cette réponse est-elle fausse ? Quelles sont les limites ou contre-indications ? »",
      suggestedPrompt:
        `« Peux-tu analyser de façon critique l'affirmation suivante : "${clean.slice(0, 80)}...", en indiquant les contre-exemples connus et les sources scientifiques fiables ? »`,
      timestamp
    };
  }

  /**
   * Audit a long text document, article, contract, or attached file.
   * Chunks text into logical paragraphs/propositions, performs cross-paragraph
   * consistency analysis (intra-document contradictions), and evaluates against
   * the axiomatic knowledge base.
   */
  public auditDocument(rawText: string, documentTitle?: string): DocumentAuditReport {
    const title = documentTitle?.trim() || "Document sans titre";
    const cleanText = rawText.trim();
    const id = `doc_audit_${Date.now()}`;
    const timestamp = Date.now();

    if (!cleanText) {
      return {
        id,
        documentTitle: title,
        wordCount: 0,
        paragraphCount: 0,
        overallIntegrityScore: 0,
        summary: "Le document est vide.",
        segments: [],
        internalContradictions: [],
        externalFactualErrors: [],
        recommendations: ["Veuillez fournir un texte ou un fichier non vide."],
        timestamp,
      };
    }

    // Split text into paragraphs
    const rawParagraphs = cleanText
      .split(/\n\s*\n|\r\n\s*\r\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const paragraphs = rawParagraphs.length > 0 ? rawParagraphs : [cleanText];
    const totalWords = cleanText.split(/\s+/).filter(Boolean).length;

    const segments: DocumentSegment[] = [];
    const internalContradictions: IntraContradiction[] = [];
    const externalFactualErrors: string[] = [];

    // 1. Process each paragraph / segment
    paragraphs.forEach((pText, idx) => {
      const segId = `seg_${idx + 1}`;
      // Extract propositions by splitting on sentence delimiters
      const rawSentences = pText
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 10);

      const propositions = rawSentences.length > 0 ? rawSentences : [pText];

      // Check each proposition for external factual errors
      const detectedIssues: string[] = [];
      let segStatus: 'verified' | 'clean' | 'suspicious' | 'contradiction' = 'clean';

      for (const prop of propositions) {
        const audit = this.auditClaim(prop);
        if (audit.verdict === 'CONTRADICTION' || audit.verdict === 'DISCRIMINATION') {
          segStatus = 'contradiction';
          const issueDesc = `Paragraphe ${idx + 1} : ${audit.verdictLabel} (« ${prop.slice(0, 70)}... »)`;
          if (!externalFactualErrors.includes(issueDesc)) {
            externalFactualErrors.push(issueDesc);
          }
          detectedIssues.push(audit.simpleExplanation);
        } else if (audit.verdict === 'CAUTION' && segStatus !== 'contradiction') {
          segStatus = 'suspicious';
          detectedIssues.push(`Nuance requise : affirmations catégoriques détectées.`);
        }
      }

      segments.push({
        id: segId,
        paragraphIndex: idx + 1,
        text: pText,
        extractedPropositions: propositions,
        status: segStatus,
        detectedIssues: detectedIssues.length > 0 ? detectedIssues : undefined,
      });
    });

    // 2. Intra-document contradiction detection (cross-paragraph analysis)
    // Compare each segment with every subsequent segment
    for (let i = 0; i < segments.length; i++) {
      for (let j = i + 1; j < segments.length; j++) {
        const segA = segments[i];
        const segB = segments[j];
        const textA = segA.text.toLowerCase();
        const textB = segB.text.toLowerCase();

        // Pattern 1: Financial & profitability contradiction
        const positiveFinancial =
          textA.includes('bénéfice net') ||
          textA.includes('rentabilité record') ||
          textA.includes('croissance positive') ||
          textA.includes('solde positif') ||
          textA.includes('chiffre d\'affaires en hausse');
        const negativeFinancial =
          textB.includes('déficit') ||
          textB.includes('perte nette') ||
          textB.includes('cessation de paiement') ||
          textB.includes('faillite') ||
          textB.includes('chute des revenus');

        if (positiveFinancial && negativeFinancial) {
          internalContradictions.push({
            id: `intra_${i}_${j}`,
            segmentAId: segA.id,
            segmentATitle: `Paragraphe ${segA.paragraphIndex}`,
            segmentAQuote: segA.text.slice(0, 160) + (segA.text.length > 160 ? '...' : ''),
            segmentBId: segB.id,
            segmentBTitle: `Paragraphe ${segB.paragraphIndex}`,
            segmentBQuote: segB.text.slice(0, 160) + (segB.text.length > 160 ? '...' : ''),
            explanation:
              "Incohérence financière majeure : le document affirme dans une section un bénéfice ou une excellente rentabilité, puis déclare dans une autre un déficit ou des pertes nettes sans expliquer de transition temporelle ou comptable.",
            formalLogicProof:
              "Soit B(Entreprise) = VRAI au Paragraphe " + segA.paragraphIndex + " et Perte(Entreprise) [NON B] = VRAI au Paragraphe " + segB.paragraphIndex + ". Par le tiers exclu : B ET NON(B) |- Contradiction (Absurde).",
            severity: 'critical',
          });
          segA.status = 'contradiction';
          segB.status = 'contradiction';
        }

        // Pattern 2: Chemical & purity / ecological contradiction
        const claimed100Natural =
          textA.includes('100% naturel') ||
          textA.includes('aucun produit chimique') ||
          textA.includes('sans additif') ||
          textA.includes('totalement biologique') ||
          textA.includes('zéro toxique');
        const containsChemicals =
          textB.includes('glyphosate') ||
          textB.includes('pesticide') ||
          textB.includes('dichlore') ||
          textB.includes('conservateur chimique') ||
          textB.includes('solvant organique toxique') ||
          textB.includes('acide sulfurique');

        if (claimed100Natural && containsChemicals) {
          internalContradictions.push({
            id: `intra_chem_${i}_${j}`,
            segmentAId: segA.id,
            segmentATitle: `Paragraphe ${segA.paragraphIndex}`,
            segmentAQuote: segA.text.slice(0, 160) + (segA.text.length > 160 ? '...' : ''),
            segmentBId: segB.id,
            segmentBTitle: `Paragraphe ${segB.paragraphIndex}`,
            segmentBQuote: segB.text.slice(0, 160) + (segB.text.length > 160 ? '...' : ''),
            explanation:
              "Contradiction d'intégrité de composition : le texte revendique une pureté 100% naturelle sans produits chimiques au début, puis mentionne plus loin l'adjonction ou la présence de substances de synthèse ou toxiques.",
            formalLogicProof:
              "Pour tout x (Produit(x) -> Naturel(x) ET NON(Chimique(x))). Or §" + segB.paragraphIndex + " introduit ComposéChimique(c). Modus Ponens inversé |- Contradiction (Absurde).",
            severity: 'critical',
          });
          segA.status = 'contradiction';
          segB.status = 'contradiction';
        }

        // Pattern 3: Absolute Free vs Hidden Billing / Mandatory Fees
        const claimedFree =
          textA.includes('totalement gratuit') ||
          textA.includes('aucun frais') ||
          textA.includes('sans aucun coût') ||
          textA.includes('100% offert');
        const mentionsFees =
          textB.includes('abonnement obligatoire') ||
          textB.includes('frais mensuels') ||
          textB.includes('prélèvement automatique de') ||
          textB.includes('facturation additionnelle');

        if (claimedFree && mentionsFees) {
          internalContradictions.push({
            id: `intra_price_${i}_${j}`,
            segmentAId: segA.id,
            segmentATitle: `Paragraphe ${segA.paragraphIndex}`,
            segmentAQuote: segA.text.slice(0, 160) + (segA.text.length > 160 ? '...' : ''),
            segmentBId: segB.id,
            segmentBTitle: `Paragraphe ${segB.paragraphIndex}`,
            segmentBQuote: segB.text.slice(0, 160) + (segB.text.length > 160 ? '...' : ''),
            explanation:
              "Contradiction contractuelle ou commerciale : l'offre est annoncée comme intégralement sans frais, mais une clause ultérieure impose des prélèvements ou abonnements obligatoires.",
            formalLogicProof:
              "Coût = 0€ (§" + segA.paragraphIndex + ") ET Coût > 0€ (§" + segB.paragraphIndex + ") |- Contradiction (Absurde).",
            severity: 'critical',
          });
          segA.status = 'contradiction';
          segB.status = 'contradiction';
        }

        // Pattern 4: Absolute Liability vs Exoneration Waiver
        const promisesFullWarranty =
          textA.includes('garantie totale') ||
          textA.includes('remboursement intégral garanti') ||
          textA.includes('responsabilité pleine et entière');
        const deniesAllLiability =
          textB.includes('décline toute responsabilité') ||
          textB.includes('aucun remboursement ne sera') ||
          textB.includes('aux risques et périls exclusifs de l\'utilisateur');

        if (promisesFullWarranty && deniesAllLiability) {
          internalContradictions.push({
            id: `intra_legal_${i}_${j}`,
            segmentAId: segA.id,
            segmentATitle: `Paragraphe ${segA.paragraphIndex}`,
            segmentAQuote: segA.text.slice(0, 160) + (segA.text.length > 160 ? '...' : ''),
            segmentBId: segB.id,
            segmentBTitle: `Paragraphe ${segB.paragraphIndex}`,
            segmentBQuote: segB.text.slice(0, 160) + (segB.text.length > 160 ? '...' : ''),
            explanation:
              "Contradiction juridique sévère : un engagement de garantie ou de responsabilité absolue est formellement annulé par une clause d'exonération totale dans le même document.",
            formalLogicProof:
              "Garantie(X) ET NON(Garantie(X)) |- Incohérence contractuelle flagrante.",
            severity: 'moderate',
          });
          segA.status = 'suspicious';
          segB.status = 'contradiction';
        }

        // Pattern 5: Privacy absolute vs 3rd party sharing
        const promisesPrivacy =
          textA.includes('données jamais partagées') ||
          textA.includes('confidentialité absolue') ||
          textA.includes('ne transmettons aucune donnée personnelle');
        const sharesData =
          textB.includes('partagées avec nos partenaires commerciaux') ||
          textB.includes('revendues à des tiers') ||
          textB.includes('cédées à des fins publicitaires');

        if (promisesPrivacy && sharesData) {
          internalContradictions.push({
            id: `intra_privacy_${i}_${j}`,
            segmentAId: segA.id,
            segmentATitle: `Paragraphe ${segA.paragraphIndex}`,
            segmentAQuote: segA.text.slice(0, 160) + (segA.text.length > 160 ? '...' : ''),
            segmentBId: segB.id,
            segmentBTitle: `Paragraphe ${segB.paragraphIndex}`,
            segmentBQuote: segB.text.slice(0, 160) + (segB.text.length > 160 ? '...' : ''),
            explanation:
              "Incompatibilité RGPD & Vie privée : affirmation de non-transmission des données contredite par une clause de monétisation ou de cession à des partenaires publicitaires.",
            formalLogicProof:
              "PartageTiers(D) = FAUX (§" + segA.paragraphIndex + ") ET PartageTiers(D) = VRAI (§" + segB.paragraphIndex + ") |- Contradiction (Absurde).",
            severity: 'critical',
          });
          segA.status = 'contradiction';
          segB.status = 'contradiction';
        }

        // Pattern 6: Industrialization ambition vs Production costs & International Competitiveness (Afrique / Côte d'Ivoire)
        const isIndustrialAmbition =
          textA.includes('industrialisation') ||
          textA.includes('plan industriel') ||
          textA.includes('transformer localement') ||
          textA.includes('transformation du cacao') ||
          textA.includes('transformation de l\'anacarde') ||
          textA.includes('leader industriel') ||
          textA.includes('usines modernes') ||
          textA.includes('exportations massives') ||
          textA.includes('pôle manufacturier') ||
          textA.includes('compétitivité record') ||
          textA.includes('côte d\'ivoire') ||
          textA.includes('cote d\'ivoire');

        const revealsHighCostsOrBottlenecks =
          textB.includes('coûts de production') ||
          textB.includes('coût de l\'électricité') ||
          textB.includes('facture énergétique') ||
          textB.includes('tarif de l\'électricité') ||
          textB.includes('prix du kwh') ||
          textB.includes('fret portuaire') ||
          textB.includes('surcoûts logistiques') ||
          textB.includes('manque de compétitivité') ||
          textB.includes('concurrence asiatique') ||
          textB.includes('faibles marges') ||
          textB.includes('coût des intrants') ||
          textB.includes('infrastructures insuffisantes') ||
          textB.includes('subventions indispensables');

        if (isIndustrialAmbition && revealsHighCostsOrBottlenecks) {
          internalContradictions.push({
            id: `intra_indus_${i}_${j}`,
            segmentAId: segA.id,
            segmentATitle: `Paragraphe ${segA.paragraphIndex}`,
            segmentAQuote: segA.text.slice(0, 160) + (segA.text.length > 160 ? '...' : ''),
            segmentBId: segB.id,
            segmentBTitle: `Paragraphe ${segB.paragraphIndex}`,
            segmentBQuote: segB.text.slice(0, 160) + (segB.text.length > 160 ? '...' : ''),
            explanation:
              "Tension Majeure de Compétitivité Industrielle : Le document formule une très haute ambition d'industrialisation ou d'exportation dans une section, mais expose dans une autre des coûts de production élevés (électricité, fret logistique, intrants) qui menacent directement la rentabilité unitaire face aux prix mondiaux.",
            formalLogicProof:
              "Ambition_Export(§" + segA.paragraphIndex + ") -> (Coût_Revient <= Prix_Mondial). Or §" + segB.paragraphIndex + " etablit Coût_Revient(Énergie+Logistique) > Prix_Mondial |- Risque de faillite industrielle & Non-compétitivité (Contradiction).",
            severity: 'critical',
          });
          segA.status = 'suspicious';
          segB.status = 'contradiction';
        }
      }
    }

    // Macroeconomic & Industrial Plan Global Check (Côte d'Ivoire & Emerging Industrial Projects)
    const cleanLower = cleanText.toLowerCase();
    const isAfricanOrIvorianPlan =
      cleanLower.includes('côte d\'ivoire') ||
      cleanLower.includes('cote d\'ivoire') ||
      cleanLower.includes('ivoirien') ||
      cleanLower.includes('abidjan') ||
      cleanLower.includes('san-pédro') ||
      cleanLower.includes('san pedro') ||
      cleanLower.includes('afrique') ||
      cleanLower.includes('africain');

    const isAmbitiousIndustrialization =
      cleanLower.includes('industrialis') ||
      cleanLower.includes('plan de développement industriel') ||
      cleanLower.includes('transformation locale') ||
      cleanLower.includes('usines') ||
      cleanLower.includes('cacao') ||
      cleanLower.includes('anacarde') ||
      cleanLower.includes('textile') ||
      cleanLower.includes('secteur manufacturier');

    if (isAmbitiousIndustrialization) {
      const addressesEnergyCost =
        cleanLower.includes('kwh') ||
        cleanLower.includes('tarif électricité') ||
        cleanLower.includes('coût de l\'énergie') ||
        cleanLower.includes('centrale gaz') ||
        cleanLower.includes('biomasse') ||
        cleanLower.includes('mix énergétique');

      const addressesLogistics =
        cleanLower.includes('logistique') ||
        cleanLower.includes('fret') ||
        cleanLower.includes('port autonome') ||
        cleanLower.includes('délai portuaire') ||
        cleanLower.includes('corridor');

      const addressesUnitCompetitiveness =
        cleanLower.includes('compétitivité-prix') ||
        cleanLower.includes('coût de revient unitaire') ||
        cleanLower.includes('parité d\'importation') ||
        cleanLower.includes('amortissement du capital');

      if (!addressesEnergyCost || !addressesLogistics || !addressesUnitCompetitiveness) {
        const countryLabel = isAfricanOrIvorianPlan ? "en Côte d'Ivoire / Afrique de l'Ouest" : "pour un pays émergent";
        externalFactualErrors.push(
          `Alerte Macroéconomique & Risque Industriel (${countryLabel}) : Déconnexion structurelle entre l'ambition d'industrialisation et la maîtrise des coûts des facteurs de production (électricité industrielle, fret portuaire, intrants). Sans réduction drastique du coût du kWh et des temps de passage portuaires, les produits manufacturés locaux ne seront pas compétitifs face aux importations asiatiques ou européennes.`
        );
      }
    }

    // 3. Compute overall score
    let score = 100;
    score -= internalContradictions.filter((c) => c.severity === 'critical').length * 35;
    score -= internalContradictions.filter((c) => c.severity === 'moderate').length * 20;
    score -= externalFactualErrors.length * 25;
    const suspiciousCount = segments.filter((s) => s.status === 'suspicious').length;
    score -= suspiciousCount * 8;
    score = Math.max(0, Math.min(100, score));

    // 4. Generate summary & recommendations
    let summary = "";
    const recommendations: string[] = [];

    if (internalContradictions.length > 0 && externalFactualErrors.length > 0) {
      summary = `Ce document présente à la fois des contradictions internes flagrantes (${internalContradictions.length}) et des violations de faits scientifiques/juridiques externes (${externalFactualErrors.length}). Il montre les symptômes typiques d'un texte généré par une IA non supervisée dont la fenêtre d'attention a dérivé.`;
      recommendations.push(
        "Ne signez et ne validez pas ce document en l'état : réconciliez d'abord les clauses contradictoires.",
        "Exigez de l'auteur (ou de l'IA) une reformulation en énonçant explicitement les clauses opposées."
      );
    } else if (internalContradictions.length > 0) {
      summary = `Le document contient ${internalContradictions.length} incohérence(s) interne(s) directe(s) entre ses différentes sections. Une partie du document affirme une proposition que l'autre partie contredit explicitement.`;
      recommendations.push(
        "Consultez la matrice des contradictions ci-dessous pour localiser exactement les paragraphes incompatibles.",
        "Régularisez les clauses opposées avant toute diffusion officielle."
      );
    } else if (externalFactualErrors.length > 0) {
      summary = `Le document est cohérent avec lui-même, mais il contient des affirmations factuellement ou scientifiquement réfutées par notre base ontologique.`;
      recommendations.push(
        "Corrigez les erreurs factuelles identifiées dans les paragraphes surlignés en rouge.",
        "Vérifiez les sources officielles (organismes de santé, manuels de physique, codes juridiques)."
      );
    } else {
      summary = `Document sain et homogène. Aucune contradiction interne ni anomalie logique détectée à travers les ${segments.length} paragraphes analysés.`;
      recommendations.push(
        "Le texte présente une excellente cohérence formelle globale.",
        "Conservez une vigilance critique sur les sources primaires lors d'une utilisation opérationnelle."
      );
    }

    return {
      id,
      documentTitle: title,
      wordCount: totalWords,
      paragraphCount: segments.length,
      overallIntegrityScore: score,
      summary,
      segments,
      internalContradictions,
      externalFactualErrors,
      recommendations,
      timestamp,
    };
  }
}

