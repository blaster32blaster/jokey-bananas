import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CatchBanana from '@/components/CatchBanana'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/catch-banana',
      name: 'CatchBanana',
      component: CatchBanana
    }
  ]
})
