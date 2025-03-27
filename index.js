const express = require("express");
const db = require("./database");
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
app.use(express.json());

const PORT = 3000;

// Configuration de la session
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'api-secret', // Utilise une clé secrète robuste
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Configuration de Keycloak
const keycloak = new Keycloak({ store: memoryStore }, './keycloak-config.json');
app.use(keycloak.middleware());

// Route de base
app.get("/", (req, res) => {
  res.json("Registre de personnes! Choisissez le bon routage!");
});

//API : Récupérer toutes les personnes
app.get("/personnes", keycloak.protect(), (req, res) => {
  db.all("SELECT * FROM personnes", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: rows });
  });
});

//API : Récupérer une personne par ID
app.get("/personnes/:id", keycloak.protect(), (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: row });
  });
});

//API : Créer une nouvelle personne
app.post('/personnes', keycloak.protect(), (req, res) => {
  const { nom, adresse } = req.body; // Extraire le nom et l'adresse du corps de la requête

  // Insérer les données dans la base de données
  db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], function(err) {
    if (err) {
      res.status(400).json({
        "error": err.message
      });
      return;
    }
    // Répondre avec un message de succès et l'id de la nouvelle personne
    res.json({
      "message": "success",
      "data": {
        id: this.lastID, // ID de l'élément inséré
        nom: nom,
        adresse: adresse
      }
    });
  });
});

//API : update une personne
app.put('/personnes/:id', keycloak.protect(), (req, res) => {
  const id = req.params.id; // Récupérer l'id de la personne à partir des paramètres de l'URL
  const { nom, adresse } = req.body; // Extraire le nom et l'adresse du corps de la requête

  // Mettre à jour les données dans la base de données
  db.run(`UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?`, [nom, adresse, id], function(err) {
    if (err) {
      res.status(400).json({
        "error": err.message
      });
      return;
    }
    // Répondre avec un message de succès
    res.json({
      "message": "success",
      "data": {
        id: id,
        nom: nom,
        adresse: adresse
      }
    });
  });
});

//API : supprimer une personne
app.delete("/personnes/:id", keycloak.protect(), (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM personnes WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success" });
  });
});

// Route sécurisée pour tester Keycloak
app.get('/secure', keycloak.protect(), (req, res) => {
  res.json({ message: 'Vous êtes authentifié avec Keycloak !' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
