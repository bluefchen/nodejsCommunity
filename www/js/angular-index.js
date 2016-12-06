angular
    .module('indexPage', [])
    .controller('rootController', ['$rootScope', function($rootScope){
        layui
            .use(['layer'], function(){
                $rootScope.layer = layui.layer;
            })
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
                        $rootScope.layer.msg('注册成功!',{zIndex:20000, time: 2000})
                    }else{
                        $rootScope.layer.msg('注册失败!',{zIndex:20000, time: 1000})
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
                    console.log(result.data)
                    if(result.data.flag == 1){
                        $rootScope.layer.msg('注册成功!',{zIndex:20000, time: 2000})
                        setTimeout(function() {
                            window.location.href = '/'
                        }, 1500);
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