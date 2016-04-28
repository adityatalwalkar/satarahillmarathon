/* globals angular, console */
angular.module('marathonpacers.settings.controllers', [])
  .controller('SettingsController', 
    function ($scope, $timeout, $interval, $ionicPlatform, $state,$rootScope) {
      
      

      $scope.saveSettings = function()
      {
        $rootScope.settings = $scope.settings;
        window.localStorage["settings"] = JSON.stringify($scope.settings);
        $state.go("app.home");
      };
  });