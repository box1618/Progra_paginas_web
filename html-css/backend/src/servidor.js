import express from 'express';

const products = [
  { id: 1, name: '' },
  { id: 2, name: '' },
  { id: 3, name: '' },
];

const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.post('/products', (req, res) => {
  const { id, name } = req.body;
  const product = { id, name };

  products.push(product);
  res.status(201).json({ product, message: 'ok' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});