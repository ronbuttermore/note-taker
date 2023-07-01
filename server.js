const express = require('express');
const db = require('./db/db.json');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api', (req,res) => res.json(db));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => 
    console.log(`Serving static asset routes on port ${PORT}`));