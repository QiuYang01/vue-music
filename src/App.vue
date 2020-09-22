<template>
  <div id="app" style="display: flex;flex-direction: column;height:100vh">
    
    <my-header></my-header>  
    <tab></tab> 
    <router-view  style="flex-grow: 1;margin-top: auto;background-color:#fff"/>

    <play v-if="this.$store.state.fullScreen"></play>
  </div>
</template>

<script>
import MyHeader from "./components/header/myHeader.vue"
import Tab from "./components/tab/tab.vue"
import Play from "./components/play/play"
export default {
  components:{
    MyHeader,
    Tab,
    Play

  },
  data() {
    return {
      
    } 
  },
  methods:{
     
  },
  mounted(){
    //显示播放的界面
    //this.$store.dispatch('setFullScreen',true); 
  }
}
</script>

<style>

</style>
