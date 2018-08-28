(function () {
  'use strict';
  angular
    .module('app')
    .factory('feedService', feedService);
  feedService.inject = ['$http'];
  function feedService($http) {
    const apiUrl = 'http://localhost:8000/media/';
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).userId;
    console.log(currentUser);

    var service = {
      getmedias: getmedias,
      updatemedia: updatemedia,
      deletemedia: deletemedia
    };
    return service;
    function getmedias() {

      return $http.get(`${apiUrl}getmedias?id=${currentUser}`)
        .then(getmediasComplete)
        .catch(getmediasFailed);
      function getmediasComplete(response) {
        return response.data.allmedias;
      }
      function getmediasFailed(error) {
        console.log('XHR Failed for getmedias. ' + error.data);
      }
    }


    function updatemedia(formData, id) {
      return $http.patch('/apiUrl/' + id, formData)
        .then(updatemediaComplete)
        .catch(updatemediaFailed);
      function updatemediaComplete(response) {
        return response.data;
      }
      function updatemediaFailed(error) {
        console.log('XHR Failed for updatemedia. ' + error.data);
      }
    }
    function deletemedia(id) {
      console.log(id);
      
      return $http.delete(`${apiUrl}/removemedia?id=${id}`)
        .then(deletemediaComplete)
        .catch(deletemediaFailed);
      function deletemediaComplete(response) {
        return response.data;
      }
      function deletemediaFailed(error) {
        console.log('XHR Failed for deletemedia.' + error.data);
      }
    }

  }
})();