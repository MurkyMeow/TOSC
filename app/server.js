const express = require('express');
const path = require('path');

const PORT = process.env.port || 9080;
const app = express();
app.use(express.static(path.resolve(__dirname, 'public/')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Starting server on port', PORT);
});
