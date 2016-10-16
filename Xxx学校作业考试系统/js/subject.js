/**
 * Created by lichunyu on 16/9/22.
 *
 * 题库模块
 */
angular.module("app.subjectModule",["ng"])
    //控制器
    .controller("subjectDelController",["$routeParams","$location","subjectService",function ($routeParams,$location,subjectService) {
        var flag = confirm("确认删除吗");
        if(flag){
            //删除
            subjectService.delSubject($routeParams.id,function (data) {
                alert(data);
            });
        }
        //跳转
        $location.path("/SubjectList/dpId/0/topicId/0/levelId/0/typeId/0");
    }])
    .controller("subjectCheckController",["$routeParams","$location","subjectService",function ($routeParams,$location,subjectService) {
        //审核
        subjectService.checkSubject($routeParams.id,$routeParams.state,function (data) {
            alert(data);
        });
        //跳转
        $location.path("/SubjectList/dpId/0/topicId/0/levelId/0/typeId/0");
    }])
    .controller("subjectController", ["$scope","commentService","subjectService","$filter","$routeParams","$location",
        function ($scope,commentService,subjectService,$filter,$routeParams,$location) {
            //调用服务方法加载题目属性信息，并且进行绑定
            $scope.params = $routeParams;
            $scope.isShow = true;

            //封装筛选数据时用的模板对象
            var subjectModel =(function () {
                var obj = {};
                if($routeParams.typeId!=0){
                    obj['subject.subjectType.id'] = $routeParams.typeId;
                }
                if($routeParams.dpId!=0){
                    obj['subject.department.id'] = $routeParams.dpId;
                }
                if($routeParams.topicId!=0){
                    obj['subject.topic.id'] = $routeParams.topicId;
                }
                if($routeParams.levelId!=0){
                    obj['subject.subjectLevel.id'] = $routeParams.levelId;
                }
                console.log("参数对象",obj);
                return obj;
            })();

            //添加页面中的默认数据
            $scope.model = {
                typeId :1,
                levelId:1,
                departmentId:1,
                topicId:1,
                stem:"",
                answer:"",
                analysis:"",
                choiceContent:[],
                choiceCorrect:[false,false,false,false]
            };
            $scope.add = function () {
                //调用service方法完成题目保存
                subjectService.saveSubject($scope.model,function (data) {
                    alert(data);
                });
                var model = {
                    typeId :1,
                    levelId:1,
                    departmentId:1,
                    topicId:1,
                    stem:"",
                    answer:"",
                    analysis:"",
                    choiceContent:[],
                    choiceCorrect:[false,false,false,false]
                };
                //重置$scope
                angular.copy(model,$scope.model);

            }
            $scope.addAndClose = function () {
                //调用service方法完成题目保存
                subjectService.saveSubject($scope.model,function (data) {
                    alert(data);
                    //跳转到列表页面
                    $location.path("/SubjectList/dpId/0/topicId/0/levelId/0/typeId/0");
                });
            }

            //服务调用
            commentService.getAllType(function (data) {
                $scope.types = data;
            });
            commentService.getAllLevels(function (data) {
                $scope.levels = data;
            });
            commentService.getAllDepartmentes(function (data) {
                $scope.departmentes = data;
            });
            commentService.getAllTopics(function (data) {
                $scope.topics = data;
            });
            //调用subjectService获取所有题目信息
            subjectService.getAllSubjects(subjectModel,function (data) {
                //遍历所有的题目，计算出选择题的答案，并且将答案赋给subject.answer
                data.forEach(function (subject) {
                    //获取正确答案
                    if(subject.subjectType && subject.subjectType.id != 3){
                        var answer = [];
                        subject.choices.forEach(function (choice,index) {
                            if(choice.correct){
                                //将索引转换为A/B/C/D
                                var no = $filter('indexToNo')(index);
                                answer.push(no);
                            }
                        });
                        //将计算出来的正确答案赋给subject.answer
                        subject.answer = answer.toString();
                    }

                });
                $scope.subjects = data;
            });

    }])
    //larry 赵  terry boss;  kevin ELEE robin 刘  5000
    //题目服务，封装操作题目的函数 11 —(7)— 7 转正（评估 代码量）12 -15
    .service("subjectService",["$http","$httpParamSerializer",function ($http,$httpParamSerializer) {
        this.checkSubject = function (id,state,handler) {
            $http.get("http://127.0.0.1:8080/test/exam/manager/checkSubject.action",{
                params:{
                    'subject.id':id,
                    'subject.checkState':state
                }
            }).success(function (data) {
                handler(data);
            });
        }
        this.delSubject = function (id,handler) {
            $http.get("http://127.0.0.1:8080/test/exam/manager/delSubject.action",{
                params:{
                    'subject.id':id
                }
            }).success(function (data) {
                handler(data);
            });
        };
        this.getAllSubjects = function (params,handler) {
            $http.get("http://127.0.0.1:8080/test/exam/manager/getAllSubjects.action",{
                params:params
            }).success(function (data) {
            //$http.get("data/subjects.json").success(function (data) {
                handler(data);
            });
        };
        //添加题目
        this.saveSubject = function (params,handler) {
            //将参数转换为angular需要的数据格式
            var obj = {};
            for(var key in params){
                var val = params[key];
                switch (key){
                    case "typeId":
                        obj['subject.subjectType.id']=val;
                        break;
                    case "levelId":
                        obj['subject.subjectLevel.id']=val;
                        break;
                    case "departmentId":
                        obj['subject.department.id']=val;
                        break;
                    case "topicId":
                        obj['subject.topic.id']=val;
                        break;
                    case "stem":
                        obj['subject.stem']=val;
                        break;
                    case "answer":
                        obj['subject.answer']=val;
                        break;
                    case "analysis":
                        obj['subject.analysis']=val;
                        break;
                    case "choiceContent":
                        obj['choiceContent']=val;
                        break;
                    case "choiceCorrect":
                        obj['choiceCorrect']=val;
                        break;
                }
            }
            //将对象数据转换为表单编码样式的数据
            obj = $httpParamSerializer(obj);
            $http.post("http://127.0.0.1:8080/test/exam/manager/saveSubject.action",
                obj,{
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).success(function (data) {
                handler(data);
            });

        }
    }])
    //公共服务 用于获取题目相关信息
    .factory("commentService",["$http",function ($http) {
        return {
            getAllType:function(handler){
                $http.get("http://127.0.0.1:8080/test/exam/manager/getAllSubjectType.action").success(function (data) {
                //$http.get("data/types.json").success(function (data) {
                    handler(data);
                });
            },
            getAllLevels:function (handler) {
                $http.get("http://127.0.0.1:8080/test/exam/manager/getAllSubjectLevel.action").success(function (data) {
                //$http.get("data/levels.json").success(function (data) {
                    handler(data);
                });
            },
            getAllDepartmentes:function (handler) {
                $http.get("http://127.0.0.1:8080/test/exam/manager/getAllDepartmentes.action").success(function (data) {
                //$http.get("data/departmentes.json").success(function (data) {
                    handler(data);
                });
            },
            getAllTopics:function (handler) {
                $http.get("http://127.0.0.1:8080/test/exam/manager/getAllTopics.action").success(function (data) {
                //$http.get("data/topics.json").success(function (data) {
                    handler(data);
                });
            }
        }
    }])
    //过滤器
    .filter("selectTopics",function () {
        // input为topic数组  id为部门id
        return function (input, id) {
            if(input){
                //通过array中过滤器函数过滤满足条件的topic
                var arr = input.filter(function (item) {
                    return item.department.id == id;
                });
                return arr;
            }
        }
    })
    .filter("indexToNo",function () {
        return function (input) {
            var result ;
            switch (input){
                case 0:
                    result = 'A';
                    break;
                case 1:
                    result = 'B';
                    break;
                case 2:
                    result = 'C';
                    break;
                case 3:
                    result = 'D';
                    break;
                case 4:
                    result = 'E';
                    break;
                default:
                    result = 'F';
            }
            return result;
        }
    })
    .directive("selectOption",function () {
        return {
            restrict:"A",
            link:function (scope,element) {
                element.on("change",function () {
                    var type = element.attr("type");
                    var isCheck = element.prop("checked");
                    if(type == "radio"){
                        scope.model.choiceCorrect = [false,false,false,false];
                        var index = angular.element(this).val();
                        scope.model.choiceCorrect[index] = true;
                    }else if(type == "checkbox" && isCheck ){
                        var index = angular.element(this).val();
                        scope.model.choiceCorrect[index] = true;
                    }
                    //强制将scope更新
                    scope.$digest();


                });
            }
        }
    });
