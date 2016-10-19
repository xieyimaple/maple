/**
 * Created by 10675 on 2016/10/11.
 * 用户处理跟数据库相关的代码
 */
//获取数据库
function getDB(){
    var db = window.openDatabase("sms","1.0","this is student_database",1024*1024*3)
    return db;
}
//创建学生表
(function () {
    //1.获取数据库
    var db = getDB();
    //2.获取事务
    db.transaction(function (transaction) {
        //3.执行创建表的SQL
        transaction.executeSql(
            "CREATE TABLE IF NOT EXISTS tbl_student(id integer par,name text,gender text,age integer, address text)",
            [],
            function () {

            }
        );
    });
})();

function Student(id,name,gender,age,address) {
    this.id=id;
    this.name=name;
    this.gender=gender;
    this.age=age;
    this.address=address;
};

//添加学生信息函数
function save(student,handler) {
    if (student instanceof Student){
        var db = getDB();
        db.transaction(function (transaction) {
            var sql = "insert into tbl_student values(?,?,?,?,?)";
            transaction.executeSql(
                sql,
                [
                    student.id,
                    student.name,
                    student.gender,
                    student.age,
                    student.address
                ],
                function () {
                    handler.call(this);
                });
        })
    }else{
        alert("数据格式不合法!");
    }
}
//查询所有信息
function findAll(key,handler) {
    //1.获取数据库
    var db = getDB();
    //2.获取服务
    db.transaction(function (transaction) {
        //执行SQL语句
        var sql = "select * from tbl_student";

        if(key){
            console.log(key);
            sql = sql+" where name="+key;
            console.log(sql);
        }
        transaction.executeSql(sql,[],function (transaction,result) {
            handler(result);
        });
    });
}
//获取ID删除数据
//删除学生信息
function deleteStudent(handler) {
    $(":checkbox:checked").each(function (index,item) {
        var id = $(item).val();
        var db = getDB();
        db.transaction(function (transaction) {
            var sql = "delete from tbl_student where id="+id;
            transaction.executeSql(sql,[],function (transaction,result) {
                handler(result);
            });
        });
    });
}
//修改学生信息
function updateStudent(id,handler) {
    var db = getDB();
     db.transaction(function (transaction) {
         var sql = "select id,name,gender,age,address from tbl_student where id="+id;
         transaction.executeSql(sql,[],function (transaction,result) {
            handler(result);
         });
     });
}