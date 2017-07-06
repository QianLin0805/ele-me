import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
import Ratings from '@/components/Ratings'
import Seller from '@/components/Seller'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
    mode : 'history',
    linkActiveClass : 'active',
    routes: [
        {
            path : '/goods',
            name : 'goods',
            component : Goods
        },
        {
            path : '/ratings',
            name : 'ratings',
            component : Ratings
        },
        {
            path : '/seller',
            name : 'seller',
            component : Seller
        },
        {
            path : '*',
            redirect : '/goods'
        }
    ]
})
