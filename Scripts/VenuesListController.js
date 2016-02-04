angular.module('ActionDriveApp')
    .controller('VenuesListController', ['$scope', '$uibModalInstance', 'venues', VenuesListController]);

function VenuesListController($scope, $uibModalInstance, venues) {

    $scope.venues = venues;

    $scope.ok = function () {
        // $modalInstance.close(description);
        $uibModalInstance.dismiss();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}
