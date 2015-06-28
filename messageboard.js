app.controller("MessageBoardCtrl", function(usersObject, usersArray, Auth, $scope, $location, $rootScope, $firebaseObject, $firebaseArray) {
  var ref = new Firebase("https://shouting.firebaseio.com/");
  var usersRef = ref.child("users");
  console.log($scope.users);

  console.log(usersArray);  

  usersObject.$loaded()
  .then(function(data) {
    var obj = data[$rootScope.authData.uid];
    $scope.name = obj.Name;
    $scope.userName = obj.UserName;
    $scope.following = obj.Following;
    $scope.tweets = obj.Tweets;
    $scope.followers = obj.Followers;
  })
  .catch(function(error) {
    console.error("Error:", error);
  });

  $scope.logOut = function() {
    Auth.$unauth();
    $location.url("/");
  };

  $scope.submitTweet = function() {
    var currentUser = $rootScope.authData.uid;
    var currentUserRef = usersRef.child(currentUser);
    currentUserRef.child("Tweets").push({tweet: $scope.tweet, time: "2pm", author: "author"});
    $scope.tweet = "";
  };
  $scope.followUser = function() {
    var currentUser = $rootScope.authData.uid;
    var currentUserRef = usersRef.child(currentUser);
    currentUserRef.child("Following").push($scope.userToFollow);
    $scope.userToFollow = "";
  };
  $scope.tweet = "";

});
