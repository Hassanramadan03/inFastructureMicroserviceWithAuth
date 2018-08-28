angular.module('app')
  .controller('loginCtrl', function ($scope, $location, $auth) {

    if ($auth.isAuthenticated()) $location.url('/feed');
    $scope.user = {};
    $scope.reply = '';
    $scope.response = false;
    $scope.login = function () {
      var user = {
        firstName: $scope.user.firstname,
        lastName: $scope.user.lastname,
        email: $scope.user.email.toLowerCase(),
        password: $scope.user.password
      };

      $auth.login(user)
        .then(function (response) {
          if (response.data.success) {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            $location.path('/feed')
          } else {
            $scope.response = false;
            $scope.reply = response.data.message
          }
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });

    }
    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function () {
          // toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/feed');
        })
        .catch(function (error) {
          if (error.message) {
            // Satellizer promise reject error.
            // toastr.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            // toastr.error(error.data.message, error.status);
          } else {
            // toastr.error(error);
          }
        });
    };
  });