<template>
<transition name="slide">
    <div class="goodsDetail" ref="goodsDetail" v-show="flag">
        <div class="scroller">
            <div class="top">
                <p class="icon-arrow_lift" @click="close"></p>
                <img :src="food.image" alt="" />
                <div class="info">
                    <h2>{{food.name}}</h2>
                    <p class="sellInfo">月售{{food.sellCount}}份<span>好评率{{food.rating}}%</span></p>
                    <div class="price">
                        <span>￥<b>{{food.price}}</b></span><del v-if="food.oldPrice">￥<b>{{food.oldPrice}}</b></del>
                        <transition name="fade">
                            <p @click="add" v-show="food.buyCount <= 0">加入购物车</p>
                        </transition>
                        <v-btngroup :food="food" :shopcar="shopcar"></v-btngroup>
                    </div>
                </div>
            </div>
            <div class="desc" v-if="food.info">
                <p class="line"></p>
                <h2>商品介绍</h2>
                <div>{{food.info}}</div>
            </div>
            <div class="rating">
                <h2>商品评价</h2>
                <v-tabs @slideTab="slideTab" @toggleFilter="toggleFilter" :classify="classify" :activeIndex="activeIndex" :filter="filter"></v-tabs>
                <ul v-show="ratings.length > 0">
                    <li v-for="item in ratings">
                        <div class="replyInfo"><p class="time">{{item.rateTime | formatDate}}</p><p class="user">{{item.username}}<span></span><img :src="item.avatar" alt="" class="avatar" /></p></div>
                        <p class="content"><i :class="{'icon-thumb_up':item.rateType == 0,'icon-thumb_down':item.rateType == 1}"></i>{{item.text}}</p>
                    </li>
                </ul>
                <div class="empty" v-show="ratings.length <= 0">暂无数据</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import btngroup from 'components/Btngroup'
import slideTabs from 'components/SlideTabs'
import {formatDate,initClassify,resetRatings,newScroll} from '../common/js/common.js'

export default {
    data(){
        return {
            scroll : '',
            activeIndex : 0,
            filter : false
        }
    },
    mounted(){
        if(!this.scroll){
            this.$nextTick(function(){
                this.scroll = newScroll(this.$refs.goodsDetail);
            });
        }
    },
    props: {
        flag : Boolean,
        food : Object,
        shopcar : Array
    },
    filters: {
        formatDate : function(val){
            return formatDate(val);
        }
    },
    computed: {
        classify(){
            let arr = [
                {name : '全部', count : 0},
                {name : '推荐', count : 0},
                {name : '吐槽', count : 0}
            ];
            return initClassify(this.food.ratings,arr,this.filter);
        },
        ratings(){
            return resetRatings(this.food.ratings,this.activeIndex,this.filter);
        }
    },
    watch: {
        flag(){
            if(this.scroll){
                this.scrollFresh();
            }
        }
    },
    methods: {
        close(){
            if(event._constructed){
                this.$emit('hideDetail');
            }
        },
        add(){
            if(event._constructed){
                this.food.buyCount++;
            }
        },
        slideTab(index){
            this.activeIndex = index;
            this.scrollFresh();
        },
        toggleFilter(){
            this.filter = !this.filter;
            this.scrollFresh();
        },
        scrollFresh(){
            this.$nextTick(function(){
                this.scroll.refresh();
            });
        }
    },
    components: {
        'v-btngroup' : btngroup,
        'v-tabs' : slideTabs
    }
}
</script>

<style lang="scss">
@import "../common/css/mixin.scss";
$borderColor : rgba(7,17,27,0.2);
$borderColor1 : rgba(7,17,27,0.15);

.goodsDetail{
    position: absolute; left: 0; top: -12.4rem; bottom: 0; z-index: 2; width: 100%; background: #f3f5f7;
    transform: translate3d(0,0,0); transition: all 0.25s ease-in;
    &.slide-enter-active,&.slide-leave-active{transform: translate3d(100%,0,0);}
    .info,.desc{padding: 1.2rem 1rem;}
    .top,.desc,.rating{background: #fff;}
    h2{font-size: 1.1rem;}
    .top{
        position: relative; overflow: hidden; @include border-1px($borderColor);
        .icon-arrow_lift{
            position: absolute; left: 0.5rem; top: 0.5rem; z-index: 1;
            font-size: 1rem; color: #fff; text-align: center; width: 2rem; line-height: 2rem;
            background: rgba(0,0,0,0.2); border-radius: 3px;
        }
        img{width: 100%;}
        .info{
            h2{font-weight: bold;}
            .sellInfo{font-size: 12px; color: #93999f; margin-top: 8px;}
            .price{
                position: relative; font-size: 10px; height: 2rem; line-height: 2rem; margin-top: 1rem;
                span{
                    color: #f01414;
                    b{font-size: 1rem; font-weight: bold;}
                }
                del{
                    margin-left: 8px;
                    b{font-size: 12px; font-weight: bold;}
                }
                p{
                    position: relative; z-index: 1; float: right; font-size: 12px; color: #fff;
                    padding: 0 1rem; background: #00a0dc; border-radius: 1rem;
                    transition: 0.2s all 0.1s linear;
                    &.fade-enter{opacity: 0;}
                    &.fade-leave-active{transition: all 0.2s linear;opacity: 0;}
                }
                .btngroup{
                    position: absolute; right: 0; bottom: 0.2rem;
                }
            }
        }
    }
    .desc{
        margin-top: 1.8rem; @include border-1px($borderColor);
        div{font-size: 12px; color: #4d555d; line-height: 1.8rem; margin-top: 8px; padding-left: 8px;}
        .line{
                @include border-1px($borderColor,top);
                position: absolute; left: 0; top: 0; font-size: 0;
                width: 100%; height: 1px; margin: 0; padding: 0;
        }
    }
    .rating{
        margin-top: 1.8rem; @include border-1px($borderColor,top); padding-top: 1.2rem;
        h2{padding: 0 1rem 1.3rem;}
        ul{
            overflow: hidden; @include border-1px($borderColor,top); padding: 0 1rem;
            li{
                position: relative; overflow: hidden; font-size: 10px; color: #93999f;
                line-height: 1.2rem; padding: 1rem 0; @include border-1px($borderColor1,top);
                &:first-child{&:after{border: none;}}
                .user{
                    position: absolute; right: 0; top: 1rem;
                    img{width: 1rem; height: 1rem; border-radius: 100%; margin-left: 6px; vertical-align: middle;}
                }
                .content{
                    font-size: 12px; color: #07111b; line-height: 1rem; margin-top: 6px;
                    i{
                        font-size: 1rem; color: #00a0dc; margin-right: 3px; vertical-align: middle;
                        &.icon-thumb_down{color: #b7bbbf;}
                    }
                }
            }
        }
        .empty{
            font-size: 12px; color: #93999f; text-align: center; line-height: 1.2rem;
            padding: 1rem 0 0.5rem; @include border-1px($borderColor,top);
        }
    }
}

</style>