# API RESTful avec Express.js et SQLite3

## Objectif(s)
- Création d’une API REST avec Express.js
- Utilisation des bonnes pratiques pour les API RESTful

## Outils Utilisés
- Node.js
- Express.js
- SQLite3
- Postman (pour les tests)

---

## 1. Initialisation du Projet
1. **Créer un dossier de projet** et naviguer dedans :
   ```sh
   mkdir api-express-sqlite && cd api-express-sqlite
   ```
2. **Initialiser un projet Node.js** :
   ```sh
   npm init -y
   ```
3. **Installer les dépendances** :
   ```sh
   npm install express sqlite3
   ```

---

## 2. Configuration de SQLite3
1. **Créer un fichier** `database.js`.
2. **Ajouter la configuration SQLite3** :
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
               }
           });
       }
   });
   
   module.exports = db;
   ```

---

## 3. Mise en Place de l'API
1. **Créer un fichier** `index.js`.
2. **Ajouter la configuration Express.js** :
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
       db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], function(err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success", "data": { id: this.lastID } });
       });
   });

   // Mettre à jour une personne
   app.put('/personnes/:id', (req, res) => {
       const id = req.params.id;
       const { nom, adresse } = req.body;
       db.run(`UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?`, [nom, adresse, id], function(err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success" });
       });
   });

   // Supprimer une personne
   app.delete('/personnes/:id', (req, res) => {
       const id = req.params.id;
       db.run(`DELETE FROM personnes WHERE id = ?`, id, function(err) {
           if (err) {
               res.status(400).json({ "error": err.message });
               return;
           }
           res.json({ "message": "success" });
       });
   });

   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });
   ```

---

## 4. Test avec Postman
### Installation et Configuration
1. **Téléchargez et installez** Postman depuis [Postman](https://www.postman.com/downloads/).
2. **Créez une collection** pour organiser les requêtes de l'API.

### Test des Routes
#### **1️⃣ Récupérer toutes les personnes (GET)**
- **URL :** `http://localhost:3000/personnes`

#### **2️⃣ Récupérer une personne par ID (GET)**
- **URL :** `http://localhost:3000/personnes/1`

#### **3️⃣ Ajouter une personne (POST)**
- **URL :** `http://localhost:3000/personnes`
- **Headers :** `Content-Type: application/json`
- **Body :**
   ```json
   {
       "nom": "David",
       "adresse": "10 Rue des Lilas"
   }
   ```

#### **4️⃣ Mettre à jour une personne (PUT)**
- **URL :** `http://localhost:3000/personnes/1`
- **Body :**
   ```json
   {
       "nom": "David Martin",
       "adresse": "20 Rue du Centre"
   }
   ```

#### **5️⃣ Supprimer une personne (DELETE)**
- **URL :** `http://localhost:3000/personnes/1`

### Validation des Tests
✅ **Vérifiez les données mises à jour** avec `GET` après un `POST` ou `PUT`.
✅ **Testez les erreurs** en envoyant des requêtes incorrectes.

---

## 5. Exécution du Serveur
Pour exécuter le projet, utilisez :
```sh
node index.js
```

Votre API est maintenant fonctionnelle et testable avec Postman ! 🚀

