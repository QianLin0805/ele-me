import Bscroll from 'better-scroll';

export function formatDate(val){
    let datetime = new Date(val);
    let date = datetime.toLocaleDateString();
    let time = datetime.toLocaleTimeString();
    time = time.substr(0,5);
    return date + ' ' + time;
}
export function initClassify(list,result,filter){
    list.forEach((rating) => {
        if(rating.rateType == 0){
            if(!filter || rating.text) result[1].count ++ ;
        }else{
            if(!filter || rating.text) result[2].count ++ ;
        }        
        if(!filter || rating.text) result[0].count ++ ;
    });
    return result;
}
export function resetRatings(list,index,filter){
    let arr = [];
    list.forEach((rating) => {
        if(index == 0){
            if(!filter || rating.text) arr.push(rating);
        }else if(index == 1 && rating.rateType == 0){
            if(!filter || rating.text) arr.push(rating);
        }else if(index == 2 && rating.rateType == 1){
            if(!filter || rating.text) arr.push(rating);
        }
    });
    return arr;
}
export function newScroll(el){
    return new Bscroll(el, {
        click : true,
        scrollY : true,                               //可滚动方向
        bounceTime : 900,                             //弹力动画持续时间，即滚动手感
        probeType : 3
    });
}