const express = require('express');
const app = express();
const routerApi = require('./routes');
const PORT = 3000;
const {
  errorHandler,
  errorLog,
  boomErrorHandler,
} = require('./middlewares/error.handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server andando.');
});

routerApi(app);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found', status: 404 });
});

app.use(errorLog);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
