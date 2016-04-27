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


    $scope.getUrl = function(url)
    {
        return $sce.trustAsResourceUrl(url);
    }
  $scope.activeruns = [
    { title: 'Run 1', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

