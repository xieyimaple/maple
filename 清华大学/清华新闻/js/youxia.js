/**
 * Created by Ð¡¢ß on 2016/8/25.
 */
var you = document.getElementById("you");
var youxia = you.children[0];

var sic = youxia.children[0];
var ul1 = youxia.children[1];
var ul2 = youxia.children[2];
var zonghe = sic.children[0];
var meiti = sic.children[1];

you.onmouseover= function () {
    you.style.zIndex="999";
    youxia.style.height="1000px";
}
you.onmouseout= function () {
    you.style.zIndex="0";
    youxia.style.height="643px";
}
youxia.onmouseover= function () {
    youxia.style.height="1000px";
};
youxia.onmouseout= function () {
    youxia.style.height="643px";

};

zonghe.onmouseover = function () {
    //zonghe.style.backgroundColor="#fff";
    //zonghe.style.color="#f4930a";

    ul1.style.display = "block";
    ul1.style.overflow = "visible";
    ul2.style.display = "none";
};
zonghe.onmouseout = function () {
    ul1.style.display = "block";
    ul1.style.overflow = "hidden";
    ul2.style.display = "none";
};
meiti.onmouseover = function () {
    ul2.style.display = "block";
    ul2.style.overflow = "visible";
    ul1.style.display = "none";
};
meiti.onmouseout = function () {
    ul2.style.display = "block";
    ul2.style.overflow = "hidden";
    ul1.style.display = "none";
};
ul1.onmouseover = function () {
    ul1.style.overflow = "visible";
    ul2.style.overflow = "hidden";
    ul2.style.display = "none";
};
//ul1.onmouseout = function () {
//    ul1.style.overflow = "hidden";
//    ul2.style.overflow = "hidden";
//};
ul2.onmouseover = function () {
    ul2.style.overflow = "visible";
    ul1.style.overflow = "hidden";
    ul1.style.display = "none";
};
