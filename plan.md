# Plan - AgriDirect Marketplace Agricole Cameroun

## Contexte
Création d'un site web marketplace agricole B2B/B2C pour le Cameroun nommé **"AgriDirect"". Le site connecte directement les producteurs ruraux (cacao, café, fruits, légumes, volailles) avec les acheteurs urbains (restaurants, supermarchés, ménages). Design mobile-first, bilingue FR/EN, SEO optimisé.

## Fonctionnalités Clés
1. Catalogue produits avec photos et prix dynamiques par saison
2. Géolocalisation GPS des producteurs sur carte interactive
3. Système de commande avec panier
4. Paiement intégré MTN MoMo et Orange Money avec escrow sécurisé
5. Système de notation et avis
6. Traçabilité par QR code (origine, date récolte, certifications bio)
7. Dashboard producteur avec analytics de ventes
8. Chat intégré entre acheteur et vendeur
9. Livraison via partenariat transporteurs locaux

## Livrables
- Maquette Figma interactive
- Code source React/Node.js
- Documentation API RESTful

## Stages

### Stage 1 — Design (SubAgent: Designer)
- Skill: vibecoding-webapp-swarm
- Charge: Produire design.md avec le Design PRD complet du marketplace
- Sortie: design.md dans /mnt/agents/output/design/design.md

### Stage 2 — Technical Planning (SubAgent: Tech-Lead)
- Skill: vibecoding-webapp-swarm
- Charge: Produire tech-spec.md avec plan technique détaillé
- Entrée: design.md du Stage 1
- Sortie: tech-spec.md dans /mnt/agents/output/tech-spec.md

### Stage 3 — Asset Production (SubAgent: Asset-Manager)
- Skill: vibecoding-webapp-swarm
- Charge: Générer toutes les images nécessaires (produits agricoles, bannières, avatars producteurs, etc.)
- Entrée: design.md du Stage 1
- Sortie: Assets dans /mnt/agents/output/assets/

### Stage 4 — Web Development (SubAgent: Web-Developer)
- Skill: vibecoding-webapp-swarm
- Charge: Développer le site React complet
- Entrée: design.md + tech-spec.md + assets
- Sortie: Code source dans /mnt/agents/output/my-app/

### Stage 5 — Build & Deploy
- Charge: Build et déploiement du site
- Entrée: Code source du Stage 4
- Sortie: URL déployée
