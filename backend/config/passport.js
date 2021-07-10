// Filtra as requisições
// 554 - Protegendo API com Passport
// site gera e mostra como gerar -> https://jwt.io
const { authSecret } = require('../.env')
const passport = require('passport')   // FrameWork
const passportJwt = require('passport-jwt') // FrameWork
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
  const params = {
    secretOrKey: authSecret,                                 // Segredo
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Token 
  } 
  
  // payload está la dentro auth.js
  const strategy = new Strategy(params, (payload, done) => {
    
    app.db('users')
       .where({ id: payload.id})
       .first()
       .then(user => done(null, user ? {...payload } : false ))
       .catch(err => done(err, false))
       
  })

  passport.use(strategy)

 return {
    authenticate: () => passport.authenticate('jwt', { session: false })  
  }
}
