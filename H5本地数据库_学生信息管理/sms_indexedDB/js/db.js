/**
 * Created by lichunyu on 16/10/11.
 *
 * 用户处理与数据库相关的代码
 */
var dbUtil = {};
(function (dbName,storeName,dbUtil) {
	/**
     * 第一步:向浏览器请求打开数据库(3个步骤)
     *        1.打开数据库
     *        //在request的upgradeneeded事件当中获取和创建;
     *        2.获取数据库对象
     *        3.创建对象仓库
     *              先判断是否会存在该对象仓库,存在就删除
     *              在创建该对象仓库
     * 第二步:获取到对象仓库(封装成一个函数)(4个步骤)
     *        1.打开数据库
     *        //在成功后的onsuccess事件当中
     *        2.获取数据库对象
     *        3.管理服务
     *        4.获取对象仓库
     * 第三步:添加增删改查方法(3个步骤):
     *        1.调用上面获取对象仓库方法获取到对象仓库
     *        2.向对象仓库中增(put)删(delete)改(update)查询所有(getAll)
     *        3.执行成功后调用成功返回函数返回数据给匿名函数进行接下来的操作;
     * */
    //请求打开数据库
    var request = window.indexedDB.open(dbName);
    request.onupgradeneeded = function (event) {
        //获取数据库对象
        var db = event.target.result;
        //创建对象仓库
        if(db.objectStoreNames.contains(storeName)){
            db.deleteObjectStore(storeName);
        }
        db.createObjectStore(storeName,{
            keyPath:"id",
            autoIncrement:true
        });
    };
    /**
     * 获取对象仓库
     * */
    function getStore(storeName,handler){
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function (event) {
            var db = event.target.result;
            var transaction = db.transaction(storeName,"readwrite");
            var store = transaction.objectStore(storeName);
            handler(store);
        }
    }
    /**
     * 添加
     * */
    dbUtil.saveStudent = function (student,handler) {
        //1. 获取objectStore
        getStore("Students",function (store) {
            //2. 保存
            var request = store.put(student);
            request.onsuccess = function (event) {
                handler(event);
            }
        })
    };
    /**
     * 查询所有
     * */
    dbUtil.findAllStudent = function (handler) {
        getStore("Students",function (store) {
            var request = store.getAll();
            request.onsuccess = function (event) {
                handler(event);
            }
        })
    };
    /**
     * 删除
     * */
    dbUtil.deleteStudent = function (id,handler) {
        getStore("Students",function (store) {
            var request = store.delete(id);
            request.onsuccess = function (event) {
                handler(event);
            }
        })
    };

})("sms","Students",dbUtil);

