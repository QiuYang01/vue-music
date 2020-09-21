<template>
    <div class="play">
        播放界面
        <audio style="width:90%;position: fixed;bottom: 62px;left:0px;z-index: 99; " :src="this.song.url" controls="controls" loop="loop" autoplay="autoplay">亲 您的浏览器不支持html5的audio标签</audio>
    </div>
</template>
<script>
export default {
    data() {
        return {
            song:{
                url:''
            }
        }
    },
    mounted(){

    },
    created(){
        this.getSongdetail(this.$route.params.songid); 
    },
    methods:{
        //获取一个歌曲详情
        getSongdetail(songid){
            songid = 19078759;
            console.log("开始获取歌曲详情")
            this.$axios.get("/song/url?id="+songid)
            .then(res =>{
                console.log(res);
                if(res.data.code !=200){
                    alert("获取失败");
                    return 
                }
                this.song.url = res.data.data[0].url;

            })
            .catch(err =>{
                alert("错误")
            })
        }
    }
}
</script>
<style scope>
.play {
    position: fixed;
    width: 100%;
    z-index: 100;
    top: 0;
    bottom:0;
    right: 0;
    overflow-y:scroll;
    overflow-x:hidden;
    background: #222;
}
</style>