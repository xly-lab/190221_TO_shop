/*
* 使用mockjs提供mock 数据接口
* */
import Mock from 'mockjs'
import data from './data.json'

//模拟goods的接口
Mock.mock('/goods',{code:0,data:data.goods})
//模拟retings的接口
Mock.mock('/ratings',{code:0,data:data.ratings})
//模拟info的接口
Mock.mock('/info',{code:0,data:data.info})

