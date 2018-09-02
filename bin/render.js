const jsdom = require('jsdom')
const path = require('path')
const fs = require('fs')
const mongo = require('mongodb')

const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev'
let db

const MongoClient = mongo.MongoClient
const { JSDOM } = jsdom

MongoClient.connect(
  URL,
  { useNewUrlParser: true },
  function(err, client) {
    if (err) throw err
    db = client.db()
  }
)

module.exports = renderFile = location => {
  const reqUrl = location === '/' ? 'index' : location
  const filepath = `${path.join(process.cwd(), reqUrl)}.html`
  const dom = new JSDOM(fs.readFileSync('./index.html'))

  db.collection('Edits')
    .find({ location: location })
    .toArray((err, docs) => {
      console.log(docs)
      docs.map(item => {
        dom.window.document.querySelector(item.path).innerHTML = item.content
      })
      console.log(dom.serialize())
      // ensureDirectoryExistence('./penguin/index.html')
      // fs.writeFileSync('./penguin/index.html', dom.serialize())
    })
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}
