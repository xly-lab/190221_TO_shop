
import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login'
import ShortMessage from '../pages/ShortMessage/ShortMessage'
import LongMessage from '../pages/LongMessage/LongMessage'
//声明使用插件

Vue.use(VueRouter)

export default new VueRouter({

  routes:[
    {
      path:'/msite',
      component:Msite
    },
    {
      path:'/order',
      component:Order
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/login',
      component:Login,
      children:[
        {
          path:'/shortmessage',
          component:ShortMessage
        },
        {
          path:'/longmessage',
          component:LongMessage
        },
        {
          path:'/',
          redirect:'/shortmessage'
        },
      ]
    }
  ]
})
