angular
    .module('indexPage', ['ngCookies'])
    .controller('rootController', ['$rootScope', '$scope', '$http', '$cookies', function($rootScope, $scope, $http, $cookies){
        layui.use(['layer'], function(){
            $rootScope.layer = layui.layer;
        })
        // 获取cookies
        $rootScope.signerID = $cookies.get('signerID') ? $cookies.get('signerID').slice(3,-1) : undefined;
        $rootScope.signerAva = $cookies.get('signerAva') ? $cookies.get('signerAva') : undefined;
        // 用户退出
        $scope.logoutNow = function(){
            $cookies.remove('signerID');
            $cookies.remove('signerAvatar');
            window.location.href = '/';
        }
        // 跳转用户信息页
        $scope.goLookUserInfo = function(){
            window.location.href = '/u/'+$rootScope.signerID;
        }
    }])
    .controller('answerController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
        $rootScope.signerID ? $scope.hasSigner=true : $scope.hasSigner=false;
        $scope.answerNow = function(){
            var loadMsg = $rootScope.layer.load(2);
            var data = angular.element('form[name=ans]').serialize();
            var qid = angular.element('.question-info h2').data('qid');
            data = data + '&uid=' + $rootScope.signerID + '&qid=' + qid;
            console.log(data)
            var config = {
                method: 'post',
				url: '/answer/add',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
            }
            $http(config)
                .then( function(result){
                    $rootScope.layer.close(loadMsg);
                    if(result.data.flag == 1){
                        $rootScope.layer.msg(result.data.msg, {zIndex:20000, time: 1000}, function(){
                            window.location.reload()
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