angular
    .module('indexPage', ['ngCookies'])
    .controller('rootController', ['$rootScope','$scope', '$cookies', '$http', function($rootScope,$scope,$cookies,$http){
        $http
            .get('/question/count')
            .then( (result)=>{
                result = Number(result.data.result);
                $rootScope.quesCount = result;
                $rootScope.pageCount = Math.ceil(result/10)
            } )
            .catch( (err)=>{
                console.log('请求发送失败')
                console.log(err)
            } )

        // 分页功能
        layui.use(['layer', 'laypage'], function(){
            $rootScope.layer = layui.layer;
            $rootScope.laypage = layui.laypage;
            $rootScope.laypage({
                cont: 'index-pageList',  //将要进行呈现分页效果的div的id
                pages: $rootScope.pageCount, //总页数
                groups: 7,   //连续显示分页数
                jump: function(obj, first){  // 每页按钮被点击时触发
                    // console.log(obj);  //当前页的对象 
                    // console.log(first); //当前是不是第一页
                    $http
                        .get('/question/portion/'+obj.curr)
                        .then( (result)=>{
                            $rootScope.questions = result.data.result;
                        } )
                        .catch( (err)=>{
                            console.log(err)
                        } )
                }
            });
        })
    
        // 获取cookies
        $rootScope.signerID = $cookies.get('signerID') ? $cookies.get('signerID').slice(3,-1) : undefined;
        $rootScope.signerAva = $cookies.get('signerAva') ? $cookies.get('signerAva') : undefined;
        // 用户退出
        $scope.logoutNow = function(){
            $cookies.remove('signerID', {path:'/'});
            $cookies.remove('signerAvatar', {path:'/'});
            window.location.href = '/';
        }
        // 跳转用户信息页
        $scope.goLookUserInfo = function(){
            window.location.href = '/u/'+$rootScope.signerID;
        }

        // 获取所有话题信息
        $http
            .get('/topic/all')
            .then( (result)=>{
                $rootScope.topics = result.data.result;
            } )
            .catch( (err)=>{
                console.log(err)
            } )
    }])
    .controller('questionsController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
        $scope.goLookQuestion = function(q_id){
            window.location.href = '/q/'+q_id
        }
    }])
    .filter('timeSurplus', function(){
        return function(value){
            var now = new Date();
            var value = new Date(value);
            var surplus = now - value;  //时间差，毫秒数
            var aMonth = 1000*60*60*24*31;
            var aDay = 1000*60*60*24;
            var aHour = 1000*60*60;
            var aMinute = 1000*60;
            var aSecond = 1000;
            if( surplus/aMonth < 1 ){  // 小于31天
                if( surplus/aDay < 1 ){  // 小于一天
                    if( surplus/aHour < 1 ){  // 小于一个小时
                        if( surplus/aMinute < 1){  // 小于一分钟
                            return '刚刚'
                        }else{
                            return Number(surplus/aMinute).toFixed(0) + '分钟前'
                        }
                    }else {
                        return Number(surplus/aHour).toFixed(0) + '小时前'
                    }
                }else{
                    return Number(surplus/aDay).toFixed(0) + '天前'
                }
            }else{
                return 'long ago'
            }
        }
    })
    .controller('pageListController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){

    }])
    .controller('form-register-controller', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
        $('#form-register input[name=username]').blur(function(){
            if($(this).val()) $scope.checkName();
        })
        $scope.checkName = function(){
            var config = {
                method: 'post',
                url: '/user/checkName',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: 'username='+$scope.join.username.$modelValue
            }
            $http(config)
                .then( function(result){
                    var result = result.data;
                    if(result.flag == 1){
                        $scope.canUse = true;
                    }else{
                        $scope.canUse = false;
                    }
                } )
                .catch( function(err){
                    console.log(err)
                } )
        }

        $scope.registerNow = function(){
            var loadMsg = $rootScope.layer.load(2);
            var data = angular.element('#form-register form').serialize();
            var config = {
				method: 'post',
				url: '/user/register',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
			}
            $http(config)
                .then( function(result){
                    $rootScope.layer.close(loadMsg);
                    if(result.data.flag == 1){
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 2000})
                    }else{
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 1000})
                    }
                } )
                .catch( function(err){
                    $rootScope.layer.close(loadMsg);
                    $rootScope.layer.msg('注册失败，发生了个未知错误',{zIndex:20000, time: 1000})
                    console.log(err)
                } )
        }
    }])
    .controller('form-login-controller', ['$rootScope','$scope', '$http', function($rootScope, $scope, $http){
        $scope.loginNow = function(){
            var loadMsg = $rootScope.layer.load(2);
            var data = angular.element('#form-login form').serialize();
            var config = {
                method: 'post',
				url: '/user/login',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
            }
            $http(config)
                .then( function(result){
                    $rootScope.layer.close(loadMsg);
                    if(result.data.flag == 1){
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 1000}, function(){
                            window.location.href = '/';
                        })
                    }else{
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 1000})
                    }
                } )
                .catch( function(err){
                    $rootScope.layer.close(loadMsg);
                    $rootScope.layer.msg('登录失败，发生了个未知错误',{zIndex:20000, time: 1000})
                    console.log(err)
                } )
        }
    }])
    .controller('form-ask-controller', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
        $scope.askNow = function(){
            var loadMsg = $rootScope.layer.load(2);
            var data = angular.element('#form-ask form').serialize();
            var topic = $('#form-ask .topic-item.selected').text()
            data = data+'&topic='+topic
            console.log(data)
            var config = {
                method: 'post',
				url: '/question/add',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
            }
            $http(config)
                .then( function(result){
                    $rootScope.layer.close(loadMsg);
                    if(result.data.flag == 1){
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 1000}, function(){
                            window.location.href = '/';
                        })
                    }else{
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 1000})
                    }
                } )
                .catch( function(err){
                    $rootScope.layer.close(loadMsg);
                    $rootScope.layer.msg('发布失败，发生了个未知错误',{zIndex:20000, time: 1000})
                    console.log(err)
                } )
        }
    }])