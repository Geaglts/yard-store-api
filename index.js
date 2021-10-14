const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');
const PORT = 3000;
const { errorHandler, errorLog, boomErrorHandler } = require('./middlewares/error.handler');
const corsOptions = require('./cors');

app.use(express.json());
app.use(cors(corsOptions));

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
