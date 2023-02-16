const express = require('express');
const productsController = require('./controllers/productsController');

const salesController = require('./controllers/salesController');
const validateProductId = require('./middlewares/validateProductId');
// const productsRouter = require('./routes/products.routes');

const app = express();

app.use(express.json());

// app.use('/products', productsRouter);

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);
// ___________________________________________________________________

app.post('/sales', salesController.create);

// ___________________________________________________________________

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;