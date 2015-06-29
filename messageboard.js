app.controller("MessageBoardCtrl", function(usersObject, followingArray, tweetsArray, likeArray, Auth, $scope, $location, $rootScope, $firebaseObject, $firebaseArray) {
  $scope.tweets = tweetsArray;
  console.log(followingArray);
  usersObject.$loaded().then(function(data) {
    $scope.name = data[$rootScope.uid].Name;
    $scope.userName = data[$rootScope.uid].UserName;
    $scope.email = data[$rootScope.uid].Email;
  });

  function getFollowers() {
    $scope.followerNames = [];
    $scope.followerCount = 0;
    followingArray.$loaded().then(function(){
      angular.forEach(followingArray, function(item){
        console.log(item);
        if (item.following === $scope.email) {
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
        if (item.Author === $scope.email) {
          $scope.followingCount += 1;
          $scope.followingNames.push(item.following);
        }
      });
    });
  }
  getFollowing();

  $scope.submitTweet = function() {
    tweetsArray.$add({ Tweet: $scope.tweet, Author: $scope.email, Time: (new Date()).toLocaleString()});
    $scope.tweet = "";
  };
  $scope.followUser = function() {
    followingArray.$add({following: $scope.userToFollow, Author: $scope.email});
    getFollowing();

  };
  $scope.likeTweet = function(tweet, author) {
    tweetsArray.$add({ Tweet: "Retweet/Like: " + tweet, Author: author, Time: (new Date()).toLocaleString()});
  };

  $scope.tweetsFilter = function(item){
    return $scope.followingNames.some(function(following){
      if (item.Author === following) {
        return true;
      } else if (item.Author === $scope.email) {
        return true;
      }
    });
  };
});
