<template>
    <div class="loading">  <!-- 自定义加载组件 -->
       <i class="fa fa-spinner fa-spin fa-3x fa-fw" ></i>
       <span class="sr-only">Loading...</span>
    </div>
</template>
<style scope>
.loading {
    position: absolute;
    width: 100%;
    height: 100vh;
    line-height: 100vh;
    text-align: center;
    background-color: rgba(31, 31, 31, 0.95);
    color: var(--color-theme);
    z-index: 2020;
}
</style>