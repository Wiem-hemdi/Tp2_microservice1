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

Ouvrez Postman et créez une nouvelle collection pour votre API.
Configurez les requêtes pour tester les routes (GET, POST, PUT, DELETE).
Exécutez les requêtes et vérifiez les réponses pour vous assurer que tout fonctionne correctement.
Exemple de Réponses API
GET toutes les personnes
Requête :

GET /personnes
Réponse :

{
  "message": "success",
  "data": [
    { "id": 1, "nom": "Bob", "adresse": null },
    { "id": 2, "nom": "Charlie", "adresse": null },
    { "id": 3, "nom": "Alice", "adresse": null },
    { "id": 4, "nom": "Bob", "adresse": null },
    { "id": 6, "nom": "Charlie", "adresse": null },
    { "id": 7, "nom": "Bob", "adresse": null },
    { "id": 8, "nom": "Alice", "adresse": null },
    { "id": 9, "nom": "Charlie", "adresse": null }
  ]
}
GET une personne par ID
Requête :

GET /personnes/3
Réponse :

{
  "message": "success",
  "data": { "id": 3, "nom": "Alice", "adresse": null }
}
POST (Créer une nouvelle personne)
Requête :

POST /personnes
Content-Type: application/json

{
  "nom": "David",
  "adresse": "123 Rue des Fleurs"
}
Réponse :

{
  "message": "success",
  "data": { "id": 10 }
}
PUT (Mettre à jour une personne)
Requête :

PUT /personnes/2
Content-Type: application/json

{
  "nom": "Charles",
  "adresse": "456 Avenue des Champs"
}
Réponse :

{
  "message": "success"
}
DELETE (Supprimer une personne)
Requête :

DELETE /personnes/4
Réponse :

{
  "message": "success"
}
Contact

