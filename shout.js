var app = angular.module("shout", ["firebase", "ngRoute"]);

app.factory("Auth", function($firebaseAuth){
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  return $firebaseAuth(ref)

});

// app.config(function ($routeProvider) {
//   $routeProvider
//   .when("/", {
//     controller: "MainCtrl",
//     templateUrl: "login.html"
//   })
//   .otherwise({
//     redirectTo: "/"
//   });
// });



app.controller("MainCtrl", function($scope, $http, Auth, $location, $rootScope) {
  $scope.createUser = function() {
    $scope.message = null;
    $scope.error = null;
    Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    })
    .then(function(userData) {
      $rootScope.activeUser = {email: $scope.email, name: $scope.name}
      console.log("rootScope", $rootScope);
      console.log($location.$$absUrl)
      $scope.message = "User created with uid: " + userData.uid;

    })
    .catch(function(error) {
      console.log(error)
      $scope.error = error;
    });
  };



});

