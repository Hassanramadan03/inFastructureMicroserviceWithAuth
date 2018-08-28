(function () {
    'use strict';
    angular.module('app')
        .controller('addProductCtrl', function ($scope, feedService, $location) {
            $scope.product = {};
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const jwt = 'jwt ' + currentUser.token;
            const userId = currentUser.userId;
            $scope.flage = false;
            if ($location.search().id) {
                $scope.flage = true;

                $scope.product.userId = userId;
                $scope.product = JSON.parse($location.search().id);
            }



            $scope.upload = function (file) {
                console.log(file);
                console.log($scope.product.imageFile);

            }
            var obj = {
                user_id: currentUser.userId,
                uploaded_from: 'mobile',
                description: 'description',
            }
            $scope.updateProduct = function () {
               
                uploadimage(`http://localhost:8080/media/posts/${JSON.stringify(obj)}`, 'patch')
            }
            $scope.addProduct = function () {
                uploadimage(`http://localhost:8070/media/posts/${JSON.stringify(obj)}`, 'POST')

            }

            function uploadimage(apiUrl, action) {
                var data = new FormData();
                $.each($("input[type='file']")[0].files, function (i, file) {
                    data.append('userPhoto', file);
                    data.append('product', JSON.stringify($scope.product))
                });
                const apiKey='apiKey 7372u5uoSXOG8gJK7ckfnl:01DZVWiVRGWJ17fuH9IuEX'||'apikey 6hYiwM4SsOATD41UQQN0n7:0Cw8LreehKHMHd9N4EWaul'
                $.ajax({
                    type: action,
                    url: apiUrl,
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', apiKey);
                        xhr.setRequestHeader('JWT',  `jwt ${currentUser.token}`);
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,


                    success: function (result) {
                        if (result) {
                            console.log(result);
                            
                           console.log(result.post_url)
                            // window.location = '/feed'
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }

        });


})()