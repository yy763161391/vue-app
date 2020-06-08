<template>
    <div class="msite">
        <head-top signinUp='true'>
            <router-link to="/search/geohash" class="link_search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
            </router-link>
            <router-link to="/" slot="msite-title" class="msite_title">
                <span class="title_text ellipsis">{{msiteTitle}}</span>
            </router-link>
        </head-top>
        <nav class="msite_nav">
            <swiper class="swiper-container" :options="swiperOption">
                <swiper-slide class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index" :name="index">
                    <router-link :to="{path: '/food', query: {geohash, title: foodItem.title,restaurant_category_id:getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                        <figure>
                            <img :src="imgBaseUrl + foodItem.image_url">
                            <figcaption>{{foodItem.title}}</figcaption>
                        </figure>
                    </router-link>
                </swiper-slide>
            </swiper>
            <!-- <div class="swiper-container" >
		        <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
	            		<router-link :to="{path: '/food', query: {geohash, title: foodItem.title}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
	            			<figure>
	            				<img :src="imgBaseUrl + foodItem.image_url">
	            				<figcaption>{{foodItem.title}}</figcaption>
	            			</figure>
	            		</router-link>
		            </div>
		        </div>
            </div> -->
        </nav>
        <div class="shop_list_container">
            <header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">附近商家</span>
	    	</header>
            <shop-list :geohash="geohash"></shop-list>
        </div>
        
        <my-footer></my-footer>
    </div>
</template>

<script>
import HeadTop from "../../components/header/header"
import MyFooter from "../../components/footer/footer"
import ShopList from "../../components/common/shoplist"
import {mapMutations} from "vuex"
import {msiteAddress,shopCategory} from '../../service/getData'
import Swiper from 'swiper';
import 'swiper/css/swiper.css'
export default {
    data(){
        return{
            geohash:this.$route.query.geohash,
            msiteTitle:'请选择地址...',
            foodTypes: [], // 食品分类列表
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            swiperOption: {//轮播图配置参数
                　　pagination: '.swiper-container',
                　　autoplayDisableOnInteraction: false,
                　　loop: false,
                　　coverflow: {
                　　　　rotate: 30,
                　　　　stretch: 10,
                　　　　depth: 60,
                　　　　modifier: 2,
                　　　　slideShadows : true
                　　}
                }
        }
    },
    components:{
        HeadTop,
        MyFooter,
        ShopList,
    },
    async mounted(){
        this.SAVE_GEOHASH(this.geohash);
        let res = await msiteAddress(this.geohash);
        this.msiteTitle = res.name;
        this.RECORD_ADDRESS(res);
        shopCategory(this.geohash).then(res=>{
            let resLength = res.length;
       		let resArr = [...res]; // 返回一个新的数组
       		let foodArr = [];
    		for (let i = 0, j = 0; i < resLength; i += 8, j++) {
    			foodArr[j] = resArr.splice(0, 8);
    		}
            this.foodTypes = foodArr;
        })
    },
    methods:{
        ...mapMutations(['RECORD_ADDRESS','SAVE_GEOHASH']),
        getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    	}
    }
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
    .msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
    .msite_nav{
        padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
        height: 10.6rem;
        .swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
    }
    .food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
    .shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
        background-color: #fff;
        padding: 0;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
                vertical-align: middle;
                margin-top: 0.15rem;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
                @include font(0.55rem, 1.6rem);
                padding: 0 0.3rem;
			}
		}
	}
</style>