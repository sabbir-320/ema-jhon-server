var express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

// app config
var app = express()
app.use(cors())
app.use(bodyParser.json())


// MongoDB Client
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ema-jhon.sxtxu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Ema-Jhon-Stor").collection("Product-Items");
  // perform actions on the collection object
    app.post('/addProduct', (req, res) => {
        const products = req.body;
        console.log(products);
        collection.insertOne(products)
        .then(result => {
            console.log(result);
        })
    })
  
});








app.get('/', function (req, res) {
    res.send('hello Rafiul')
  })
// PORT config
app.listen(5000)
console.log('5000 PORT successfully run');