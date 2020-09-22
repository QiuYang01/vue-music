<template>
    <div class="songlist">
        <loading v-if="loading"></loading>
        <h2 class="back" @click="back()"><i style="color:var(--color-theme)" class="fa fa-chevron-left fa-lg" aria-hidden="true"></i> 返回</h2>
        <!-- 歌曲列表 传入歌单的id -->
        <div style="width:100%">
            <img width="100%" :src="this.playLists.coverImgUrl" alt="这是一张图片">
        </div>
        <div class="randplay">
             
            <span style="padding:3px 12px;border:1px solid var(--color-theme);border-radius:10px"><i class="fa fa-play-circle" aria-hidden="true"></i>&nbsp;全部随机播放</span>
        </div>
        <div class="list">
            <li class="songli"  v-for="(song,index) in playLists.songs" :key="index" @click="toplay(index)">
                <p>{{song.name}}</p>
                <p style="color: hsla(0,0%,100%,.3);">{{song.ar[0].name}}</p>
            </li>  
        </div>

    </div>
</template>
<script>
import Loading from "../base/loading" 
export default {
    components:{Loading},
    data() {
        return {
            loading:true,
            playListId:2977521086,  //  歌单的id
            playLists:{
                coverImgUrl:null,
                songs:[],

            }
        }
    },
    created() {
      this.getSongList(this.$route.params.songlistid); 
    },
    methods:{
        //显示播放界面，保存歌曲列表和当前歌曲的下标
        toplay(currentIndex){
            console.log(currentIndex)
            this.$store.dispatch('setCurrentIndex',currentIndex);
            this.$store.dispatch('setFullScreen',true);
            //把当前歌曲列表保存在vuex中
            this.$store.dispatch('setSongs',this.playLists.songs); 
        },
        //通过歌单的id获取歌单的详情歌曲
        getSongList(id){
           this.$axios.get(`/playlist/detail?id=${id}`)
            .then(res =>{
                console.log(res.data)
                this.playLists.coverImgUrl = res.data.playlist.coverImgUrl; //给歌单的图片赋地址
                // res.data.playlist.tracks
                let length =res.data.playlist.tracks.length; 
                console.log("歌曲的个数"+length)
                for(let i=0; i<length; i++)   //this.check(res.data.playlist.tracks[1].id);
                {
                    // if(this.check(res.data.playlist.tracks[i].id))
                    this.playLists.songs.push(res.data.playlist.tracks[i]);
                   // console.log(this.check(res.data.playlist.tracks[i].id))

                }
                this.loading = false;
                console.log(this.playLists);
            })
            .catch(err =>{
                console.log(err)
            });
        },
        //通过id核对音乐是否有效
        check(id){
            this.axios.get("http://music.gnnu.work:4001/check/music?id="+id)
            .then(res =>{
                console.log(res.data.success);
                return res.data.success;
                
            })
            .catch(err =>{
                console.log(err)
            });
        },
        //http://music.gnnu.work:4001/check/music?id=1347529801 通过歌曲的id查看音乐是否可用
        //http://music.gnnu.work:4001/song/url?id=1347529801  通过歌曲的id获取音乐的url
        //返回
        back(){
            this.$router.back()
        }


    },
    // created() {
    //     this.getSongList();
    // },
}
</script>
<style scope>
.songlist {
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
.back {
    font-size: 1.4em;
    position: absolute;
    margin: 10px;
    color: #fff;
}
.randplay {
    text-align: center;
    position: relative;
    top: -100px;
    color: var(--color-theme);
}
.list {
    position: relative;
    top: -80px;
    background: rgba(22, 22, 22, 0.8);
    padding-top: 30px;
}

.songli {
    font-size: 0.8em;
    padding: 0 20px 20px 30px;
    color:#FFF;
}
.songli p {
    margin: 0;
}
.songli :last-child {
    margin: 3px;
}
</style>