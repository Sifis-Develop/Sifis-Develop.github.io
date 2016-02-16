'use strict';

function init() {
    window.initGapi(); // Calls the init function defined on the window
}

angular.module('ActionDriveApp')
    .controller('ModalSelectVideo', ['$scope', '$uibModalInstance', '$window',SelectSpotListController]);

function SelectSpotListController($scope, $uibModalInstance, $window) {

    var OAUTH2_CLIENT_ID = '846999749838-g0klmeg5mhemmrdb2hr1nllludp2o1qb.apps.googleusercontent.com';
    var OAUTH2_SCOPES = [
      'https://www.googleapis.com/auth/youtube'
    ];
    $scope.youtubeVideos = [];

    $window.initGapi = function () {
        gapi.auth.init(function () {
            window.setTimeout(checkAuth, 1);
        });
    };

    function checkAuth() {
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: true
        }).then(function (response) {
            handleAuthResult(response);
        });
    }

    var handleAuthResult = function (authResult) {
        if (authResult && !authResult.error) {

            loadAPIClientInterfaces();
        } else {

        }
    }

    var loadAPIClientInterfaces = function () {
        gapi.client.load('youtube', 'v3', function () {
            requestUserUploadsPlaylistId();
        });
    }

    var requestUserUploadsPlaylistId = function () {
        var request = gapi.client.youtube.channels.list({
            mine: true,
            part: 'contentDetails'
        });
        request.execute(function (response) {

            requestVideoPlaylist(response.result.items[0].contentDetails.relatedPlaylists.uploads);
        });
    }

    var requestVideoPlaylist = function (playlistId, pageToken) {

        var requestOptions = {
            playlistId: playlistId,
            part: 'snippet',
            maxResults: 10
        };
        if (pageToken) {
            requestOptions.pageToken = pageToken;
        }
        var request = gapi.client.youtube.playlistItems.list(requestOptions);
        request.execute(function (response) {

            $scope.youtubeVideos = response.items;
            angular.element('#mybutton').triggerHandler('click');
        });
    }

    $scope.ok = function () {
        
        $uibModalInstance.close(selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}