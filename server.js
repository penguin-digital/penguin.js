const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongo = require('mongodb')

const PORT = process.env.PORT || 3000
const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev'

const app = express()
const MongoClient = mongo.MongoClient
let db

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/api', (req, res) => {
  console.log(req.body)
  req.body.map(item =>
    db
      .collection('Edits')
      .insertOne(item)
      .then(item => console.log('1 Edit inserted'))
      .catch(err => console.log(err))
  )

  res.status(200).send()
})

MongoClient.connect(
  URL,
  { useNewUrlParser: true },
  function(err, client) {
    if (err) throw err
    db = client.db()
    db.createCollection('Edits', function(err, res) {
      if (err) throw err
      console.log('Collection created!')
      app.listen(PORT, () => console.log(`App listening at ${PORT}`))
      //client.close()
    })
  }
)
