const express = require('express');
const productsController = require('./controllers/productsController');

const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());

// app.use('/products', productsRouter);

app.get('/products', productsController.getAll);

app.get('/products/search', productsController.getSearch);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.put('/products/:id', productsController.updateById);

app.delete('/products/:id', productsController.remove);

// ___________________________________________________________________

app.post('/sales', salesController.create);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.delete('/sales/:id', salesController.remove);

app.put('/sales/:id', salesController.update);
// ___________________________________________________________________

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;