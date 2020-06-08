import{
    RECORD_ADDRESS,
    SAVE_GEOHASH,
    ADD_CART,
    REDUCE_CART,
    CLEAR_CART,
    RECORD_USERINFO
} from './mutation_types'
import {setStore, getStore} from '../config/mUtils'
export default {
    //记录经纬度
    [RECORD_ADDRESS](state,{
        latitude,
        longitude
    }){
        state.latitude = latitude,
        state.longitude = longitude
    },
    //保存经纬度hash值
    [SAVE_GEOHASH](state,geohash){
        state.geohash = geohash
    },
    //添加进购物车
    [ADD_CART](state,{
        shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
		packing_fee,
		sku_id,
		stock
    }){
        let cart = state.cartList;//取到state里购物车列表
		let shop = cart[shopid] = (cart[shopid] || {});//通过点击按钮传值过来,如果此前该餐馆存在记录值，则不管，如果没有则添加一个空对象
		let category = shop[category_id] = (shop[category_id] || {});//同上
		let item = category[item_id] = (category[item_id] || {});//同上
		if (item[food_id]) {//这里表示同一种商品的数量，如果已经添加过一个则数字++，如果没有else则新增一个对象
			item[food_id]['num']++;
		} else {
			item[food_id] = {
					"num" : 1,
					"id" : food_id,
					"name" : name,
					"price" : price,
					"specs" : specs,
					"packing_fee" : packing_fee,
					"sku_id" : sku_id,
					"stock" : stock
			};
        }
        //给state里的cartList从新赋值
        state.cartList = {...cart};
        //通过setStore来将数据存入localstorage
        setStore('buyCart',state.cartList)
    },
    //购物车删除指定信息
    [REDUCE_CART](state,{
        shopid,
		category_id,
		item_id,
		food_id,
    }){
        let cart = state.cartList;
        let shop = (cart[shopid] || {});
        let category = (shop[category_id] || {});
        let item = (category[item_id] || {});
        if(item && item[food_id]){
            if(item[food_id]['num'] > 0){
                item[food_id]['num']--;
                state.cartList = {...cart};
                setStore('buyCart',state.cartList)
            }else{
                item[food_id] = null;
            }
        }
        
    },
    //清除购物车
    [CLEAR_CART](state,{
        shopid
    }){
        state.cartList[shopid] = null;
        setStore('buyCart',state.cartList)
    },
    //记录用户信息
    [RECORD_USERINFO](state,info){
        state.userInfo = info;
        state.login = true;
        setStore('userId',info.user_id)
    }
}