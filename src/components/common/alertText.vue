<template>
    <div class="alert_container" >
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertValue}}</p>
            <div class="confrim" @click="closeBtn">确认</div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['alertValue'],
    methods:{
        closeBtn(){
            this.$emit('closeTip')
        }
    }

}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
    .alert_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        .tip_text_container{
            position: absolute;
            left: 50%;
            top:50%;
            margin-top: -6rem;
            margin-left: -6rem;
            width: 12rem;
            background-color: #fff;
            padding-top: .6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 0.3rem;
            overflow: hidden;
            animation: tipMove 0.4s;
            .tip_icon{
                @include wh(3rem,3rem);
                border: 0.15rem solid #f8cb86;
                border-radius: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                span:nth-of-type(1){
                    @include wh(0.125rem, 1.5rem);
                    background-color: #f8cb86;
                }
                span:nth-of-type(2){
                    @include wh(0.2rem, 0.2rem);
                    background-color: #f8cb86;
                    border-radius: 50%;
                    margin-top: 0.2rem;
                }
            }
            .tip_text{
                font-size: 0.7rem;
                color: #333;
                line-height: .9rem;
                text-align: center;
                margin-top: .8rem;
                padding: 0 .4rem;
            }
            .confrim{
                font-size: 0.8rem;
                color: #fff;
                font-weight: bold;
                margin-top: .8rem;
                background-color: #4cd964;
                width: 100%;
                text-align: center;
                line-height: 1.8rem;
                border: 1px;
                border-bottom-left-radius: 0.25rem;
                border-bottom-right-radius: 0.25rem;
            }
        }
    }
    @keyframes tipMove {
        0%{
            transform: scale(1);
        }
        25%{
            transform: scale(0.8);
        }
        50%{
            transform: scale(1);
        }
        75%{
            transform: scale(0.9);
        }
        100%{
            transform: scale(1);
        }
    }
</style>