<template>
<div class="account">
    <transition name="fade">
        <div class="mask" v-show="!fold" @click="foldIn"></div>
    </transition>
    <transition name="fold">
        <div class="shopcar" v-show="!fold">
            <h2>购物车<span class="empty" @click="empty">清空</span></h2>            
            <div class="wrapper" ref="wrapper">
                <div class="scroller">
                    <ul>
                        <li v-for="item in shopcar">
                            <p class="name">{{item.name}}</p>
                            <p class="price">￥<span>{{item.price}}</span></p>
                            <v-btngroup :food="item" :shopcar="shopcar"></v-btngroup>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
    <div class="settlement" @click="slideShopcar">
        <p class="icon" :class="{'active' : shopcar.length > 0}">
            <span v-if="shopcar.length > 0">{{shopcar.length}}</span>
            <i class="icon-shopping_cart"></i>
        </p>
        <div class="price">
            <p class="amount" v-if="shopcar.length > 0">￥<span>{{amount}}</span></p>
            <p class="deliveryPrice" :class="{'small' : shopcar.length > 0}">配送费￥{{seller.deliveryPrice}}元</p>
        </div>
        <p class="submit" :class="{'meet' : amount >= seller.minPrice}"><span v-if="amount < seller.minPrice"><i>差</i>￥{{seller.minPrice - amount}}起送</span><span v-if="amount >= seller.minPrice" @click.stop.prevent="pay">去结算</span></p>
    </div>
    <transition name="drop" @before-enter="beforeDrop" @enter="drop" @after-enter="afterDrop">        
        <div class="balls" v-show="balls">
            <p  transition></p>
        </div>
    </transition>
</div>
</template>

<script>
import Vue from 'vue'
import btngroup from 'components/Btngroup'
import Velocity from 'velocity-animate'
import {newScroll} from '../common/js/common.js'

export default {
    data(){
        return {
            fold : true,
            scroll : '',
            targetEl : '',
            balls : false
            // [
            //     {show : false},
            //     {show : false},
            //     {show : false},
            //     {show : false},
            //     {show : false}
            // ]
        }
    },
    props: {
        shopcar : Array,
        seller : [String, Object]
    },
    computed: {
        amount(){
            let amount = 0;
            this.shopcar.forEach((food) => {
                amount += food.buyCount * food.price;
            });
            return amount;
        }
    },
    watch: {
        shopcar(val, oldVal){
            if(!this.scroll){
                this.scroll = newScroll(this.$refs.wrapper);
            }else{
                if(oldVal.length != val.length){
                    if(val.length <= 0) this.fold = true;
                    this.$nextTick(function(){
                        if(this.scroll) this.scroll.refresh();
                    });
                }
            }
        }
    },
    methods: {
        slideShopcar(){
            if(this.shopcar.length > 0){
                this.fold = !this.fold;
                this.$nextTick(function(){
                    if(this.scroll) this.scroll.refresh();
                });
            }
        },
        foldIn(){
            this.fold = true;
        },
        empty(){
            this.shopcar.forEach((food) => {
                food.buyCount = 0;
            });
        },
        pay(){
            alert('请支付' + (this.amount + this.seller.deliveryPrice) + '元');
        },
        move(el){
            this.targetEl = el;
            //this.balls = true;
            // for(let i=0; i<this.balls.length; i++){
            //     let ball = this.balls[i];
            // }
        },
        beforeDrop(el){
            let rect = this.targetEl.getBoundingClientRect();
            let x = rect.left, y = -rect.top;
            //el.style.transform = 'translateX('+ x +'px) translateY('+ y +'px)';
            //console.log(this.balls)
            //this.$nextTick(() => {
                //el.style.transform = '';
            //});
        },
        drop(el,done){
            //Velocity(el, {translateX:0}, {duration : 3000});
            //el.style.left = 0
        },
        afterDrop(el){
            //this.balls = false;
        }
    },
    components: {
        'v-btngroup' : btngroup
    }
}
</script>

<style lang="scss">
@import "../common/css/mixin.scss";
$borderColor : rgba(7,17,27,0.15);

.account{
    position: fixed; left: 0; bottom: 0; z-index: 2;
    width: 100%; height: 3.6rem;
    .mask{
        position: fixed; left: 0; top: 0;
        width: 100%; height: 100vh; background: #07111b;
        opacity: 0.6;transition: all 0.15s linear;
        &.fade-enter-active{opacity: 0;}
        &.fade-leave-active{transition: all 0.3s linear; opacity: 0;}
        &.fade-leave{opacity: 0.6}
    }
    .shopcar{
        position: fixed; left: 0; bottom: 3.6rem; z-index: 1;
        width: 100%; max-height: calc(23rem + 5px); background: #fff;
        transform: translate3d(0,0,0); transition: 0.25s all 0.05s linear;
        &.fold-leave-active{transition: all 0.3s linear;}
        &.fold-enter,&.fold-leave-active{transform: translate3d(0,100%,0);}
        h2{
            font-size: 1.1rem; height: 3rem; line-height: 3rem; padding: 0 1.2rem; background: #f3f5f7;
            @include border-1px($borderColor);
            .empty{float: right; font-size: 0.9rem; color: #00a0dc; padding: 0 10px; margin-right: -10px;}
        }
        .wrapper{
            overflow: hidden; max-height: calc(20rem + 4px);
            .scroller{
                position: relative; width: 100%; min-height: 100%;
                ul{
                    overflow: hidden; padding: 0 1.2rem;
                    li{
                        display: flex; flex-direction: row;
                        height: 4rem; line-height: 4rem;
                        @include border-1px($borderColor,top);
                        &:first-child{ &:after{border: none;} }
                        .name{font-size: 1.1rem; flex: auto; @include nowrap();}
                        .price{
                            flex: 0 0 5rem; color: #f01414; text-align: center; padding-right: 10px;
                            span{font-size: 1.2rem; font-weight: bold;}
                        }
                        .btngroup{
                            flex: 0 0 5rem; padding-top: 1.2rem;
                        }
                    }
                }
            }
        }
    }
    .settlement{
        position: relative; z-index: 888;
        color: rgba(255,255,255,0.4); height: 100%; padding: 0 8rem 0 5rem; background: #141d27;
        .icon{
            position: absolute; left: 0.9rem; bottom: 0;
            text-align: center; width: 3.6rem; height: 3.6rem; background: #313841;
            border: 0.35rem solid #141d27; border-radius: 100%;
            transition: background 0.2s linear;
            span{
                position: absolute; right: -3px; top: -6px;
                font-size: 9px; color: #fff; height: 1.2rem; line-height: 1.2rem; min-width: 0.6rem;
                padding: 0 0.3rem; background: #f01414; border-radius: 0.6rem;
            }
            i{display: inline-block; font-size: 2.1rem; margin: 0.8rem 0 0 1px; transition: color 0.2s linear;}
            &.active{
                background: #00a0dc;
                i{color: #fff;}
            }
        }
        .price{
            display: flex; flex-direction: column; justify-content: center; height: 3.4rem; padding: 0 12px;
            .amount{font-size: 1.2rem; font-weight: bold; color: rgba(255,255,255,0.6); line-height: 1.8rem;}
            .deliveryPrice{
                font-size: 1rem; line-height: 1rem;
                &.small{font-size: 10px;}
            }
        }
        .submit{
            position: absolute; right: 0; top: 0;
            font-size: 1rem; text-align: center;
            width: 8rem; height: 100%; line-height: 3.6rem; background: #313841;
            &.meet{color: #fff; background: #f01414;}
        }
    }
    .balls{
        position: absolute; left: 2.25rem; bottom: 1.35rem; z-index: 999;
        width: 1.6rem; height: 1.6rem; border-radius: 100%;  background: #00a0dc;
        //transition: all 3s;
        //transform: translate3d(200px,-200px,0);
        p{}
    }
}
@media ( min-width : 640px) {
    .account, .account .mask, .account .shopcar {left: 50%; width: 640px; margin-left: -320px;}
}
</style>