const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config(); // Récupération des variables d'environnement

mongoose.connect(process.env.DB_CONECTION_URI,)
    .then(() => console.log('Successful database server connection'))
    .catch(() => console.error('Connection to database server failed !'));

const port = process.env.SRV_PORT || 3000; // Définition du port d'écoute
const rootRoute = process.env.ROOT_ROUTE || '/'; // Définition de la route racine

// Définition des middlewares de l'application
const indexRouter = require('./routes/index_router'); 
const devRouter = require('./routes/sandbox_router');
const apiRouter = require('./routes/api_router');

app.use(express.json()); // Middleware pour parser les requêtes POST
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les requêtes POST

// Définition des routes des middlewares
app.use(rootRoute + '/', indexRouter);
app.use(rootRoute + '/api', apiRouter);
app.use(rootRoute + '/sb', devRouter);

app.set('view engine', 'ejs'); // Définition du moteur de rendu de vue

// Lancement de l'application
app.listen(port, () => {
    console.log(`Application launched on http://localhost:${port}${rootRoute}`);
});