<template>
      <div class="m-header">
        <div class="icon height-align">
            <img src="../../assets/pic/logo@2x.png" width="60%" alt="">
        </div>
        <div class="text">Chicken Music</div>
        <router-link tag="div" class="mine" to="/user">
            <i class="fa fa-user-o fa-lg" aria-hidden="true"></i>
           
        </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style scope>
.m-header {
    width: 100%;
    position: relative;
    display: flex;
    justify-content:center;
    background-color: #000;
    color: #FFCD32;
    text-align: center;
    height: var(--headerHeight);
    line-height: var(--headerHeight);
}
.icon {
    height: var(--headerHeight);
    line-height: var(--headerHeight);
    /* background-image: url("../../assets/pic/logo@2x.png") ;
    background-size: 30px 32px; */
    
    
}
.text {
     height: var(--headerHeight);
    line-height: var(--headerHeight);
    font-size: 18px;
    
}

.mine {
    width: 20px;
    height: 30px;
    font-family: music-icon;
    display: block;
    position: absolute;
    
    right: 10px;
}
</style>