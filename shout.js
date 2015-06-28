var app = angular.module("shout", ["firebase", "ngRoute", "hc.marked"]);

app.factory("Auth", function($firebaseAuth){
  var ref = new Firebase("https://shouting.firebaseio.com/");
  return $firebaseAuth(ref);
});

app.factory("usersObject", function($firebaseObject){
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var usersRef = ref.child("users");
  return $firebaseObject(usersRef);
});

app.factory("tweetsArray", function($firebaseArray) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var tweetsRef = ref.child("Tweets");
  return $firebaseArray(tweetsRef);
});

app.factory("followingArray", function($firebaseArray) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var followingRef = ref.child("Following");
  return $firebaseArray(followingRef);
});

app.factory("likeArray", function($firebaseArray) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
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



