<template>
<div class="goods">
    <div class="menu" ref="menu">
        <div class="scroller">
            <ul>
                <li v-for="(menu,index) in goods" @click="slideMenu(index)" :class="{'active':menuIndex === index}">
                    <p><i class="icon" :class="classMap[menu.type]" v-if="menu.type > 0"></i>{{menu.name}}</p>
                </li>
            </ul>
        </div>
    </div>
    <div class="food" ref="food">
        <div class="scroller">
            <div class="item" v-for="food in goods">
                <h2>{{food.name}}</h2>
                <ul>
                    <li v-for="(item,index) in food.foods" @click="skip(item)">
                        <img :src="item.image" alt="">
                        <div class="info">
                            <h3>{{item.name}}</h3>
                            <p v-if="item.description" class="desc">{{item.description}}</p>
                            <p class="sellInfo">月售{{item.sellCount}}份<span>好评率{{item.rating}}%</span></p>
                            <p class="price"><span>￥<b>{{item.price}}</b></span><del v-if="item.oldPrice">￥<b>{{item.oldPrice}}</b></del></p>
                        </div>
                        <v-btngroup @add="add" :food="item"></v-btngroup>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <v-detail v-if="selectedFood" @hideDetail="hideDetail" :flag="showDetail" :food="selectedFood"></v-detail>
</div>
</template>

<script>
import btngroup from '@/components/Btngroup'
import detail from '@/components/Detail'
import {newScroll} from 'common/js/common.js'

export default {
    data(){
        return {
            goods : [],
            ratings : [],
            selectedFood : '',
            showDetail : false,
            menuScroll : '',
            foodScroll : '',
            menuPosition : [],
            foodPosition : [],
            classMap : ['decrease','discount','special','invoice','guarantee']
        }
    },
    created(){
        this.$ajax({
            method : 'get',
            url : '/api/goods'
        }).then((res) => {
            let datas = res.data;
            if(datas.errno == 0){
                this.goods = datas.data;
                this.$nextTick(function(){
                    this.menuScroll = newScroll(this.$refs.menu);
                    this.foodScroll = newScroll(this.$refs.food);

                    let hm = 0, hf = 0, arrm = [], arrf = [];
                    for(let i=0;i<this.goods.length;i++){
                        let menu = this.$refs.menu.getElementsByTagName('li')[i];
                        let food = this.$refs.food.getElementsByClassName('item')[i];
                        arrm.push(hm); arrf.push(hf);
                        hm += menu.clientHeight;
                        hf += food.clientHeight;
                    }
                    this.menuPosition = arrm; this.foodPosition = arrf;
                });
            }
        });
    },
    computed: {
        menuIndex(){
            if(!this.foodScroll || this.foodScroll.y > 0) return 0;
            let index, p = this.foodPosition, y =  this.foodScroll.y == 0 ? 0 : -this.foodScroll.y;
            for(let i=0; i<p.length; i++){
                if(!p[i+1] || (y >= p[i] && y < p[i+1])){
                    index = i;
                    break;
                }
            }
            return index;
        }
    },
    watch: {
        menuIndex(){
            if(this.foodScroll.y < 0){
                let menu = this.$refs.menu.getElementsByTagName('li')[this.menuIndex];
                this.menuScroll.scrollToElement(menu,300);
            }
        }
    },
    methods: {
        slideMenu(index){
            if(event._constructed){
                let item = this.$refs.food.getElementsByClassName('item')[index];
                this.foodScroll.scrollToElement(item,300);
            }
        },
        skip(food){
            this.selectedFood = food;
            this.showDetail = true;
        },
        hideDetail(){
            this.showDetail = false;
        },
        add(el){
            this.$emit('add',el);
        }
    },
    components: {
        'v-btngroup' : btngroup,
        'v-detail' : detail
    }
}
</script>

<style lang="scss">
@import "../common/css/mixin.scss";
$borderColor : rgba(7,17,27,0.15);

.goods{
    display: flex; flex: column;
    position: absolute; top: 12.4rem; left: 0; bottom: 3.6rem;
    color: #07111b; width: 100%;
    .menu{
        position: relative; flex: 0 0 80px; overflow: hidden; background: #f3f5f7;
        .scroller{
            position: absolute; width: 100%; min-height: 100%;
            ul{
                overflow: hidden;
                li{
                    display: table; font-size: 0.9rem;
                    width: calc(100% - 24px); height: 3.6rem; padding: 0 12px;
                    @include border-1px($borderColor,top);
                    &:first-child{ &:after{border-top: none;} }
                    &.active{background: #fff;}
                    p{
                        display: table-cell; line-height: 1.1rem; vertical-align: middle; padding: 6px 0;
                        .icon{
                            display: inline-block; width: 1rem; height: 1rem; vertical-align: top;
                            margin-right: 2px; background: center center no-repeat; background-size: 100% auto;
                            @include iconBg();
                        }
                    }
                }
            }
        }
    }
    .food{
        position: relative; flex: auto; overflow: hidden; background: #f3f5f7;
        .scroller{
            position: absolute; width: 100%; min-height: 100%;
            .item{
                overflow: hidden;
                h2{
                    font-size: 0.9rem; color: #93999f; height: 2rem; line-height: 2rem;
                    padding-left: 1rem; border-left: 2px solid #d9dde1;
                }
                ul{
                    overflow: hidden; padding: 0 1.2rem; background: #fff;
                    li{
                        position: relative; min-height: 4.8rem; padding: 1.2rem 0 1.2rem 5.5rem;
                        @include border-1px($borderColor,top);
                        &:first-child{&:after{border: none;}}
                        img{
                            position: absolute; left: 0; top: 1.2rem;
                            width: 4.8rem; height: 4.8rem; border-radius: 1px;
                        }
                        .info{
                            overflow: hidden; height: 100%;
                            h3{
                                font-size: 1.1rem; line-height: 1.5rem;
                                @include nowrap()
                            }
                            p{font-size: 10px; color: #93999f;line-height: 1rem; margin-top: 0.5rem;}
                            //.desc{@include nowrap();}
                            .sellInfo span{margin-left: 10px;}
                            .price{
                                margin-top: 0.8rem;
                                span{
                                    color: #f01414;
                                    b{font-size: 1rem; font-weight: bold;}
                                }
                                del{
                                    margin-left: 8px;
                                    b{font-weight: bold;}
                                }
                            }
                        }
                        .btngroup{position: absolute; right: 0; bottom: 1rem;}
                    }
                }
            }
        }
    }
}
@media ( min-width : 640px) {
    .goods {left: 50%; width: 640px; margin-left: -320px;}
}
</style>