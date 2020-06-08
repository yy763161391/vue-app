<template>
    <div class="food_container">
        <head-top :headTitle="headTitle" goBack="true"></head-top>
        <section class="sort_container">
            <!-- 分类 -->
            <!-- 如果 sortBy=='food' 则添加类名choose_type反之删除 -->
            <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
                <div class="sort_item_container"  @click="changeType('food')">
                    <div class="sort_item_border" >
                        <span :class="{category_title:sortBy == 'food'}">{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			    			<polygon points="0,3 10,3 5,8"/>
			    		</svg>
                    </div>
                </div>
                <transition name="showlist" >
                    <section class="category_container sort_detail_type" v-show="sortBy == 'food'">
                        <section class="category_left">
                            <ul>
                                <li class="category_left_li" v-for="(item , index) in category" :key="item.id" :class="{category_active:restaurant_category_id == item.id}" @click="getRightData(item.id,index)">
                                    <section>
                                        <img class="category_icon" :src="getImgPath(item.image_url)">
                                        <span>{{item.name}}</span>
                                    </section>
                                    <section>
                                        <span class="category_count">{{item.count}}</span>
                                        <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
							    			<path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
							    		</svg>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li class="category_right_li" v-for="(item,index) in categoryDetail" :key="item.id" v-if="index" @click="changeRestaurant(item.id,item.name)">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <!-- 排序 -->
            <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
                <div class="sort_item_container" @click="changeType('sort')">
                    <div class="sort_item_border" >
                        <span :class="{category_title:sortBy == 'sort'}">排序</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			    			<polygon points="0,3 10,3 5,8"/>
			    		</svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section class="sort_detail_type" v-show="sortBy == 'sort'">
                        <ul class="sort_list_container" @click="sortSelect($event)">
                            <li class="sort_list_li" >
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
								</svg>
                                <p data="0" :class="{sort_select: sortByType==0}">
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 0">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
								</svg>
                                <p data="5" :class="{sort_select: sortByType==5}">
                                    <span>距离最近</span>
                                    <svg v-if="sortByType == 5">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
								</svg>
                                <p data="6" :class="{sort_select: sortByType==6}">
                                    <span>销量最高</span>
                                    <svg v-if="sortByType == 6">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
								</svg>
                                <p data="1" :class="{sort_select: sortByType==1}">
                                    <span>起送价最低</span>
                                    <svg v-if="sortByType == 1">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
								</svg>
                                <p data="2" :class="{sort_select: sortByType==2}">
                                    <span>配送速度最快</span>
                                    <svg v-if="sortByType == 2">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
								</svg>
                                <p data="3" :class="{sort_select: sortByType==3}">
                                    <span>评分最高</span>
                                    <svg v-if="sortByType == 3">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <!-- 筛选 -->
            <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
                <div class="sort_item_container" @click="changeType('activity')">
	    			<span :class="{category_title:sortBy == 'activity'}">筛选</span>
	    			<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
		    			<polygon points="0,3 10,3 5,8"/>
		    		</svg>
    			</div>
                <transition name="showlist">
                    <section class="sort_detail_type filter_container" v-show="sortBy == 'activity'">
                        <section style="width: 100%;">
                            <header class="filter_header_style">配送方式</header>
                            <ul class="filter_ul">
                                <li class="filter_li" v-for="item in Delivery" :key="item.id" @click="changeDelivery(item.id)">
                                    <svg>
										<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode === item.id ? '#selected':'#fengniao'"></use>
									</svg>
                                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width:100%;">
                            <header class="filter_header_style">商家属性（可以多选）</header>
                            <ul class="filter_ul">
                                <li class="filter_li" v-for="(item,index) in Activity" :key="item.id" @click="changeActivity(index,item.id)">
                                    <svg class="activity_svg" v-show="support_ids[index].status">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                    <span class="filter_icon" v-show="!support_ids[index].status" :style="{color: '#'+item.icon_color, borderColor:'#'+item.icon_color}">{{item.icon_name}}</span>
                                    <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                                </li>
                            </ul>
                            <footer class="confirm_filter">
                                <div class="clear_all filter_button_style" @click="clearAll">清空</div>
                                <div class="confirm_select filter_button_style" @click="determine">确定<span v-show="filterNum">({{filterNum}})</span></div>
                            </footer>
                        </section>
                    </section>
                </transition>
            </div>
            
            
        </section>
        <transition name="showcover">
            <!-- 蒙层 -->
            <div :class="{back_cover:sortBy !== ''}"></div>
        </transition>
        <section class="shop_list_container">
            <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :orderBy="sortByType" :deliveryMode="delivery_mode" :supportIds="support_ids" :determine="confirmStatus"></shop-list>
        </section>
    </div>
</template>

<script>
import HeadTop from "../../components/header/header"
import {imgBaseUrl} from '../../config/env'
import {restaurantCategory,restaurantActivity,restaurantDeliveryModes,msiteAddress} from '../../service/getData'
import {getImgPath} from '../../components/common/mixin'
import ShopList from '@/components/common/shoplist'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            geohash: this.$route.query.geohash, // city页面传递过来的地址geohash
            headTitle: this.$route.query.title, // msiet页面头部标题
            foodTitle: "", // 排序左侧头部标题
            restaurant_category_id: "", // 食品类型id值
            restaurant_category_ids: "", //筛选类型的id
            sortBy: "", // 筛选的条件
            category: null, // category分类左侧数据
            categoryDetail: null, // category分类右侧的详细数据
            sortByType: null, // 根据何种方式排序
            Delivery: null, // 配送方式数据
            Activity: null, // 商家支持活动数据
            delivery_mode: null, // 选中的配送方式
            support_ids: [], // 选中的商铺活动列表
            filterNum: 0, // 所选中的所有样式的集合
            confirmStatus: false, // 确认选择
        }
    },
    
    components:{
        HeadTop,
        ShopList
    },
    mixins:[getImgPath],
    mounted(){
        this.initData();
    },
    computed:{
        ...mapState(["latitude", "longitude"])
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS']),
        async initData(){
            this.category = await restaurantCategory(this.geohash);
            this.foodTitle = this.headTitle;
            this.restaurant_category_id = this.$route.query.restaurant_category_id 
            if(this.restaurant_category_id){
                this.category.forEach(item=>{
                    if(this.restaurant_category_id == item.id){
                        this.categoryDetail = item.sub_categories
                    }   
                })
            }
            //防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
            if(!this.latitude){
                let res = await msiteAddress(this.geohash)
                // 记录当前经度纬度进入vuex
                this.RECORD_ADDRESS(res) //函数已采用解构，无需传对象的具体参数
            }
            console.log(this.$store)
            //配送方式
            this.Delivery = await restaurantDeliveryModes(this.geohash);
            this.Delivery.forEach(item=>{

            })
            //商家属性
            this.Activity = await restaurantActivity(this.geohash);
            this.Activity.forEach((item,index)=>{
                this.support_ids[index]={status:false,id:item.id}
            })
            
        },
        //通过id和index获取右侧数据
        getRightData(id,index){
            if(index == 0){
                this.restaurant_category_ids = null;
                this.sortBy = "";
            }else{
                this.restaurant_category_id = id;
                this.categoryDetail = this.category[index].sub_categories;
            }
        },
        changeRestaurant(id,name){
            this.restaurant_category_ids = id;
            this.sortBy = "";
            this.foodTitle = this.headTitle = name;
        }
        ,
        //下拉框切换
        changeType(type){
            //通过判断类型来更改类名
            if(this.sortBy !== type){
                this.sortBy = type;
                if(type == "food"){
                    this.foodTitle = "分类"
                }else{
                    this.foodTitle = this.headTitle
                }
            }else{
                this.sortBy = ''
                if(type=='food'){
                this.foodTitle = this.headTitle

                }
            }
        },
        sortSelect(event){
            let node;
            if(event.target.nodeName.toUpperCase() !== 'P'){
                node = event.target.parentNode
            }else{
                node = event.target
            }
            this.sortByType = node.getAttribute('data')
            this.sortBy = ''
        },
        //改变选择商家属性状态
        changeActivity(index,id){
            this.filterNum = this.delivery_mode==null ? 0:1
            this.support_ids.splice(index,1,{status:!this.support_ids[index].status,id})
            this.support_ids.forEach(item=>{
                if(item.status){
                    this.filterNum ++;
                }
            })
        },
        //改变配送
        changeDelivery(id){
            if(!this.delivery_mode == 1 && this.delivery_mode == null){
                this.delivery_mode = id;
                this.filterNum++;
            }else{
                this.delivery_mode = null;
                this.filterNum--;
            }
        },
        //确定
        determine(){
            this.confirmStatus = !this.confirmStatus;
            this.sortBy = '';
        },
        //清除
        clearAll(){
            this.delivery_mode = null;
            this.support_ids.forEach(item=>{
                item.status = false;
            })
            this.filterNum = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .food_container{
        padding-top: 3.6rem;
    }
    .sort_container{
        background-color: #fff;
        border-bottom: 0.025 solid #f1f1f1;
        position: fixed;
        top: 1.95rem;
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;
        .sort_item{
            @include sc(0.55rem, #444);
            @include wh(33.3%,1.6rem);
            text-align: center;
            line-height: 1rem;
            .sort_item_container{
                @include wh(100%,100%);
                position: relative;
                z-index: 14;
                box-sizing: border-box;
                padding-top: 0.3rem;
                .sort_item_border{
                    height: 1rem;
                    border-right: 0.025rem solid $bc;
                }
            }
            .sort_icon{
                vertical-align: middle;
                transition: all 0.3s;
                fill: #666;
            }
        }
        .choose_type{
            .sort_item_container{
                .category_title{
                    color: $blue;
                }
                .sort_icon {
                    transform: rotate(180deg);
                    fill: $blue;
                }
            }
        }
        .showlist-enter-active,
        .showlist-leave-active {
            transition: all 0.3s;
            transform: translateY(0);
        }
        .showlist-enter,
        .showlist-leave-active {
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort_detail_type {
            width: 100%;
            position: absolute;
            display: flex;
            top: 1.6rem;
            left: 0;
            border-top: 0.025rem solid $bc;
            background-color: #fff;
        }
        .category_container {
            .category_left {
                flex: 1;
                background-color: #f1f1f1;
                height: 16rem;
                overflow-y: auto;
                span{
                    @include sc(0.5rem,#666);
                    line-height:1.8rem;
                }
                .category_left_li{
                    @include fj;
                    padding: 0 0.5rem;
                    .category_icon{
                        @include wh(0.8rem, 0.8rem);
                        vertical-align: middle;
                        margin-right: 0.2rem;
                    }
                    .category_count {
                        background-color: #ccc;
                        @include sc(0.4rem, #fff);
                        padding: 0 0.1rem;
                        border: 0.025rem solid #ccc;
                        border-radius: 0.8rem;
                        vertical-align: middle;
                        margin-right: 0.25rem;
                    }
                    .category_arrow {
                        vertical-align: middle;
                    }
                }
                .category_active {
                    background-color: #fff;
                }
            }
            .category_right{
                flex: 1;
                background-color: #fff;
                padding-left: 0.5rem;
                height: 16rem;
                overflow-y: auto;
                .category_right_li {
                    @include fj;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: 0.5rem;
                    border-bottom: 0.025rem solid $bc;
                    span {
                    color: #666;
                    }
                }
                .category_right_choosed {
                    span {
                    color: $blue;
                    }
                }
            }
        }
        .sort_list_container{
            width:100%;
            .sort_list_li{
                height:2.5rem;
                display:flex;
                align-items:center;
                svg {
                    @include wh(0.7rem, 0.7rem);
                    margin: 0 0.3rem 0 0.8rem;
                }
                p {
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    border-bottom: 0.025rem solid $bc;
                    @include fj;
                    align-items: center;
                    span {
                    color: #666;
                    }
                }
                .sort_select {
                    span {
                    color: $blue;
                    }
                }
            }
        }
        .filter_container{
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style{
                @include sc(0.4rem,#333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: 0.5rem;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    @include wh(4.5rem,1.4rem);
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid #eee;
                    border-radius: 0.125rem;
                    margin-right: 0.25rem;
                    margin-bottom: 0.25rem;
                    padding: 0 0.25rem;
                    svg{
                        @include wh(0.8rem,0.8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        @include sc(0.4rem,#333)
                    }
                    .filter_icon {
                        @include wh(0.8rem, 0.8rem);
                        font-size: 0.5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        margin-right: 0.25rem;
                        line-height: 0.8rem;
                        text-align: center;
                    }
                    .activity_svg {
                        margin-right: 0.25rem;
                    }
                    .selected_filter {
                        color: $blue;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                justify-content: center;
                padding: 0.3rem 0.2rem;
                .filter_button_style{
                    @include wh(50%,1.8rem);
                    line-height:1.8rem;
                    border-radius: 0.25rem;
                    font-size: 0.8rem;
                    span{
                        color: #fff;
                    }
                }
                .clear_all{
                    background-color: #fff;
                    border: 0.025rem solid #fff;
                    margin-right: 0.5rem;
                }
                .confirm_select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                }
            }
        }
    }
    .showcover-enter-active,.showcover-leave-active{
        transition: opacity 0.3s;
    }
    .showcover-enter,.showlist-leave-active{
        opacity: 0;
    }
    .back_cover{
        @include wh(100%,100%);
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
    }
</style>