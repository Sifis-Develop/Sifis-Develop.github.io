'use strict';

function init() {
    window.initGapi(); // Calls the init function defined on the window
}

angular.module('ActionDriveApp')
    .controller('GlobalController', ['$scope', '$window', GlobalController]);

function GlobalController($scope, $window) {

    var OAUTH2_CLIENT_ID = '765113986325-qpi7l5ooqt5g0ri8a53vjdi73tp1fdpr.apps.googleusercontent.com';
    var OAUTH2_SCOPES = [
      'https://www.googleapis.com/auth/youtube'
    ];


    $window.initGapi = function () {
        console.log('googleApiClientReady');
        gapi.auth.init(function () {
            window.setTimeout(checkAuth, 1);
        });
    };

    function checkAuth() {
        console.log('checkAuth');
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: true
        }, requestUserUploadsPlaylistId());
    }

    var requestUserUploadsPlaylistId = function() {
        // See https://developers.google.com/youtube/v3/docs/channels/list
        console.log(gapi);
        gapi.client.load('youtube', 'v3', function() {
            var request = gapi.client.youtube.channels.list({
                mine: true,
                part: 'contentDetails'
            });
            request.execute(function (response) {
                requestVideoPlaylist(response.result.items[0].contentDetails.relatedPlaylists.uploads);
            });
        });
    }

    // Retrieve the list of videos in the specified playlist.
    var requestVideoPlaylist = function(playlistId, pageToken) {

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

            console.log(response);
        });
    }
}

