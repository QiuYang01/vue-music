<template>
  <div id="app">
    
    <my-header></my-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from "./components/header/myHeader.vue"
import Tab from "./components/tab/tab.vue"
export default {
  components:{
    MyHeader,
    Tab

  },
  name: 'App'
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  /* background-color: black; */
}
</style>
