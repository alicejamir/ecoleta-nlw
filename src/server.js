const express = require('express')
const server = express()


//Configurar pasta puplic
server.use(express.static('public'))


//Utilizando Tamplete Engine
const nunjucks = require("nunjucks")
  nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//Porta da Página inicial/Home
server.get('/', (req, res) => {
  return res.render('index.html')
})

//Porta para Create Point
server.get('/create-point', (req, res) => {
  return res.render('create-point.html')
})

//Porta para Search
server.get('/search', (req, res) => {
  return res.render('search-results.html')
})

//ligar o servidor:
server.listen(3000)
