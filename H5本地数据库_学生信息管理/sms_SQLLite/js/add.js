/**
 * Created by 10675 on 2016/10/11.
 * 用户处理和添加相关的代码
 */
$(function () {
    $("#addForm").off();
    $("#addForm").submit(function () {
        var id = $(this).find("[name='id']").val();
        var name = $(this).find("[name='name']").val();
        var gender = $(this).find("[name='gender']").val();
        var age = $(this).find("[name='age']").val();
        var address = $(this).find("[name='address']").val();
        var student = new Student(id,name,gender,age,address);
        save(student,function () {
            alert("添加成功");
            $("#addForm")[0].reset();
        });
    });
})