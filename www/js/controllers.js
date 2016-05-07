angular.module('marathonpacers.controllers', [])

.controller('AppCtrl', function($scope, $state,$ionicModal, $timeout,Auth) {

 $scope.logout = function()
 {
 	Auth.logout();
	$state.go("login");
 }

})