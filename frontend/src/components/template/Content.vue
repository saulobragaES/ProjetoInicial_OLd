<template>
   <div class="content">
      <!-- Sempre que uma rota for selecionada, sera renderizada aqui no router-view -->
      <router-view> </router-view>
   </div> 
</template>

<script>
export default {
  name: 'Content'  
}
</script>

<style>
  .content {
     grid-area: content;
     background-color: #efefef;
     padding: 20px; 
  }
</style>