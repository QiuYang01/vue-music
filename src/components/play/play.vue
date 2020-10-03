<template>
    <div class="play">
        <div class="backgroundimg">
            <img :src="this.currentsong.al.picUrl" width="100%" height="100%">
        </div>
        <div class="back">
            <i @click="closeplay()" style=";color:var(--color-theme)" class="fa fa-arrow-down fa-lg" aria-hidden="true"></i>
        </div>
        {{this.currentsong.al.picUrl}}
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
        <div style="max-height:70vh;overflow-y:scroll;overflow-x:hidden;">
            <p :class="['lyricitem',{'currentlyricitem': currentLineNum ===index}]" v-for="(line,index) in lyric.lines" :key="index">
                {{line.txt}}
            </p>
        </div>
        <!-- <img :src="this.currentsong.al.picUrl" alt=""> -->
        <audio v-show="false" ref="audio" style="width:90%;position: fixed;bottom: 62px;left:0px;z-index: 99; " :src="this.url" controls="controls"
         @ended="end()" >亲 您的浏览器不支持html5的audio标签</audio>
         <!-- <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar> -->
         <div class="controller">
             <div class="controller_item">
                 <i class="fa fa-list theme-color fa-lg" @click="changeshowlist()"></i> 
            </div>
             <div class="controller_item"><i class="fa fa-backward theme-color fa-lg" @click="pre"></i>  </div>
             <div class="controller_item">
                <i v-if="isplay===1" class="fa fa-pause-circle theme-color theme-color fa-2x" @click="pause()"></i> 
                <i v-else class="fa fa-play-circle theme-color theme-color fa-2x" @click="play()"></i>     
            </div>
             <div class="controller_item"><i class="fa fa-forward theme-color fa-lg" @click="next"></i> </div>
             <div class="controller_item">
                 <i class="fa fa-star-o theme-color fa-lg" aria-hidden="true"></i>
                 <i class="fa fa-star theme-color fa-lg" aria-hidden="true"></i>
              </div>
         </div>
        
        
        
        <!-- 显示播放列表 -->
        <div class="newlist" v-if="showlist">
            <li class="songli"  v-for="(song,index) in this.$store.state.songs" :key="index" @click="changecurrentindex(index)">
                <p>{{song.name}}</p>
                <p style="color: hsla(0,0%,100%,.3);">{{song.ar[0].name}}</p>
            </li>  
        </div>
        <!-- <button @click="changeshowlist()">显示列表</button> -->
        
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
            currentsong:{al:{picUrl:''},id:125}, //当前的歌曲信息
            url:null,   //当前的url
            lyric:"暂无歌词",   //当前的歌词
            
            currentLineNum:-1,  //当前歌词的所在行
            showlist:false,  //是否显示播放列表
            isplay:1, //是否在播放
            //percent:0.5,
        }
    },
    mounted(){
    },
    computed:{
        percent() { //当前时间占用的百分比
            //return this.lyric.lines[this.currentLineNum].time / this.currentSong.duration
            return 0.5
        },
        getfullScreen(){
            return this.$store.state.fullScreen;
        }
    },
    watch: {
        getfullScreen(val) {//选择了新的歌单进来 切歌
            if(!this.$store.state.fullScreen)
                return
            console.log("播放页的显示变化");
            // if(this.lyric){ //关闭之前的歌词
            //     console.log("关闭之前的歌词");
            //     this.lyric.stop();
            //     this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            // }
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id); //歌曲歌曲详情
            this.getlyric(this.currentsong.id); //获取歌词
            setTimeout(() => {
                if(this.lyric!="暂无歌词"){
                    console.log("清空歌词")
                    this.lyric.stop();
                    this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
                    this.lyric.play();
                }
                this.$refs.audio.play();
                this.isplay = 1; //图标显示
            }, 1000);
            // if(this.currentLineNum == -1){//第一次进来
            //     console.log("第一次进来")
            //     setTimeout(() => {
            //         this.$refs.audio.play();
            //         this.isplay = 1; //图标显示
            //         if(this.lyric!="暂无歌词")
            //             this.lyric.play();
            //     }, 1000);
            // }
            // else{
            //     console.log("不是第一次进来")
            //     setTimeout(() => {
            //        if(this.lyric){
            //            this.lyric.stop();
            //            this.lyric.play();
            //        } 
            //         this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            //         this.$refs.audio.play();
            //         this.isplay = 1; //图标显示
                    
            //     }, 1000);
            // }
           
        }
    },
    methods:{
         //
        onProgressBarChange(percent){
           // console.log(percent)
        },
        //前一首 切歌
        pre(){
            console.log("播放前一首");
            var newindex = this.$store.state.currentIndex-1;
            newindex = newindex<0 ? newindex+this.$store.state.songs.length :newindex;  //歌曲的下标
            this.$store.dispatch('setCurrentIndex',newindex);  //设置vuex中的CurrentIndex计数
            if(this.lyric){ //关闭之前的歌词
                console.log("关闭之前的歌词");
                this.lyric.stop();
                this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            }
            
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id); //歌曲歌曲详情
            this.getlyric(this.currentsong.id); //获取歌词
             setTimeout(() => {
                this.play();
            }, 1000);           
        },
        //后一首 切歌
        next(){
            console.log("播放后一首");
            var newindex = this.$store.state.currentIndex+1;
            newindex = newindex>=this.$store.state.songs.length ? newindex%this.$store.state.songs.length :newindex;
            this.$store.dispatch('setCurrentIndex',newindex);  //设置vuex中的CurrentIndex计数
            if(this.lyric){ //关闭之前的歌词
                console.log("关闭之前的歌词")
                this.lyric.stop();
                this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            }
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id);
            this.getlyric(this.currentsong.id);
            setTimeout(() => {
                    this.play(); 
                }, 1000);
        },
        //audio播放
        play(){
           console.log("播放")
           this.$refs.audio.play();
           this.isplay = 1; //图标显示
            if(this.currentLineNum==-1) //刚开始播放
                this.lyric.play();
            else //暂停后的播放
                this.lyric.seek(this.lyric.lines[this.currentLineNum].time);
        },
        //audio暂停
        pause(){
            console.log("暂停");
            this.$refs.audio.pause();
            this.isplay = 0; //图标显示
            this.lyric.stop();
        },
        //在歌曲列表中选择其他歌曲
        changecurrentindex(currentIndex){
            this.$store.dispatch('setCurrentIndex',currentIndex);
            if(this.lyric){ //关闭之前的歌词
                console.log("关闭之前的歌词")
                this.lyric.stop();
                this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            }
            if(!this.$store.state.songs[this.$store.state.currentIndex]){
                return
            }
            //重新获取歌曲详情，歌词
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id);
            this.getlyric(this.currentsong.id);
            this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            setTimeout(() => {
                this.play(); //默认自动播放
            }, 1000);
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
            if(!this.$store.state.songs[this.$store.state.currentIndex]){
                return
            }
            //重新获取歌曲详情，歌词
            this.currentsong = this.$store.state.songs[this.$store.state.currentIndex];
            this.getSongdetail(this.currentsong.id);
            this.getlyric(this.currentsong.id);
            this.currentLineNum = -1;  //切换歌曲是把当前的歌词行置空
            setTimeout(() => {
                this.play(); //默认自动播放
            }, 1000);
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
                console.log("歌词",res)
                //把歌词分解成数组
                 this.lyric = new Lyric(res.data.lrc.lyric,this.handleLyric)
                 //this.lyric.play();
                // console.log(this.lyric)
               // this.lyric = res.data.lrc.lyric;
            })
            .catch(err =>{
                console.log("获取歌词失败");
                this.lyric="暂无歌词";
            })
        },
        //改变当歌词所在行
        handleLyric({lineNum, txt}) {
            console.log(lineNum)
            this.currentLineNum = lineNum;
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