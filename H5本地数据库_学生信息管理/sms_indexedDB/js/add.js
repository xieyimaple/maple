/**
 * Created by lichunyu on 16/10/11.
 * 添加页面的相关js操作
 */
$(function () {
    $("#addForm").off();
    $("#addForm").submit(function () {
        var name = $(this).find("[name='name']").val();
        var age = $(this).find("[name='age']").val();
        var gender = $(this).find("[name='gender']").val();
        var address = $(this).find("[name='address']").val();

        var student = {
            name:name,
            age:age,
            gender:gender,
            address:address
        };
        //调用函数
        dbUtil.saveStudent(student,function () {
            alert("保存");
            $("#addForm").get(0).reset();
        })
    });

});