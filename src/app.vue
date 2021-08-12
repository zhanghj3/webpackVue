<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <todo></todo>
    <Footer></Footer>
    
  </div>
</template>
<script>
import Header from '@templates/todo/header'
import Footer from '@templates/todo/footer'
import Todo from '@templates/todo/todo'

export default {
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>
<style scoped>
  #app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
#cover{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #BDFCC9;
    opacity: .4;
    z-index: -1;
}
</style>