/**
 * Created by xiaoqi on 2016-08-19.
 */
/**
 */
function animate1(tag, target) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var leader = tag.offsetLeft;
        var step = 17;
        step = target > leader ? step : -step;

        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            tag.style.left = leader + "px";
        } else {
            tag.style.left = target + "px";
            clearInterval(tag.timer);
        }
    }, 17);
};