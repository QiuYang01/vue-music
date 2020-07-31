<template>
  <div class="tab">
    <router-link tag="div" :class="['tab-item']" to="/recommend" >
      <span @click="fun1(1)" :class="['tab-link',this.currentActiveTab==1 ? 'tab-linkactive' :'']">推荐</span>
    </router-link>
    <router-link tag="div" :class="['tab-item']" to="/singer" @click="fun1()">
      <span @click="fun1(2)" :class="['tab-link',this.currentActiveTab==2 ? 'tab-linkactive' :'']">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank" @click="this.currentActiveTab=3">
      <span :class="['tab-link',this.currentActiveTab==3 ? 'tab-linkactive' :'']">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search" @click="this.currentActiveTab=4">
      <span :class="['tab-link',this.currentActiveTab==4 ? 'tab-linkactive' :'']">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentActiveTab: 1,
    }
  },
  methods:{
    fun1(index){
      //alert(index)
      // console.log(this.currentActiveTab)
      this.currentActiveTab = index;
      // console.log(this.currentActiveTab)
    },
  },

}
</script>
<style scope>
.tab {
    display: flex;
    height: 44px;
    line-height: 44px;
}
.tab-item {
      flex: 1; /* 把一行平均分成4个 */
      text-align: center;
      background-color: var(--color-background);
      cursor:pointer;
}
.tab-link{
      padding-bottom: 5px;
      color: hsla(0,0%,100%,.5);  /** 颜色 */
}
.tab-link:hover {
    color: var(--color-theme);
    border-bottom: 2px solid var(--color-theme)
}
.tab-linkactive {
    color: var(--color-theme);
    border-bottom: 2px solid var(--color-theme)
}
</style>