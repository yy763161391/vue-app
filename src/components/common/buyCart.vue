<template>
    <section class="cart_module">
        <section class="cart_button" v-if="!item.specifications.length">
            <transition name="showReduce" >
                <span v-if="foodNum" @click="removeOutCart(item.category_id,item.item_id,item.specfoods[0].food_id)">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
            </transition>
            <svg class="add_icon" @click="addToCart(item.category_id, item.item_id, item.specfoods[0].food_id, item.specfoods[0].name, item.specfoods[0].price, '', item.specfoods[0].packing_fee, item.specfoods[0].sku_id, item.specfoods[0].stock, $event)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
            </svg>
        </section>
        <section v-else class="choose_specification">
            <section class="choose_icon_container">
                <transition name="showReduce">
                    <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="show_chooselist" @click="showChooseList(item)">选规格</span>
            </section>
        </section>
    </section>
    
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{

        }
    },
    props:['restaurantId','item'],
    computed:{
        ...mapState(['cartList']),
        // 监听vuex中的cartList的变化
        shopList:function(){
            // computed属性监听对象时候，若对象的引导地址未改变，那么computed将不会检测到。
            return Object.assign({},this.cartList[this.restaurantId]);
        },
        foodNum:function(){
            let category_id = this.item.category_id
            let item_id = this.item.item_id
            if(this.shopList&&this.shopList[category_id]&&this.shopList[category_id][item_id]){
                let num = 0;
                Object.values(this.shopList[category_id][item_id]).forEach(item=>{
                    num += item.num;
                })
                return num;
            }else{
                return 0
            }
        }

        
    },
    methods:{
        ...mapMutations(['ADD_CART','REDUCE_CART']),
        //移出购物车
        removeOutCart(category_id, item_id, food_id){
            if(this.foodNum > 0){
                this.REDUCE_CART({shopid:this.restaurantId,category_id,item_id,food_id})
            }
        },

        //添加到购物车
        addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event){
            this.ADD_CART({shopid:this.restaurantId,category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock})
        },
        //显示规格列表
        showChooseList(food){
            this.$emit('showChooseList',food)
        },
        //点击多规格商品的减按钮，弹出提示
        showReduceTip(){
            this.$emit('showReduceTip')
        }

    }

    
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.cart_module{
        .add_icon{
            position: relative;
            z-index: 7;
        }
        .cart_button{
            display: flex;
            align-items: center;
        }
        svg{
            @include wh(.9rem, .9rem);
            fill: #3190e8;
        }
        .specs_reduce_icon{
            fill: #999;
        }
        .cart_num{
            @include sc(.65rem, #666);
            min-width: 1rem;
            text-align: center;
            font-family: Helvetica Neue,Tahoma;
        }
        .choose_specification{
            .choose_icon_container{
                display: flex;
                align-items: center;
                .show_chooselist{
                    display: block;
                    @include sc(.55rem, #fff);
                    padding: .1rem .2rem;
                    background-color: $blue;
                    border-radius: 0.2rem;
                    border: 1px solid $blue;
                }
            }
        }
    }
    .showReduce-enter-active, .showReduce-leave-active {
        transition: all .3s ease-out;
    }
    .showReduce-enter, .showReduce-leave-active {
        opacity: 0;
        transform: translateX(1rem);
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fadeBounce-enter-active, .fadeBounce-leave-active {
        transition: all .3s;
    }
    .fadeBounce-enter, .fadeBounce-leave-active {
        opacity: 0;
        transform: scale(.7);
    }

</style>