app.controller("LoginCtrl", function($scope, Auth, $location, $rootScope) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var usersRef = ref.child("users")


  $scope.createUser = function() {
    $scope.message = null;
    $scope.error = null;
    Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    })
    .then(function(userData) {
      $scope.message = "User created with uid: " + userData.uid;
      var activeUserRef = usersRef.child(userData.uid)
      activeUserRef.set({Followers: ["followers"], Name: $scope.name})
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
