
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

const Msite =()=>import('../pages/Msite/Msite.vue')
const Order =()=>import('../pages/Order/Order.vue')
const Profile =()=>import('../pages/Profile/Profile.vue')
const Search =()=>import('../pages/Search/Search.vue')

import Login from '../pages/Login/Login'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import Shop from '../pages/Shop/Shop.vue'

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
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/shopgoods',
          component:ShopGoods,
        },{
          path:'/shop/shopratings',
          component:ShopRatings,
        },{
          path:'/shop/shopinfo',
          component:ShopInfo,
        },
        {
          path:'/',
          redirect: '/shop/shopgoods'
        }
        ]
    }
  ]
})
