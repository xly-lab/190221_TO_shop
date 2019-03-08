/*
* 入口js
* */
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './filters'
import loading from './common/imgs/loading.gif'
import './mock/mockServer'//加载mockServer
//注册全局组件标签

Vue.use(VueLazyload, {
  loading
})


Vue.component(Button.name,Button)
new Vue({
  el:'#app',
  render:h=>h(App),
  router,//使用上vue-router
  store,//使用上vuex
  // component:{App},
  // template:'<App/>'
})

