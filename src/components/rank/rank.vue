<template> <!--  /*显示榜单*/ -->
   <div  style="width:96%;margin:0 auto;">   
        <div v-loading='isloading' v-for="list in lists" :key="list.id">
            <div class="toplist" :style="{ backgroundImage: 'url('+ list.coverImgUrl+')'}">
                <span style=";color:#fff" class="title">{{list.name}}<br/></span>
                <span style="font-size:14px">{{list.updateFrequency}}</span><br/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lists:[], 
            isloading:true  
        }
    },
    mounted(){
        this.getalltoplist();
    },
    methods:{
         
        getalltoplist(){    //所有榜单信息
            this.$axios.get('/toplist')
            .then(res =>{
                console.log("所有榜单");
                console.log(res.data.list);
                this.lists = res.data.list;
                this.isloading = false;
            })
            .catch(err =>{
                console.log(err);
            })
        },
       
    }
}
</script>
<style scoped>
.toplist {
    width: 100%;
    height: 20vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 2vh;
    overflow: hidden;
  
    
}
.showdetail {   /*显示榜单详情的弹框*/
    width: 94%;
    margin: 0 auto;
    max-height: 90vh;
    background-color: beige;
    position: fixed;
    top: 1vh;
    float: left;
    z-index: 100;
   
}
</style>>
    
