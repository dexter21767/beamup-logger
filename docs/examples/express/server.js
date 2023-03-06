const express = require('express')
const app = express()

app.use('/logs', express.static(path.join(__dirname, 'logs'),{etag: false}), serveIndex('logs', {'icons': true,'view':'details '}))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)