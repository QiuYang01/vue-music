<template>
    <div class="play">
        <div class="backgroundimg">
            <img :src="this.currentsong.al.picUrl" width="100%" height="100%">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          currentsong:{},  
        }
    },
    computed:{
        getfullScreen(){
            return this.$store.state.fullScreen;
        }
    },
    watch: {
        getfullScreen(val) {//选择了新的歌单进来 切歌
            if(!this.$store.state.fullScreen)
                return
            console.log("播放页的显示变化");

        }
    },
}
</script>
<style scope>
.back {
    font-size: 1.4em;
    position: absolute;
    margin: 10px;
    color: #fff;
}
.songinfo {
    font-weight: 700;
}
.newlist {
    widows: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    overflow-y:scroll;
    overflow-x:hidden;
    background: #222;

}
.play {
    position: fixed;
    width: 100%;
    z-index: 100;
    top: 0;
    bottom:0;
    right: 0;
    overflow-y:scroll;
    overflow-x:hidden;
    background: #ccc;
    color: #fff;
    text-align: center;
}
.lyricitem {
    text-align: center;
}
.currentlyricitem {
    color: blue;
}
.controller {
    width: 80%;
    margin: 0 auto;
    display: flex;
    vertical-align:bottom;
}
.controller_item {
    flex: 1;
    
}
.theme-color {
    color: var(--color-theme);
    /* border: 2px solid var(--color-theme);
    border-radius: 50%;
    padding:4px */
}
.backgroundimg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    -webkit-filter: blur(20px);
    filter: blur(20px);
}
</style>