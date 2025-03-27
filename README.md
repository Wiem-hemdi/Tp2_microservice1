# API Registre de Personnes avec Keycloak

Ce projet est une API Node.js permettant de gérer un registre de personnes avec des informations d'adresse. L'API utilise **SQLite** comme base de données et **Keycloak** pour la gestion de l'authentification et de la sécurité des routes.

## Prérequis

Avant de commencer, assure-toi d'avoir les éléments suivants installés sur ta machine :
- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [Postman](https://www.postman.com/) pour tester les routes API
- [Keycloak](https://www.keycloak.org/) pour la gestion de l'authentification

## Installation

1. Clone ce repository :
    ```bash
    git clone https://github.com/ton-utilisateur/ton-repository.git
    ```

2. Navigue dans le dossier du projet :
    ```bash
    cd ton-repository
    ```

3. Installe les dépendances :
    ```bash
    npm install
    ```

4. Télécharge et configure **Keycloak** avec ton fichier de configuration `keycloak-config.json` (voir [documentation Keycloak](https://www.keycloak.org/docs/latest/server_installation/#_installation)).

5. Crée la base de données SQLite avec la commande suivante dans ton terminal :
    ```bash
    node database.js
    ```

## Configuration de Keycloak

Assure-toi que **Keycloak** est installé et configuré correctement. Le fichier de configuration `keycloak-config.json` doit être présent à la racine du projet et contenir les paramètres de connexion à ton serveur Keycloak.

## Démarrer l'API

Pour démarrer l'API, exécute la commande suivante dans le terminal :
```bash
npm start

L'API sera disponible sur http://localhost:3000.

Routes API
L'API offre plusieurs routes pour gérer les personnes dans la base de données. Elle supporte les méthodes HTTP GET, POST, PUT et DELETE.

1. GET /personnes
Récupérer la liste de toutes les personnes enregistrées dans la base de données.

URL : http://localhost:3000/personnes

Méthode : GET

Réponse :

Code : 200 OK

Body : Liste des personnes sous format JSON.

2. GET /personnes/:id
Récupérer les détails d'une personne spécifique par son ID.

URL : http://localhost:3000/personnes/{id}

Méthode : GET

Réponse :

Code : 200 OK

Body : Détails de la personne sous format JSON.

3. POST /personnes
Ajouter une nouvelle personne avec son nom et son adresse.

URL : http://localhost:3000/personnes

Méthode : POST

Body (Exemple) :

json
Copier
Modifier
{
  "nom": "John",
  "adresse": "123 Rue de Paris"
}
Réponse :

Code : 201 Created

Body : La personne ajoutée, avec son ID.

4. PUT /personnes/:id
Mettre à jour les informations d'une personne (nom, adresse) par son ID.

URL : http://localhost:3000/personnes/{id}

Méthode : PUT

Body (Exemple) :

json
Copier
Modifier
{
  "nom": "John Updated",
  "adresse": "456 Rue de Lyon"
}
Réponse :

Code : 200 OK

Body : La personne mise à jour.

5. DELETE /personnes/:id
Supprimer une personne de la base de données par son ID.

URL : http://localhost:3000/personnes/{id}

Méthode : DELETE

Réponse :

Code : 200 OK

Body : Message de succès.

6. GET /secure
Route protégée par Keycloak. Seul un utilisateur authentifié peut y accéder.

URL : http://localhost:3000/secure

Méthode : GET

Authentification : Token JWT valide dans l'en-tête Authorization.

Réponse :

Code : 200 OK

Body : Message de succès : "Vous êtes authentifié !"

Authentification avec Keycloak
Pour accéder aux routes protégées par Keycloak, tu dois obtenir un token JWT en te connectant à Keycloak. Ajoute le token JWT dans l'en-tête Authorization de tes requêtes.

Exemple de requête avec token JWT :
URL : http://localhost:3000/secure

Méthode : GET

En-tête :

Key : Authorization

Value : Bearer <votre-token>

Tests avec Postman
1. Installation de Postman
Télécharge et installe Postman.

2. Créer une Collection dans Postman
Dans Postman, crée une collection pour organiser tes tests d'API.

3. Ajouter des Requêtes
Pour chaque route, ajoute une requête HTTP (GET, POST, PUT, DELETE) avec les bonnes URL et données dans le corps des requêtes.

4. Tester les Routes
Teste chaque route de l'API en envoyant les requêtes appropriées via Postman et vérifie les réponses.

5. Gestion des Erreurs
Assure-toi de tester les cas où des erreurs peuvent se produire, comme des données manquantes ou incorrectes.

