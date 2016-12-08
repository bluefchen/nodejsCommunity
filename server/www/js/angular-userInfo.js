angular
    .module('userInfoPage', ['ngCookies'])
    .controller('rootController', ['$rootScope','$scope', '$cookies', function($rootScope,$scope,$cookies){
        // 获取cookies
        $rootScope.signerID = $cookies.get('signerID') ? $cookies.get('signerID').slice(3,-1) : undefined;
        $rootScope.signerAva = $cookies.get('signerAva') ? $cookies.get('signerAva') : undefined;
        // 用户退出
        $scope.logoutNow = function(){
            $cookies.remove('signerID', {path:'/'});
            $cookies.remove('signerAvatar', {path:'/'});
            window.location.href = '/';
        }
    }])
    .controller('infoController', ['$scope','$http',function($scope,$http){
        $scope.changeAvatar = function(uid){
            
        }
    }])