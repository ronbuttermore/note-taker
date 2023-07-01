const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.sendFile(path.join(__dirname, './public/notes.html')));
});

app.get('/api/notes', (req,res) => {readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));});

app.post('/api/notes', (req,res) => {
    res.json(`${req.method} request received to add a note`);
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
    const { title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => 
    console.log(`Serving static asset routes on port ${PORT}`));