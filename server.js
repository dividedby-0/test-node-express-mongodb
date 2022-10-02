// server config

console.log('Node running properly...');

const express = require('express');
const app = express();

app.listen(3000, function () {
  console.log('listening on 3000');
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});
