const express = require('express')
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`iNotes app Started on http://localhost:${port}`);
});