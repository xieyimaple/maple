/**
 * Created by admin on 2016/8/15.
 */
/**
 * 获取计算后的样式
 * @param tag 获取后的标签
 * @param attr 要获取的样式名string格式
 * @returns {*} 返回这个样式的值 带单位的
 */
function getStyle(tag, attr) {
    if (tag.currentStyle) {
//            console.log(tag.currentStyle);
        return tag.currentStyle[attr];

    } else {
//            console.log(tag.currentStyle);
        return getComputedStyle(tag, null)[attr];
    }
}
/**
 * getElementById获取标签
 * @param id 要获取标签的id名 string
 * @returns {Element} 返回标签
 */
function getMyId(id) {
    return document.getElementById(id);
}
/**
 *文本获取方式
 * @param tag
 * @returns {*}
 */
function getText(tag) {
    if (tag.innerText) {
        return tag.innerText;
    }
    else {
        return tag.textContent;
    }
}
/**
 * 根据类名获取页面元素
 * @param clsName标签的类名
 * @returns {Array}返回一个类名数组
 */
function getByClass(clsName) {
    //第一步检测当前浏览器是否支持document.getElementByClassName
    //通过类型检测的方式去判断
    if (typeof document.getElementsByClassName == "function") {
        return document.getElementsByClassName(clsName);
    } else {
        //自己用代码实现获取功能
        //先获取页面中所有标签
        var tags = document.getElementsByTagName("*");
        var resultArr = [];
        //检测每一个标签的类名属性跟我传入的参数是否相同
        //由于一个标签中可能含有多个类名
        for (var i = 0; i < tags.length; i++) {
            //判断标签类命中是否有空格
            if (tags[i].className.indexOf(" ") != -1) {
                //等于-1说明有空格
                //使用split方法分割字符串
                var temp = tags[i].className.split(" ");
                //遍历数组temp判断是否有要获取的标签类名
                for (var j = 0; j < temp.length; j++) {
                    if (temp[j] == clsName) {
                        resultArr.push(tags[i]);
                        break;
                    }
                }
                //也可以使用数组中的indexOf看是否能找到索引来判断类名属性中是否与传入的参数相同，但此方法不适合低版本的ie
//                    if(temp.indexOf(clsName)!=-1){
//                        resultArr.push(tags[i]);
//                    }
            } else {
                if (tags[i].className == clsName) {
                    resultArr.push(tags[i]);
                }
            }

        }

        return resultArr;
    }
}


//    /**
//    * 根据类名获取页面元素
//    * @param clsName标签的类名
//    * @returns {Array}返回一个类名数组
//    */
//    function getByClass(clsName) {
//        //第一步检测当前浏览器是否支持document.getElementByClassName
//        //通过类型检测的方式去判断
////        if(typeof document.getElementsByClassName == "function"){
////            return document.getElementsByClassName(clsName);
////        }else{
//        //自己用代码实现获取功能
//        //先获取页面中所有标签
//        var tags = document.body.getElementsByTagName("*");
//        var resultArr = [];
//        //检测每一个标签的类名属性跟我传入的参数是否相同
//        for (var i = 0; i < tags.length; i++) {
//            //由于标签的类名可能含有多个，并且使用空格分开，我们需要再次检测每一个部分
//            //先检测当前标签的类名中是否含有空格，如果有就分开检测
//            var temp = tags[i].className;
//            //使用indexOf进行检测
//            //说明存在多个类名，使用split进行分割
//            var parts = temp.split(" ");
//            //遍历类名的每一个部分
//            for (var j = 0; j < parts.length; j++) {
//                if (parts[j] == clsName) {
//                    resultArr.push(tags[i]);
//                    break;
//                }
//            }
//        }
//        return resultArr;
////        }
//    }

/**
 * 获取除了自己以外的兄弟节点
 * @param node 获取到的节点
 * @returns {Array} 数组
 */
function getSibling(node) {
    var resultArr = [];
    var father = node.parentNode;
    var allXd = father.children;
    for (var i = 0; i < allXd.length; i++) {
        if (allXd[i] != node) {
            resultArr.push(allXd[i]);
        }
    }
    return resultArr;
}
/**
 * 创建新的标签
 * @param TagName 标签的名字string
 * @returns {Element}
 */
function createElement(TagName) {
    return document.createElement(TagName);
}
/**
 * 让元素移动到指定的位置
 * @param tag 标签
 * @param target 位置left
 */
function animate(tag, target) {
    //防止多次触发定时器
    clearInterval(tag.timer);
    var imgWid = tag.offsetWidth;
    //tag.timer相当于给tag标签设置一个自定义属性timer
    tag.timer = setInterval(function () {
        //获取box的当前位置（距离左侧父元素的位置）box边框外到父元素边框内的距离；只读
        //动画原理
        // 对象当前位置（新的）= 对象当前位置（旧的）+ 要移动的位置
        var leader = tag.offsetLeft;
        console.log(leader);
        var step = 20;
        if (target > leader) {
            step = step;
        } else {
            step = -step;
        }
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            tag.style.left = leader + "px";
        } else {
            tag.style.left = target + "px";
            clearInterval(tag.timer);
        }
    }, 17)
}

/**
 * 让元素移动到指定的位置 缓动效果  公式 leader=(taeget-leader)/10
 * @param tag 标签
 * @param target 位置left
 */
function huanDonganimate(tag, target) {
    //防止多次触发定时器
    clearInterval(tag.timer);
    var imgWid = tag.offsetWidth;
    //tag.timer相当于给tag标签设置一个自定义属性timer
    tag.timer = setInterval(function () {
        //获取box的当前位置（距离左侧父元素的位置）box边框外到父元素边框内的距离；只读
        //动画原理
        // 对象当前位置（新的）= 对象当前位置（旧的）+ 要移动的位置
        var leader = tag.offsetLeft;
        var step = (target - leader) / 10;
        //因为移动到最后会越来越慢，甚至是没移动到指定位置就停止下来，所以要对step进行处理
        if (target > leader) {
            step = Math.ceil(step);
        } else {
            step = Math.floor(step);
        }
        //判断移动的条件
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            tag.style.left = leader + "px";
        } else {
            //结束后清理定时器
            clearInterval(tag.timer);
        }
    }, 17)
}

/**
 * 封装缓动框架（任意数值属性） 缓动效果  公式 leader=(taeget-leader)/10
 * @param tag标签
 * @param attr  要更改的标签属性
 * @param target 位置  属性值
 */
function animateAny(tag, attr, target) {
    //防止多次触发定时器
    clearInterval(tag.timer);
    var imgWid = tag.offsetWidth;
    //tag.timer相当于给tag标签设置一个自定义属性timer
    tag.timer = setInterval(function () {
        //获取box的当前位置（距离左侧父元素的位置）box边框外到父元素边框内的距离；只读
        // 对象当前位置（新的）= 对象当前位置（旧的）+ 要移动的位置
        //getStyle()返回一个带字幕的字符串
        var leader = parseInt(getStyle(tag, attr)) || 0;
        var step = (target - leader) / 10;
        //因为移动到最后会越来越慢，甚至是没移动到指定位置就停止下来，所以要对step进行处理
        if (target > leader) {
            step = Math.ceil(step);
        } else {
            step = Math.floor(step);
        }
        //判断移动的条件
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            tag.style[attr] = leader + "px";
        } else {
            //结束后清理定时器
            clearInterval(tag.timer);
        }
    }, 17)
}

//封装缓动函数 - 更改任意属性

//这个多功能版首先更改了参数，为一个对象。为了根据对象内的每一个属性进行运动，首先需要遍历每一个属性
//在某一个属性运动之后不能直接判断清除，必须等到整个forin完成后再去判断是否所有人都运动完毕了。
/**
 *封装缓动函数 - 更改任意属性
 * @param tag   要更改样式的标签
 * @param obj  对象，属性名为要更改的样式 {"width":400,"height":400,"left":300}
 */
function animate1(tag, obj) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        //清除定时器的标识
        var flag = true;
        //同时设置多个属性的值。首先遍历对象
        for (var key in obj) {
            //获取某个样式的当前值
            //target就是obj[key]（对象中某一个属性的值）  attr 就是 key（属性的名称）
            var leader = parseInt(getStyle(tag, key)) || 0;
            //step = ( target - leader ) / 10
            var target = obj[key];
            var step = (target - leader) / 10;
            //处理一下step的值，对step进行向上取整
            step = leader > target ? Math.floor(step) : Math.ceil(step);
            //leader = leader +  step
            leader = leader + step;

            //设置给attr值，因为key是字符串所以用tag.style[key],不能用 tag.style.key
            tag.style[key] = leader + "px";
            //不能因为某一个属性到达了指定位置就清除定时器，因为其他属性可能还没到地方
            //判断是否当前属性到达了指定位置
            if (leader != target) {
                //阻止定时器的清除
                flag = false;
            }
        }
        if (flag) {
            clearInterval(tag.timer);
        }
    }, 17);
}

/**
 * Created by yoyo on 2016-08-22.
 * 可以设置透明度和层级    透明度 opacity 值为0·1 使用时需要乘10 在计算防止精度不准 层级 zIndex
 */
function animateTouCeng(tag, obj, fn) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var flag = true;
        //同时设置多个属性的值。首先遍历对象
        for (var key in obj) {
            if (key == " ") {
                //透明度不能进行parseInt
                var leader = getStyle(tag, key) * 10;
                //step = ( target - leader ) / 10
                var target = obj[key] * 10;
                var step = (target - leader) / 10;
                //处理一下step的值，对step进行向上取整
                step = leader > target ? Math.floor(step) : Math.ceil(step);
                //leader = leader +  step
                leader = leader + step;

                //设置给attr值
                tag.style[key] = leader / 10;
            } else if (key == "zIndex") {
                //层级
                //层级不需要渐变，所有直接设置
                tag.style[key] = obj[key];

            } else {
                //获取某个样式的当前值
                //target就是obj[key]  attr 就是 key
                var leader = parseInt(getStyle(tag, key)) || 0;
                //step = ( target - leader ) / 10
                var target = obj[key];
                var step = (target - leader) / 10;
                //处理一下step的值，对step进行向上取整
                step = leader > target ? Math.floor(step) : Math.ceil(step);
                //leader = leader +  step
                leader = leader + step;

                //设置给attr值
                tag.style[key] = leader + "px";
                //不能因为某一个属性到达了指定位置就清除定时器，因为其他属性可能还没到地方
                //判断是否当前属性到达了指定位置
            }
            if (leader != target) {
                //阻止定时器的清除
                flag = false;
            }
        }
        if (flag) {
            //先清除定时器，清除了旧的，再次开启新的
            clearInterval(tag.timer);
            //执行到这个if内部说明所有的运动执行完毕了
            //判断有没有fn，如果有才执行
            //在当前运动结束后执行新的一件事
            if (typeof fn == "function") {
                fn();
            }
            //fn && fn();
        }
    }, 17);
}
/**
 * 获取卷起的部分的高度和宽度
 * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}  对象的字面量
 */
function scroll() {
    //设置一个对象，将两个值设置为属性
//        var obj = {
//            scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
//            scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
//        };
    return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
/**
 * 获取平面的可视宽度
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}
/**
 * clentX+scrollLeft
 * @param e
 * @returns {*} 返回横坐标
 */
function getPageX(e){
    return (e.clientX+scroll().left)
}
/**
 * clent+scroTop
 * @param e
 * @returns {*} 返回竖坐标
 */
function getPageY(e){
    return (e.clientY+scroll().top)
}
/**
 * 获取页面卷曲的高度和宽度
 * @returns {*} 返回卷曲的高度和宽度
 */
function scroll() {
    //获取页面卷曲的高度和宽度
    return {
        //内部代码用于兼容各个浏览器
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
/**
 * 获取触发事件，兼容
 * @param e 触发事件时传出的参数
 * @returns {*|Event}
 */
function getEvent(e){
    return (e||window.event);
}