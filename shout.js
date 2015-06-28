var app = angular.module("shout", ["firebase", "ngRoute", "hc.marked"]);
var ref = new Firebase("https://shouting.firebaseio.com/");

app.factory("Auth", function($firebaseAuth){
  return $firebaseAuth(ref);
});

app.factory("usersObject", function($firebaseObject){
  var usersRef = ref.child("users");
  return $firebaseObject(usersRef);
});

app.factory("tweetsObject", function($firebaseObject){
  var tweetsRef = ref.child("Tweets");
  return $firebaseObject(tweetsRef);
});

app.factory("tweetsArray", function($firebaseArray) {
  var tweetsRef = ref.child("Tweets");
  return $firebaseArray(tweetsRef);
});

app.factory("followingArray", function($firebaseArray) {
  var followingRef = ref.child("Following");
  return $firebaseArray(followingRef);
});

app.factory("likeArray", function($firebaseArray) {
  var likeRef = ref.child("Like");
  return $firebaseArray(likeRef);
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



