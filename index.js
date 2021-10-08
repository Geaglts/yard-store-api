const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Server andando.');
})

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
});
