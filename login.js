app.controller("LoginCtrl", function($scope, Auth, $location, $rootScope) {
  $scope.createUser = function() {
    $scope.message = null;
    $scope.error = null;
    Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    })
    .then(function(userData) {
      console.log("rootScope", $rootScope);
      $scope.message = "User created with uid: " + userData.uid;
    })
    .catch(function(error) {
      console.log(error)
      $scope.error = error;
    });
  };
  $scope.loginUser = function() {
    $scope.message = null;
    $scope.error = null;
    Auth.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    })
    .catch(function(error){
      console.log(error)
      $scope.error = error.code;
    });
  };

});
