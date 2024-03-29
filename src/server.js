const express = require('express')
const server = express()

//Pegar o banco de dados
const db = require('./database/db')

//Configurar pasta puplic
server.use(express.static('public'))

//Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

//Utilizando Template Engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
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

server.post('/savepoint', (req, res) => {
  //rec.body: o corpo  do formulário

  //Montar a query de inserir dados no banco de dados
  const query = `
  INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
  ) VALUES (?,?,?,?,?,?,?);
`

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro!")
    }

    console.log('Cadastrado com sucesso')
    console.log(this)

    return res.render('create-point.html', { saved: true })
  }

  db.run(query, values, afterInsertData)
})


//Porta para Search
server.get('/search', (req, res) => {

  const search = req.query.search

  if( search == "") {
    //pesquisa vazia
     //vai mostra a página html sem nenhum dado que criamos.
     return res.render('search-results.html', { total: 0 })
  } 

  //pegar os dados do banco de dados (consultar os dados da tabela)
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    //mostra a página html com os dados do banco de dados
    return res.render('search-results.html', { places: rows, total: total })
  })
})

//ligar o servidor:
server.listen(3000)
