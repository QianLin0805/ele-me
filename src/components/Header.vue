<template>
<div class="header">
    <div class="mainWrap">
        <div class="bg"><img :src="seller.avatar" alt="" /></div>
        <div class="main">
            <img :src="seller.avatar" alt="" class="avatar" />
            <div class="info">
                <h1><img src="./images/brand.png" alt="" class="brand" /><span>{{seller.name}}</span></h1>
                <p class="deliver">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
                <div class="supports" v-if="seller.supports">
                    <i class="scheme" :class="classMap[seller.supports[0].type]"></i><span>{{seller.supports[0].description}}</span>
                </div>
                <p class="num" v-if="seller.supports" @click="showDetail"><span>{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i></p>
            </div>
        </div>
        <p class="notice" @click="showDetail"><img src="./images/bulletin.png" alt="" /><span>{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i></p>
    </div>
    <transition name="slide">
        <div class="sellerDetail" ref="sellerDetail" v-show="detailFlag">
            <div class="scroller">
                <div class="wrap">
                    <h1>{{seller.name}}</h1>
                    <div class="starWrap">
                        <v-star v-if="seller.score" :score="seller.score" :size="1.6" :gaprate="0.75"></v-star>
                    </div>
                    <h2><p class="line"></p><span>优惠信息</span><p class="line"></p></h2>
                    <ul>
                        <li v-for="item in seller.supports">
                            <i class="scheme" :class="classMap[item.type]"></i><span>{{item.description}}</span>
                        </li>
                    </ul>
                    <h2><p class="line"></p><span>商家公告</span><p class="line"></p></h2>
                    <p class="bulletin">{{seller.bulletin}}</p>
                </div>
                <p class="close" @click="hideDetail"><i class="icon-close"></i></p>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import star from 'components/Star'
import {newScroll} from '../common/js/common.js'

export default {
    data(){
        return {
            scroll: '',
            detailFlag: false,
            classMap: ['decrease','discount','special','invoice','guarantee']
        }
    },
    props : {
        seller : [String, Object]
    },
    //props : ['seller'],
    methods : {
        showDetail(){
            this.detailFlag = true;
            if(!this.scroll){
                this.$nextTick(function(){
                    this.scroll = newScroll(this.$refs.sellerDetail);
                });                
            }
        },
        hideDetail(){
            this.detailFlag = false;
        }
    },
    components : {
        'v-star' : star
    }
}
</script>

<style lang="scss">
@import "../common/css/mixin.scss";
.header {
    position: relative; color: #fff; background: rgba(7,17,27,.55);
    .mainWrap{
        position: relative; overflow: hidden;
        .bg {
            position: absolute; left: 0; top: 0; z-index: -1;
            text-align: center; width: 100%; height: 100%;
            img {
                width: 72%; margin-top: 10%;
                filter: blur(15px);
            }
        }
        .main {
            overflow: hidden; position: relative;
            font-weight: 100; height: 4.6rem; padding: 1.6rem 1.6rem 1.2rem 7.2rem;
            .avatar {
                position: absolute; left: 1.6rem; top: 1.6rem;
                width: 4.6rem; border-radius: 3px;
            }
            .info {
                height: 100%;
                h1 {
                    font-size: 1.2rem; font-weight: bold; line-height: 1.7rem;
                    .brand {
                        display: inline-block; width: 2.2rem; vertical-align: middle;
                        margin-top: -2px; margin-right: 5px;
                    }
                    span{vertical-align: middle;}
                }
                .deliver{font-size: 0.9rem; line-height: 1.8rem;}
                .supports{
                    overflow: hidden; font-size: 10px; height: 1.1rem; line-height: 1.1rem;
                    .scheme{
                        display: inline-block; width: 12px; height: 12px;
                        margin: -1px 3px 0 0; vertical-align: middle;
                        background: center center no-repeat; background-size: 100% auto;
                        @include schemeBg();
                    }
                    span{vertical-align: middle;}
                }
                .num{
                    display: inline-block; position: absolute; right: 12px; top: 5rem;
                    line-height: 1.6rem; padding: 0 0.8rem; background: rgba(0,0,0,.2);
                    border-radius: 0.8rem;
                    span{margin-right: 0.6rem; font-size: 10px;}
                    i{position: absolute; right: 0.4rem; top: 0.3rem;}
                }
            }
        }
        .notice{
            position: relative; font-size: 10px;
            height: 2rem; line-height: 2rem; padding: 0 28px 0 12px; background: rgba(0,0,0,.2);
            @include nowrap();
            img{
                height: 12px; vertical-align: middle; margin-right: 5px;
            }
            span{vertical-align: middle;}
            i{
                position: absolute; right: 8px; top: .5rem;
                font-size: 1rem;
            }
        }
    }
    .sellerDetail{
        position: fixed; left: 0; top: 0; z-index: 999; overflow: hidden;
        width: 100%; height: 100vh; background: rgba(7,17,27,.9);
        transform: translate3d(0,0,0); transition: all 0.25s ease-in;
        &.slide-enter-active,&.slide-leave-active{transform: translate3d(100%,0,0);}
        .scroller{
            position: absolute; left: 0; right: 0; z-index: 1; padding: 0 2.4rem 5.8rem;
            .wrap{
                overflow: hidden; min-height: calc(100vh - 5.8rem);
                h1{font-size: 1.2rem; font-weight: bold; color: #fff; text-align: center; line-height: 1.2rem; margin-top: 2.4rem;}
                .starWrap{
                    margin-top: 1.2rem;
                    .stars{margin: 0 auto;}
                }
                h2{
                    display: flex; flex-direction: row;
                    font-size: 1.1rem; font-weight: bold; color: #fff; text-align: center;
                    line-height: 1.1rem; margin-top: 1.5rem;
                    .line{
                        display: inline-block; flex: 1;
                        height: 1px; background: rgba(255, 255, 255, 0.2); margin-top: 0.55rem;
                    }
                    span{display: inline-block; padding: 0 12px;}
                }
                ul{
                    overflow: hidden; padding: 1.8rem 12px 0;
                    li{
                        font-size: 0.9rem; height: 1.2rem; line-height: 1.23rem; margin-top: 1rem;
                        @include nowrap();
                        &:first-child{margin-top: 0;}
                        .scheme{
                            float: left; width: 1.2rem; height: 1.2rem; margin-right: 6px;
                            background: no-repeat center center; background-size: 1.2rem auto;
                            @include schemeBg();
                        }
                    }
                }
                .bulletin{
                    font-size: 0.9rem; line-height: 1.8rem; margin-top: 1.6rem;
                }
            }
            .close{
                position: absolute; left: 0; bottom: 0;
                text-align: center; font-size: 2.4rem; color: rgba(255, 255, 255, 0.5);
                width: 100%; height: 2.4rem; padding: 1rem 0 2.4rem;
            }
        }
    }
}
@media ( min-width : 640px) {
    .header .sellerDetail{left: 50%; width: 640px; margin-left: -320px;}
}
</style>