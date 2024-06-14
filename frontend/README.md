ÀIRNEIS - E-Commerce Backend API
Introduction
ÀIRNEIS est une application mobile de commerce électronique offrant une expérience utilisateur optimisée pour l'achat de meubles conçus par des designers écossais. Le projet est divisé en deux parties : le backend, géré avec Django et Django REST framework, et le frontend, développé avec React. Ensemble, ces composants permettent de gérer les opérations de commerce électronique, de la navigation des produits à la gestion des commandes et des utilisateurs.

Fonctionnalités Principales
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

Backend : Géré avec Django, il contient toutes les API et la logique de serveur.
Frontend : Développé avec React, il offre l'interface utilisateur de l'application.
Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre machine :

Python 3.8 ou supérieur
Node.js et npm
Un environnement virtuel Python (venv)
Installation
Suivez ces étapes pour configurer et lancer le projet.

Backend
Cloner le dépôt :

bash
Copier le code
git clone [https://github.com/yourusername/airneis-ecommerce-site.git](https://github.com/NNA-ali/airneis-ecommerce-site.git)
Remplacez yourusername par votre nom d'utilisateur GitHub.

Naviguer dans le répertoire backend :

bash
Copier le code
cd airneis-ecommerce-site/backend
Créer et activer un environnement virtuel :

bash
Copier le code
python -m venv venv
.\venv\Scripts\activate  # Pour Windows
source venv/bin/activate  # Pour macOS/Linux
Installer les dépendances Python :

bash
Copier le code
pip install -r requirements.txt
Appliquer les migrations de la base de données :

bash
Copier le code
python manage.py migrate
Lancer le serveur de développement :

bash
Copier le code
python manage.py runserver
Frontend
Ouvrez un nouveau terminal pour lancer le frontend :

Naviguer dans le répertoire frontend :

bash
Copier le code
cd ../frontend
Installer les dépendances npm :

bash
Copier le code
npm install
Lancer le serveur de développement React :

bash
Copier le code
npm run dev
Utilisation
Backend : Le serveur backend devrait maintenant fonctionner sur http://localhost:8000/.
Frontend : L'application frontend devrait être accessible sur http://localhost:3000/.
Vous pouvez ouvrir votre navigateur et accéder à l'application via l'URL fournie pour explorer les fonctionnalités.
pour lancer le back-office : [text](https://airneis-ecommerce-api.up.railway.app/admin/)