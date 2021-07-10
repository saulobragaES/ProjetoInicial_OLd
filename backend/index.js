const app = require('express') () // () isso resultado para retornar para app
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
  .include('./config/passport.js')  // fazendo isso consegue acessar a partir da routes.js
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./schedule')
  .then('./config/routes.js')
  .into(app) // consign vai ser o responsavel passar para dentro do middlewares.js 

app.listen(3000, () => {
  console.log('Backend executando...!')
})