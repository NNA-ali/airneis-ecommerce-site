# ÀIRNEIS - E-Commerce Backend API
## Introduction
ÀIRNEIS est une application mobile de commerce électronique offrant une expérience utilisateur optimisée pour l'achat de meubles conçus par des designers écossais. Le projet est divisé en deux parties : le backend, géré avec Django et Django REST framework, et le frontend, développé avec React. Ensemble, ces composants permettent de gérer les opérations de commerce électronique, de la navigation des produits à la gestion des commandes et des utilisateurs.

## Fonctionnalités Principales
Pour les Utilisateurs :
Navigation et Recherche : Trouvez des produits facilement grâce à une barre de recherche permettant de filtrer par nom, description, matériau, prix ou catégorie.
Catalogue de Produits : Explorez des catégories de produits, consultez les détails des articles et visualisez des produits similaires.
Gestion du Panier et Commande : Ajoutez des articles à votre panier, consultez le récapitulatif de votre panier et finalisez vos achats via un processus sécurisé.
Compte Utilisateur : Gérez vos comptes, suivez vos commandes passées, connectez-vous et inscrivez-vous.
Multilingue et Accessibilité : Application disponible en plusieurs langues et conforme aux normes d'accessibilité pour tous les utilisateurs.
Pour les Administrateurs :
Backoffice : Gérez le contenu de l'application, les produits, les catégories et les commandes à travers une interface web dédiée.
Sécurité : Des mesures rigoureuses pour protéger les données des utilisateurs et les transactions financières.
Structure du Projet
Le projet est divisé en deux répertoires principaux :

- Backend : Géré avec Django, il contient toutes les API et la logique de serveur.
- Frontend : Développé avec React, il offre l'interface utilisateur de l'application.


## Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Python 3.8 ou supérieur
- Node.js et npm
- Un environnement virtuel Python (venv)


## Installation
Suivez ces étapes pour configurer et lancer le projet.

### Backend
#### Cloner le dépôt :

Copier le code
```bash
git clone https://github.com/NNA-ali/airneis-ecommerce-site.git
```

Remplacez yourusername par votre nom d'utilisateur GitHub.

#### Naviguer dans le répertoire backend :

Copier le code
```bash
cd airneis-ecommerce-site/backend
```

#### Créer et activer un environnement virtuel :

Copier le code
```bash
python -m venv venv
.\venv\Scripts\activate  # Pour Windows
source venv/bin/activate  # Pour macOS/Linux
```

#### Installer les dépendances Python :

Copier le code
```bash
pip install -r requirements.txt
```

#### Appliquer les migrations de la base de données :

Copier le code
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Lancer le serveur de développement :

Copier le code
```bash
python manage.py runserver
```

### Frontend
Ouvrez un nouveau terminal pour lancer le frontend :

Naviguer dans le répertoire frontend :

Copier le code
```bash
cd ../frontend
```

#### Installer les dépendances npm :

Copier le code
```bash
npm install
```

#### Lancer le serveur de développement React :

Copier le code
```bash
npm run dev
```

### Utilisation
- __Backend__ : Le serveur backend devrait maintenant fonctionner sur http://localhost:8000/.
- __Frontend__ : L'application frontend devrait être accessible sur http://localhost:3000/.

Vous pouvez ouvrir votre navigateur et accéder à l'application via l'URL fournie pour explorer les fonctionnalités.
pour lancer le back-office : [Cliquer ici](http://127.0.0.1:8000/admin/)

pour creer un superuser pour le back-office :

Copier le code
```bash
python manage.py createsuperuser 
```
suivi d'un e-mail et mot de passe
## Configuration des Variables d'Environnement
## Configuration des Variables d'Environnement

Avant de démarrer l'application, vous devez configurer les variables d'environnement en créant un fichier `.env` dans le répertoire `backend`. Suivez les étapes ci-dessous :

1. **Créer un fichier `.env` dans le répertoire `backend` :**
   - Dans le répertoire `backend`, créez un fichier nommé `.env`.

2. **Ajouter les variables d'environnement suivantes dans le fichier `.env` :**
   ```bash
   STRIPE_PUBLIC_KEY=pk_test_51PCeRQH1sta5VsnZ8ugCyuyAzwSaz5RIOAUi9R6kyif22gu2IudnTeVhCpitJsHXDEXMcKn2FdRo6PkN2yR881MD00R9NtcCAC
   STRIPE_SECRET_KEY=sk_test_51PCeRQH1sta5VsnZNRXTbW9jrDoPSMX4ufLQ9HdlNXnjnxZin1S9C9a85JDrDefgmblFRm1uuqOfRshEbv5GJqr500Oymcrr4V
   MAILGUN_API_KEY=9ee954fa9a4b0e52a0f4e2de120741fb-ed54d65c-86e0f37e
   MAILGUN_SENDER_DOMAIN=sandbox164508701d4c4c3c8097db318e748c2a.mailgun.org
   FROM_EMAIL=abdelaaliiqbal@gmail.com
   EMAIL_BACKEND=anymail.backends.mailersend.EmailBackend
   DEFAULT_FROM_EMAIL=abdelaaliiqbal@gmail.com
   SERVER_EMAIL=abdelaaliiqbal@gmail.com
   AWS_ACCESS_KEY_ID=AKIAZI2LH5JWPZ5I5O6J
   AWS_SECRET_ACCESS_KEY=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
   AWS_STORAGE_BUCKET_NAME=airneis-ecommerce-bucket
   DATABASE_URL=postgresql://postgres:BUUyPcfAehrixSuJaxWwrXgXZWHHhobq@roundhouse.proxy.rlwy.net:18059/railway
