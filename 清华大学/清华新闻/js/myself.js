/**
 * Created by xiaoqi on 2016/8/27.
 */
window.onload=function(){
    var j_Vrun=document.getElementById("j_Vrun");
    var sp1=j_Vrun.children[0];
    var sp2=j_Vrun.children[1];
    var list=j_Vrun.children[2].children;
    //console.log(list);
    var k=0;
    var moveWidth=j_Vrun.offsetWidth;
    var flag=true;
    //alert(moveWidth);
    sp2.onmouseover=function(){
        sp2.style.color="#FF7800";
    }
    sp2.onmouseout=function(){
        sp2.style.color="#fff";
    }
    sp1.onmouseover=function(){
        sp1.style.color="#FF7800";
    }
    sp1.onmouseout=function(){
        sp1.style.color="#fff";
    }

    sp2.onclick=function(){
        if(flag==true){
            animate(list[k],{left:-moveWidth});
            k++;
            if(k>2){
                k = 0;
            }
            list[k].style.left=moveWidth+"px";
            animate(list[k],{left:0},function(){flag=true});
            flag=false;
        }
    }
    sp1.onclick=function(){
        animate(list[k],{left:moveWidth});
        k--;
        if(k<0){
            k = 2;
        }
        list[k].style.left=-moveWidth+"px";
        animate(list[k],{left:0});
    }
    var timer=null;
    timer=setInterval(Move,2000);
    j_Vrun.onmouseover=function(){
        clearInterval(timer);
    }
    j_Vrun.onmouseout=function(){
        timer=setInterval(Move,2000);
    }
    function Move(){
        animate(list[k],{left:-moveWidth});
        k++;
        if(k>2){
            k = 0;
        }
        list[k].style.left=moveWidth+"px";
        animate(list[k],{left:0});
    }
    //视频中间小圆点模糊
    for (var i = 0; i < list.length; i++) {
        list[i].onmouseover=function(i){
           return function(){
               list[i].children[0].children[0].style.opacity="0.7";
           };
        }(i);
        list[i].onmouseout=function(i){
            return function(){
                list[i].children[0].children[0].style.opacity="1";
            };
        }(i);
      }
    //小视频左下角的模糊
    var video=document.getElementById("video");
    var smalls=video.children;
    for (var i = 1; i < smalls.length; i++) {
        smalls[i].onmouseover=function(i){
            return function(){
                smalls[i].children[0].style.opacity="0.7";
            }
        }(i);
        smalls[i].onmouseout=function(i){
            return function(){
                smalls[i].children[0].style.opacity="1";
            }
        }(i);
      }


    //复制部分开始
    var j_Mrun=document.getElementById("j_Mrun");
    var sp1_=j_Mrun.children[0];
    var sp2_=j_Mrun.children[1];
    var newList=j_Mrun.children[2].children;
    var key=0;
    var jWidth=j_Mrun.offsetWidth;
    var fla=true;
    //alert(moveWidth_);
    sp2_.onmouseover=function(){
        sp2_.style.color="#FF7800";
    }
    sp2_.onmouseout=function(){
        sp2_.style.color="#fff";
    }
    sp1_.onmouseover=function(){
        sp1_.style.color="#FF7800";
    }
    sp1_.onmouseout=function(){
        sp1_.style.color="#fff";
    }

    sp2_.onclick=function(){
        if(fla==true){
            animate(newList[key],{left:-jWidth});
            key++;
            if(key>2){
                key = 0;
            }
            newList[key].style.left=jWidth+"px";
            animate(newList[key],{left:0},function(){fla=true});
            fla=false;
        }
    }
    sp1_.onclick=function(){
        animate(newList[key],{left:jWidth});
        key--;
        if(key<0){
            key = 2;
        }
        newList[key].style.left=-jWidth+"px";
        animate(newList[key],{left:0});
    }
    var timer1=null;
    timer1=setInterval(Change,2000);
    j_Mrun.onmouseover=function(){
        clearInterval(timer1);
    }
    j_Mrun.onmouseout=function(){
        timer1=setInterval(Change,2000);
    }
    function Change(){
        animate(newList[key],{left:-jWidth});
        key++;
        if(key>2){
            key = 0;
        }
        newList[key].style.left=jWidth+"px";
        animate(newList[key],{left:0});
    }
    for (var i = 0; i < newList.length; i++) {
        newList[i].onmouseover=function(i){
            return function(){
                newList[i].children[0].children[0].style.opacity="0.7";
            };
        }(i);
        newList[i].onmouseout=function(i){
            return function(){
                newList[i].children[0].children[0].style.opacity="1";
            };
        }(i);
    }
    var myVideo=document.getElementById("myVideo");
    myVideo.style.display="none";
    var ns=myVideo.children;
    for (var i = 1; i < ns.length; i++) {
        ns[i].onmouseover=function(i){
            return function(){
                ns[i].children[4].style.opacity="0.7";
            }
        }(i);
        ns[i].onmouseout=function(i){
            return function(){
                ns[i].children[4].style.opacity="1";
            }
        }(i);
    }
    var top1=document.getElementById("j_top");
    var one=top1.children[0].children[0];
    var two=top1.children[0].children[1];
    one.onmouseover=function(){
        this.className="nv current";
        two.className="nv";
        video.style.display="block";
        myVideo.style.display="none";
    }
    two.onmouseover=function(){
        this.className="nv current";
        one.className="nv";
        video.style.display="none";
        myVideo.style.display="block";
    }
}

