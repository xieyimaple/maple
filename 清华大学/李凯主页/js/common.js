/**
 * Created by admin on 2016/8/15.
 */
/**
 * ��ȡ��������ʽ
 * @param tag ��ȡ��ı�ǩ
 * @param attr Ҫ��ȡ����ʽ��string��ʽ
 * @returns {*} ���������ʽ��ֵ ����λ��
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
 * getElementById��ȡ��ǩ
 * @param id Ҫ��ȡ��ǩ��id�� string
 * @returns {Element} ���ر�ǩ
 */
function getMyId(id) {
    return document.getElementById(id);
}
/**
 *�ı���ȡ��ʽ
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
 * ����������ȡҳ��Ԫ��
 * @param clsName��ǩ������
 * @returns {Array}����һ����������
 */
function getByClass(clsName) {
    //��һ����⵱ǰ������Ƿ�֧��document.getElementByClassName
    //ͨ�����ͼ��ķ�ʽȥ�ж�
    if (typeof document.getElementsByClassName == "function") {
        return document.getElementsByClassName(clsName);
    } else {
        //�Լ��ô���ʵ�ֻ�ȡ����
        //�Ȼ�ȡҳ�������б�ǩ
        var tags = document.getElementsByTagName("*");
        var resultArr = [];
        //���ÿһ����ǩ���������Ը��Ҵ���Ĳ����Ƿ���ͬ
        //����һ����ǩ�п��ܺ��ж������
        for (var i = 0; i < tags.length; i++) {
            //�жϱ�ǩ�������Ƿ��пո�
            if (tags[i].className.indexOf(" ") != -1) {
                //����-1˵���пո�
                //ʹ��split�����ָ��ַ���
                var temp = tags[i].className.split(" ");
                //��������temp�ж��Ƿ���Ҫ��ȡ�ı�ǩ����
                for (var j = 0; j < temp.length; j++) {
                    if (temp[j] == clsName) {
                        resultArr.push(tags[i]);
                        break;
                    }
                }
                //Ҳ����ʹ�������е�indexOf���Ƿ����ҵ��������ж������������Ƿ��봫��Ĳ�����ͬ�����˷������ʺϵͰ汾��ie
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
//    * ����������ȡҳ��Ԫ��
//    * @param clsName��ǩ������
//    * @returns {Array}����һ����������
//    */
//    function getByClass(clsName) {
//        //��һ����⵱ǰ������Ƿ�֧��document.getElementByClassName
//        //ͨ�����ͼ��ķ�ʽȥ�ж�
////        if(typeof document.getElementsByClassName == "function"){
////            return document.getElementsByClassName(clsName);
////        }else{
//        //�Լ��ô���ʵ�ֻ�ȡ����
//        //�Ȼ�ȡҳ�������б�ǩ
//        var tags = document.body.getElementsByTagName("*");
//        var resultArr = [];
//        //���ÿһ����ǩ���������Ը��Ҵ���Ĳ����Ƿ���ͬ
//        for (var i = 0; i < tags.length; i++) {
//            //���ڱ�ǩ���������ܺ��ж��������ʹ�ÿո�ֿ���������Ҫ�ٴμ��ÿһ������
//            //�ȼ�⵱ǰ��ǩ���������Ƿ��пո�����оͷֿ����
//            var temp = tags[i].className;
//            //ʹ��indexOf���м��
//            //˵�����ڶ��������ʹ��split���зָ�
//            var parts = temp.split(" ");
//            //����������ÿһ������
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
 * ��ȡ�����Լ�������ֵܽڵ�
 * @param node ��ȡ���Ľڵ�
 * @returns {Array} ����
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
 * �����µı�ǩ
 * @param TagName ��ǩ������string
 * @returns {Element}
 */
function createElement(TagName) {
    return document.createElement(TagName);
}
/**
 * ��Ԫ���ƶ���ָ����λ��
 * @param tag ��ǩ
 * @param target λ��left
 */
function animate(tag, target) {
    //��ֹ��δ�����ʱ��
    clearInterval(tag.timer);
    var imgWid = tag.offsetWidth;
    //tag.timer�൱�ڸ�tag��ǩ����һ���Զ�������timer
    tag.timer = setInterval(function () {
        //��ȡbox�ĵ�ǰλ�ã�������ุԪ�ص�λ�ã�box�߿��⵽��Ԫ�ر߿��ڵľ��룻ֻ��
        //����ԭ��
        // ����ǰλ�ã��µģ�= ����ǰλ�ã��ɵģ�+ Ҫ�ƶ���λ��
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
 * ��Ԫ���ƶ���ָ����λ�� ����Ч��  ��ʽ leader=(taeget-leader)/10
 * @param tag ��ǩ
 * @param target λ��left
 */
function huanDonganimate(tag, target) {
    //��ֹ��δ�����ʱ��
    clearInterval(tag.timer);
    var imgWid = tag.offsetWidth;
    //tag.timer�൱�ڸ�tag��ǩ����һ���Զ�������timer
    tag.timer = setInterval(function () {
        //��ȡbox�ĵ�ǰλ�ã�������ุԪ�ص�λ�ã�box�߿��⵽��Ԫ�ر߿��ڵľ��룻ֻ��
        //����ԭ��
        // ����ǰλ�ã��µģ�= ����ǰλ�ã��ɵģ�+ Ҫ�ƶ���λ��
        var leader = tag.offsetLeft;
        var step = (target - leader) / 10;
        //��Ϊ�ƶ�������Խ��Խ����������û�ƶ���ָ��λ�þ�ֹͣ����������Ҫ��step���д���
        if (target > leader) {
            step = Math.ceil(step);
        } else {
            step = Math.floor(step);
        }
        //�ж��ƶ�������
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            tag.style.left = leader + "px";
        } else {
            //����������ʱ��
            clearInterval(tag.timer);
        }
    }, 17)
}

/**
 * ��װ������ܣ�������ֵ���ԣ� ����Ч��  ��ʽ leader=(taeget-leader)/10
 * @param tag��ǩ
 * @param attr  Ҫ���ĵı�ǩ����
 * @param target λ��  ����ֵ
 */
function animateAny(tag, attr, target) {
    //��ֹ��δ�����ʱ��
    clearInterval(tag.timer);
    var imgWid = tag.offsetWidth;
    //tag.timer�൱�ڸ�tag��ǩ����һ���Զ�������timer
    tag.timer = setInterval(function () {
        //��ȡbox�ĵ�ǰλ�ã�������ุԪ�ص�λ�ã�box�߿��⵽��Ԫ�ر߿��ڵľ��룻ֻ��
        // ����ǰλ�ã��µģ�= ����ǰλ�ã��ɵģ�+ Ҫ�ƶ���λ��
        //getStyle()����һ������Ļ���ַ���
        var leader = parseInt(getStyle(tag, attr)) || 0;
        var step = (target - leader) / 10;
        //��Ϊ�ƶ�������Խ��Խ����������û�ƶ���ָ��λ�þ�ֹͣ����������Ҫ��step���д���
        if (target > leader) {
            step = Math.ceil(step);
        } else {
            step = Math.floor(step);
        }
        //�ж��ƶ�������
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader = leader + step;
            tag.style[attr] = leader + "px";
        } else {
            //����������ʱ��
            clearInterval(tag.timer);
        }
    }, 17)
}

//��װ�������� - ������������

//����๦�ܰ����ȸ����˲�����Ϊһ������Ϊ�˸��ݶ����ڵ�ÿһ�����Խ����˶���������Ҫ����ÿһ������
//��ĳһ�������˶�֮����ֱ���ж����������ȵ�����forin��ɺ���ȥ�ж��Ƿ������˶��˶�����ˡ�
/**
 *��װ�������� - ������������
 * @param tag   Ҫ������ʽ�ı�ǩ
 * @param obj  ����������ΪҪ���ĵ���ʽ {"width":400,"height":400,"left":300}
 */
function animate1(tag, obj) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        //�����ʱ���ı�ʶ
        var flag = true;
        //ͬʱ���ö�����Ե�ֵ�����ȱ�������
        for (var key in obj) {
            //��ȡĳ����ʽ�ĵ�ǰֵ
            //target����obj[key]��������ĳһ�����Ե�ֵ��  attr ���� key�����Ե����ƣ�
            var leader = parseInt(getStyle(tag, key)) || 0;
            //step = ( target - leader ) / 10
            var target = obj[key];
            var step = (target - leader) / 10;
            //����һ��step��ֵ����step��������ȡ��
            step = leader > target ? Math.floor(step) : Math.ceil(step);
            //leader = leader +  step
            leader = leader + step;

            //���ø�attrֵ����Ϊkey���ַ���������tag.style[key],������ tag.style.key
            tag.style[key] = leader + "px";
            //������Ϊĳһ�����Ե�����ָ��λ�þ������ʱ������Ϊ�������Կ��ܻ�û���ط�
            //�ж��Ƿ�ǰ���Ե�����ָ��λ��
            if (leader != target) {
                //��ֹ��ʱ�������
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
 * ��������͸���ȺͲ㼶    ͸���� opacity ֵΪ0��1 ʹ��ʱ��Ҫ��10 �ڼ����ֹ���Ȳ�׼ �㼶 zIndex
 */
function animateTouCeng(tag, obj, fn) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var flag = true;
        //ͬʱ���ö�����Ե�ֵ�����ȱ�������
        for (var key in obj) {
            if (key == " ") {
                //͸���Ȳ��ܽ���parseInt
                var leader = getStyle(tag, key) * 10;
                //step = ( target - leader ) / 10
                var target = obj[key] * 10;
                var step = (target - leader) / 10;
                //����һ��step��ֵ����step��������ȡ��
                step = leader > target ? Math.floor(step) : Math.ceil(step);
                //leader = leader +  step
                leader = leader + step;

                //���ø�attrֵ
                tag.style[key] = leader / 10;
            } else if (key == "zIndex") {
                //�㼶
                //�㼶����Ҫ���䣬����ֱ������
                tag.style[key] = obj[key];

            } else {
                //��ȡĳ����ʽ�ĵ�ǰֵ
                //target����obj[key]  attr ���� key
                var leader = parseInt(getStyle(tag, key)) || 0;
                //step = ( target - leader ) / 10
                var target = obj[key];
                var step = (target - leader) / 10;
                //����һ��step��ֵ����step��������ȡ��
                step = leader > target ? Math.floor(step) : Math.ceil(step);
                //leader = leader +  step
                leader = leader + step;

                //���ø�attrֵ
                tag.style[key] = leader + "px";
                //������Ϊĳһ�����Ե�����ָ��λ�þ������ʱ������Ϊ�������Կ��ܻ�û���ط�
                //�ж��Ƿ�ǰ���Ե�����ָ��λ��
            }
            if (leader != target) {
                //��ֹ��ʱ�������
                flag = false;
            }
        }
        if (flag) {
            //�������ʱ��������˾ɵģ��ٴο����µ�
            clearInterval(tag.timer);
            //ִ�е����if�ڲ�˵�����е��˶�ִ�������
            //�ж���û��fn������в�ִ��
            //�ڵ�ǰ�˶�������ִ���µ�һ����
            if (typeof fn == "function") {
                fn();
            }
            //fn && fn();
        }
    }, 17);
}
/**
 * ��ȡ����Ĳ��ֵĸ߶ȺͿ��
 * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}  �����������
 */
function scroll() {
    //����һ�����󣬽�����ֵ����Ϊ����
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
 * ��ȡƽ��Ŀ��ӿ��
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
 * @returns {*} ���غ�����
 */
function getPageX(e){
    return (e.clientX+scroll().left)
}
/**
 * clent+scroTop
 * @param e
 * @returns {*} ����������
 */
function getPageY(e){
    return (e.clientY+scroll().top)
}
/**
 * ��ȡҳ������ĸ߶ȺͿ��
 * @returns {*} ���ؾ����ĸ߶ȺͿ��
 */
function scroll() {
    //��ȡҳ������ĸ߶ȺͿ��
    return {
        //�ڲ��������ڼ��ݸ��������
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
/**
 * ��ȡ�����¼�������
 * @param e �����¼�ʱ�����Ĳ���
 * @returns {*|Event}
 */
function getEvent(e){
    return (e||window.event);
}