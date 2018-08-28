'use strict';
angular.module('app')
.controller('homeCtrl',['$scope','$http', '$location','$auth',
            function($scope, $http, $location,$auth) {
      if ($auth.isAuthenticated()) $location.url('/feed');
               
               
                 
            }
        ]);