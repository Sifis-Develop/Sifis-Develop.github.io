angular.module('ActionDriveApp')
    .controller('VenuesListController', ['$scope', '$modalInstance', 'venues', VenuesListController]);

function VenuesListController($scope, $modalInstance, venues) {

    $scope.venues = venues;

    $scope.ok = function () {
        // $modalInstance.close(description);
        $modalInstance.dismiss();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}
