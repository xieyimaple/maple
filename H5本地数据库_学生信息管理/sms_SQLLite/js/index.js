/**
 * Created by 10675 on 2016/10/11.
 * 用来处理和列表页面相关的
 */

//加载所有学生信息
function load() {
    var searchVal = $("#search").val();
   // console.log(searchVal);
    findAll(searchVal,function (data) {
        var datas = data.rows;
        $(".tb1 tbody").empty();
        for(var i = 0 ; i < datas.length ; i++){
            var val = datas[i];
            var newTr = $("<tr><td><input type='checkbox' value='"+val.id+"'></td><td>"+val.name+"</td><td>"+val.gender+"</td><td>"+val.age+"</td><td>"+val.address+"</td></tr>")
            $(".tb1 tbody").append(newTr);
        };
    });
};


$(function () {
    load();
    $("label").on("click",function () {
        load();
    });
    $("#delete").on("click",function () {
        deleteStudent(function () {
            load();
        });
    });
    $("#update").on("click",function () {
        var id = $(":checkbox:checked").val();
        if(+id){
            $("body").load("student_update.html");
            updateStudent(id,function (result) {
                var data = result.rows[0];
                $("[name='id']").val(data.id);
                $("[name='name']").val(data.name);
                $("[name='gender']").val(data.gender);
                $("[name='age']").val(data.age);
                $("[name='address']").val(data.address);
            });
            deleteStudent(function () {
                alert("请修改！");
            });
        }else{
            alert("请选择你要修改的学生信息!");
        }
    });
});
