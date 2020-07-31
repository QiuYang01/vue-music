<template>
    
    
    <div class="songlist">
        <h2 class="back" @click="back()"><font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" /> 返回</h2>
        <!-- 歌曲列表 传入歌单的id -->
        <div style="width:100%">
            <img width="100%" style="height:30vh" :src="this.playLists.coverImgUrl" alt="图片">
        </div>
        </br>
        <div v-for="(song,index) in playLists.songs" :key="index">
            <li class="songli" >
                <p>{{song.name}}</p>
                <p style="color: hsla(0,0%,100%,.3);">{{song.ar[0].name}}</p>
            </li>  
            
        </div>




    </div>
</template>
<script>
export default {
    data() {
        return {
            playListId:2977521086,  //  歌单的id
            playLists:{
                coverImgUrl:null,
                songs:[],

            }
        }
    },
    created() {
       // console.log('11111111111111')
     // console.log(this.$route.params.id) ;
      this.getSongList(this.$route.params.id); 
    },
    methods:{
        //通过歌单的id获取歌单的详情歌曲
        getSongList(id){
           this.axios.get(`http://music.gnnu.work:4001/playlist/detail?id=${id}`)
            .then(res =>{
                console.log(res.data.playlist.tracks[1].id)
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
                console.log(res.data.success)
                //this.playLists.coverImgUrl = res.data.playlist.coverImgUrl; //给歌单的图片赋地址
                // res.data.playlist.tracks
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
.songli {
    font-size: 0.8em;
    padding: 0 20px 20px 20px;
    color:#FFF;
}
.songli p {
    margin: 0;
}
.songli :last-child {
    margin: 3px;
}
</style>