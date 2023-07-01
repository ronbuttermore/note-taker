const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.sendFile(path.join(__dirname, './public/notes.html')));
});

app.get('/api/notes', (req,res) => res.json(db));

app.post('/api/notes', (req,res) => {
    res.json(`${req.method} request received to add a note`);
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
    const { title, text} = req.body;
    const newNote = {
        title,
        text,
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) => writeErr ? console.error(writeErr) : console.info('Successfully updated notes!'));
        }
    })
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => 
    console.log(`Serving static asset routes on port ${PORT}`));