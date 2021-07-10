// Aula 553 API de Autenticação
const { authSecret } = require('../.env')  // esta dentro do .env arquivo, serve para gerar o token
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const signin = async (req, res) => {
    console.log('auth')
    if (!req.body.email || !req.body.password) {
      return res.status(400).send( 'Informe o usuário e senha!')  
    }
    
    const user = await app.db('users')
                          .where({ email: req.body.email })
                          .first()
    if (!user) return res.status(400).send('Usuário não encontrato!')

    // Compara as senhas se são iguais
    const isMatch = bcrypt.compareSync(req.body.password, user.password)
    if (!isMatch) return res.status(401).send('Email/Senha inválido!')

    // Data atual Date.now(), te que dividir por mil
    const now = Math.floor(Date.now() / 1000 )

    const payload = {
      id: user.id,
      name: user.name,
      admin: user.admin,
      iat: now,           // iat =  Issued - Imitido Até
      exp: now + ( 60 * 60 * 24 * 3)  // token fica na maquina 3 dias.  seg, mn, 24hrs, 3 = 3 dias
    }
    res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)  // aqui gera o token
    })
  }  
  const validateToken = async (req, res) => {
    const userData = req.body || null 
    try {
      if (userData) {
        //Decodifica o token
        const token = jwt.decode(userData.token, authSecret)  
        // No javascript está usando o tempo em milisegundos, por isso * por 1000
        // Se for maior que a data atual, o token está valendo.
        
        if ( new Date(token.exp * 1000 ) > new Date()) {
          return res.send(true)
        }
      }  
    } catch(e) {
        // Problema no token... Token expirou...
        console.log('Token expirou')
    } 

    res.send(false)
  }
  return { signin, validateToken }
}