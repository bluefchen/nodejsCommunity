angular
    .module('indexPage', [])
    .controller('rootController', ['$rootScope', function($rootScope){
        layui.use(['layer'], function(){
            $rootScope.layer = layui.layer;
        })
        
        $rootScope.signerID = $.cookie('signerID');
        $rootScope.signerAvatar = $.cookie('signerAva');
        $(function(){
            // 用户退出
            $('.logout').click(function(){
                $.removeCookie('signerID');
                $.removeCookie('signerAvatar');
                window.location.href = '/';
            })

            // 提交问题时选中话题
            $('#form-ask .topic-item').click(function(){
                $(this).addClass('selected').siblings().removeClass('selected')
            })
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