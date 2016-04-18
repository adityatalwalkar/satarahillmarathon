angular.module('marathonpacers.controllers', [])

.controller('AppCtrl', function($scope, $state,$ionicModal, $timeout,Auth) {

 $scope.logout = function()
 {
 	Auth.logout();
	$state.go("login");
 }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
