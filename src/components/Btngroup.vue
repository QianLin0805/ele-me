<template>
    <div class="btngroup" @click.stop.prevent>
        <transition name="move-rotate">
            <i class="minus icon-remove_circle_outline" v-show="food.buyCount > 0" @click="minus"></i>
        </transition>
        <transition name="fade">
            <span v-show="food.buyCount > 0">{{food.buyCount}}</span>
        </transition>
        <i class="add icon-add_circle" @click="add"></i>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    mounted(){
        if(!this.food.buyCount) Vue.set(this.food,'buyCount',0);
    },
    props: {
        food : Object,
        shopcar : Array
    },
    methods: {
        add(e){
            if(event._constructed){
                this.food.buyCount++;
                this.$emit('add',e.target);
            }
        },
        minus(event){
            if(event._constructed){
                this.food.buyCount--;
            }
        }
    }
}
</script>

<style lang="scss">
.btngroup{
    overflow: hidden; font-size: 0; color: #00a0dc; width: 5rem; height: 1.6rem; line-height: 1.6rem;
    i{font-size: 1.6rem; vertical-align: middle;}
    .minus{
        position: relative; left: 0; float: left;
        opacity: 1; transform: rotate(0);
        transition: all 0.4s linear;
        &.move-rotate-enter,&.move-rotate-leave-active{left: 1.8rem; opacity: 0; transform: rotate(180deg);}
    }
    .add{float: right;}
    span{
        display: inline-block; float: left;
        font-size: 0.9rem; text-align: center; width: 1.6rem; vertical-align: middle;
        &.fade-enter-active{opacity: 0; transition: all 0.3s linear;}
    }
}
</style>
