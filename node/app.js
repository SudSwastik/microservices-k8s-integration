const express = require('express');
const redis = require('redis');
const keys = require('./keys.js');
const app = express();
const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});