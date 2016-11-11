/**
 * Created by 小⑦ on 2016/8/25.
 */
//1 获取页面元素
var lunbo = document.getElementById("lunbo");
var screen = lunbo.children[0];
//获取图片宽度
var imgWid = screen.offsetWidth;
var ul = screen.children[0];
var lisUl = ul.children;
var ol = screen.children[1];
//获取左右按钮部分
var arr = lunbo.children[1];
var arrLeft = arr.children[0];
var arrRight = arr.children[1];
var timer = null;
//创建小方块  数量和图片的数量相等
for (var i = 0; i < lisUl.length; i++) {

    var li = document.createElement("li");
    li.index = i;
    li.innerHTML = i + 1;
    li.style.borderRadius="10px";
    ol.appendChild(li);
//        小方块点击
    li.onclick = function () {

//            检测  如果显示的图片是假的第一张，直接抽回
        if (pic == lisUl.length - 1) {
            ul.style.left = 0 + "px";
        }
//            var lis=this.parentNode.children;
//            排他
        for (var i = 0; i < lisOl.length; i++) {
//                所有小方块类名为空
            lisOl[i].className = "";
        }
//            让目前的小方块显示颜色
        this.className = "current";
//            小方块点击的同时，图片滚动
        var target = -this.index * imgWid;
        animate1(ul, target);
//            为了小方块的运动和左右箭头同步；
        pic = this.index;
    }
}
//    让第一个小方块  显示颜色
var lisOl = ol.children;
lisOl[0].className = "current";

//复制第一张  放到最后ul的最后
var firstPic = lisUl[0].cloneNode(true);
ul.appendChild(firstPic);
//     使用变量计数，记录滚过的张数
var pic = 0;
arrRight.onclick = function () {
////       如果  已经显示假的第一张，也就是最后一张（复制的那张），先抽回到第一张，然后再滚动
////        pic是图片滚过的张数
//        if (pic == lisUl.length - 1) {
//            ul.style.left = 0 + "px";
//            pic = 0;
//        }
////        正常滚动
//        pic++;
//        var target = -pic * imgWid;
//        animate(ul, target);
////        小按钮变色
//        for (var i = 0; i < lisOl.length; i++) {
//            lisOl[i].className = "";
//        }
////        如果显示  假的第一张  让第一个按钮显示
//        if (pic == lisUl.length - 1) {
//            lisOl[0].className = "current";
//        } else {
//            lisOl[pic].className = "current";
//
//        }
    play();


};

arrLeft.onclick = function () {
    if (pic == 0) {
        ul.style.left = (-ul.offsetWidth - lisUl[0].offsetWidth) + "px";
        pic = lisUl.length - 1;
    }
    pic--;
    var target = -pic * imgWid;
    animate1(ul, target);
    //        小按钮变色
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }
    lisOl[pic].className = "current";

}

//定时器
timer = setInterval(play, 1500);


lunbo.onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timer);
}
lunbo.onmouseout = function () {
    arr.style.display = "none";
    timer = setInterval(play, 1500);
}

function play() {
//       如果  已经显示假的第一张，先抽回，然后再滚动
//        pic是图片滚过的张数
    if (pic == lisUl.length - 1) {
        ul.style.left = 0 + "px";
        pic = 0;
    }
//        正常滚动
    pic++;
    var target = -pic * imgWid;
    animate1(ul, target);
//        小按钮变色
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }
//        如果显示  假的第一张  让第一个按钮显示
    if (pic == lisUl.length - 1) {
        lisOl[0].className = "current";
    } else {
        lisOl[pic].className = "current";

    }

}