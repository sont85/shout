var app = angular.module("shout", ["firebase", "ngRoute"]);

app.factory("Auth", function($firebaseAuth){
  var ref = new Firebase("https://shouting.firebaseio.com/");
  return $firebaseAuth(ref)
});

app.config(function ($routeProvider) {
  $routeProvider
  .when("/", {
    controller: "LoginCtrl",
    templateUrl: "login.html"
  })
  .when("/messageboard", {
    controller: "MessageBoardCtrl",
    templateUrl: "messageboard.html",
    resolve: {
      currentAuth: function(Auth){
        return Auth.$requireAuth();
      }
    }
  })
  .otherwise({
    redirectTo: "/"
  });
});



app.controller("MainCtrl", function($scope, Auth, $rootScope, $firebaseAuth, $location) {
  Auth.$onAuth(function(authData){
    if (authData) {
      console.log("onAuth");
      $rootScope.authData = authData;
      console.log(authData);
      $location.url("/messageboard")
      $rootScope.activeUser = {email: $scope.email, name: $scope.name}

    } else {
      console.log("offAuth")
    }
  })
});



