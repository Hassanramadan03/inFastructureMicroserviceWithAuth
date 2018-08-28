(function(){
 'use strict';
    angular.module('app')
    .directive('foot',function(){
        return {
            restrict:'E',
            templateUrl:'/views/footer.html',
        }
    });
     
})()