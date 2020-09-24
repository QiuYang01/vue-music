<template>
  <div id="app" style="display: flex;flex-direction: column;height:100vh">
    
    <my-header></my-header>  
    <tab></tab> 
    <keep-alive>
      <router-view  style="flex-grow: 1;margin-top: auto;background-color:#fff"/>
    </keep-alive>
    <play v-show="this.$store.state.fullScreen"></play>
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
  //利用计算属性
  computed: {
    fullScreen() {
      return this.$store.state.fullScreen;
    }
  },
  //监听执行
  watch: {
    fullScreen(val) {
     console.log("fullScreen变化")
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
