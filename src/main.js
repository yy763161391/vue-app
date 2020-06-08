import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './config/rem'
// import style
Vue.use(VueAwesomeSwiper)

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAwesomeSwiper)