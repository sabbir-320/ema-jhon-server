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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ema-jhon.sxtxu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Ema-Jhon-Stor").collection("Product-Items");

  // Post CRUD
  app.post('/addProduct', (req, res) => {
    const products = req.body;
    collection.insertMany(products)
      .then(result => {
        res.send(result.insertedCount)
      })
  })

  app.post('/productByKeys', (req, res) => {
    const productKeys = req.body;
    collection.find({ key: { $in: productKeys } })
      .toArray((err, document) => {
        res.send(document)
      })
  })

  // Get CRUD
  app.get('/procucts', (req, res) => {
    collection.find({}).limit(20)
      .toArray((err, document) => {
        res.send(document)
      })
  })

  app.get('/procucts/:key', (req, res) => {
    collection.find({ key: req.params.key })
      .toArray((err, document) => {
        res.send(document[0])
      })
  })

});








app.get('/', function (req, res) {
  res.send('hello Rafiul')
})
// PORT config
app.listen(5000)
console.log('5000 PORT successfully run');