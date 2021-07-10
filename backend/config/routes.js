const admin = require('./admin')

module.exports = app => {

  app.post('/signup', app.api.user.save )
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken',app.api.auth.validateToken)

  app.route('/users')
     .all(app.config.passport.authenticate())
     .post(admin(app.api.user.save))  // definido dentro user
     .get(admin(app.api.user.get))   // definido dentro user
   //  .get(app.api.user.get) // definido dentro user  
    
  app.route('/users/:id')
     .all(app.config.passport.authenticate())
     .put(admin(app.api.user.save))   
     .get(admin(app.api.user.getById))
     .delete(admin(app.api.user.remove)) 

  app.route('/categories')
     .all(app.config.passport.authenticate())
     .get(admin(app.api.category.get))
     .post(admin(app.api.category.save))

  // Ter cuidado com ordem! tem que vir antes de /categories/:id, das categorias mais especificas
  // Express pode interpretar que o tree é o id
  app.route('/categories/tree')
     .all(app.config.passport.authenticate())
     .get(app.api.category.getTree)

  app.route('/categories/:id')
     .all(app.config.passport.authenticate())
     .get(app.api.category.getById)
     .put(admin(app.api.category.save))   
     .delete(admin(app.api.category.remove))
   
   app.route('/articles')
      .all(app.config.passport.authenticate())
      .get(admin(app.api.articles.get))
      .post(admin(app.api.articles.save))  

   app.route('/articles/:id')
      .all(app.config.passport.authenticate())
      .get(app.api.articles.getById)
      .put(admin(app.api.articles.save))
      .delete(admin(app.api.articles.remove))  // Passa o middleware e retorna a validação para o delete
   
   app.route('/categories/:id/articles')
      .all(app.config.passport.authenticate())
      .get(app.api.articles.getByCategory)
      
   app.route('/stats')
      .all(app.config.passport.authenticate())
      .get(app.api.stat.get)   
}