<template>
    <div>
        <solid effect="zoom" height="30vh" :list = this.bannersPicUrls></solid>
        <h2 style="text-align:center;color:var(--color-theme);font-size:1.2em">热门歌单推荐</h2>
        <!-- <scroll  ref="scroll" :data="playlists"> -->
        <div style="display: flex;flex-wrap: wrap;width:98%;margin:0 auto;">
            <div v-for="(item,index) in playlists" :key="index" style=" flex: 1 0 100px;margin:10px" @click="goToSongList(item.id)"> 
                <img width="100%" :src="item.picUrl" alt="">
                <div>
                    <p style="font-size:0.8em;color:var(--color-theme)">{{item.name}}</p>
                </div>
            </div>
        </div>
        <!-- </scroll> -->
        <router-view></router-view>
    </div>
</template>
<script>
// import {getRecommend} from '../../api/recommend.js'
// import {ERR_OK} from '../../api/config.js'
import solid from './solid.vue'   //引入自定义的轮播图组件
import Scroll from '../base/scroll.vue'
export default {
    components:{solid,Scroll},
    data() {
        return {
           bannersPicUrls:[], //轮播图的图片url
           playlists:[], //歌单
        }
    },
    mounted(){
        //获取轮播图的信息 http://music.gnnu.work/#/recommend
        this.$axios.get("/banner?type=2")
        .then(res =>{
            for(let i=0,len=res.data.banners.length; i<len; i++){
                this.bannersPicUrls.push(res.data.banners[i].pic)  //获取轮播图的图片url
            }
           //console.log("bannerurl",this.bannersPicUrls)
        })
        .catch(err =>{
            console.log(err)
        });

        //获取歌单
        this.$axios.get("/personalized") 
        .then(res =>{
            //console.log(res);
            this.playlists = res.data.result;
            //console.log(this.playlists)
        })
        .catch(err =>{
            console.log(err)
        });
    },
    methods:{
       
        //进入歌单详情 
        goToSongList(playListId){
           this.$router.push({
          path: `/recommend/songlist/${playListId}`
        })
            
        }
    }
}
</script>