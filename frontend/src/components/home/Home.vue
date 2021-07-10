<template>
   <div class="home">
      <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento"/> 
      <div class="stats">
         <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50"/>
         <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480"/>
         <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd"/>
      </div>
   </div> 
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import Stat from './Stat'
import axios from 'axios'  // fazer uma requisição para backend
import { baseApiUrl } from '@/global'

export default {
  name: 'Home',
  components: { PageTitle, Stat },
  data: function() {
    return {
      stat: {}
    }
  },
  methods: {
    getStats() {
      // stat é retornado do backend e é usado na div para montar os dados 
      axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
    }     
  },
  mounted() {
    this.getStats() 
  }
}
</script>

<style>
  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;  /* Flex para quebrar e redimencionar os objetos */
  }
</style>