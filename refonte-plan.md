# Plan de Refonte Complete — AgriDirect PRO

## Objectif
Toutes les pages operationnelles, 5 profils utilisateurs, zero lien mort, design corrige

## Profils Utilisateurs
1. **VISITEUR** — Non connecte, peut voir catalogue, producteurs, map, trace QR
2. **ACHETEUR B2C** — Connecte, peut acheter, panier, chat, favoris, commandes, avis
3. **ACHETEUR B2B** — Connecte, devis, factures, gestion equipe, commandes groupes, rapports
4. **PRODUCTEUR** — Connecte, dashboard ventes, gestion produits, commandes, revenus, chat
5. **SUPER ADMIN** — Connecte, gestion utilisateurs, moderation, analytics globaux, validation producteurs

## Agents Parallel

### Agent 1 — Auth System & Guards
- AuthContext avec login/register/logout, role storage
- Pages: Login, Register, RoleSelection, ForgotPassword
- AuthGuard component, AdminGuard, ProducerGuard, BusinessGuard
- Demo accounts pour chaque profil (bouton "Se connecter en tant que...")
- Wire dans App.tsx les routes auth

### Agent 2 — Profils Acheteurs (B2C + B2B)
- BuyerProfile: commandes historique, favoris, adresses, parametres
- BusinessProfile: devis, factures, equipe, commandes groupes, rapports achats
- Mock data realiste pour chaque

### Agent 3 — Producteur + Super Admin
- ProducerManagement: gestion produits (CRUD), commandes recues, revenus detailles, inventaire
- AdminPanel: tableau de bord admin, liste utilisateurs avec filtres, moderation avis/produits, validation producteurs, analytics globaux, parametres plateforme

### Agent 4 — Corrections Design & Integration
- Fix Navbar: avatar selon profil, menu auth, dropdown profil, deconnexion
- Fix Layout: overflow-x-hidden, scrollbars, spacing
- Fix BottomNav: liens corrects par profil, etat actif
- Fix Footer: liens operationnels
- Fix App.tsx: toutes routes, guards, layout wrapping
- Fix pages existantes: liens morts, navigations, overflow
