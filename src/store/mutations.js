/*
* 直接更新state的对个方法对象
*
* */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
}from './mutation-types'
export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_FOODTYPES](state,{foodtypes}){
    state.foodtypes = foodtypes
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  //同步记录用户信息
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
      if(!food.count){//第一次增加
        // food.count=1//新增加的属性（没有数据绑定）
        Vue.set(food,'count',1)//让新增的属性有数据绑定
        //将food添加到cartFoods中
        state.cartFoods.push(food)
      }else{
        food.count++
      }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
      if(food.count){//只有有值才能减
        food.count--
        if(food.count===0){
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }
  },
  [CLEAR_CART](state){
    //1清除food中count

    //移除购物车中所有购物想
    state.cartFoods.forEach(food=>food.count=0)

    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS](state,{SearchShops}){
    state.SearchShops=SearchShops
  }
}
