
    //jQuery变量，我们习惯以$开头
    var $lis = $("#screen ul li");

    var timer = null;
    var idx = 0;

    //右按钮添加事件监听
    $("#rightBtn").click(function () {
        fun();
    })
    clearInterval(timer);
    timer = setInterval(function () {
        fun();
    }, 1000);
    //左按钮添加事件监听
    $("#leftBtn").click(function () {
        if ($lis.eq(idx).is(":animated")) {
            return;
        }
        //老图淡出
        $lis.eq(idx).fadeOut(1000);
        //信号量改变
        idx--;
        if (idx < 0) {
            idx = $lis.length - 1;
        }
        //新图淡入
        $lis.eq(idx).fadeIn(1000);
    })
    function fun() {
        if ($lis.eq(idx).is(":animated")) {
            return;
        }
        //老图淡出
        $lis.eq(idx).fadeOut(1000);
        //信号量改变
        idx++;
        if (idx > $lis.length - 1) {
            idx = 0;
        }
        //新图淡入
        $lis.eq(idx).fadeIn(1000);
    }
