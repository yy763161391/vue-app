const urls = 'https://elm.cangdu.org/v1/cities';
//获取当前城市
// export const guessCity = ()=> fetch('')

//获取热门城市
export const hotcity = async ()=> {
    const response = await fetch('https://elm.cangdu.org/v1/cities?type=hot',{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json()
    return responseJson
}

//获取所有城市
export const groupcity = async()=> {
    const response = await fetch('https://elm.cangdu.org/v1/cities?type=group',{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json()
    return responseJson
}

//获取定位城市
export const guesscity = async()=> {
    const response = await fetch('https://elm.cangdu.org/v1/cities?type=guess',{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json()
    return responseJson
}

//搜索地址
export const searchAddress = async(cityId,keyWord)=>{
    const url = 'https://elm.cangdu.org/v1/pois?city_id=' + cityId +'&keyword=' + keyWord +'&type=search'
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json()
    return responseJson
}

//获取当前城市
export const currentCity = async(cityId)=>{
    const url = urls + '/' + cityId
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//根据经纬度详细定位
export const msiteAddress = async geohash =>{
    const url = 'https://elm.cangdu.org/v2/pois/' + geohash
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//获取商铺列表
export const shopList = async (geohash,offset,restaurant_category_id = '',restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) =>{
    let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
    let data = {
        latitude:geohash.split(',')[0],
        longitude:geohash.split(',')[1],
        offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
    }
    let url = 'https://elm.cangdu.org/shopping/restaurants'
    for(let prop in data){
        if(url.indexOf('?')!=-1){
            console.log(location.href)
            url = url + '&' +prop+'='+data[prop]
        }else{
            url = url + '?' +prop+'='+data[prop]
        }
        
    }
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//获取商铺分类列表
export const shopCategory =  async (geohash,offset,restaurant_category_id = '',restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) =>{
    let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
    let data = {
        latitude:geohash.split(',')[0],
        longitude:geohash.split(',')[1],
        offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
    }
    let url = 'https://elm.cangdu.org/v2/index_entry'
    for(let prop in data){
        if(url.indexOf('?')!=-1){
            console.log(location.href)
            url = url + '&' +prop+'='+data[prop]
        }else{
            url = url + '?' +prop+'='+data[prop]
        }
        
    }
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}


//获取food页面的餐馆分类
export const restaurantCategory = async (geohash)=>{
    let data = {
        latitude:geohash.split(',')[0],
        longitude:geohash.split(',')[1],
    }
    let url = 'https://elm.cangdu.org/shopping/v2/restaurant/category'
    for(let prop in data){
        if(url.indexOf('?')!=-1){
            console.log(location.href)
            url = url + '&' +prop+'='+data[prop]
        }else{
            url = url + '?' +prop+'='+data[prop]
        }
        
    }
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//food中商家属性活动列表
export const restaurantActivity = async (geohash)=>{
    let data = {
        latitude:geohash.split(',')[0],
        longitude:geohash.split(',')[1],
    }
    let url = 'https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes'
    for(let prop in data){
        if(url.indexOf('?')!=-1){
            console.log(location.href)
            url = url + '&' +prop+'='+data[prop]
        }else{
            url = url + '?' +prop+'='+data[prop]
        }
        
    }
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}
//获取商家配送方式
export const restaurantDeliveryModes = async (geohash)=>{
    let data = {
        latitude:geohash.split(',')[0],
        longitude:geohash.split(',')[1],
    }
    let url = 'https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes'
    for(let prop in data){
        if(url.indexOf('?')!=-1){
            console.log(location.href)
            url = url + '&' +prop+'='+data[prop]
        }else{
            url = url + '?' +prop+'='+data[prop]
        }
        
    }
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//获取餐馆详情
export const shopDetails = async shopId =>{
    const url = 'https://elm.cangdu.org/shopping/restaurant/'+ shopId
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//获取餐馆食品列表
export const shopMenus = async restaurantId =>{
    const url = 'https://elm.cangdu.org/shopping/v2/menu?restaurant_id='+restaurantId
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//获取餐馆评价分数

export const shopScore = async restaurantId =>{
    const url = 'https://elm.cangdu.org/ugc/v2/restaurants/'+ restaurantId +'/ratings/scores'
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}
//获取评价信息
export const shopReviews = async (restaurantId,offset,limit)=>{
    const url = 'https://elm.cangdu.org/ugc/v2/restaurants/'+ restaurantId +'/ratings?'+'offset='+offset+'&'+'limit='+limit;
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}
//获取评价分类
export const shopTag = async restaurantId =>{
    const url = 'https://elm.cangdu.org/ugc/v2/restaurants/'+ restaurantId +'/ratings/tags'
    const response = await fetch(url,{
        method:'GET',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}

//获取验证码
export const getCaptchas = async () =>{
    const url = 'https://elm.cangdu.org/v1/captchas'
    const response = await fetch(url,{
        method:'POST',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const responseJson = response.json();
    return responseJson
}
//登录
export const userLogin = async (username,password,captcha_code) =>{
    const url = 'https://elm.cangdu.org/v2/login'
    const data = JSON.stringify({username,password,captcha_code})
    const response = await fetch(url,{
        method:'POST',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        body:data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
    })
    const responseJson = response.json();
    return responseJson
}

//更改密码
export const changePassword = async (username, oldpassWord, newpassword, confirmpassword, captcha_code) =>{
    const url = 'https://elm.cangdu.org/v2/changepassword';
    
    const data = JSON.stringify({username, oldpassWord, newpassword, confirmpassword, captcha_code})
    console.log(data)
    const response = await fetch(url,{
        method:'POST',
        credentials: 'include',
        cache:'no-cache',
        mode:'cors',
        body:data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
    })
    const responseJson = response.json();
    return responseJson
}