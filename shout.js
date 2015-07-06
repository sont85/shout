var app = angular.module("shout", ["firebase", "ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
  .when("/", {
    controller: "LoginCtrl",
    templateUrl: "login.html"
  })
  .when("/messageboard", {
    controller: "MessageBoardCtrl",
    templateUrl: "messageBoard.html",
    resolve: {
      currentAuth: function(Auth){
        return Auth.$requireAuth();
      }
    }
  })
  .when("/follow", {
    controller: "MessageBoardCtrl",
    templateUrl: "follow.html",
    resolve: {
      currentAuth: function(Auth) {
        console.log(Auth.$requireAuth());
        return Auth.$requireAuth();
      }
    }
  })
  .when("/profile", {
    controller: "ProfileCtrl",
    templateUrl: "profile.html",
    resolve: {
      currentAuth: function(Auth) {
        return Auth.$requireAuth();
      }
    }
  })
  .otherwise({
    redirectTo: "/"
  });
});

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

app.controller("MainCtrl", function($scope, Auth, $rootScope, $firebaseAuth, $location) {
  Auth.$onAuth(function(authData){
    if (authData) {
      console.log("onAuth");
      $scope.signIn = true;
      $rootScope.authData = authData;
      $rootScope.uid = authData.uid;
      console.log(authData.password.email);
      $rootScope.email = authData.password.email;
    } else {
      console.log("offAuth");
    }
  });
  $scope.logOut = function() {
    Auth.$unauth();
    $scope.signIn = false;
    $location.url("/");
  };
});
