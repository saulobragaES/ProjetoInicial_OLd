<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}">
		<Header title="Cod3r - Base de Conhecimento" :hideToggle="false" :hideUserDropdown="false"/>
		<Menu/>
		<Content/>
		<Footer/>
	</div>
</template>

<script>
// Caminho relativo . e com a forma absoluta é o @, @ significa o rais, o seja o src
import Header from "./components/template/Header"
import Menu from "./components/template/Menu"
import Content from "./components/template/Content"
import Footer from "./components/template/Footer"
import { mapState } from "vuex"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer},
	computed: mapState(['isMenuVisible'])
}
</script>

<!-- * Seletor universal -->
<!-- Fonte Lato foi referenciada dentro do public index.html -->
<style>
   * { font-family: "Lato", sans-serif;
       font-size: 10px; }
   body { margin: 0; }
   /* Serve para dar um renderizada nas fontes, fica mais bonito
   - vh significa que vai ocupar a tela inteira 
   -> GridTemplaterows vão ter 3 linha
   Header  - 60px
   Content - 1fr
   Footer  - 40px

   -> GridTemplateColumns
   Menu - 300px
   */
   #app { -webKit-font-smoothing: antialiased;
	      -moz-osx-font-smoothing: grayscale; 
	      height: 100vh;
	      display: grid;
	  	  grid-template-rows: 60px 1fr 40px;
	      grid-template-columns: 300px 1fr;
	      grid-template-areas: "header header" "menu content" "menu footer";}
   #app.hide-menu { grid-template-areas: "header header" "content content" "footer footer"; }
</style>