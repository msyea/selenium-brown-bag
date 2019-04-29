const express = require('express')
const debug = require('debug')('selenium-brown-bag')

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

// only start the server if this is the main file
if (require.main === module) {
  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => debug(`App listenting on ${PORT}`))
}