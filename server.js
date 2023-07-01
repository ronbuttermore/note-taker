const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.listen(PORT, () => 
    console.log(`Serving static asset routes on port ${PORT}`));