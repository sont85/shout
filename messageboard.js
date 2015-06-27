app.controller("MessageBoardCtrl", function($scope, Auth, $location, $rootScope) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var usersRef = ref.child("users");
  $scope.logOut = function() {
    Auth.$unauth();
    $location.url("/");
  };

  $scope.submitTweet = function() {
    var currentUser = $rootScope.authData.uid;
    var currentUserRef = usersRef.child(currentUser);
    currentUserRef.child("Tweets").push({tweet: $scope.tweet, time: "2pm", author: "author"});

  };
  $scope.followUser = function() {
    var currentUser = $rootScope.authData.uid;
    var currentUserRef = usersRef.child(currentUser);
    currentUserRef.child("Following").push($scope.userToFollow);
  };
  $scope.tweet = "";

});
