const express = require('express')
const app = express()

// Définition du port d'écoute sur 3000 par défaut si non défini dans les variables d'environnement
const port= process.env.PORT || 3000;

// Import des routes et association à l'application
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const devRouter = require('./routes/dev');
app.use('/dev', devRouter);

// Lancement de l'application
app.listen(port, () => {
    console.log(`Starting the application listening on port ${port}`)
})
