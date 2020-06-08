import App from '../App'
import home from '../page/home/home'
import city from '../page/city/city'
import msite from '../page/msite/msite'
import food from '../page/food/food'
import shop from '../page/shop/shop'
import login from '../page/login/login'
import forget from '../page/forget/forget'

export default [{
  path:'/',
  component: App,//顶层路由  对应index.html
  children:[
    //二级路由
    //地址为空时跳转到home页面
    {
      path:'',
      redirect:'/home' //重定向
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/city/:cityId',
      component:city
    },
    {
      path:'/msite',
      component:msite
    },
    //轮播图特殊商铺类型
    {
      path:'/food',
      component:food
    },
    {
      path:'/shop',
      component:shop
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/forget',
      component:forget
    }
  ]
}]
