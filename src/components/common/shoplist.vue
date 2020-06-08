<template>
    <div class="shoplist_container">
        <ul>
            <router-link tag="li" :to="{path:'/shop',query:{geohash,id:item.id}}" class="shop_li" v-for="(item,index) in shopListArr" :key="index" >
                <section>
                    <img :src="imgBaseUrl + item.image_path" class="shop_img">
                </section>
                <hgroup class="shop_right">
                    <header class="shop_detail_header">
                        <h4 :class="item.is_premium? ' shop_title ellipsis premium': 'shop_title ellipsis'">{{item.name}}</h4>
                        <ul class="shop_detail_ul" >
                            <li class="supports" v-for="(obj,index) in item.supports" :key="index">{{obj.icon_name}}</li>
                        </ul>
                    </header>
                    <h5 class="rating_order_num">
                        <section class="rating_order_num_left">
                            <section class="rating_section">
                                <svg class="grey_fill">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                                </svg>
                                <span class="rating_num">{{item.rating}}</span>
                            </section>
                            <section class="order_section">
                                月售{{item.recent_order_num}}单
                            </section>
                        </section>
                        <section class="rating_order_num_right">
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                        </section>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee">
                                ¥{{item.float_minimum_order_amount}}起送<span class="segmentation">/</span>{{item.piecewise_agent_fee.tips}}
                        </p>
                        <p class="distance_time">
                            <span>{{item.distance}}</span>
                            <span class="segmentation">/</span>
                            <span class="order_time">{{item.order_lead_time}}</span>
                        </p>
                    </h5>
                </hgroup>
            </router-link>
            <li v-if="showLoading" class="show_loading">
                <span>正在加载更多...</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {shopList} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
export default {
    data(){
        return{
            //无法滚动  样式问题
            offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
            imgBaseUrl:'/img/',
            
        }
    },
    props:['geohash','restaurantCategoryId','restaurantCategoryIds','orderBy','deliveryMode','supportIds','determine'],
    mounted(){
        this.initData();
        window.addEventListener('scroll',this.loadMore)
    },
    
    methods:{
        async initData(){
            
            let res = await shopList(this.geohash,this.offset)
            this.shopListArr = [...res]
        },
        //获取更多数据
        async loadMore(){
            if(this.touchend){
                return
            }
            if(this.preventRepeatReuqest){
                return
            }
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            let scrollTop = document.documentElement.scrollTop;
            if(scrollHeight - clientHeight== scrollTop){
                let res = await shopList(this.geohash,this.offset+=20)
                this.shopListArr = [...this.shopListArr,...res]
                this.hideLoading();
                if(res.length < 20){
                    this.touchend = true;
                    return 
                }
            }
            this.preventRepeatReuqest = false;
            this.showLoading = true;
        },
        hideLoading(){
			this.showLoading = false;
		},
        //判断准时达
        zhunshi(supports){
            let zhunStatus;
            if(supports instanceof Array && supports.length){
                supports.forEach(item=>{
                    if(item.icon_name === '准'){
                        zhunStatus = true;
                    }
                })
            }else{
                zhunStatus = false;
            }
            return zhunStatus;
        },
        //父组件传来的值监听函数
        async listenPropChange(){
            this.showLoading = true;
            let res = await shopList(this.geohash,this.offset,this.restaurantCategoryId,this.restaurantCategoryIds,this.orderBy,this.deliveryMode,this.supportIds);
            this.shopListArr = [...res]
            this.hideLoading();
        }
    },
    watch:{
        //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
        restaurantCategoryIds:function(value){
            this.listenPropChange();
        },
        //监听排序方式的值的改变
        orderBy:function(value){
            this.listenPropChange();
        },
        determine:function(value){
            this.listenPropChange();
        }

    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem;
	}
    .shop_li{
            display: flex;
            border-bottom: 0.025rem solid #f1f1f1;
            padding: 0.7rem 0.4rem;
            
    }
    .show_loading{
        text-align: center;
        @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
        @include wh(auto,1.5rem);
        span{
            line-height: 1.5rem;
        }
    }
    .shop_img{
        @include wh(2.75rem,2.75rem);
        display:block;
        margin-right: 0.4rem;
    }
    .shop_right{
        flex: auto;
        .shop_detail_header{
            @include fj;
            align-items: center;
            .shop_title{
                width: 8.5rem;
                color: #333;
                padding-top: 0.1rem;
                @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
                font-weight: 700;
            }
            .premium::before{
                content: '品牌';
                background-color: #ffd930;
                display: inline-block;
                color: #333;
                font-size: 0.5rem;
                line-height: .6rem;
                padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
            }
            .shop_detail_ul{
                display: flex;
                transform: scale(.8);
                margin-right: -0.3rem;
                .supports{
					@include sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
            }
        }
        .rating_order_num{
            @include fj(space-between);
            height: 0.6rem;
            margin-top: 0.52rem;
            .rating_order_num_left{
                @include fj(flex-start);
                .rating_section{
                    display: flex;
                    @include sc(0.4rem,#333);
                    .grey_fill{
                        fill: #f40;
                        width: 0.5rem;
                    }
					.rating_num{
						@include sc(0.4rem, #f40);
                        margin: 0 0.1rem;
					}
                }
                .order_section{
					transform: scale(.8);
					margin-left: -0.2rem;
					@include sc(0.4rem, #666);
				}
            }
            .rating_order_num_right{
                display: flex;
                align-items: center;
                transform:scale(0.7);
                justify-content: flex-end;
                margin-right: -0.8rem;
                min-width: 5rem;
                .delivery_style{
                    font-size: 0.4rem;
                    padding: 0.04rem 0.08rem 0;
					border-radius: 0.08rem;
					margin-left: 0.08rem;
                    border: 1px;
                    border: 0.025rem solid $blue;

                }
                .delivery_left{
                    color: #fff;
                    background-color: $blue;
                }
                .delivery_right{
                    color: $blue;
                }
            }
        }
        .fee_distance{
            margin-top: 0.52rem;
            @include fj;
            @include sc(0.5rem, #333);
            .fee{
				transform: scale(.9);
                @include sc(0.5rem, #666);
                margin-left: -0.2rem;
            }
            .distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
        }
    }
</style>