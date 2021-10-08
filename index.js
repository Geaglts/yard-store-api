const express = require('express');
const app = express();
const routerApi = require('./routes')
const PORT = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server andando.');
})

routerApi(app);

app.use('*', (req, res) => {
  res.status(404).json({message: 'Not Found', status: 404})
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
});
