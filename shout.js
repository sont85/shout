var app = angular.module("shout", ["firebase", "ngRoute"]);

app.factory("Auth", function($firebaseAuth){
  var ref = new Firebase("https://shouting.firebaseio.com/");
  return $firebaseAuth(ref);
});

app.factory("usersObject", function($firebaseObject){
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var usersRef = ref.child("users");
  return $firebaseObject(usersRef);
});

app.factory("usersArray", function($firebaseArray) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var usersRef = ref.child("users");
  return $firebaseArray(usersRef);
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
      $rootScope.uid = authData.uid;
      console.log($rootScope.uid);
      console.log(authData);
      $location.url("/messageboard");
    } else {
      console.log("offAuth");
    }
  });
});



