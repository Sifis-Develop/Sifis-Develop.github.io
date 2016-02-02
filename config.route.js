angular.module('ActionDriveApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider.state('UploadVideo', {
        url: '/UploadVideo',
        templateUrl: 'Views/UploadVideo.html'
    }).state('VideoList', {
        url: '/videoList',
        templateUrl: 'Views/VideoList.html',
        controller: 'VideoListContoller'
    }).state('PlayVideo', {
        url: 'playVideo/:videoId',
        templateUrl: 'Views/PlayVideo.html',
        controller: 'PlayVideoController'
    });
});
