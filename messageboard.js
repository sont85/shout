app.controller("MessageBoardCtrl", function(usersObject, followingArray, tweetsArray, likeArray, Auth, $scope, $location, $rootScope, $firebaseObject, $firebaseArray) {
  $scope.tweets = tweetsArray;
  usersObject.$loaded().then(function(data) {
    $scope.name = data[$rootScope.uid].Name;
    $scope.userName = data[$rootScope.uid].UserName;
    $scope.email = data[$rootScope.uid].Email;
    console.log(data[$rootScope.uid].PhoneNumber);
    $scope.phoneNumber = data[$rootScope.uid].PhoneNumber;

  });

  function getFollowers() {
    $scope.followerNames = [];
    $scope.followerCount = 0;
    followingArray.$loaded().then(function(){
      angular.forEach(followingArray, function(item){
        if (item.following === $rootScope.email) {
          $scope.followerCount += 1;
          $scope.followerNames.push(item.Author);
        }
      });
    });
  }

  getFollowers();


  function getFollowing() {
    followingArray.$loaded().then(function() {
      $scope.followingCount = 0;
      $scope.followingNames = [];
      angular.forEach(followingArray, function(item){
        if (item.Author === $rootScope.email) {
          $scope.followingCount += 1;
          $scope.followingNames.push(item.following);
        }
      });
    });
  }
  getFollowing();

  $scope.submitTweet = function() {
    tweetsArray.$add({ Tweet: $scope.tweet, Author: $rootScope.email, Time: (new Date()).toLocaleString()});
    $scope.tweet = "";
  };
  $scope.followUser = function() {
    followingArray.$add({following: $scope.userToFollow, Author: $rootScope.email});
    getFollowing();

  };
  $scope.likeTweet = function(tweet, author) {
    tweetsArray.$add({ Tweet: "Retweet/Like: " + tweet, Author: author, Time: (new Date()).toLocaleString()});
  };

  $scope.tweetsFilter = function(item){
    if (item.Author === $rootScope.email) {
      return true;
    }
    return $scope.followingNames.some(function(following){
      console.log("following: " + following, "tweet Author: " + item.Author, "currentuserEmail:" + $rootScope.email);
      return item.Author === following;
    });
  };
});


app.controller("ProfileCtrl", function($firebaseObject, $rootScope, $scope){
    var ref = new Firebase("https://shouting.firebaseio.com/");
    var usersRef = ref.child("users");
    var currentUserRef = usersRef.child($rootScope.uid);
    var syncObject = $firebaseObject(currentUserRef);
    syncObject.$bindTo($scope, "editProfile");
});
