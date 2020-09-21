import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect: '/recommend'
    },
    {
      path:"/songlist",
      component: ()=>
          import ('@/components/songList/songList.vue'),
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/recommend",
      component: ()=>
          import ('@/components/recommend/recommend.vue'),
          children: [
            {
              path: 'songlist/:songlistid',
              component: ()=>
              import ('@/components/songList/songList.vue'),
            },
            {
              path: 'song/:songid',
              component: ()=>
              import ('@/components/play/play.vue'),
            },
          ]
      
    },
    {
      path:"/singer",
      component: ()=>
          import ('@/components/singer/singer.vue'),
    },
    {
      path:"/rank",
      component: ()=>
          import ('@/components/rank/rank.vue'),
    },
    {
      path:"/search",
      component: ()=>
          import ('@/components/search/search.vue'),
    },
  ]
})
