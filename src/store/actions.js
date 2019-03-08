/*
* 通过mutation间接更新state的对个方法对象*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
}from './mutation-types'
import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShop
}from '../api'
export default {
  //异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //  提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //异步获取食品分类列表
  async getFoodTypes ({commit}) {
    // 发送异步ajax请求
    const result = await reqFoodTypes()
    //  提交一个mutation
    if (result.code === 0) {
      const foodtypes = result.data
      commit(RECEIVE_FOODTYPES, {foodtypes})
    }
  },

  async getShops ({commit, state}) {
    // 发送异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    //  提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  //同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})

  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const  result = await reqUserInfo()
    if(result.id === 0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  async logout(commit){
    const  result = await reqLogout()
    if(result.id === 0){
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },
// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },
// 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
// 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      //数据更新了，通知组件
      callback && callback()
    }
  },
  updateFoodCount({commit},{isAdd,food}){
      if(isAdd){
        commit(INCREMENT_FOOD_COUNT,{food})
      }else{
        commit(DECREMENT_FOOD_COUNT,{food})
      }
  },
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  async searchShops({commit,state},keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash,keyword)
    if(result.code===0) {
      const SearchShops = result.data

      commit(RECEIVE_SEARCH_SHOPS, {SearchShops})
    }
  },
}
