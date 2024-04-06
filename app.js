const express = require('express')

const app = express()
// input port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/marco', (req, res) => {
    res.send('Polo !')
})

app.listen(port, () => {
    console.log(`Starting the application listening on port ${port}`)
})
