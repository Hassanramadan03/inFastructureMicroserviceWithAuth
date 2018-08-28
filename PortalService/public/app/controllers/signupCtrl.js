angular.module('app')
  .controller('SignupCtrl', function ($scope, $location, $auth) {
    $scope.user = {};
    $scope.reply = '';
    if ($auth.isAuthenticated()) $location.url('/feed');
    
    $scope.signup = function () {
      var user = {
        firstName: $scope.user.firstname,
        lastName: $scope.user.lastname,
        email: $scope.user.email.toLowerCase(),
        password: $scope.user.password
      };
      $scope.response = function () {
        return true;
      }
      $auth.signup(user)
        .then(function(response) {
          if (response.data.success) {
            // localStorage.setItem('currentUser', JSON.stringify(response.data));
            // $auth.setToken(response)
            $location.path('/feed')
            
          } else {
            $scope.reply = response.data.message
          }
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });

    }
  });