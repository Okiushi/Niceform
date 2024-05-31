require('dotenv').config(); // Récupération des variables d'environnement

const express = require('express')
const app = express()
require('dotenv').config();

// Définition du port d'écoute sur 3000 par défaut si non défini dans les variables d'environnement
const defaultRoute = process.env.DEFAULT_ROUTE || '/';

// Import des routes et association à l'application
const indexRouter = require('./routes/index_router');
const devRouter = require('./routes/devhome_router');

// Association des routes à l'application
app.use(defaultRoute + '/', indexRouter);
app.use(defaultRoute + '/dev', devRouter);

app.set('view engine', 'ejs'); // Définition du moteur de rendu de vue

// Lancement de l'application
app.listen(port, () => {
    console.log(`Niceforms application launched on http://localhost:${port}${defaultRoute}`);
});