<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
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
}
.tab-link{
        padding-bottom: 5px;
        color: hsla(0,0%,100%,.5);  /** 颜色 */
}
.tab-link:hover {
    color: var(--color-theme);
    border-bottom: 2px solid var(--color-theme)
}
</style>