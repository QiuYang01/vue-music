<template>
    <div class="play">
        <div class="back">
            <i @click="closeplay()" style=";color:var(--color-theme)" class="fa fa-arrow-down fa-lg" aria-hidden="true"></i>
        </div>
        <div class="songinfo">
            <p>{{this.currentsong.name}}</p>
            <p>{{this.currentsong.ar[0].name}}</p>
        </div>
        <!-- 播放界面<br />
        歌曲名：{{this.currentsong.name}}<br />
        歌手名{{this.currentsong.ar[0].name}}<br />
        图片的地址：{{this.currentsong.al.picUrl}}<br />
        歌词： -->
        <!-- 歌词 -->
        <div>
            <p :class="['lyricitem',{'currentlyricitem': currentLineNum ===index}]" v-for="(line,index) in lyric.lines" :key="index">
                {{line.txt}}
            </p>
        </div>
        <!-- <img :src="this.currentsong.al.picUrl" alt=""> -->
        <audio ref="audio" style="width:90%;position: fixed;bottom: 62px;left:0px;z-index: 99; " :src="this.url" controls="controls"
         @ended="end()" >亲 您的浏览器不支持html5的audio标签</audio>
         <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
         <button @click="play()">播放</button>
        <button @click="pause()">暂停</button>
        
        <!-- 显示播放列表 -->
        <!-- <div class="newlist" v-if="showlist">
            <li class="songli"  v-for="(song,index) in this.$store.state.songs" :key="index" @click="changecurrentindex(index)">
                <p>{{song.name}}</p>
                <p style="color: hsla(0,0%,100%,.3);">{{song.ar[0].name}}</p>
            </li>  
        </div>
        <button @click="changeshowlist()">显示列表</button> -->

    </div>
</template>
<script>
//处理歌词字符串
import Lyric from 'lyric-parser'
import ProgressBar from '../base/progress-bar/progress-bar'
export default {
    components:{ProgressBar},
    data() {
        return {
            //当前播放的音乐
            currentsong:{}, //当前的歌曲信息
            url:null,   //当前的url
            lyric:'',   //当前的歌词
            currentLineNum:-1,  //当前歌词的所在行
            showlist:false,  //
            //percent:0.5,
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
    computed:{
        percent() { //当前时间占用的百分比
            //return this.lyric.lines[this.currentLineNum].time / this.currentSong.duration
            return 0.5
      },
    },
    methods:{
        //
        onProgressBarChange(percent){
            console.log(percent)
        },
        //audio播放
        play(){
           this.$refs.audio.play();
           if(this.currentLineNum==-1)
              this.lyric.play();
           else
           //console.log(this.currentLineNum)
             this.lyric.seek(this.lyric.lines[this.currentLineNum].time);
        },
        //audio暂停
        pause(){
            this.$refs.audio.pause();
            this.lyric.stop();
        },
        //audio播放结束
        end(){
            console.log("播放结束");
        },
        //改变列表显示
        changeshowlist(){
            this.showlist = !this.showlist;
        },
        //
        refresh(){
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id);
            this.getlyric(this.currentsong.id) ;
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
                this.url = res.data.data[0].url;
                console.log("当前的音乐",this.currentsong)
            })
            .catch(err =>{
                alert("错误")
            })
        },
        //获取歌词
        getlyric(songid){
            console.log("开始获取歌词")
            this.$axios.get('/lyric?id='+songid)
            .then(res =>{
                console.log(res.data.lrc.lyric)
                //把歌词分解成数组
                 this.lyric = new Lyric(res.data.lrc.lyric,this.handleLyric)
                 //this.lyric.play();
                 console.log(this.lyric)
               // this.lyric = res.data.lrc.lyric;
            })
            .catch(err =>{
                console.log("获取歌词失败");
            })
        },
        //改变当歌词所在行
        handleLyric({lineNum, txt}) {
            this.currentLineNum = lineNum;
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
</style>