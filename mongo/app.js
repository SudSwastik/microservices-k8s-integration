const express = require('express');
const redis = require('redis');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const keys = require('./keys.js');
const port = 3000;

const user = keys.mongoUSER;
const pass  =  keys.mongoPASS;
const url  = keys.mongoURI;

const mongo_uri = `mongodb://${user}:${pass}@${url}:27017`;

// const mongo_uri = "mongodb://localhost:27017";

let db;
let collection;

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});
client.set('visits', 0);



MongoClient
  .connect(mongo_uri, { useNewUrlParser: true, poolSize: 10 })
  .then(client => {
    db = client.db('my-db');
    collection = db.collection('my-collection');
  })
  .catch(error => console.error(error));

app.get('/static', (req, res) => {
  res.status(200).json('Some static data')
});


app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});


app.get('/addUser', (req, res) => {
    var myStudent = { name: 'Rohit', address: 'Magnet Brains Bhopal'};
    collection.insertOne({
        name:"Bhavishya Negi",
        email:"bhavishya2107@gmail.com",
        userName:"bhavishya2107",
        age:24
    },(err, res) => {
        if(err) {
            return console.log('Unable to connet to DB')
        }
        console.log(res.ops);
        // res.status(200).MongoClient
    })
    // collection.insertOne(myStudent, function (err, result) ){
    //     if (err) throw err;
    //     console.log("Number of documents inserted: " + res.insertedCount);
    //     res.status(200).json('Some static data');
    // };
    res.status(200).send("Data Inserted Successfully");
});
    

app.get('/listUser', (req, res) => {
  collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result);
    // db.close();
  })

});

// app.get('/', (req, res) => {
//   collection.find({}).toArray().then(response => res.status(200).json(response)).catch(error => console.error(error));
// });

app.listen(3000, () => {
    console.log('Listening on port 3000');
  });