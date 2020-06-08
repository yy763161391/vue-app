<template>
    <div class="loginContainer">
        <head-top headTitle='密码登录' goBack='true'>
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="账号" v-model="userAccount">
            </section>
            <section class="input_container">
                <input type="password" placeholder="密码" v-if="!showPassword" v-model="passWord">
                <input type="text" placeholder="密码" v-else v-model="passWord">
                <div class="button_switch">
                    <span :class="{active_span:showPassword}">abc</span>
                    <div class="circle_button" :class="{trans_to_right:!showPassword}" @click="changePassWordType">
                    </div>
                    <span :class="{active_span:!showPassword}">***</span>
                </div>
            </section>
            <section class="input_container captcha_code_container"> 
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
         <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container" @click="mobileLogin">登录</div>
        <router-link to="/forget" class="to_forget">重置密码？</router-link>
        <alert-text v-if="showAlert" :alertValue="alertText" @closeTip="closeTips"></alert-text>
    </div>
    
</template>

<script>
import headTop from '@/components/header/header'
import {getCaptchas,userLogin} from '../../service/getData'
import alertText from '@/components/common/alertText'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            showPassword:false, // 是否显示密码
            captchaCodeImg:null, //验证码
            userAccount: null, //用户名
            passWord: null, //密码
            codeNumber: null, //验证码
            showAlert:false,//是否显示弹出框
            alertText:'',//弹出信息
            userInfo:null,//用户登录信息
        }
    },
    components:{
        headTop,
        alertText
    },
    mounted(){
        this.getCaptchaCode();
    },
    methods:{
        ...mapMutations(['RECORD_USERINFO']),
        changePassWordType(){
            this.showPassword = !this.showPassword
        },
        async getCaptchaCode(){
            let res = await getCaptchas();
            this.captchaCodeImg = res.code;
        },
        //用户登录
        async mobileLogin(){
            if(!this.userAccount){
                this.showAlert = true;
                this.alertText = '请输入手机号/邮箱/用户名';
                return
            }else if(!this.passWord){
                this.showAlert = true;
                this.alertText = '请输入密码';
                return
            }else if(!this.codeNumber){
                this.showAlert = true;
                this.alertText = '请输入验证码';
                return
            }else{
                this.userInfo = await userLogin(this.userAccount,this.passWord,this.codeNumber)
            }
            console.log(this.userInfo.user_id)
            if(!this.userInfo.user_id){
                this.showAlert = true;
                this.alertText = this.userInfo.message
                this.getCaptchaCode();
            }else{
                this.RECORD_USERINFO(this.userInfo);
                this.$router.go(-1)
            }
        },
        closeTips(){
            this.showAlert = !this.showAlert
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './login';
</style>