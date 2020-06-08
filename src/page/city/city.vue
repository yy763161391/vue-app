<template>
    <div class="city_container">
        <head-top :head-title="cityname" goBack='true'>
            <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
        </head-top>
        <form class="city_form" v-on:submit.prevent>
            <div>
                <input type="search" placeholder="输入学校、商务楼、地址" name="city" class="city_input input_style" required v-model="inputValue">
            </div>
            <div>
                <input type="submit" class="city_submit input_style" name="submit" value="提交" @click="sendInfo">
            </div>
        </form>
        <header class="pois_search_history" v-if="searchHistory">搜索历史</header>
        <ul class="getpois_ul">
            <li v-for="(item,index) in placeList" :key="item.id" @click="changePage(index,item.geohash)">
                <h4 class="pois_name ellipsis">{{ item.name }}</h4>
                <p class="pois_address ellipsis">{{ item.address }}</p>
            </li>
        </ul>
        <footer class="clear_all_history" @click="removeHistory">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>

<script>
import headTop from '../../components/header/header'
import {currentCity,searchAddress} from '../../service/getData'
import {getStore,setStore,removeStore} from '../../config/mUtils'
export default {
    data(){
        return{
            cityid:'',  //当前城市Id
            cityname:'', //当前城市名
            inputValue:'', //搜索内容
            placeList:[], //搜索到的地址
            historyList:[], //历史搜索
            searchHistory:true, 
            placeNone:false,
        }
    },

    components:{
        headTop,
    },

    mounted(){
        this.cityid = this.$route.params.cityId;
        currentCity(this.cityid).then(res=> {this.cityname = res.name})
        this.initData()
    },

    methods:{
        initData(){
            //获取搜索历史记录
            if(getStore('historyPlace')){
                console.log(getStore('historyPlace'))
                this.placeList = JSON.parse(getStore('historyPlace'))
            }else{
                this.placeList = []
            }
        },
        sendInfo(){
            if(this.inputValue){
                searchAddress(this.cityid,this.inputValue).then(res=>{
                    this.placeList = res;
                    this.searchHistory = false;
                    this.placeNone = this.placeList.length>0 ? false : true
                })
            }
        },
        /**
         * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
         * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
         */
        changePage(index,geohash){
            let history = getStore('historyPlace');
            let choosePlace = this.placeList[index];
            if(history){
                let checkRepeat = false;
                this.historyList = JSON.parse(history)
                this.historyList.forEach(item => {
                    if(item.geohash == geohash){
                        checkRepeat = true
                    }
                });
                if(checkRepeat == false){
                    this.historyList.push(choosePlace)
                }
            }else{
               this.historyList.push(choosePlace) 
            }
            setStore('historyPlace',this.historyList)
            this.$router.push({path:'/msite',query:{geohash}});//有需要传值  后期要改

        },
        removeHistory(){
            removeStore('historyPlace');
            this.initData();
        }  

    }

}
</script>

<style lang="scss">
@import 'src/style/mixin.scss';

.city_container{
    padding-top: 2.35rem;

    .change_city{
        right:0.4rem;
        @include sc(0.6rem,#fff);
        @include ct;
    }

    .city_form{
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;

        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;

            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               @include sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
}


</style>