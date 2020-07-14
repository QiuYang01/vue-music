<template>
    <div>
        recommend
    </div>
</template>
<script>
import {getRecommend} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js'
export default {
    data() {
        return {
            
        }
    },
    created(){
        this.getRecommend();
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