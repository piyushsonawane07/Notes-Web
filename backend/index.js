const express = require('express')
const connectToMongo = require('./db');

connectToMongo();

const app = express()
const port = 5000
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Sever Started on http://localhost:${port}`);
});