/**
 * Created by lichunyu on 16/10/11.
 * 首页JS
 */

/**
 * 加载数据
 * */
function load() {
    dbUtil.findAllStudent(function (event) {
        //获取结果集
        var rows = event.target.result;
        //每次更新将原有数据删除
        $(".tb1 tbody").children(":not(:first)").remove();
        for(var i=0 ;i< rows.length;i++){
            var student = rows[i];
            var newTr = $("tr:hidden").clone().removeClass("hi");
            newTr.find("input").val(student.id);
            newTr.find("td").eq(1).text(student.name);
            newTr.find("td").eq(2).text(student.gender);
            newTr.find("td").eq(3).text(student.age);
            newTr.find("td").eq(4).text(student.address);
            $(".tb1 tbody").append(newTr);
        }
    });
}
$(function () {
    load();
    $("button").eq(2).off("click");
    $("button").eq(2).click(function () {
       $(".tb1 :checkbox:checked").each(function (index,item) {
           var id = +$(item).val();
           dbUtil.deleteStudent(id,function () {
                load();
           });
       });

    });
});
