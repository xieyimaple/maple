/**
 * Created by Administrator on 16-8-25.
 */
//1 ��ȡҳ��Ԫ��
var box = document.getElementById("box");
var screen = box.children[0];
//��ȡͼƬ���
var imgWid = screen.offsetWidth;
var ul = screen.children[0];
var lisUl = ul.children;
var ol = screen.children[1];
//��ȡ���Ұ�ť����
var arr = screen.children[3];
var arrLeft = arr.children[0];
var arrRight = arr.children[1];

//���ö�ʱ��
var timer = null;

//2 ��̬����С���飬����¼�
for (var i = 0; i < lisUl.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = i + 1;
    ol.appendChild(li);
    li.style.lineHeight= 30 + "px";
}
var lisOl = ol.children;
//��һ��С��ťĬ����ʾ
lisOl[0].className = "current";


//��ӵ����ť��ɫЧ��
for (var i = 0; i < lisOl.length; i++) {
    //������������
    lisOl[i].suoyin = i;
    lisOl[i].onclick = function () {
        //�����ʾ���Ǽٵĵ�һ�ţ�ֱ�ӳ��
        if (pic == lisUl.length - 1) {
            ul.style.left = 0 + "px";
        }
        //����
        for (var i = 0; i < lisOl.length; i++) {
            lisOl[i].className = "";
        }
        //���Լ����
        this.className = "current";
        //ul�˶��Ĵ������ڵ��ʱ������
        var target = -this.suoyin * imgWid;
        animate(ul, target);
        //���������Ժ�pic��ֵͬ��
        pic = this.suoyin;

    };
}


//3 ���ҵ�����޷����
//��¡��һ�ţ��ŵ�ul�����Ϊ�������޷�Ч��
var firstPic = lisUl[0].cloneNode(true);
ul.appendChild(firstPic);

//����Ұ�ť
//��ǰ������ͼƬ����
var pic = 0;
arrRight.onclick = function () {
    play();

};

//�����ť
arrLeft.onclick = function () {
    //�����ʾ���ǵ�һ�ţ�picΪ0 ����Ҫ��ص�����ٵĵ�һ����ʾ��Ȼ���ټ�������
    if (pic == 0) {
        ul.style.left = -(lisUl.length - 1) * imgWid + "px";
        pic = lisUl.length - 1;
    }
    //��������
    pic--;
    var target = -pic * imgWid;
    animate(ul, target);

    //
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }
    lisOl[pic].className = "current";
};


//4 �Զ�����
timer = setInterval(play, 1500);

//�����Ƴ��¼�
screen.onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timer);
};
screen.onmouseout = function () {
    arr.style.display = "none";
    timer = setInterval(play, 1500);
};


function play() {
    //�����ǰ��ʾ���Ǽٵĵ�һ�ţ�pic��ֵΪlength-1.��Ҫ���
    if (pic == lisUl.length - 1) {
        //�����0��״̬��һ˲�䣬���ǳ�����
        ul.style.left = 0 + "px";
        pic = 0;
    }
    //��������
    pic++;
    //����pic��ֵ����ul��������
    var target = -pic * imgWid;
    animate(ul, target);

    //�������С�����Ӧ����
    for (var i = 0; i < lisOl.length; i++) {
        lisOl[i].className = "";
    }

    //�����ǰ��ʾ���Ǽٵĵ�һ�ţ���Ҫ�õ�һ��С�������
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
        //����һ��step��ֵ����step��������ȡ��
        step = leader > target ? Math.floor(step) : Math.ceil(step);
        //leader = leader +  step
        leader = leader + step;

        //���ø�leftֵ
        tag.style.left = leader + "px";
        if (leader == target) {
            clearInterval(tag.timer);
        }
    }, 100);
}
