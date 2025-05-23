const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');

    // Création de la table personnes avec la nouvelle colonne adresse
    db.run(`
      CREATE TABLE IF NOT EXISTS personnes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        adresse TEXT
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table personnes créée avec succès.');
          
          // Insertion de données initiales avec des adresses
          const personnes = [
            { nom: "Bob", adresse: "123 Rue Exemple" },
            { nom: "Alice", adresse: "456 Avenue Modèle" },
            { nom: "Charlie", adresse: "789 Boulevard Test" }
          ];

          personnes.forEach((personne) => {
            db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [personne.nom, personne.adresse], function(err) {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`Données insérées : ${personne.nom}, Adresse: ${personne.adresse}`);
              }
            });
          });
        }
      });
  }
});

module.exports = db;
