///importar a dependencia do sqlite 3
const sqlite3 = require('sqlite3').verbose()

//Criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

//EXPORTAR OBJETO PARA SER USADO EM OUTRO LOCAL:
module.exports = db

//Utilizar objeto de banco de dados para as nossas operações

db.serialize(() => {

/* //CRIAR TABELA - com comandos SQL:
    db.run(`
      CREATE TABLE IF NOT EXISTS  places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT   
    );
  `)/*


 /* //INSERIR DADOS NA TABELA
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
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=929&q=80",
      "Papersider",
      "Guilherme Gembala, Jardim América",
      "Nº 260",
      "Santa Catarina",
      "Rio do sul",
      "Papéis e Papelão"
    ]

    function afterInsertData(err) {
      if(err) {
        return console.log(err)
      }
  
      console.log("Cadastrado com sucesso")
      console.log(this)
    }

  db.run(query, values, afterInsertData)*/

/* //CONSULTAR DADOS DA TABELA
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
    }
  
    console.log("aqui estão seus registros:")
    console.log(rows)
  })*/

 //DELETAR DADOS DA TABELA

 /*db.run(`DELETE FROM places WHERE id = ?`, [0], function(err){
if(err){
    return console.log(err)
  }
  console.log("Registro removido com sucesso!")
  })*/

})


