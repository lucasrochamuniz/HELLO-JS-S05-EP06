// index.js
const cfg = require("./knexfile")
const knex = require("knex")(cfg.development)
const express = require("express")
const morgan = require("morgan")
const app = express()
const bodyp = require('body-parser')

app.use(bodyp.urlencoded())
app.use(morgan("dev"))

app.get("/list", (req, res) => {
  knex("contato").select().then(ret => {
    res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})
app.get('/getid/:id', (req, res) => {
  knex('contato').select().where('id', req.params.id).then(ret => {
    res.send(ret)
  })
})
app.post("/add", (req, res) => {
  knex("contato").insert(req.query, "id").then(ret => {
      res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})
app.get('/update/:nome/:telefone/:nascimento', (req, res) => {
  knex('contato').where('id',req.params.id).update('nome', req.params.nome)
                                           .update('telefone', req.params.telefone)
                                           .update('nascimento', req.params.nascimento)
})
app.get('/delete/:id', (req, res) => {
  knex('contato').del().where('id',req.params.id).then(ret => {
    res.send(ret)
  })
})
knex.migrate.latest().then(_ =>
  app.listen(3000, _ =>
    console.log("server online!")))
