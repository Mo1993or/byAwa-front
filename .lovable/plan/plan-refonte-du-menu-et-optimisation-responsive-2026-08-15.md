# Plan : Refonte du menu et optimisation responsive

Le but est de remplacer le menu actuel par une navigation horizontale moderne et d'optimiser l'expérience sur mobile et tablette (responsive).

## Modificiations UI

- **Header Horizontal** : 
    - Suppression du menu tiroir (Sheet/Hamburger) au profit d'une navigation horizontale fluide sur desktop.
    - Ajout d'une barre de catégories scrollable horizontalement sur mobile/tablette pour un accès rapide.
    - Réorganisation des éléments du header (Logo, Recherche, Compte, Panier) pour maximiser l'espace.
- **Optimisation Mobile/Tablette** :
    - La barre de recherche sera plus compacte sur mobile.
    - Les icônes d'action (Compte, Panier) seront plus accessibles.
    - Navigation par "puces" ou menu horizontal défilant pour les catégories sur les petits écrans.

## Détails Techniques

- Utilisation des classes Tailwind CSS `flex-nowrap`, `overflow-x-auto` et `scrollbar-hide` pour la navigation horizontale.
- Ajustement des breakpoints (`sm`, `md`, `lg`) dans `src/components/layout/Header.tsx`.
- Mise à jour du composant `Header` pour inclure la nouvelle structure de navigation.

## Fichiers à modifier

- `src/components/layout/Header.tsx` : Refonte complète de la structure JSX et des classes CSS.
- `src/styles.css` : Ajout d'utilitaires si nécessaire pour masquer la barre de défilement.
