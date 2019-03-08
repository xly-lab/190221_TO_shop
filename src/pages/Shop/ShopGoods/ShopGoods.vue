<template>
  <div>
    <div class="goods">
      <!--current-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item " :class="{current:index === currentIndex}" v-for="(good,index) in goods"
              :key="index" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon"v-show="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(goodAll,index) in goods" :key="index" >
            <h1 class="title">{{goodAll.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in goodAll.foods" >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" @click="showFood(food)">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food ref="food" :food="food"/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    components:{
      CartControl,
      Food,
      ShopCart
    },
    data(){
      return{
        scrollY:0,//右侧滑动的Y轴坐标（滑动过程中实时变化）
        tops:[],//所有右侧分类li的top组成的数组（列表第一次显示后不再变化）
        food:{},//需要显示的food
      }
    },
    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          //列表显示之后创建
          this._initScroll()
          this._initTops()
        })
      })
    },
    computed:{
      ...mapState(['goods']),
      //计算当前分类的坐标
      //1在滑动过程中实时收集scollY
      //2列表第一次显示后，收集tops
      //3实现currentIndex的计算逻辑
      currentIndex(){
        //得到条件数据
        const {scrollY,tops} = this
        //根据条件计算产生一个结果
        const index = tops.findIndex((top,index)=>{
          //scollY>=当前top && scollY<下个tops[index+1]
          return scrollY >= top && scrollY<tops[index+1]
        })
        //返回结果
        return index
        // console.log(index)
      }
    },
    methods:{
      //初始化滚动条
      _initScroll(){
        new BScroll('.menu-wrapper',{
            click:true
        })
        this.foodScroll=new BScroll('.foods-wrapper',{
          probeType:2,
          click:true
        })

        //给右侧列表绑定scoll事件
        this.foodScroll.on('scroll',({x,y})=>{
          this.scrollY = Math.abs(y)

        })

        this.foodScroll.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)

        })
      },
      showFood(food){
        this.food = food
        this.$refs.food.toggleShow()
      },
      clickMenuItem(index){
        // console.log(index)
        //使右侧列表滑动到对应的位置
        const scrollY = this.tops[index]
        this.scrollY = scrollY
        this.foodScroll.scrollTo(0,-scrollY,500)
      },
      _initTops(){
        //1初始化tops
        const tops=[]
        let top =0
        tops.push(top)
        //2找到所有分类的li
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        // console.log(lis)
        Array.prototype.slice.call(lis).forEach(li =>{
          top+=li.clientHeight
          tops.push(top)
        })
        //3、更新状态
        this.tops= tops
        // console.log(tops)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
