/**
 * Created by Administrator on 16-8-25.
 */
//1 获取页面元素
var box = document.getElementById("box");
var screen = box.children[0];
//获取图片宽度
var imgWid = screen.offsetWidth;
var ul = screen.children[0];
var lisUl = ul.children;
var ol = screen.children[1];
//获取左右按钮部分
var arr = screen.children[3];
var arrLeft = arr.children[0];
var arrRight = arr.children[1];

//设置定时器
var timer = null;

//2 动态创建小方块，添加事件
for (var i = 0; i < lisUl.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = i + 1;
    ol.appendChild(li);
    li.style.lineHeight= 30 + "px";
}
var lisOl = ol.children;
//第一个小按钮默认显示
lisOl[0].className = "current";


//添加点击按钮变色效果
for (var i = 0; i < lisOl.length; i++) {
    //设置索引属性
    lisOl[i].suoyin = i;
    lisOl[i].onclick = function () {
        //如果显示的是假的第一张，直接抽回
        if (pic == lisUl.length - 1) {
            ul.style.left = 0 + "px";
        }
        //排他
        for (var i = 0; i < lisOl.length; i++) {
            lisOl[i].className = "";
        }
        //给自己添加
        this.className = "current";
        //ul运动的代码是在点击时触发的
        var target = -this.suoyin * imgWid;
        animate(ul, target);
        //让索引属性和pic的值同步
        pic = this.suoyin;

    };
}


//3 左右点击，无缝滚动
//克隆第一张，放到ul的最后，为了制作无缝效果
var firstPic = lisUl[0].cloneNode(true);
ul.appendChild(firstPic);

//点击右按钮
//当前滚过的图片张数
var pic = 0;
arrRight.onclick = function () {
    play();

};

//点击左按钮
arrLeft.onclick = function () {
    //如果显示的是第一张，pic为0 ，需要抽回到后面假的第一张显示，然后再继续滚动
    if (pic == 0) {
        ul.style.left = -(lisUl.length - 1) * imgWid + "px";
        pic = lisUl.length - 1;
    }
    //正常滚动
    pic--;
    var target = -pic * imgWid;
    animate(ul, target);

    //
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }
    lisOl[pic].className = "current";
};


//4 自动播放
timer = setInterval(play, 1500);

//移入移出事件
screen.onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timer);
};
screen.onmouseout = function () {
    arr.style.display = "none";
    timer = setInterval(play, 1500);
};


function play() {
    //如果当前显示的是假的第一张，pic的值为length-1.需要抽回
    if (pic == lisUl.length - 1) {
        //这个归0的状态是一瞬间，不是持续的
        ul.style.left = 0 + "px";
        pic = 0;
    }
    //正常滚动
    pic++;
    //根据pic的值设置ul滚动到哪
    var target = -pic * imgWid;
    animate(ul, target);

    //让下面的小方块对应点亮
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }

    //如果当前显示的是假的第一张，需要让第一个小方块点亮
    if (pic == lisUl.length - 1) {
        lisOl[0].className = "current";
    } else {
        lisOl[pic].className = "current";
    }
}

function animate(tag, target) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var leader = tag.offsetLeft;
        //step = ( target - leader ) / 10
        var step = (target - leader) / 1;
        //处理一下step的值，对step进行向上取整
        step = leader > target ? Math.floor(step) : Math.ceil(step);
        //leader = leader +  step
        leader = leader + step;

        //设置给left值
        tag.style.left = leader + "px";
        if (leader == target) {
            clearInterval(tag.timer);
        }
    }, 100);
}