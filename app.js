const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Chargement des variables d'environnement

// Connexion à la base de données
mongoose.connect(process.env.DB_CONECTION_URI,)
    .then(() => console.log('Successful database server connection'))
    .catch(error => console.error('Connection to database server failed !', error));

const port = process.env.SRV_PORT || 3000; // Définition du port d'écoute

app.use(express.json()); // Middleware pour parser les requêtes en JSON
app.use(express.static(path.join(__dirname, 'public')));

// Définition des middlewares de l'application
const indexRouter = require('./routes/index_router'); 
const adminRouter = require('./routes/admin_router');
const apiRouter = require('./routes/api_router');

// Définition des routes des middlewares
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// Lancement de l'application
app.listen(port, () => {
    console.log(`Application launched on http://localhost:${port}}`);
});
