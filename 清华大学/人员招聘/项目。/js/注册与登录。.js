function getId(id){
    return document.getElementById(id);
}
function animate(tag, target) {
    //2 为了防止多次触发定时器，先去清除旧的
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        //3 获取box的当前位置
        var leader = tag.offsetLeft;
        //4 设置步长
        //根据leader 和 target 之间的关系判断step的正负
        var step = 17;
//            if (target > leader) {
//                step = step;
//            } else {
//                step = -step;
//            }
        step = target > leader ? step : -step;

        //5 判断盒子是否可以移动
        //盒子是否可以运动是由target和leader之间的距离和step之间的关系决定的
        if (Math.abs(target - leader) > Math.abs(step)) {
            //6 运动公式对象当前位置(新的)=对象当前位置(旧的)+要移动的位置
            leader = leader + step;
            tag.style.left = leader + "px";
        } else {
            //将位置设置为target的
            tag.style.left = target + "px";
            //7 如果超出条件，清除定时器
            clearInterval(tag.timer);
        }
    }, 17);
}