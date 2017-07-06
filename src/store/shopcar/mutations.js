function getShopcar(obj){
    let arr = [];
    for(let x in obj){
        arr.push(obj[x]);
    }
    return arr;
}

export default {
    add(state,obj){
        if(!state.lists[obj.name]) state.lists[obj.name] = obj;
        state.lists[obj.name].buyCount ++;

        state.shopcar = getShopcar(state.lists);
    },
    minus(state,obj){
        state.lists[obj.name].buyCount --;
        if(state.lists[obj.name].buyCount <= 0) delete state.lists[obj.name];

        state.shopcar = getShopcar(state.lists);
    },
    empty(state){
        for(let x in state.lists){
            state.lists[x].buyCount = 0;
            delete state.lists[x];
        }
        state.shopcar = [];
    }
}