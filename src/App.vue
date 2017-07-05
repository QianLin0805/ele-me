<template>
<div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
        <div v-for="(route, index) in routes">
            <router-link :to="{name : routes[index].pathName}">{{routes[index].name}}</router-link>
            <transition name="slidebar" @before-enter="beforeSlide" @enter="slide">
                <p v-show="toPath == routes[index].pathName"></p>
            </transition>
        </div>
    </div>
    <transition :name="slideName">
        <keep-alive>
            <router-view @add="add" @getShopcar="getShopcar" :seller="seller" :fromPath="fromPath"></router-view>
        </keep-alive>
    </transition>
    <v-account ref="shopcar" :shopcar="shopcar" :seller="seller"></v-account>
</div>
</template>

<script>
import header from 'components/Header'
import account from 'components/Account'
import Velocity from 'velocity-animate'

export default {
    data(){
        return {
            seller : '',
            slideName : '',
            shopcar : [],
            routes : [
                {
                    pathName : 'goods',
                    name : '商品'
                },
                {
                    pathName : 'ratings',
                    name : '商品'
                },
                {
                    pathName : 'seller',
                    name : '商品'
                }
            ],
            offsetVal : '',
            fromPath : '',
            toPath : ''
        }
    },
    created(){
        this.toPath = this.$route.path.split('/')[1];
        this.$ajax({
            method : 'get',
            url : '/api/seller',
        }).then((res) => {
            let datas = res.data;
            if(datas.errno == 0){
                this.seller = datas.data;
            }
        });
    },
    watch: {
        $route(to,from){
            if((to.path=='/goods' && from.path=='/ratings') || (from.path=='/goods' && to.path=='/ratings')){
                this.slideName = 'slideRight';                //rating从右边滑入，从左边滑出
            }else{
                this.slideName = 'slideLeft';
            }

            this.fromPath = from.path.split('/')[1];
            this.toPath = this.$route.path.split('/')[1];
            this.offsetVal = ( this.getIndex(this.fromPath) - this.getIndex(this.toPath) ) * 100 + '%';
        }
    },
    methods: {
        getShopcar(arr){
            this.shopcar = arr;
        },
        add(el){
            this.$refs.shopcar.move(el);
        },
        getIndex(str){
            let i;
            this.routes.forEach((route,index) => {
                if(route.pathName == str) i = index;
            });
            return i;
        },
        beforeSlide(el){
            el.style.left = this.offsetVal;
        },
        slide(el,done){
            Velocity(el, {left : 0}, {duration : 300});
        }
    },
    components : {
        'v-header' : header,
        'v-account' : account
    }
}
</script>

<style lang="scss">
@import "./common/css/icon.css";
@import "./common/css/mixin.scss";
#app {
    width: 100%; height: 100vh;
    .tab {
        display: flex; overflow: hidden;
        text-align: center; width: 100%; height: 3rem; line-height: 3rem;
        @include border-1px(rgba(7,17,27,0.2));
        div{
            position: relative; flex: auto;
            a{
                display: block;color: #4d555d;
                &.active {
                    color: #f01414;
                }
            }
            p{
                position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: #f01414;
            }
        }
    }
    .goods{
        transform: translate3d(0,0,0); transition: all 0.3s ease-in;
        &.slideLeft-enter,&.slideRight-enter,&.slideLeft-leave-active,&.slideRight-leave-active{transform: translate3d(-100%,0,0)}
    }
    .ratings{
        transform: translate3d(0,0,0); transition: all 0.3s ease-in;
        &.slideLeft-enter{transform: translate3d(-100%,0,0);}
        &.slideLeft-leave-active{transform: translate3d(-100%,0,0);}

        &.slideRight-enter,&.slideRight-leave-active{transform: translate3d(100%,0,0);}
    }
    .seller{
        transform: translate3d(0,0,0); transition: all 0.3s ease-in;
        &.slideLeft-enter-active{transform: translate3d(0,0,0);}
        &.slideLeft-enter,&.slideLeft-leave-active{transform: translate3d(100%,0,0);}
    }
}
</style>
