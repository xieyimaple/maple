/**
 * Created by yoyo on 2016-08-15.
 */


/**
 * 这个函数可以获取计算后的样式
 * @param tag  需要一个获取后的标签
 * @param attr  样式名 字符串格式
 * @returns {*}  返回这个样式的值
 */
function getStyle(tag, attr) {
    return tag.currentStyle ? tag.currentStyle[attr] : getComputedStyle(tag, null)[attr];
}

/**
 * 根据传入的id名获取标签
 * @param id  标签的id名  字符串格式
 * @returns {Element}  返回根据id名获取到的元素
 */
function myId(id) {
    return document.getElementById(id);
}

function getText(tag) {
//        if(tag.innerText){
//            return tag.innerText;
//        }else{
//            return tag.textContent;
//        }
    return tag.innerText ? tag.innerText : tag.textContent;
}

/**
 * 根据类名获取页面元素
 * @param clsName 类名 字符串格式
 * @returns {Array}  返回数组，保存获取到的标签
 */
function getByClass(clsName) {
    var tags = document.body.getElementsByTagName("*");
    var resultArr = [];
    for (var i = 0; i < tags.length; i++) {
        var temp = tags[i].className;
        var parts = temp.split(" ");
        for (var j = 0; j < parts.length; j++) {
            if (parts[j] == clsName) {
                resultArr.push(tags[i]);
                break;
            }
        }
    }
    return resultArr;
}

/**
 * 可以根据节点获取所有的元素兄弟节点
 * @param node 节点 传入获取后的标签
 * @returns {Array} 返回所有元素兄弟节点 数组形式
 */
function getSilbing(node) {
    var father = node.parentNode;
    var allXd = father.children;
    var resultArr = [];
    for (var i = 0; i < allXd.length; i++) {
        if (allXd[i] != node) {
            //将满足的人放入数组
            resultArr.push(allXd[i]);
        }
    }
    return resultArr;
}


/**
 * 运动盒子封装函数
 * Created by yoyo on 2016-08-19.
 */
/**
 * 可以让元素移动到指定位置
 * @param tag 要进行运动的元素，获取后的标签
 * @param target 要运动到哪个位置，数值
 */
function animate(tag, target) {
    //2 为了防止多次触发定时器，先去清除旧的
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        //3 获取box的当前位置
        var leader = tag.offsetLeft;
        //4 设置步长
        //根据leader 和 target 之间的关系判断step的正负
        var step =1200;
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
            //将位置设置为target的值
            tag.style.left = target + "px";
            //7 如果超出条件，清除定时器
            clearInterval(tag.timer);
        }
    }, 500);
}