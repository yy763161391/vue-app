<template>
    <div>
        <section class="shop_container" v-if="!showLoading">
            <div class="goback" @click="goback">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
                </svg>
            </div>
            <header class="shop_detail_header">
                <div class="header_cover_img_con">
                    <img :src="imgBaseUrl + restaurantDetails.image_path" alt="">
                </div>
                <section class="description_header"> 
                    <router-link class="description_top" to="/">
                        <section class="description_left">
                            <img :src="imgBaseUrl + restaurantDetails.image_path" alt="">
                        </section>
                        <section class="description_right">
                            <h4 class="description_title ellipsis">{{restaurantDetails.name}}</h4>
                            <p class="description_text">商家配送／{{restaurantDetails.order_lead_time}}分钟送达／配送费¥{{restaurantDetails.float_delivery_fee}}</p>
                            <p class="description_promotion ellipsis">公告：{{restaurantDetails.promotion_info}}</p>
                        </section>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                            <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </router-link>
                    <footer class="description_footer" v-if="activitiesLength" @click="activityClick">
                        <p class="ellipsis">
                            <span class="tip_icon">{{restaurantDetails.activities[0].icon_name}}</span>
                            <span>{{restaurantDetails.activities[0].description}}（APP专享）</span>
                        </p>
                        <p>
                            {{activitiesLength}}个活动
                        </p>
                        <svg class="footer_arrow" :class="{rotateZ:showActivities}">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer>
                </section>
            </header>
            <!-- 下拉活动详情 -->
            <transition name="fade">
                    <section class="activities_details" v-show="showActivities">
                        <h2 class="activities_shoptitle">优惠信息</h2>
                        <section class="activities_list">
                            <ul>
                                <li v-for="item in restaurantDetails.activities" :key="item.id">
                                    <span class="tip_icon">{{item.icon_name}}</span>
                                    <span>{{item.description}}（APP专享）</span>
                                </li>
                            </ul>
                        </section>
                    
                        <h2 class="activities_shoptitle">商家公告</h2>
                        <section class="activities_shopinfo">
                            <p>
                                {{restaurantDetails.promotion_info}}
                            </p>
                        </section>

                        <p class="arrow_wrapper" @click="activityClick">
                            <svg data-v-6cc1fce6="" width="18" height="18" xmlns="http://www.w3.org/2000/svg" version="1.1" class="footer_arrow">
                                <path data-v-6cc1fce6="" d="M0 0 L10 8 L0 16" stroke="#bbb" stroke-width="2" fill="none"></path>
                            </svg>
                        </p>
                        
                    </section>
                
            </transition>
            <transition name="showcover">
                <div class="back_cover" v-show="showActivities"></div>
            </transition>
            <section class="change_show_type">
                <div>
                    <span :class="{activity_show:changeShowType=='food'}" @click="changeShowType='food'">商品</span>
                </div>
                <div>
                    <span :class="{activity_show:changeShowType=='rating'}" @click="changeShowType='rating'">评价</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section class="food_container" v-show="changeShowType == 'food'">
                    <section class="menu_container">
                        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <!-- activity_menu -->
                                <li class="menu_left_li" :class="{activity_menu:index == menuIndex}" v-for="(item,index) in shopMenus" :key="item.id" @click="chooseMenu(index)">
                                    <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="category_num" v-if="categoryNum[index]">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu_right" ref="menuFoodList">
                            <ul >
                                <li v-for="value in shopMenus" :key="value.id">
                                    <header class="menu_detail_header">
                                        <section class="menu_detail_header_left">
                                            <strong class="menu_item_title">{{value.name}}</strong>
                                            <span class="menu_item_description">{{value.description}}</span>
                                        </section>
                                        <span class="menu_detail_header_right" @click="menuHeaderRight"></span>
                                        <p class="description_tip" v-show="menuDetailHeaderRight">
                                            <span>{{value.name}}</span>
                                            {{value.description}}
                                        </p>
                                    </header>
                                    <section class="menu_detail_list" v-show="value.foods" v-for="(item,index) in value.foods" :key="index">
                                        <router-link to="/" tag="div" class="menu_detail_link">
                                            <section class="menu_food_img">
                                                <img :src="imgBaseUrl + item.image_path" alt="">
                                            </section>
                                            <section class="menu_food_description">
                                                <h3 class="food_description_head">
                                                    <strong class="description_foodname">{{item.name}}</strong>
                                                    <ul class="attributes_ul">
                                                        <li :class="{attribute_new:title.icon_name =='新'}" v-if="title" v-for="(title,index) in item.attributes" :key="index" :style="{color: '#' + title.icon_color,borderColor:'#' + title.icon_color}">
                                                            <p :style="{color: title.icon_name == '新'? '#fff' : '#' + title.icon_color}">{{title.icon_name == '新' ? '新品':title.icon_name}}</p>
                                                        </li>
                                                    </ul>
                                                </h3>
                                                <p class="food_description_content">{{item.description}}</p>
                                                <p class="food_description_sale_rating">
                                                    <span>月售{{item.month_sales}}份</span>
                                                    <span>好评率{{item.satisfy_rate}}%</span>
                                                </p>
                                                <p class="food_activity" v-if="item.activity">
                                                    <span>{{item.activity.image_text}}</span>
                                                </p>
                                            </section>
                                        </router-link>
                                        <footer class="menu_detail_footer">
                                            <section class="food_price">
                                                <span>¥</span>
                                                <span>{{item.specfoods[0].price}}</span>
                                                <span v-if="item.specifications.length">起</span>
                                            </section>
                                            <buy-cart :restaurantId="restaurantId" :item="item" @showChooseList="showChooseList" @showReduceTip="showReduceTip"></buy-cart>
                                        </footer>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                    <section class="buy_cart_container">
                        <section class="cart_icon_num" @click="toggleCartList">
                            <div class="cart_icon_container" :class="{cart_icon_activity:totalPrice > 0 }">
                                <span class="cart_list_length" v-if="totalNum">
                                    {{totalNum}}
                                </span>
                                <svg class="cart_icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                                </svg>
                            </div>
                            <div class="cart_num">
                                <div>¥{{totalPrice}}</div>
                                <div>配送费5</div>
                            </div>
                        </section>
                        <section class="gotopay" :class="{gotopay_acitvity:totalPrice > 0}">
                            <span class="gotopay_button_style" v-if="totalPrice<20">还差20起送</span>
                            <router-link to="/" class="gotopay_button_style" v-else>去结算</router-link>
                        </section>
                    </section>
                    <transition name="toggle-cart">
                        <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
                            <header>
                                <h4>购物车</h4>
                                <div @click="clearCart">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                                    </svg>
                                    <span class="clear_cart">清空</span>
                                </div>
                            </header>
                            <section class="cart_food_details">
                                <ul>
                                    <li class="cart_food_li" v-for="(item,index) in cartFoodList" :key="index">
                                        <div class="cart_list_num">
                                            <p class="ellipsis">{{item.name}}</p>
                                            <p class="ellipsis">{{item.specs}}</p>
                                        </div>
                                        <div class="cart_list_price">
                                            <span>¥</span>
                                            <span>{{item.price}}</span>
                                        </div>
                                        <section class="cart_list_control">
                                            <span @click="reduceCart(item.category_id,item.item_id,item.food_id)">
                                                <svg>
                                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                                </svg>
                                            </span>
                                            <span class="cart_num">{{item.num}}</span>
                                            <svg class="cart_add" @click="addCart(item.category_id,item.item_id,item.food_id,item.name,item.price,item.specs)">
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                            </svg>
                                        </section>
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </transition>
                    <transition name="showcover">
                        <div class="back_cover" v-show="showCartList&&cartFoodList.length"></div>
                    </transition>
                </section>
            </transition>
            <transition name="fade-choosed">
                <section class="rating_container" id="ratingContainer" v-show="changeShowType == 'rating'">
                    <section>
                        <header class="rating_header">
                            <section class="rating_header_left">
                                <p>{{ratingScoresData.overall_score.toFixed(1)}}</p>
                                <p>综合评价</p>
                                <p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(0)}}%</p>
                            </section>
                            <section class="rating_header_right">
                                <p>
                                    <span>服务态度</span>
                                    <rating-star class="rating_star" :rating="ratingScoresData.service_score"></rating-star>
                                    <span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>
                                </p>
                                <p>
                                    <span>菜品评价</span>
                                    <rating-star class="rating_star" :rating="ratingScoresData.food_score"></rating-star>
                                    <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                                </p>
                                <p>
                                    <span>送达时间</span>
                                    <span class="delivery_time">{{ratingScoresData.deliver_time}}分钟</span>
                                </p>
                            </section>
                        </header>
                        <ul class="tag_list_ul">
                            <li  v-for="(item,index) in ratingTags" :key="index" :class="{unsatisfied:item.unsatisfied,tagActivity:ratingTagIndex == index}" @click="changeTagIndex(index)">{{item.name}}({{item.count}})</li>
                        </ul>
                        <ul class="rating_list_ul">
                            <li class="rating_list_li" v-for="(item,index) in ratingReviews" :key="index">
                                <img :src="getImgPath(item.avatar)" class="user_avatar">
                                <section class="rating_list_details">
                                    <header>
                                        <section class="username_star">
                                            <p class="username">{{item.username}}</p>
                                            <p class="star_desc">
                                                <rating-star :rating="item.rating_star"></rating-star>
                                                <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                                            </p>
                                        </section>
                                        <time class="rated_at">{{item.rated_at}}</time>
                                    </header>
                                    <ul class="food_img_ul">
                                        <li v-for="(child,index) in item.item_ratings" :key="index">
                                        <img :src="getImgPath(child.image_hash)" v-if="child.image_hash">
                                        </li>
                                    </ul>
                                    <ul class="food_name_ul">
                                        <li class="ellipsis" v-for="(child,index) in item.item_ratings" :key="index">
                                            {{child.food_name}}
                                        </li>
                                    </ul>
                                </section>
                            </li>
                        </ul>
                    </section>

                    
                </section>
            </transition>
        </section>
        <section>
            <transition name="fade">
                <div class="specs_cover" v-if="showSpecs"></div>
            </transition>
            <transition name="fadeBounce">
                <div class="specs_list" v-if="showSpecs">
                    <header class="specs_list_header">
                        <h4 class="ellipsis">{{choosedFoods.name}}</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="specs_cancel" @click="showChooseList">
                            <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                            <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                        </svg>
                    </header>
                    <section class="specs_details">
                        <h5 class="specs_details_title">{{choosedFoods.specifications[0].name}}</h5>
                        <ul>
                            <li v-for="(item,index) in choosedFoods.specfoods" :key="index" :class="{specs_activity: index == chooseIndex}" @click="chooseSpecs(index)">
                                {{item.specs[0].value}}
                            </li>
                        </ul>
                    </section>
                    <footer class="specs_footer">
                        <div class="specs_price">
                            <span>¥</span>
                            <span>{{choosedFoods.specfoods[chooseIndex].price}}</span>
                        </div>
                        <div class="specs_addto_cart" @click="addSpecs(choosedFoods.category_id,choosedFoods.item_id,choosedFoods.specfoods[chooseIndex].food_id,choosedFoods.specfoods[chooseIndex].name,choosedFoods.specfoods[chooseIndex].price,choosedFoods.specfoods[chooseIndex].specs_name,choosedFoods.specfoods[chooseIndex].packing_fee,choosedFoods.specfoods[chooseIndex].sku_id,choosedFoods.specfoods[chooseIndex].stock)">加入购物车</div>
                    </footer>
                </div>
            </transition>
        </section>
        <transition name="fade">
            <p class="show_delete_tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
        </transition>
    </div>
</template>

<script>
import {shopDetails,shopMenus, shopList,shopScore,shopReviews,shopTag} from '../../service/getData'
import {getImgPath} from '../../components/common/mixin'
import BScroll from 'better-scroll'
import buyCart from '@/components/common/buyCart'
import ratingStar from '@/components/common/ratingStar'
import { mapMutations, mapState } from 'vuex'
export default {
    data(){
        return {
            geohash:'', //经纬度
            restaurantId:null,//餐馆id
            restaurantDetails:'',//餐馆信息
            shopMenus:[],//商家菜单
            showActivities:false,//是否显示活动详情
            activitiesLength:null,//活动数量
            menuDetailHeaderRight:false,//头部右侧省略号
            shopListTop:[],//菜单高度
            foodScroll: null,  //食品列表scroll
            showLoading:true,
            menuIndex: 0, //已选菜单索引值，默认为0
            menuIndexChange:true,//解决index在确定之后,scroll滚动时一直对index的监听和修改
            choosedFoods: null, //当前选中视频数据
            showSpecs:false,//是否展示规格
            chooseIndex:null,//默认规格
            showDeleteTip:false,//删除提示信息
            timer:null,//计时器记录
            categoryNum:[],//左边菜单在购物车添加产品时红点里显示的数字
            totalPrice:null,//总价
            cartFoodList:[],//购物车列表
            showCartList:false,//显示购物车列表
            ratingScoresData:null,//评论详情
            ratingTags:null,//评论标签分类
            ratingTagIndex:0,//评论标签索引
            ratingReviews:null,//评论信息
            ratingScroll:null,//评论区滚动
            offset:0,//评论区跳过评论数
            changeShowType:'food',
            imgBaseUrl:'/img/'
        }
    },
    created(){
        this.geohash = this.$route.query.geohash;
        this.restaurantId = this.$route.query.id;
        
    },
    mounted(){
        this.initData();
        
    },
    mixins:[getImgPath]
    ,
    computed:{
        ...mapState(['latitude','longitude','cartList']),
        //获取当前餐馆的cartList信息
        shopCart: function(){
            return {...this.cartList[this.restaurantId]}
        },
        totalNum: function(){
            let num = 0;
            this.cartFoodList.forEach(item=>{
                num += item.num
            })
            return num
        }
    },
    components:{
        buyCart,
        ratingStar
    },
    methods:{
        ...mapMutations(['ADD_CART','REDUCE_CART','CLEAR_CART']),
        async initData(){
            this.restaurantDetails = await shopDetails(this.restaurantId)
            this.shopMenus = await shopMenus(this.restaurantId)
            this.ratingScoresData = await shopScore(this.restaurantId)
            this.ratingTags = await shopTag(this.restaurantId)
            this.ratingReviews = await shopReviews(this.restaurantId,this.offset,10)
            this.activitiesLength = this.restaurantDetails.activities.length //优惠信息的length
            this.hideLoading()
            this.$nextTick(()=>{
                this.getFoodListHeight();
                this.initCategoryNum();
            })
        },
        activityClick(){
            if(this.showActivities){
                this.showActivities = false
            }else{
                this.showActivities = true
            }
        },
        // 头部右侧省略号
        menuHeaderRight(){
            if(this.menuDetailHeaderRight){
                this.menuDetailHeaderRight = false
            }else{
                this.menuDetailHeaderRight = true
            }
        },
        //获取食品列表的高度，存入shopListTop
        getFoodListHeight(){
            const listContainer = this.$refs.menuFoodList;
            if (listContainer) {
                const listArr = Array.from(listContainer.children[0].children);
                listArr.forEach((item, index) => {
                    this.shopListTop[index] = item.offsetTop;
                });
                this.initScroll(listContainer)
            }
        },
        //隐藏动画
        hideLoading(){
            this.showLoading = false;
        },
        goback(){
            this.$router.go(-1)
        },
        initScroll(ele){
            this.foodScroll = new BScroll(ele,{
                probeType: 3,
                deceleration: 0.001,
                bounce: false,
                swipeTime: 2000,
                click:true,
                scrollY:true
            })
            const wrapperMenu = new BScroll('#wrapper_menu',{
                click:true
            })
            const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight
            this.foodScroll.on('scroll',(pos)=>{
                if(!this.$refs.wrapperMenu){
                    return 
                }
                this.shopListTop.forEach((item,index)=>{
                    if(this.menuIndexChange && Math.abs(Math.round(pos.y))>=item){
                        this.menuIndex = index
                        //当左边的分类过多时，滑动右边的菜单左边整体跟着移动
                        const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu')
                        const el = menuList[0]
                        wrapperMenu.scrollToElement(el,800,0,-(wrapMenuHeight/2-50))
                    }
                })
            })
        },
        //点击左侧食品列表标题，相应列表移动到最顶层
        chooseMenu(index){
            this.menuIndex = index;
            this.menuIndexChange = false; // 为了防止点击之后监听右侧菜单滑动时左侧菜单被重复因为this.menuIndex = index赋值
            const listContainer = this.$refs.menuFoodList;
            const listArr = Array.from(listContainer.children[0].children);
            this.foodScroll.scrollTo(0,-this.shopListTop[index],400)
            this.foodScroll.on('scrollEnd',()=>{
                this.menuIndexChange = true
            })
        },
        //显示规格列表
        showChooseList(food){
            if(food){
                this.choosedFoods = food
            }
            this.showSpecs = !this.showSpecs
            this.chooseIndex = 0;
        },
        //规格选择
        chooseSpecs(index){
            this.chooseIndex = index;

        },
        //规格列表内的商品加入购物车
        addSpecs(category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock){
            this.ADD_CART({shopid:this.restaurantId,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock})
            this.showSpecs = !this.showSpecs;
        },
        showReduceTip(){
            this.showDeleteTip = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                clearTimeout(this.timer)
                this.showDeleteTip = false
            },2000)
        },
        //左边菜单红点
        initCategoryNum(){
            let newArr = [];
            let recordNum = 0;
            this.totalPrice = 0;
            this.cartFoodList = [];
            this.shopMenus.forEach((item,index)=>{
                if(this.shopCart&&this.shopCart[item.id]){
                    let num = 0;
                    Object.keys(this.shopCart[item.id]).forEach(itemid=>{
                        Object.keys(this.shopCart[item.id][itemid]).forEach(foodid=>{
                            let food = this.shopCart[item.id][itemid][foodid];
                            num += food.num
                            if(item.type == 1){
                                this.totalPrice += food.price*food.num
                                if(food.num>0){
                                    this.cartFoodList[recordNum] = {};
                                    this.cartFoodList[recordNum].category_id = item.id;
                                    this.cartFoodList[recordNum].item_id = itemid;
                                    this.cartFoodList[recordNum].food_id = foodid;
                                    this.cartFoodList[recordNum].name = food.name;
                                    this.cartFoodList[recordNum].price = food.price;
                                    this.cartFoodList[recordNum].specs = food.specs;
                                    this.cartFoodList[recordNum].num = food.num;
                                    recordNum ++;
                                }
                            }
                        })
                    })
                    newArr[index] = num
                }else{
                    newArr[index] = 0;
                }
            })
            this.categoryNum = [...newArr]
            this.totalPrice = this.totalPrice.toFixed(2)
        },
        //购物车显示状态切换
        toggleCartList(){
            if(!this.showCartList && this.cartFoodList.length>0){
                this.showCartList = true
            }else{
                this.showCartList = false
            }
        },
        //购物车中清楚单个商品
        reduceCart(category_id,item_id,food_id){
            this.REDUCE_CART({shopid:this.restaurantId,category_id,item_id,food_id})
            if(this.cartFoodList.length==0){
                this.toggleCartList();
            }
        },
        //购物车中添加单个产品
        addCart(category_id, item_id, food_id, name, price, specs){
            this.ADD_CART({shopid:this.restaurantId,category_id, item_id, food_id, name, price, specs})
        },
        //清楚购物车所有的产品
        clearCart(){
            this.toggleCartList();
            this.CLEAR_CART({shopid:this.restaurantId})
        },
        //点击评分分类事件
        changeTagIndex(index){
            this.ratingTagIndex = index
        },
        //加载更多评论
        async loadMoreRarting(){
                let res = await shopReviews(this.restaurantId,this.offset+=10,10)
                this.ratingReviews = [...this.ratingReviews,...res]
        }
    },
    watch:{
        // showLoading:function(value){
        //     console.log(value)
        //     if(!value){
        //         this.$nextTick(()=>{
        //             this.getFoodListHeight();
        //         })
        //     }
        // }
        shopCart:function(value){
            this.initCategoryNum();
        },
        changeShowType:function(value){
            this.changeShowType == value
            if(value==='rating'){
                this.$nextTick(()=>{
                    this.ratingScroll =  new BScroll('#ratingContainer',{
                        probeType: 3,
                        deceleration: 0.001,
                        bounce: false,
                        swipeTime: 2000,
                        click:true,
                        scrollY:true
                    });
                    this.ratingScroll.on('scroll',(pos)=>{
                        if(Math.abs(Math.round(pos.y)) >=  Math.abs(Math.round(this.ratingScroll.maxScrollY))){
                            this.loadMoreRarting();
                            this.ratingScroll.refresh()
                        }
                    })
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './shop';
</style>