<template>
<div class="ratings" ref="ratings">
    <div class="scroller">
        <div class="scores">
            <div class="score">
                <h3>{{seller.score}}</h3>
                <p>综合评分</p>
                <span>高于周边商家{{seller.rankRate}}%</span>
            </div>
            <div class="more">
                <div class="scoreInfo serviceScore">
                    <h4>服务态度</h4>
                    <v-star v-if="seller.serviceScore" :score="seller.serviceScore" :size="1.2" :gaprate="0.3"></v-star>
                    <span class="num">{{seller.serviceScore}}</span>
                </div>
                <div class="scoreInfo foodScore">
                    <h4>商品评分</h4>
                    <v-star v-if="seller.serviceScore" :score="seller.foodScore" :size="1.2" :gaprate="0.3"></v-star>
                    <span class="num">{{seller.foodScore}}</span>
                </div>
                <div class="scoreInfo deliveryTime"><h4>送达时间</h4><span class="num">{{seller.deliveryTime}}分钟</span></div>
            </div>
        </div>
        <div class="replys">
            <v-tabs @slideTab="slideTab" @toggleFilter="toggleFilter" :classify="classify" :activeIndex="activeIndex" :filter="filter"></v-tabs>
            <ul>
                <li v-for="(item,index) in ratings">
                    <img :src="item.avatar" alt="" class="avatar" />
                    <div class="replyInfo">
                        <p class="userInfo"><span class="user">{{item.username}}</span><span class="date">{{item.rateTime | formatDate}}</span></p>
                        <div class="score"><v-star v-if="item.score" :score="item.score" :size="0.9" :gaprate="0.2"></v-star><span v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span></div>                        
                        <p class="content" v-if="item.text">{{item.text}}</p>
                        <div class="recommend"><i :class="{'icon-thumb_up':item.rateType == 0,'icon-thumb_down':item.rateType == 1}"></i><span v-for="food in item.recommend">{{food}}</span></div>
                    </div>
                </li>
            </ul>
            <div class="empty"></div>
        </div>
    </div>
</div>
</template>

<script>
import star from "components/Star"
import tabs from "components/SlideTabs"
import {formatDate,initClassify,resetRatings,newScroll} from '../common/js/common.js'

export default {
    data(){
        return {
            replys : [],
            scroll : '',
            activeIndex : 0,
            filter : false
        }
    },
    created(){
        this.$ajax({
            method : 'get',
            url : '/api/ratings'
        }).then((res) => {
            let datas = res.data;
            if(datas.errno == 0){
                this.replys = datas.data;
                this.$nextTick(function(){
                    this.scroll = newScroll(this.$refs.ratings);
                });
            }
        });
    },
    props: {
        seller : [String, Object]
    },
    filters: {
        formatDate(val){
            return formatDate(val);
        }
    },
    computed: {
        classify(){
            let arr = [
                {name : '全部', count : 0},
                {name : '满意', count : 0},
                {name : '不满意', count : 0}
            ];
            return initClassify(this.replys,arr,this.filter);
        },
        ratings(){
            return resetRatings(this.replys,this.activeIndex,this.filter);
        }        
    },
    methods: {
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
        'v-star' : star,
        'v-tabs' : tabs
    }
}
</script>

<style lang="scss">
@import "../common/css/icon.css";
@import "../common/css/mixin.scss";
$borderColor : rgba(7,17,27,0.2);
$borderColor1 : rgba(7,17,27,0.15);

.ratings{
    position: absolute; left: 0; top: 12.4rem; bottom: 3.6rem; overflow: hidden; width: 100%; background: #f3f5f7;
    .scores{
        overflow: hidden; height: 5.7rem; padding: 1.2rem 0; background: #fff; @include border-1px($borderColor);
        .score{
            display: flex; flex-direction: column; justify-content: center; float: left;
            text-align: center; width: 35%; height: 100%;
            @include border-1px($borderColor1,right);
            h3{font-size: 1.8rem; color: #f90; line-height: 1.3em;}
            p{font-size: 1rem;line-height: 1.5em;}
            span{font-size: 10px; color: #93999f;line-height: 2em;}
        }
        .more{
            float: left; width: 61%; padding-left: 4%;
            .scoreInfo{
                overflow: hidden; height: 1.5rem; line-height: 1.5rem; margin-top: 0.6rem;
                &:first-child{margin-top: 0;}
                h4, .num, .stars{float: left; font-size: 12px;}
                h4{margin-right: 0.8rem;}
                .stars{margin: 0.1rem 0.3rem 0 0;}
                .num{color: #f90;}
            }
            .deliveryTime .num{color: #93999f;}
        }
    }
    .replys{
        overflow: hidden; background: #fff; margin-top: 1.2rem; @include border-1px($borderColor,top);
        .slideTabs{margin-top: 1.3rem;}
        ul{
            overflow: hidden; padding: 0 1rem; @include border-1px($borderColor,top);
            li{
                position: relative; overflow: hidden; padding: 1.3rem 0 1.3rem 2.7rem;
                @include border-1px($borderColor1,top);
                &:first-child{&:after{border: none;}}
                .avatar{position: absolute; left: 0; top: 1.3rem; width: 2.1rem; height: 2.1rem; border-radius: 100%;}
                .userInfo{
                    font-size: 10px; line-height: 1rem;
                    .date{float: right; color: #93999f;}
                }
                .score{
                    overflow: hidden; font-size: 10px; color: #93999f; line-height: 1rem; margin-top: 5px;
                    .stars{float: left; margin-right: 5px;}
                    span{float: left;}
                }
                .content{font-size: 1rem; line-height: 1.6rem; margin-top: 6px;}
                .recommend{
                    overflow: hidden; font-size: 9px; color: #93999f; line-height: 1.3rem; padding-top: 4px;
                    i{
                        display: inline-block; float: left; font-size: 1rem; color: #00a0dc;
                        height: 1.3rem; line-height: 1.3rem; margin: 5px 8px 0 0;
                        &.icon-thumb_down{color: #b7bbbf;}
                    }
                    span{display: inline-block; padding: 0 6px; margin: 4px 8px 0 0; border: 1px solid $borderColor1; border-radius: 2px;}
                }
            }
        }
    }
}
@media ( min-width : 640px) {
    .ratings {left: 50%; width: 640px; margin-left: -320px;}
}
</style>