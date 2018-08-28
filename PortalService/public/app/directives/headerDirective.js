
(function () {
    'use strict';
    angular.module('app')
        .directive('header', header);
    function header() {
        return {
            templateUrl: '/views/header.html',
            controller: headerController,
            restrict:'E'
        }
    }
    function headerController($scope, $location,$auth) {
        if ($auth.isAuthenticated()) $location.path('/profile'); 
        $scope.ativeLoginAndSignup=function(){
            if($auth.isAuthenticated())return false;
            else return true;
        }
        $scope.acitveLogout=function(){
            if($auth.isAuthenticated())return true;
            else return false;
        }
         
        $scope.logout = function () {
            if (!$auth.isAuthenticated()) { return; }
            $auth.logout().then(function () {
                    localStorage.removeItem('currentUser');
                    $location.url('/')  
                }
            )

        }

    }
})()