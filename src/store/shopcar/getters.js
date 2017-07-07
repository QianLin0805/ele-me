export default {
    shopcar(state){
        return state.shopcar;
    },
    amount(state){
        let count = 0;
        state.shopcar.forEach((food) => {
            count += food.buyCount * food.price;
        });
        return count;
    }
}