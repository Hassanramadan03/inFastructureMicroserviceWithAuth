(function () {
  'use strict';
  angular.module('app')
    .controller('feedCtrl', function ($scope, feedService, $location) {
      $scope.products = []
      var deletedId = '';
      function loadData() {
        feedService.getmedias().then(function (data) {
           
          
          $scope.products = data;
        })
      }
      $scope.readyStyleObject = function (imagerUrl) {
        return { 'background-image': `url(uploadimages/${imagerUrl})` }
      }
      $scope.des = '';
      $scope.setDes = function (des) {
        $scope.des = des;
      }
      $scope.AssignId = function (id) {
        deletedId = id;
      }
      $scope.Delete = function () {
        if (!$scope.deletedId) {
          feedService.deletemedia(deletedId).then(function (data) {
            if (data) {
              loadData();
            }

          })
        }

      }
      $scope.byRange = function (fieldName, minValue, maxValue) {
        if (minValue === undefined && maxValue === undefined) return;
        if (minValue === undefined) minValue = Number.MIN_VALUE;
        if (maxValue === 4000) maxValue = Number.MAX_VALUE;

        return function predicateFunc(item) {
          return minValue <= item[fieldName] && item[fieldName] <= maxValue;
        };
      }
      loadData();
    });


})()