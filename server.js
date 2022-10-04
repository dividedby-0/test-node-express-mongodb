// server config

console.log('Node running properly...');

const express = require('express');
const bodyParser = require('body-parser'); // parses form data as obj
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString =
  'mongodb+srv://test-node-express-mongodb:9HR0a7oDlOkQ8zHd@cluster0.tkzfce2.mongodb.net/?retryWrites=true&w=majority';

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
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));
