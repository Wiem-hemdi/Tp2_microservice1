# API Registre de Personnes avec Keycloak

Cette API RESTful permet de gérer un registre de personnes avec une base de données SQLite. Elle offre des fonctionnalités CRUD (Create, Read, Update, Delete) pour gérer les informations des personnes, ainsi que la protection des routes sensibles via l'intégration de **Keycloak** pour l'authentification et l'autorisation.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration de Keycloak](#configuration-de-keycloak)
- [Routes API](#routes-api)
- [Test avec Postman](#test-avec-postman)
- [Gestion des erreurs](#gestion-des-erreurs)

## Prérequis

- **Node.js** (version 14.x ou supérieure)
- **SQLite** (pour la base de données)
- **Keycloak** (pour sécuriser les routes)
- **Postman** (pour tester l'API)

## Installation

1. Clonez ce repository :

   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-repository.git
   cd nom-du-repository
Installez les dépendances :

bash
Copier
Modifier
npm install
Configuration de Keycloak
Installez et configurez un serveur Keycloak. Vous pouvez utiliser une instance locale ou un serveur déjà en place.

Créez un fichier keycloak-config.json à la racine du projet avec la configuration suivante :

json
Copier
Modifier
{
  "realm": "votre-realm",
  "auth-server-url": "http://localhost:8080/auth",
  "resource": "votre-client-id",
  "credentials": {
    "secret": "votre-client-secret"
  }
}
Lancez le serveur Keycloak (localement ou sur un serveur distant).

Lancez l'API :

bash
Copier
Modifier
node index.js
L'API sera disponible sur http://localhost:3000.

Routes API
1. GET /personnes
Récupère la liste de toutes les personnes.

Exemple de réponse :
json
Copier
Modifier
{
  "message": "success",
  "data": [
    { "id": 1, "nom": "Bob", "adresse": "123 Rue A" },
    { "id": 2, "nom": "Alice", "adresse": "456 Rue B" }
  ]
}
2. GET /personnes/:id
Récupère une personne par son ID.

Exemple de réponse :
json
Copier
Modifier
{
  "message": "success",
  "data": { "id": 1, "nom": "Bob", "adresse": "123 Rue A" }
}
3. POST /personnes
Crée une nouvelle personne avec nom et adresse.

Exemple de requête :
json
Copier
Modifier
{
  "nom": "Charlie",
  "adresse": "789 Rue C"
}
Exemple de réponse :
json
Copier
Modifier
{
  "message": "success",
  "data": { "id": 3, "nom": "Charlie", "adresse": "789 Rue C" }
}
4. PUT /personnes/:id
Met à jour une personne par son ID.

Exemple de requête :
json
Copier
Modifier
{
  "nom": "Bob",
  "adresse": "123 Rue D"
}
Exemple de réponse :
json
Copier
Modifier
{
  "message": "success",
  "data": { "id": 1, "nom": "Bob", "adresse": "123 Rue D" }
}
5. DELETE /personnes/:id
Supprime une personne par son ID.

Exemple de réponse :
json
Copier
Modifier
{
  "message": "success"
}
6. GET /secure
Route protégée par Keycloak. Elle nécessite une authentification via un token JWT.

Exemple de réponse (si authentifié) :
json
Copier
Modifier
{
  "message": "Vous êtes authentifié avec Keycloak !"
}
Test avec Postman
Téléchargez et installez Postman.

Créez une collection dans Postman pour tester les routes de l'API.

Pour tester la route GET /secure, assurez-vous d'envoyer un token valide dans les en-têtes de la requête. Exemple d'en-tête :

json
Copier
Modifier
{
  "Authorization": "Bearer <votre-token>"
}
Gestion des erreurs
L'API gère les erreurs en renvoyant les codes HTTP appropriés, accompagnés de messages d'erreur :

400 Bad Request : Lorsque les données envoyées sont invalides.

404 Not Found : Lorsque la ressource demandée n'existe pas.

500 Internal Server Error : En cas d'erreur serveur.

Conclusion
Ce projet implémente une API REST sécurisée pour gérer un registre de personnes, avec un système d'authentification basé sur Keycloak. Il vous permet de tester les fonctionnalités CRUD avec Postman tout en sécurisant les données sensibles.

wiem hemdi
