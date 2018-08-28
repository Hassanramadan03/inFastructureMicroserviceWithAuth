(function () {
    'use strict';
    angular.module('app')
        .controller('addProductCtrl', function ($scope, feedService, $location) {
            $scope.product = {};
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const jwt = 'jwt ' + currentUser.token;
            const userId = currentUser.userId;
            $scope.product.userId = userId;






            $scope.addProduct = function () {
                uploadimage('/product/addProduct?id=' + JSON.stringify($scope.product))

            }

            function uploadimage(apiUrl) {
                var data = new FormData();
                $.each($("input[type='file']")[0].files, function (i, file) {
                    data.append('file', file);
                    data.append('product', $scope.product)
                });

                $.ajax({
                    type: 'POST',
                    url: apiUrl,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', jwt);
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,

                    success: function (result) {
                        if (result) {
                            console.log(result);
                            window.location = '/feed'
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }

        });


})()