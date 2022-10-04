// server config

console.log('Node running properly...');

const express = require('express');
const dotenv = require('dotenv'); // used to hide credentials
dotenv.config(); // initialize dotenv
const bodyParser = require('body-parser'); // parses form data as obj
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.CONNECTION_STRING;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log(`Server listening on port 3000`);
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

// app.post('/notes', (request, response) => {
//   console.log(request.body);
// });

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Database connection OK');
    const db = client.db('notes-database');
    const notesCollection = db.collection('notes');

    // routes

    app.post('/notes', (request, response) => {
      notesCollection
        .insertOne(request.body)
        .then((result) => {
          console.log(result);
          response.redirect('/');
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));
