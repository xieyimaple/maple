/**
 * Created by xiaoqi on 2016-08-19.
 */
function $(id) { return document.getElementById(id);}
function show(id) { $(id).style.display = "block";}
function hide(id) { $(id).style.display = "none";}
function scroll() {  // 开始封装自己的scrollTop
    if(window.pageYOffset != null) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
/**
 *  这是缓动运动框架
 * @param obj  需要运动的对象
 * @param json  需要改变的属性
 * @param fn  回调函数（在动画结束后执行的函数）
 */
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            var leader=0;
            if (k == "opacity") {//  因为opacity的值没有单位，且为小数，所以单独写
                leader = Math.round(getStyle(obj, k) * 100) || 100;
            } else {
                leader = parseInt(getStyle(obj, k)) || 0;//获得传入的属性
            }
            var step = (json[k] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (k == "opacity") {
                obj.style.opacity = leader / 100;
                obj.style.filter = "alpha(opacity=" + leader + ")";
            } else if (k == "zIndex") {  //设置层级
                obj.style.zIndex = json[k];   //直接给值
            } else {
                obj.style[k] = leader + "px";
            }
            if (leader != json[k]) {
                flag = false;
//                    console.log(flag);//检测定时器是否停下来
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 17)
    /**
     * 这个函数可以获得计算后的内联样式
     * @param obj 需要调用的盒子
     * @param attr 盒子的某一个属性
     * @returns {*}
     */
    function getStyle(obj, attr) {
//        if(taa.currentStyle){
//            return obj.currentStyle[attr];
//        }else{
//            return getComputedStyle(obj, null)[attr];
//        }
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
    }
}