<template>
    <div class="slideTabs" @click.stop.prevent>
        <div class="types"><p v-for="(item,index) in classify" :class="{'negative':index==2,'active':activeIndex == index}" @click="slide(index)">{{item.name}} <span>{{item.count}}</span></p></div>
        <p class="filter"><i class="icon-check_circle" :class="{'light':filter}" @click="toggleFilter"></i>只看有内容的评价</p>
    </div>
</template>

<script>
export default {
    props: {
        activeIndex : Number,
        classify : Array,
        filter : Boolean
    },
    methods: {
        slide(index){
            if(event._constructed){
                this.$emit('slideTab',index);
            }
        },
        toggleFilter(){
            if(event._constructed){
                this.$emit('toggleFilter');
            }
        }
    }
}
</script>

<style lang="scss">
@import "../common/css/mixin.scss";
.slideTabs{
    .types{
        overflow: hidden; margin: 0 1rem; padding-bottom: 1.3rem; @include border-1px(rgba(7,17,27,0.15));
        p{
            float: left; font-size: 12px; color: #4d555d; height: 2.4rem; line-height: 2.4rem;
            padding: 0 12px; margin-right: 8px; background: #ccecf8; border-radius: 2px;
            span{font-size: 10px;}
            &.negative{background: #e9ebec;}
            &.active{color: #fff; background: #00a0dc;}
        }
    }
    .filter{
        font-size: 12px; color: #93999f; height: 3.6rem; line-height: 3.6rem; padding: 0 1rem;
        i{
            font-size: 1.6rem; margin-right: 4px; vertical-align: middle;
            &.light{color: #00a0dc;}
        }
    }
}
</style>
