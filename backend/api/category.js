module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validation

  const save = async (req, res) => {
      const category = {
        id: req.body.id,
        name: req.body.name,
        parentId: req.body.parentId
      }  // Esse objeto vem la do CategoryAdmin.vue do loadCategory
      
      if(req.params.id) category.id = req.params.id

      try {
          existsOrError(category.name, 'Nome não informado')
      } catch(msg) {
          return res.status(400).send(msg)
      }

      //const userFromDB = Object.assign(category);

      //const userFromDB = await app.db('categories')
      //                    .where({ name: category.name })
      //                    .first()
      
      if(category.id) {
          app.db('categories')
              .update( { parentId: category.parentId,
                             name: category.name })
              .where('id' , '=' , category.id)
              .then(_ => res.status(204).send())
              .catch(err => res.status(500).send(err))
      } else {
          app.db('categories')
              .insert({     name: category.name,
                        parentId: category.parentId  })
              .then(_ => res.status(204).send())
              .catch(err => res.status(500).send(err))
      }
  }

  const remove = async (req, res) => {
      try {
          existsOrError(req.params.id, 'Código da Categoria não informado.')

          const subcategory = await app.db('categories')
              .where({ parentId: req.params.id })
          notExistsOrError(subcategory, 'Categoria possui subcategorias.')

          const articles = await app.db('articles')
              .where({ categoryId: req.params.id })
          notExistsOrError(articles, 'Categoria possui artigos.')

          const rowsDeleted = await app.db('categories')
              .where({ id: req.params.id }).del()
          existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

          res.status(204).send()
      } catch(msg) {
          res.status(400).send(msg)
      }
  }

  const withPath = categories => {
      const getParent = (categories, parentId) => {
          const parent = categories.filter(parent => parent.id === parentId)
          return parent.length ? parent[0] : null
      }

      const categoriesWithPath = categories.map(category => {
          let path = category.name
          let parent = getParent(categories, category.parentId)

          while(parent) {
              path = `${parent.name} > ${path}`
              parent = getParent(categories, parent.parentId)
          }

          return { ...category, path }
      })

      categoriesWithPath.sort((a, b) => {
          if(a.path < b.path) return -1
          if(a.path > b.path) return 1
          return 0
      })

      return categoriesWithPath
  }

  const get = (req, res) => {
      app.db('categories')
          .then(categories => res.json(withPath(categories)))
          .catch(err => res.status(500).send(err))
  }

  const getById = (req, res) => {
      app.db('categories')
          .where({ id: req.params.id })
          .first()
          .then(category => res.json(category))
          .catch(err => res.status(500).send(err))
  }

  const toTree = (categories, tree) => {
    // Se arvore não tiver setado.          Suficiente para não retornar os parentId setados
    if(!tree) tree = categories.filter(c => !c.parentId)
    //Pegando todos nos pais
    tree = tree.map(parentNode => {
       // Filho é igual ao pai, parentNode. isChild recebe de node
       // node for igual parentNode, então node é filho
       // Recebe todos os filhos de forma recursiva
       const isChild = node => node.parentId == parentNode.id
       parentNode.children = toTree(categories, categories.filter(isChild))
       return parentNode 
    })
    return tree
  } 
  // Criar um serviço para o menu recursivo.
  const getTree = (req, res) => {
    app.db('categories')
       .then(categories => res.json(toTree(withPath(categories)))) 
       .catch(err => res.status(500).send(err)) 
  }

  return { save, remove, get, getById, getTree}
}