/**
 * Created by С�� on 2016/8/25.
 */
//1 ��ȡҳ��Ԫ��
var lunbo = document.getElementById("lunbo");
var screen = lunbo.children[0];
//��ȡͼƬ���
var imgWid = screen.offsetWidth;
var ul = screen.children[0];
var lisUl = ul.children;
var ol = screen.children[1];
//��ȡ���Ұ�ť����
var arr = lunbo.children[1];
var arrLeft = arr.children[0];
var arrRight = arr.children[1];
var timer = null;
//����С����  ������ͼƬ���������
for (var i = 0; i < lisUl.length; i++) {

    var li = document.createElement("li");
    li.index = i;
    li.innerHTML = i + 1;
    li.style.borderRadius="10px";
    ol.appendChild(li);
//        С������
    li.onclick = function () {

//            ���  �����ʾ��ͼƬ�Ǽٵĵ�һ�ţ�ֱ�ӳ��
        if (pic == lisUl.length - 1) {
            ul.style.left = 0 + "px";
        }
//            var lis=this.parentNode.children;
//            ����
        for (var i = 0; i < lisOl.length; i++) {
//                ����С��������Ϊ��
            lisOl[i].className = "";
        }
//            ��Ŀǰ��С������ʾ��ɫ
        this.className = "current";
//            С��������ͬʱ��ͼƬ����
        var target = -this.index * imgWid;
        animate1(ul, target);
//            Ϊ��С������˶������Ҽ�ͷͬ����
        pic = this.index;
    }
}
//    �õ�һ��С����  ��ʾ��ɫ
var lisOl = ol.children;
lisOl[0].className = "current";

//���Ƶ�һ��  �ŵ����ul�����
var firstPic = lisUl[0].cloneNode(true);
ul.appendChild(firstPic);
//     ʹ�ñ�����������¼����������
var pic = 0;
arrRight.onclick = function () {
////       ���  �Ѿ���ʾ�ٵĵ�һ�ţ�Ҳ�������һ�ţ����Ƶ����ţ����ȳ�ص���һ�ţ�Ȼ���ٹ���
////        pic��ͼƬ����������
//        if (pic == lisUl.length - 1) {
//            ul.style.left = 0 + "px";
//            pic = 0;
//        }
////        ��������
//        pic++;
//        var target = -pic * imgWid;
//        animate(ul, target);
////        С��ť��ɫ
//        for (var i = 0; i < lisOl.length; i++) {
//            lisOl[i].className = "";
//        }
////        �����ʾ  �ٵĵ�һ��  �õ�һ����ť��ʾ
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
    //        С��ť��ɫ
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }
    lisOl[pic].className = "current";

}

//��ʱ��
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
//       ���  �Ѿ���ʾ�ٵĵ�һ�ţ��ȳ�أ�Ȼ���ٹ���
//        pic��ͼƬ����������
    if (pic == lisUl.length - 1) {
        ul.style.left = 0 + "px";
        pic = 0;
    }
//        ��������
    pic++;
    var target = -pic * imgWid;
    animate1(ul, target);
//        С��ť��ɫ
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }
//        �����ʾ  �ٵĵ�һ��  �õ�һ����ť��ʾ
    if (pic == lisUl.length - 1) {
        lisOl[0].className = "current";
    } else {
        lisOl[pic].className = "current";

    }

}