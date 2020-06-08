<template>
  <div class="home">
    <head-top signinUp='true'>
      <span slot="logo" class="head_logo" @click="reload" >elm-app</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在定位列表中选择</span>
      </div>
      <router-link :to="'/city/'+guessCityid" class="guess_city" >
        <span>{{ guessCity }}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
        </svg>
      </router-link>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link :to="'/city/'+item.id" tag="li" v-for="item in hotcity" :key="item.id">{{ item.name }}</router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <ul class="letter_classify">
        <li class="letter_classify_li" v-for="(value,key,index) in sortgroupcity" :key="key">
          <h4 class="city_title">{{ key }}
            <span v-if="index === 0 ">（按字母排序）</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link class="ellipsis" :to="'/city/'+item.id" tag="li" v-for="item in value" :key="item.id">{{ item.name }}</router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import headTop from "../../components/header/header";
import {hotcity,groupcity,guesscity} from "../../service/getData"
export default {
  data() {
    return {
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市列表
      groupcity: {} //所有城市列表
    };
  },
  components: {
    headTop,
  },
  mounted(){
    //获取热门城市
    hotcity().then(res => {
            this.hotcity = res;
        }),
    //获取全部城市
    groupcity().then(res => {
      this.groupcity = res
    }),
    //获取当前城市
    guesscity().then(res=>{
      this.guessCity = res.name
      this.guessCityid = res.id
    })
  },
  computed:{
    //将英文a-z排序
    sortgroupcity(){
      let sortObj = {}
      for(let i=65;i<=90;i++){
        if(this.groupcity[String.fromCharCode(i)]){
          sortObj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
        }
      }
      return sortObj;
    }
  },
  methods:{
    reload(){
      window.location.reload()
    }
  }

};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
.head_logo {
  left: 0.4rem;
  font-weight: 800;
  @include ct;
  @include sc(0.7rem, #fff);
}
.city_nav {
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;
  .city_tip {
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }
  }

  .guess_city {
    @include fj;
    align-items: center;
    padding: 0 0.45rem;
    height: 1.8rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);
    span:nth-of-type(1) {
      color: $blue;
    }
    .arrow_right {
      @include wh(0.6rem, 0.6rem);
      fill: #999;
    }
  }
}
#hot_city_container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}
.citylistul {
  li {
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
    @include wh(25%, 1.75rem);
    @include font(0.6rem, 1.75rem);
  }
  li:nth-of-type(4n) {
    border-right: none;
  }
}
.city_title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  @include font(0.55rem, 1.45rem, "Helvetica Neue");
  span {
    @include sc(0.475rem, #999);
  }
}

.letter_classify_li {
  margin-bottom: 0.4rem;
  background-color: #fff;
  border-bottom: 1px solid $bc;
  .groupcity_name_container {
    li {
      color: #666;
    }
  }
}
</style>
