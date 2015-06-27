app.controller("MessageBoardCtrl", function($scope, Auth, $location, $rootScope) {
  $scope.logOut = function() {
    Auth.$unauth()
    $location.url("/")
  }
})
