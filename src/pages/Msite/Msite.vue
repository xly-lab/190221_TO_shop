<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="!userInfo._id ? '/login' : '/userInfo'" class="header_login" slot="right">
        <span class="header_login_text" @click="$router.replace('/login')"v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" @click="$router.replace('/login')" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodtypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(foodtypes,index) in foodtypesArr" :key="index">
            <a href="javascript:" class="link_to_food"  v-for="(foodtype,index) in foodtypes" :key="index">
              <div class="food_container">
                <img :src="imageUrl+'/'+foodtype.image_url">
              </div>
              <span>{{foodtype.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" atl="back" v-else>

    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>

  import {mapState} from 'vuex'

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    data(){
      return {
        imageUrl:'http://fuss10.elemecdn.com'
      }
    },
    mounted(){
      this.$store.dispatch('getFoodTypes')
      this.$store.dispatch('getShops')
      //创建一个Swiper对象
    },
    components:{
      HeaderTop,
      ShopList
    },
    computed:{
      ...mapState(['userInfo','address','foodtypes','shops']),
      foodtypesArr(){
        const {foodtypes}=this
        const arr = []
        let minArr =[]
        foodtypes.forEach(c=>{

          if(minArr.length===8)
          {
            minArr=[]
          }
          if(minArr.length===0)
          {
            arr.push(minArr)

          }
          minArr.push(c)
        })
        return arr
      }
    },
    watch:{
      foodtypes(value){
        // setTimeout(()=>{
        //
        // },10)
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            loop:true,//循环轮播
            //如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })

        })
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
