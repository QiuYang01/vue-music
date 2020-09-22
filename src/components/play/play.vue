<template>
    <div class="play">
        <button style="color:#fff" @click="closeplay()" >关闭</button><br />
        播放界面<br />
        歌曲名{{this.currentsong.name}}<br />
        图片的地址{{this.currentsong.al.picUrl}}
        <!-- <img :src="this.currentsong.al.picUrl" alt=""> -->
        <audio style="width:90%;position: fixed;bottom: 62px;left:0px;z-index: 99; " :src="this.currentsong.url" controls="controls" loop="loop" autoplay="autoplay">亲 您的浏览器不支持html5的audio标签</audio>
        <div>
            <div class="list">
                <li class="songli"  v-for="(song,index) in this.$store.state.songs" :key="index" @click="changecurrentindex(index)">
                    <p>{{song.name}}</p>
                    <p style="color: hsla(0,0%,100%,.3);">{{song.ar[0].name}}</p>
                </li>  
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //当前播放的音乐
            currentsong:{}
        }
    },
    mounted(){

    },
    created(){
       // console.log(this.$store.state.songs)
        //console.log(this.$store.state.currentIndex);
        //取的当前音乐的信息
       // console.log(this.$store.state.songs[this.$store.state.currentIndex]);
        // this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
        // this.getSongdetail(this.currentsong.id); 
        this.refresh();
    },
    methods:{
        refresh(){
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id); 
        },
        //获取一个歌曲详情
        getSongdetail(songid){
            console.log("开始获取歌曲详情")
            this.$axios.get("/song/url?id="+songid)
            .then(res =>{
                //console.log(res);
                if(res.data.code !=200){
                    alert("获取失败");
                    return 
                }
                this.currentsong.url = res.data.data[0].url;
                console.log("当前的音乐",this.currentsong)
            })
            .catch(err =>{
                alert("错误")
            })
        },
        //在歌曲列表中选择其他歌曲
        changecurrentindex(currentIndex){
            this.$store.dispatch('setCurrentIndex',currentIndex);
            this.refresh();
        },
        //关闭播放列表
        closeplay(){
             this.$store.dispatch('setFullScreen',false);
        },

    },
    
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
    background: #ccc;
    color: #fff;
}
</style>