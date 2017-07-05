<template>
<div class="seller" ref="seller">
    <div class="scroller">
        <div class="mode mainInfo">
            <div class="title">
                <h3>{{seller.name}}</h3>
                <v-star  v-if="seller.score" :score="seller.score" :size="1.2" :gaprate="0.5"></v-star><span class="sellCount">月售{{seller.sellCount}}单</span>
                <div class="favorite">
                    <i class="icon-favorite"></i><br />收藏
                </div>
            </div>
            <div class="deliver">
                <p><span>起送价</span><br /><strong>{{seller.minPrice}}</strong>元</p>
                <p><span>商家配送</span><br /><strong>{{seller.deliveryPrice}}</strong>元</p>
                <p><span>平均配送时间</span><br /><strong>{{seller.deliveryTime}}</strong>分钟</p>
            </div>
        </div>
        <div class="mode notice">
            <p class="line"></p>
            <h3>公告与活动</h3>
            <p class="content">{{seller.bulletin}}</p>
            <ul>
                <li v-for="item in seller.supports">
                    <i :class="classMap[item.type]"></i><span>{{item.description}}</span>
                </li>
            </ul>
        </div>
        <div class="mode scene">
            <p class="line"></p>
            <h3>商家实景</h3>
            <div v-if="" class="pics" ref="pics">
                <div class="scroller" :style="{width:imgScrollWidth}">
                    <p v-for="pic in seller.pics"><img :src="pic" alt="" /></p>
                </div>
            </div>
        </div>
        <div class="mode sellerInfo">
            <p class="line"></p>
            <h3>商家信息</h3>
            <div>
                <p v-for="info in seller.infos">{{info}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import star from "components/Star"
import Bscroll from 'better-scroll'

export default {
    data(){
        return {
            scroll: '',
            imgScroll : '',
            imgScrollWidth : '',
            classMap: ['decrease','discount','special','invoice','guarantee']
        }
    },
    mounted(){
        if(this.fromPath) this.initScroll();
    },
    props: {
        seller : [String, Object],
        fromPath : String
    },
    watch: {
        seller(){
            this.initScroll();
        },
        imgScrollWidth(){
            this.$nextTick(function(){
                this.scroll.refresh();
                if(!this.imgScroll){
                    this.imgScroll = new Bscroll(this.$refs.pics, {
                        scrollX : true,
                        scrollY : false,
                        bounceTime : 900,
                    });
                }
            });
        }
    },
    methods: {
        initScroll(){
            this.$nextTick(function(){
                if(!this.scroll) this.scroll = new Bscroll(this.$refs.seller, {
                    click : true,
                    scrollY : true,                               //可滚动方向
                    bounceTime : 900,                             //弹力动画持续时间，即滚动手感
                    probeType : 3
                });

                let picEl = this.$refs.pics.getElementsByTagName('p');
                let picWidth = picEl[0].clientWidth;
                let num = this.seller.pics.length;
                this.imgScrollWidth = picWidth * num + (num - 1) * 6 + 'px';
            });
        }
    },
    components: {
        'v-star' : star
    }
}
</script>

<style lang="scss">
@import "../common/css/icon.css";
@import "../common/css/mixin.scss";
$borderColor : rgba(7,17,27,0.2);
$borderColor1 : rgba(7,17,27,0.15);

.seller{
    position: absolute; left: 0; top: 12.4rem; bottom: 3.6rem; overflow: hidden; width: 100%; background: #f3f5f7;
    .mode{
        position: relative; padding: 1.3rem 1rem 0; margin-top: 1.3rem; background: #fff; @include border-1px($borderColor);
        h3{font-size: 1.1rem; line-height: 1.1rem;}
        .line{@include border-1px($borderColor,top); position: absolute; left: 0; top: 0; width: 100%; height: 1px;}
    }
    .mainInfo{
        overflow: hidden; padding: 0; margin-top: 0;
        .title{
            position: relative; overflow: hidden; padding-bottom: 1.3rem; margin: 1.3rem 1rem 0; @include border-1px($borderColor1);
            .stars{float: left; margin-top: 8px;}
            .sellCount{float: left; line-height: 1.2rem; margin: 8px 0 0 5px;}
            .favorite{
                position: absolute; right: 0; top: 0; text-align: center; font-size: 10px; color: #4d555d; line-height: 1rem;
                i{font-size: 1.6rem; color: #f01414;}
            }
        }
        .deliver{
            display: flex; flex-direction: row; margin: 1.3rem 0;
            p{
                font-size: 10px; width: 33.33%; text-align: center; line-height: 10px;
                span{color: #93999f;}
                strong{display: inline-block; font-size: 1.3rem; line-height: 1.3rem; margin-top: 5px;}
            }
        }
    }
    .notice{
        .content{color: #f01414; line-height: 1.8rem; margin-top: 8px; padding-left: 12px;}
        ul{
            margin-top: 1.2rem;
            li{
                font-size: 12px; line-height: 1.2rem; padding: 1.2rem 12px; @include border-1px($borderColor1,top);
                i{
                    display: inline-block; width: 1.2rem; height: 1.2rem; margin: -2px 6px 0 0;
                    vertical-align: middle; background: no-repeat center center; background-size: 1.2rem auto;
                    @include iconBg();
                }
            }
        }
    }
    .scene{
        padding: 1.3rem 0 1.3rem 1rem;
        .pics{
            height: 90px; margin-top: 12px;
            .scroller{
                height: 100%;
                p{
                    float: left; width: 120px; height: 100%; margin-left: 6px;
                    &:first-child{margin-left: 0;}
                    img{width: 100%; height: 100%;}
                }
            }
        }
    }
    .sellerInfo{
        div{
            margin-top: 12px;
            p{
                font-size: 12px; line-height: 1.2rem; padding: 1.2rem 12px; @include border-1px($borderColor1,top);
            }
        }
    }
}
@media ( min-width : 640px) {
    .seller {left: 50%; width: 640px; margin-left: -320px;}
}
</style>