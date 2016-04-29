angular.module('marathonpacers.runningform.controllers', [])

.controller('RunningFormController', function($scope,ionicMaterialInk, ionicMaterialMotion, $ionicSideMenuDelegate,$ionicLoading, $timeout,FURL,$firebaseArray,$sce) {
  
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 500);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    $ionicLoading.show({
          template: 'Loading Data .. please wait',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
    var itemsRef = new Firebase(FURL + "runningform/articles");
    $scope.articles  = $firebaseArray(itemsRef);
    itemsRef.once('value',function(snapshot) {
                $ionicLoading.hide();
            }
        );

    $scope.goto = function(url)
    {
      url = getUrl(url);
      cordova.InAppBrowser.open(url,  options)
    
      .then(function(event) {
         // success
      })
    
      .catch(function(event) {
         // error
      }); 
    }
    $scope.getUrl = function(url)
    {
        return $sce.trustAsResourceUrl(url);
    }
  
})

