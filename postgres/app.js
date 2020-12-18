const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const keys = require('./keys.js');

app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser || "postgres",
  host: keys.pgHost || "localhost",
  database: keys.pgDatabase || "postgres",
  password: keys.pgPassword || "1234",
  port: keys.pgPort || 5432
});

pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS users (number INT)')
    .catch((err) => console.log(err));
});


app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/values',  (req, res) => {
    var index= 1;
    pgClient.query('INSERT INTO users(number) VALUES($1)', [index])
    .then( res => {
      console.log("Table craeted sucessfully");
    })
  
});

app.get('/value', (req, res) => {
  
   pgClient.query('SELECT * from users')

    .then(r => {

      const result = r.rows;
  
      console.log(result);
      return res.send(result);

  })
    
});

app.listen(5000, (err) => {
    console.log('Listening');
});
  