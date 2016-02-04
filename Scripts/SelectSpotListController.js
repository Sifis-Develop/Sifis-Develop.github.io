angular.module('ActionDriveApp')
    .controller('SelectSpotListController', ['$scope', '$uibModalInstance', 'items', SelectSpotListController]);

function SelectSpotListController($scope, $uibModalInstance, items) {

    $scope.items = items;
    console.log($scope.items);

    var setFramesSeconds = function (selectedFrames) {
        
        var firstSpot = $scope.items.spots[0];
        console.log(firstSpot);
        console.log(selectedFrames[0]);
    }

    $scope.ok = function () {

        console.log($scope.items);
        var selected = [];
        for (var i = 0 ; i < $scope.items.venues.length; i++) {
            if ($scope.items.venues[i].include) {

                /*if (selectedFrames.indexOf($scope.items.spots[$scope.items.combination[i].spotIndex]) == -1)
                {
                    selectedFrames.push($scope.items.spots[$scope.items.combination[i].spotIndex]);
                }*/
                selected.push($scope.items.venues[i]);
            }
        }
        console.log(selected);
        //setFramesSeconds(selected);
        $uibModalInstance.close(selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}
