import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions' 
import getters from './getters' 
Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  geohash: '31.22299,121.36025',//地址geohash值
  cartList:{},//购物车列表
  userInfo:null,//用户信息
  login:false,//是否登录
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
