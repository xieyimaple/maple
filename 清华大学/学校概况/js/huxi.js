var $lis = $("#imageslist ul li");
var timer = null;
var idx = 0;
$("#rightBtn").click(function () {
    funr();
})
clearInterval(timer);
timer = setInterval(function () {
    funr();
}, 1000);
//clearInterval(timer);

$("#leftBtn").click(function () {
    funl();
})
function funr() {
    if ($lis.eq(idx).is(":animated")) {
        return;
    }
    $lis.eq(idx).fadeOut(1000);
    idx++;
    if (idx > $lis.length - 1) {
        idx = 0;
    }
    $lis.eq(idx).fadeIn(1000);
}


function funl(){
    if ($lis.eq(idx).is(":animated")) {
        return;
    }
    $lis.eq(idx).fadeOut(1000);
    idx--;
    if (idx < 0) {
        idx = $lis.length - 1;
    }
    $lis.eq(idx).fadeIn(1000);
}