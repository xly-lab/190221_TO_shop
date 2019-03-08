<template>
    <div id="app">
      <router-view/>
      <FooterGuide v-show="$route.path==='/msite' ||$route.path==='/order' ||$route.path==='/search' ||$route.path==='/profile'  "/>
    </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqFoodTypes} from './api'
import {mapActions} from 'vuex'
export default {

  mounted(){

    // const result = await reqFoodTypes()
    // console.log(result)
      // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  },
    components:{
      FooterGuide
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app
      width 100%
      height 100%
      background #f5f5f5
      position relative
</style>
