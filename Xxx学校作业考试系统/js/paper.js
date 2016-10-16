/**
 * Created by lichunyu on 16/9/28.
 * 试卷模块
 */
angular.module("app.paperModule",["ng","app.subjectModule"])
    .controller("paperAddController",["$scope","commentService","paperModel","$routeParams",function ($scope,commentService,paperModel,$routeParams) {
        //将查询到的所有方向数据绑定到作用域中s
        commentService.getAllDepartmentes(function (data) {
            $scope.departmentes = data;
        })
        $scope.model = paperModel.model;
        var id = $routeParams.id;
        if(id!=0){
            paperModel.addSubjectId(id);
            paperModel.addSubject(angular.copy($routeParams));
        }
    }])
    .controller("paperListController",["$scope",function ($scope) {

    }])
    .factory("paperModel",function () {
        return {
            model:{
                dId:1,
                title:"",
                desc:"",
                tt:"",
                at:"",
                scores:[],
                subjectIds:[],
                subjects:[]
            },
            addSubjectId:function (id) {
                this.model.subjectIds.push(id);
            },
            addSubject:function (subject) {
                this.model.subjects.push(subject);
            },
            addScore:function (index,score) {
                this.model.scores[index] = score;
            }
        }
    });
