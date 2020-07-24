<template>
    <div>
        <!-- <div v-for="item in banners" :key="item.id"> 
            <img :src="item.pic" alt="">{{item.pic}}
        </div> -->
        <solid effect="zoom" height="30vh" :list = this.bannersPicUrls></solid>
        <h2 style="text-align:center;color:var(--color-theme);font-size:1.2em">热门歌单推荐</h2>
        <!-- <scroll :data="playlists"> -->
        <div style="display: flex;flex-wrap: wrap;width:98%;margin:0 auto;">
            <div v-for="(item,index) in playlists" :key="index" style=" flex: 1 0 100px;margin:10px" > 
                <img width="100%" :src="item.picUrl" alt="">
                <div>
                    <p style="font-size:0.8em;color:var(--color-theme)">{{item.name}}</p>
                </div>
            </div>
        </div>
        <!-- </scroll> -->
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
    created(){
        //获取轮播图的信息 http://music.gnnu.work/#/recommend
        this.axios.get("http://music.gnnu.work:4001/banner?type=2")
        .then(res =>{
            //console.log(res);
            //this.banners = res.data.banners;
            for(let i=0,len=res.data.banners.length; i<len; i++){
               // console.log(res.data.banners[i].pic)
                this.bannersPicUrls.push(res.data.banners[i].pic)  //获取轮播图的图片url
            }
           //console.log(this.bannersPicUrls)
        })
        .catch(err =>{
            console.log(err)
        });

        //http://122.51.65.4:4001/top/playlist?limit=10&order=new  获取歌单的接口
        this.axios.get("http://122.51.65.4:4001/personalized") 
        //获取歌单详情 http://122.51.65.4:4001/playlist/detail?id=364899999
        .then(res =>{
            console.log(res);
            this.playlists = res.data.result;
            console.log(this.playlists)
        })
        .catch(err =>{
            console.log(err)
        });
    },
    methods:{
        getRecommend(){
            getRecommend().then((res) =>{
                console.log(res)
            })
        }
    }
}
</script>