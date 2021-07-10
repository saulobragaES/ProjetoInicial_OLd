// Objeto para mexer nos estados dos objetos - Compartilha dados entre os componentes
// atraves do vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: true,
    user: {  
      name: 'Usuário Mock',
      email: 'mock@cod3r.com.br' 
    }
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if(isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible  // === extamente igual 
      } else {
        state.isMenuVisible = isVisible  
      }  
    }  
  }  
})