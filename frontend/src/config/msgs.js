import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  duration: 3000
})

Vue.toasted.register(
  'defaultSucess',
  payload => !payload.msg ? 'Operação relaizada com sucesso!' : payload.msg,
  { type: 'success', icon: 'check' }  
)

Vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Oops... Erro inseperado' : payload.msg, 
  { type: 'error', icon : 'times' }
)
