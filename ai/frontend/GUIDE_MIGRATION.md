# Guide de migration étape par étape

## 🎯 Objectif

Ce guide vous accompagne dans la migration de votre ancien projet neuCampAI vers la nouvelle structure améliorée.

## 📋 Étapes de migration

### Étape 1 : Préparation

#### 1.1 Sauvegarde de l'ancien projet
```bash
# Créer une sauvegarde de votre projet actuel
cp -r neucampai_frontend neucampai_frontend_backup
```

#### 1.2 Vérification des dépendances
Assurez-vous d'avoir :
- Node.js 18+
- npm ou yarn
- Git (optionnel)

### Étape 2 : Installation de la nouvelle structure

#### 2.1 Copier les nouveaux fichiers
```bash
# Copier la nouvelle structure
cp -r neucampai_frontend_improved/* votre_projet/
```

#### 2.2 Installation des dépendances
```bash
cd votre_projet
npm install
```

### Étape 3 : Configuration

#### 3.1 Vérifier les fichiers de configuration

**vite.config.js** - Vérifiez que la configuration correspond à vos besoins :
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000, // Changez si nécessaire
    open: true
  }
})
```

**tailwind.config.js** - Configuration Tailwind optimisée :
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Personnalisations incluses
    },
  },
  plugins: [],
}
```

#### 3.2 Adapter les URLs d'API

Dans `src/hooks/useAuth.js`, modifiez les URLs selon votre backend :
```javascript
// Remplacez '/api/auth/login' par votre URL
const response = await fetch('VOTRE_URL_API/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(credentials),
});
```

### Étape 4 : Migration des données existantes

#### 4.1 Récupération des assets
```bash
# Copier vos images et assets existants
cp -r ancien_projet/public/* nouveau_projet/public/
cp -r ancien_projet/src/assets/* nouveau_projet/src/assets/
```

#### 4.2 Migration des styles personnalisés
Si vous avez des styles CSS personnalisés :
```bash
# Ajouter vos styles à index.css
cat ancien_projet/src/styles.css >> nouveau_projet/src/index.css
```

### Étape 5 : Adaptation du code

#### 5.1 Mise à jour des composants personnalisés

Si vous avez des composants spécifiques, adaptez-les à la nouvelle structure :

**Ancien format :**
```javascript
// ancien_projet/src/components/MonComposant.jsx
import React from 'react';

const MonComposant = () => {
  return <div>Mon composant</div>;
};

export default MonComposant;
```

**Nouveau format :**
```javascript
// nouveau_projet/src/components/MonComposant.jsx
import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const MonComposant = () => {
  return (
    <Card className="p-6">
      <div className="text-white">Mon composant</div>
      <Button>Action</Button>
    </Card>
  );
};

export default MonComposant;
```

#### 5.2 Utilisation du hook d'authentification

**Ancien format :**
```javascript
// Gestion manuelle de l'état
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

**Nouveau format :**
```javascript
// Utilisation du hook useAuth
import { useAuth } from '../hooks/useAuth';

const MonComposant = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Utilisation directe des méthodes
};
```

### Étape 6 : Tests et validation

#### 6.1 Test de démarrage
```bash
npm run dev
```

Vérifiez que l'application démarre sans erreur sur http://localhost:3000

#### 6.2 Test des fonctionnalités

**Checklist de validation :**
- [ ] Page de connexion s'affiche correctement
- [ ] Page d'inscription fonctionne
- [ ] Processus de mot de passe oublié
- [ ] Navigation entre les pages
- [ ] Responsive design sur mobile
- [ ] Thème sombre appliqué
- [ ] Animations et transitions

#### 6.3 Test des formulaires
- [ ] Validation des champs
- [ ] Messages d'erreur
- [ ] Soumission des formulaires
- [ ] Gestion des états de chargement

### Étape 7 : Personnalisation

#### 7.1 Adaptation du branding

**Logo et couleurs :**
```css
/* Dans src/index.css */
:root {
  --primary-color: #votre-couleur;
  --secondary-color: #votre-couleur;
}
```

**Textes et labels :**
Modifiez les textes dans les composants selon vos besoins.

#### 7.2 Configuration des fonctionnalités

**OAuth (optionnel) :**
```javascript
// Dans les composants auth, configurez vos clés OAuth
const handleGoogleSignIn = () => {
  // Votre logique Google OAuth
};
```

### Étape 8 : Déploiement

#### 8.1 Build de production
```bash
npm run build
```

#### 8.2 Test de la build
```bash
npm run preview
```

#### 8.3 Déploiement
Déployez le contenu du dossier `dist/` sur votre serveur.

## 🔧 Résolution des problèmes courants

### Problème : Erreurs de dépendances
**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problème : Styles non appliqués
**Solution :**
Vérifiez que Tailwind CSS est correctement configuré :
```bash
npm run build
# Vérifiez que les styles sont générés
```

### Problème : Erreurs de compilation
**Solution :**
Vérifiez les imports et la syntaxe :
```javascript
// Utilisez les imports corrects
import { Button } from '../ui/Button';
import { useAuth } from '../hooks/useAuth';
```

## 📞 Support

Si vous rencontrez des difficultés :

1. **Vérifiez** ce guide étape par étape
2. **Consultez** la documentation React et Vite
3. **Testez** sur un environnement propre
4. **Contactez** l'équipe de développement

## ✅ Checklist finale

- [ ] Ancien projet sauvegardé
- [ ] Nouvelle structure installée
- [ ] Dépendances installées
- [ ] Configuration adaptée
- [ ] URLs d'API mises à jour
- [ ] Assets migrés
- [ ] Composants adaptés
- [ ] Tests réalisés
- [ ] Personnalisation effectuée
- [ ] Build de production testée
- [ ] Déploiement réussi

**Félicitations ! Votre migration est terminée ! 🎉**

