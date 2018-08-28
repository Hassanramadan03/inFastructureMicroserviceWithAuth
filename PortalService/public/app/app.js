'use strict';
// Declare app level module which depends on filters, and services
// angular.module('app', ["auth0","angular-storage","angular-jwt","ngMaterial","ngRoute"])
angular.module('app', ['satellizer', "ngRoute",'angularUtils.directives.dirPagination'])
.config( function( $routeProvider,$authProvider, $locationProvider) {
      
    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
    
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.reject();
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }];
  
      var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.resolve();
        } else {
          $location.path('/login');
        }
        return deferred.promise;
      }];
    
   
    $routeProvider.when('/',{
        templateUrl:'/views/home.html',
        controller:'homeCtrl'
    }). 
    when('/signup',{
        templateUrl:'/views/signup.html',
        controller:'SignupCtrl'
    }).
    when('/login',{
        templateUrl:'/views/login.html',
        controller:'loginCtrl'
    }).  
    when('/feed',{
        templateUrl:'/views/feed.html',
        controller:'feedCtrl' ,
        resolve: {
            loginRequired: loginRequired
          }
    }).
      when('/addProduct', {
        templateUrl: '/views/addProduct.html',
        controller: 'addProductCtrl',
        // resolve: {
        //   loginRequired: loginRequired
        // }
      }).
     when('/product',{
        templateUrl:'/views/product.html',
        controller:'productCtrl' ,
        resolve: {
            loginRequired: loginRequired
          }
        
    }).
    otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(true);
    
});