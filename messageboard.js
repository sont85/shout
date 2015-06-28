app.controller("MessageBoardCtrl", function(usersObject, followingArray, tweetsArray, likeArray, Auth, $scope, $location, $rootScope, $firebaseObject, $firebaseArray) {
  $scope.tweets = tweetsArray;
  console.log(followingArray);
  usersObject.$loaded().then(function(data) {
    $scope.name = data[$rootScope.uid].Name;
    $scope.userName = data[$rootScope.uid].UserName;
    $scope.email = data[$rootScope.uid].Email;
  });

function nameAndCount() {
  followingArray.$loaded().then(function() {
    $scope.followingCount = 0;
    $scope.followingNames = [];
    angular.forEach(followingArray, function(item){
      console.log(item.Author);
      if (item.Author === $scope.email) {
        $scope.followingCount += 1;
        $scope.followingNames.push(item.following);
      }
    });
    console.log($scope.followingNames);
  });
}
nameAndCount()


  $scope.logOut = function() {
    Auth.$unauth();
    $location.url("/");
  };

  $scope.submitTweet = function() {
    tweetsArray.$add({ Tweet: $scope.tweet, Author: $scope.email, Time: (new Date()).toLocaleString()});
    $scope.tweet = "";
  };
  $scope.followUser = function() {
    followingArray.$add({following: $scope.userToFollow, Author: $scope.email});
    nameAndCount();

  };
  $scope.likeTweet = function(tweet, author) {
    // likeArray.$add({Tweet: tweet, Author: $scope.email});
    tweetsArray.$add({ Tweet: "Retweet/Like: " + tweet, Author: author, Time: (new Date()).toLocaleString()});

  };

  $scope.tweetsFilter = function(item){
    return $scope.followingNames.some(function(following){
      console.log(following);
      console.log(item.Author);
      if (item.Author === following) {
        return true;
      } else if (item.Author === $scope.email) {
        return true;
      } else {
        return false;
      }
    });
  };

  // $scope.myFilter = function() {
  //   var filterArray = [];
  //   console.log(followingArray);
  //   followingArray.$loaded().then(function() {
  //     angular.forEach("followingArray", function(item){
  //       filterArray.push(item.following);
  //       console.log(item.following);
  //     });
  //     filterArray.push($scope.email);
  //     console.log(filterArray);
  //     return filterArray;
  //   });
  // };

});
