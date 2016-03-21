angular.module('ActionDriveApp')
    .controller('PlayVideoController', ['$scope', '$window', '$stateParams', '$http', '$q', 'toaster', '$uibModal', 'FilterVenuesService', PlayVideoController]);

function PlayVideoController($scope, $window, $stateParams, $http, $q, toaster, $uibModal, FilterVenuesService) {

    $scope.videoId = $stateParams.videoId;
    $scope.travels = [];
    $scope.pointsOfInterest;
    $scope.model = { selectedTravel : "" };
    $scope.firstSpot = {};

    $scope.timesToPlay = { times : []};

    $scope.informationList = [];

    $scope.filtered = [];

    var getInformationList = function () {

        var deferred = $q.defer();
        $http.get('https://actiondriveapi.herokuapp.com/informationlist')
            .success(function (data) {
                deferred.resolve(data);
                $scope.informationList = data;
                //var sec = _convertTimestampToSecs($scope.informationList[0].Timestamp);
                console.log($scope.informationList);
                $scope.getFoursquareInfo();
               // toaster.pop('success', "Travel data retreived !", "Try again", 15000, 'trustedHtml', 'goToLink');
            })
            .error(function (data, status, headers, config) {
                //console.log(data);
                toaster.pop('error', "Error getting travel data", "", 15000, 'trustedHtml', 'goToLink');
            });
        return deferred.promise;
        
    }
    getInformationList();

    $scope.getFoursquareInfo = function () {

        var deferred = $q.defer();
        //console.log($scope.model.selectedTravel);
        //if ($scope.model.selectedTravel == "") {
        //    toaster.pop('info', "Please select a travel from the list", "", 15000, 'trustedHtml', 'goToLink');
        //    return;
        //}
        //console.log($scope.informationList[0]);
        $http.get('https://api.foursquare.com/v2/venues/explore?client_id=B5W3RUPH5P25MREFM0E0AJA0SZADFNMDBK510A2GDM1WANC5&client_secret=ZE00YZW3CVWYLSJLJCGRELNEBT4V30FSHTTUKUYDKGEBPTU5&ll=' + $scope.informationList[0].Latitude + ',' + $scope.informationList[0].Longitude + '&section=sights&v=20151222')//35.340915,25.142496
            .success(function (data) {

                deferred.resolve(data);

                $scope.pointsOfInterest = data.response.groups[0].items;

                $scope.filtered = FilterVenuesService.FilterVenues($scope.pointsOfInterest, $scope.informationList);
                toaster.pop('success', "Travel data retreived !", "", 15000, 'trustedHtml', 'goToLink');
                //$scope.showAllVenuesList();
            })
            .error(function (data, status, headers, config) {
                //console.log(data);
                toaster.pop('error', "Error getting Foursquare points of interest", "Try again", 15000, 'trustedHtml', 'goToLink');
            });
        return deferred.promise;
    }

    $scope.showAllVenuesList = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/VenuesList.html',
            controller: 'VenuesListController',
            size: 'lg',
            resolve: {
                venues: function () {
                    return $scope.pointsOfInterest;
                }
            }
        });
    }

    $scope.openVenuesList = function () {

        $scope.filtered = FilterVenuesService.FilterVenues($scope.pointsOfInterest, $scope.informationList);

        //$scope.timesToPlay = "No";
        var modalInstance = $uibModal.open({
            templateUrl: 'Views/SelectSpotsList.html',
            controller: 'SelectSpotListController',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.filtered;
                }
            }
        });

        modalInstance.result.then(function (selected) {

           // $scope.description.Rooms[$scope.description.Rooms.indexOf(roomDescription)] = roomDescription;
            // $scope.ExecuteSetDescription();
           $scope.timesToPlay.times = [];
           for (var i = 0 ; i < selected.length; i++) {
               
               //var _time = _convertTimestampToSecs(selected[i].time) - _convertTimestampToSecs(filtered.venues[0].time);
               var _time = _convertTimestampToSecs(selected[i].time) - _convertTimestampToSecs($scope.informationList[0].Timestamp);
               //console.log("")
               $scope.timesToPlay.times.push(_time);
           }
        });
    }

    var _convertTimestampToSecs = function (timestamp) {

        var strs = timestamp.split(" ");
        var times = strs[0].split(":");

        times[0] = parseInt(times[0]);
        times[1] = parseInt(times[1]);
        times[2] = parseInt(times[2]);
        if (strs[1] == "MM")
            times[0] = times[0] + 12;

        //console.log(times);

        return ((times[0] * 60) + times[1]) * 60 + times[2];
    }

    $scope.openYoutube = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'Views/ModalYoutube.html',
            size: 'lg'
        });
    }

    //-------------- On Play Button -------------------------------------
    $scope.playFrames = function () {

        var selected = [];
        for (var i = 0 ; i < $scope.filtered.venues.length; i++) {
            if ($scope.filtered.venues[i].include) 
                selected.push($scope.filtered.venues[i]);
        }

        $scope.timesToPlay.times = [];
        for (var i = 0 ; i < selected.length; i++) {
            var _time = _convertTimestampToSecs(selected[i].time) - _convertTimestampToSecs($scope.informationList[0].Timestamp);
            $scope.timesToPlay.times.push(_time);
        }
    }

    $scope.playOneFrame = function (frame) {

        $scope.timesToPlay.times = [];
        var _time = _convertTimestampToSecs(frame.time) - _convertTimestampToSecs($scope.informationList[0].Timestamp);
        $scope.timesToPlay.times.push(_time);
    }
}

