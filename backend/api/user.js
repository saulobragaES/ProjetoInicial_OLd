const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const encryptPassword = password => {
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
    }
 
    const save = async (req,res) => {
      console.log('Salvando.........')
      const user = { ...req.body}
      console.log(user)
      if(req.params.id) user.id = req.params.id
      
      // Negação em cima do que foi instartado, não for user, seta false
      if(!req.originalUrl.startsWith('/users')) user.admin = false
      if(!req.user || !req.user.admin) user.admin = false

      try {
        existsOrError(user.name,'Nome não informado...')
        existsOrError(user.email,'E-mail não informada...')
        existsOrError(user.password,'Senha não informada...')
        existsOrError(user.confirmPassword,'Confirmação de Senha inválida...')
        equalsOrError(user.password,user.confirmPassword,'Senha não confere...')
   
        const userFromDB = await app.db('users')
                          .where({ email: user.email })
                         // .whereNull('deletedAt')
                          .first()
        
        if ( userFromDB > 0 ) {                   
       //if(!user.id) {
          notExistsOrError(userFromDB,'Usuário já cadastrado...')
          //notExistsOrError(userFromDB,'Usuário não existe...') 
        } 
                          
      } catch(msg){
        return res.status(400).send(msg)
      } 

      
      user.password = encryptPassword(user.password)
      delete user.confirmPassword  

      if(user.id) {
        console.log(user)
        app.db('users')
           .update(user)
           .where({ id: user.id })
           .whereNull('deletedAt')
           .then(_ => res.status(204).send())
           .catch(err => res.status(500).send(err))
      } else {
        console.log('Inserindo Usuário')
        app.db('users')
           .insert(user)
           .then(_ => res.status(204).send())
           .catch(err => res.status(500).send(err))

      }

    }

    const get = (req, res) => {
      app.db('users')
          .select('id', 'name', 'email', 'admin')
          .whereNull('deletedAt')
          .then(users => res.json(users))
          .catch(err => res.status(500).send(err))
  }

    const getById = async (req, res) => {
      
        const userFromDB = await app.db('users')
                          .where({ id: req.params.id }).first()
                          .whereNull('deletedAt')
                                                       
        if(!req.params.email) {
          //notExistsOrError(userFromDB,'Usuário já cadastrado...')
          try {
          notExistsOrError(userFromDB,'Usuário não existe...') 
          //console.log('Erro ' + user )
          } catch ( e ) {
            console.log(e.message)
            user => res.json(user)
          }
        }     


      app.db('users/:id')
         .select('id', 'name', 'email', 'admin')
         .where({ id: req.params.id })
         .whereNull('deletedAt')
         .first() // Pega um unico resultado
         .then(user => res.json(user))
         //.catch( ( err == false )  => res.json("Usuario não cadastrado...") )
         .catch(err => res.status(500).send(err))
   }


   // Soft delete, ou seja exclusão logica
   const remove = async (req, res) => {
    try {
        const articles = await app.db('articles')
            .where({ userId: req.params.id })

        console.log(articles)    

        if ( articles > 0 ) {    
          notExistsOrError(articles, 'Usuário possui artigos.')
        }

        console.log(req.params.id)

        const rowsUpdated = await app.db('users')
            .update({deletedAt: new Date()})
            .where({ id: req.params.id })
       
        console.log(articles) 

        existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
       
        res.status(204).send()
  
    } catch(msg) {
        res.status(400).send(msg)
    }
}

    // Toda função criada tem que retornar aqui.
    return { save , get, getById, remove }

}