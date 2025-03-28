# API REST avec Express JS et SQLite3

## Objectif(s)
- Création d’une API Rest avec Express JS
- Utilisation des bonnes pratiques pour les API Restful

## Outils Utilisés
- Node.js
- Express.js
- SQLite3

---

## Étape 1: Initialisation du Projet
1. Créez un nouveau dossier pour votre projet.
2. Ouvrez un terminal et naviguez vers ce dossier.
3. Initialisez un nouveau projet Node.js avec :
   ```sh
   npm init -y
   ```
4. Installez Express.js et SQLite3 avec :
   ```sh
   npm install express sqlite3
   ```

---

## Étape 2: Configuration de SQLite3
1. Créez un nouveau fichier `database.js`.
2. Configurez SQLite3 pour se connecter à une base de données :
   ```js
   const sqlite3 = require('sqlite3').verbose();
   
   const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
       if (err) {
           console.error(err.message);
       } else {
           console.log('Connecté à la base de données SQLite.');
           db.run(`CREATE TABLE IF NOT EXISTS personnes (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               nom TEXT NOT NULL,
               adresse TEXT
           )`, (err) => {
               if (err) {
                   console.error(err.message);
               } else {
                   // Insertion de données initiales
                   const personnes = [
                       { nom: 'Bob', adresse: '123 Rue Principale' },
                       { nom: 'Alice', adresse: '456 Avenue Centrale' },
                       { nom: 'Charlie', adresse: '789 Boulevard Sud' }
                   ];
                   personnes.forEach(({ nom, adresse }) => {
                       db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse]);
                   });
               }
           });
       }
   });

   module.exports = db;
   ```

---

## Étape 3: Mise en Place de l'API
1. Créez un fichier `index.js`.
2. Ajoutez le code suivant pour gérer les routes :
   ```js
   const express = require('express');
   const db = require('./database');
   const app = express();
   app.use(express.json());
   const PORT = 3000;

   app.get('/', (req, res) => {
       res.json("Registre de personnes! Choisissez le bon routage!");
   });

   // Récupérer toutes les personnes
   app.get('/personnes', (req, res) => {
       db.all("SELECT * FROM personnes", [], (err, rows) => {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": rows });
       });
   });

   // Récupérer une personne par ID
   app.get('/personnes/:id', (req, res) => {
       const id = req.params.id;
       db.get("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": row });
       });
   });

   // Créer une nouvelle personne
   app.post('/personnes', (req, res) => {
       const { nom, adresse } = req.body;
       if (!nom) {
           res.status(400).json({ "error": "Le champ 'nom' est obligatoire." });
           return;
       }
       db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], function (err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": { id: this.lastID } });
       });
   });
   ```

---

## Étape 5: Test avec Postman
1. **Installation et Configuration de Postman**
   - Téléchargez et installez Postman.
   - Ouvrez Postman et configurez une nouvelle collection pour votre API.
2. **Test des Routes et Réponses Attendues**
   - **GET `/personnes`**
     ```json
     {
         "message": "success",
         "data": [
             { "id": 1, "nom": "Bob", "adresse": "123 Rue Principale" },
             { "id": 2, "nom": "Alice", "adresse": "456 Avenue Centrale" },
             { "id": 3, "nom": "Charlie", "adresse": "789 Boulevard Sud" }
         ]
     }
     ```
   - **GET `/personnes/:id`** (Exemple pour `id=1`)
     ```json
     {
         "message": "success",
         "data": { "id": 1, "nom": "Bob", "adresse": "123 Rue Principale" }
     }
     ```
   - **POST `/personnes`**
     - Requête incorrecte (champ `nom` manquant) :
       ```json
       {
           "error": "SQLITE_CONSTRAINT: NOT NULL constraint failed: personnes.nom"
       }
       ```
     - Requête correcte :
       ```json
       {
           "nom": "David",
           "adresse": "12 Rue du Port"
       }
       ```
       Réponse :
       ```json
       {
           "message": "success",
           "data": { "id": 4 }
       }
       ```

---

## Étape 6 (optionnelle): OAuth 2.0 avec Keycloak
Keycloak est une solution open-source pour gérer l'authentification et l'autorisation.

1. Installez keycloak-connect :
   ```sh
   npm install keycloak-connect
   ```
2. Créer un fichier `keycloak-config.json` :
   ```json
   {
       "realm": "api-realm",
       "auth-server-url": "http://localhost:8080/auth",
       "ssl-required": "external",
       "resource": "api-id",
       "credentials": {
           "secret": "api-secret"
       },
       "confidential-port": 0
   }
   ```
3. Ajouter Keycloak dans `index.js` :
   ```js
   const session = require('express-session');
   const Keycloak = require('keycloak-connect');
   const memoryStore = new session.MemoryStore();

   app.use(session({
       secret: 'api-secret',
       resave: false,
       saveUninitialized: true,
       store: memoryStore
   }));

   const keycloak = new Keycloak({ store: memoryStore }, './keycloak-config.json');
   app.use(keycloak.middleware());

   app.get('/secure', keycloak.protect(), (req, res) => {
       res.json({ message: 'Vous êtes authentifié !' });
   });
   ```
   ```
  `index.js` :
   ```js


   const express = require('express');
const db = require('./database');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const app = express();
app.use(express.json());
const PORT = 3000;

// Configurer la session pour Keycloak
const memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'api-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Configurer Keycloak
const keycloak = new Keycloak({ store: memoryStore }, './keycloak-config.json');
app.use(keycloak.middleware());

app.get('/', (req, res) => {
    res.json("Registre de personnes! Choisissez le bon routage!");
});

// Récupérer toutes les personnes
app.get('/personnes', (req, res) => {
    db.all("SELECT * FROM personnes", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": rows });
    });
});

// Récupérer une personne par ID
// Sécuriser la route GET pour récupérer toutes les personnes
app.get('/personnes', keycloak.protect(), (req, res) => {
    db.all("SELECT * FROM personnes", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": rows });
    });
});

// Créer une nouvelle personne avec adresse
app.post('/personnes', keycloak.protect(), (req, res) => {
    const { nom, adresse } = req.body;
    db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": { id: this.lastID } });
    });
});

// Mettre à jour une personne avec adresse
app.put('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = req.params.id;
    const { nom, adresse } = req.body;
    db.run(`UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?`, [nom, adresse, id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success" });
    });
});

// Supprimer une personne
app.delete('/personnes/:id', keycloak.protect(), (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM personnes WHERE id = ?`, id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success" });
    });
});

// Exemple de route sécurisée avec Keycloak
app.get('/secure', keycloak.protect(), (req, res) => {
    res.json({ message: 'Vous êtes authentifié !' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


