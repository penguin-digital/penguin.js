const path = require('path')
const Transform = require('stream').Transform
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb')

const render = require(`${__dirname}/render`)

const PORT = process.env.PORT || 3000
const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev'

const app = express()
const MongoClient = mongo.MongoClient
let db

app.use(bodyParser.json())

app.use((req, res, next) => {
  const reqUrl =
    req._parsedUrl.pathname === '/' ? 'index' : req._parsedUrl.pathname
  const filepath = `${path.join(process.cwd(), reqUrl)}.html`

  const parser = new Transform()
  parser._transform = function(data, encoding, done) {
    const str = data
      .toString()
      .replace(
        '</body>',
        '<script src="simmer.js"></script><script src="cms.js"></script></body>'
      )
    this.push(str)
    done()
  }

  fs.stat(filepath, (err, stats) => {
    if (err) {
      next()
    } else {
      console.log('Serve File: ' + filepath)
      fs.createReadStream(filepath)
        .pipe(parser)
        .pipe(res)
    }
  })
})

app.use(express.static(path.join(__dirname, '../static')))
app.use(express.static(path.join(process.cwd())))

app.post('/api', (req, res) => {
  req.body.map(item =>
    db
      .collection('Edits')
      .insertOne(item)
      .then(item => console.log('1 Edit inserted'))
      .catch(err => console.log(err))
  )
  res.status(200).send()
})

app.post('/publish', (req, res) => {
  render(req.body.location)
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
    })
  }
)
