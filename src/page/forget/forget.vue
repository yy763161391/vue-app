<template>
  <div class="restContainer">
      <head-top goBack="true" headTitle="重置密码"></head-top>
      <form class="restForm">
          <section class="input_container phone_number">
              <input type="text" placeholder="账号" v-model="userName">
          </section>
          <section class="input_container">
              <input type="text" placeholder="旧密码" v-model="oldPassword">
          </section>
          <section class="input_container">
              <input type="text" placeholder="请输入新密码" v-model="newPassword">
          </section>
          <section class="input_container">
              <input type="text" placeholder="请确认新密码" v-model="confirmPassword">
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
          <div class="login_container" @click="resetPassword">确认修改</div>
          <alert-text v-if="showAlert" :alertValue="alertText" @closeTip="closeTips"></alert-text>
      </form>
  </div>
</template>

<script>
import headTop from '@/components/header/header'
import {getCaptchas,changePassword} from '../../service/getData'
import alertText from '@/components/common/alertText'
export default {
    data(){
        return {
            alertText:'',//弹出信息
            showAlert:false,//是否弹出
            userName:null,//用户名账号
            oldPassword:null,//旧密码
            newPassword:null,//新密码
            confirmPassword:null,//确认密码
            codeNumber: null, //验证码
            captchaCodeImg:null, //验证码

        }
    },
    components:{
        headTop,
        alertText
    },
    mounted(){
        this.getCaptchaCode();
    }
    ,
    methods:{
        async getCaptchaCode(){
            let res = await getCaptchas();
            this.captchaCodeImg = res.code;
        },
        closeTips(){
            this.showAlert = !this.showAlert
        },
        async resetPassword(){
            if(!this.userName){
                this.showAlert = true;
                this.alertText = "请输入账号";
                return
            }else if(!this.oldPassword){
                this.showAlert = true;
                this.alertText = "请输入旧密码";
                return
            }else if(!this.newPassword){
                this.showAlert = true;
                this.alertText = "请输入新密码";
                return
            }else if(!this.confirmPassword){
                this.showAlert = true;
                this.alertText = "请输入确认密码";
                return
            }else if(this.confirmPassword != this.newPassword){
                this.showAlert = true;
                this.alertText = "两次输入的密码不一样";
                return
            }else if(!this.codeNumber){
                this.showAlert = true;
                this.alertText = "请输入验证码";
                return 
            }else{
                let res = await changePassword(this.userName,this.oldPassword,this.newPassword,this.confirmPassword,this.codeNumber);
                if(res.message){
                    this.showAlert = true;
                    this.alertText = res.message;
                    this.getCaptchaCode();
                    return
                }else{
                    this.showAlert = true;
                    this.alertText = res.success;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .restContainer{
        padding-top: 1.95rem;
    }
    .restForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .captcha_code_container{
        height: 2.2rem;
        .img_change_img{
            display: flex;
            align-items: center;
            img{
                @include wh(3.5rem, 1.5rem);
                margin-right: .2rem;
            }
            .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
        }
    }
    .login_container{
        margin: 1rem .5rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
</style>