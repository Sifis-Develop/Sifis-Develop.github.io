angular.module('ActionDriveApp').
    directive('youtube', function ($window) {
        return {
            restrict: "E",
            scope: {
                height: "@",
                width: "@",
                videoid: "@",
                times: "="
            },

            template: '<div></div>',

            link: function (scope, element) {

                scope.frameDuration = 5;
                scope.timesCounter = 0;
                scope.times = [];

                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;

                $window.onYouTubeIframeAPIReady = function () {
                    //console.log(scope);
                    player = new YT.Player(element.children()[0], {
                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid,
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }

                function onPlayerReady(event) {

                    //console.log(scope);
                    /*player.loadVideoById({
                        'videoId': scope.videoid,
                        'startSeconds': 120,
                        'endSeconds': 125,
                        'suggestedQuality': 'large'
                    });*/
                }

                var done = false;
                function onPlayerStateChange(event) {
                    if (event.data == YT.PlayerState.PLAYING && !done) {
                        setTimeout(stopVideo, scope.frameDuration * 3 * 1200);
                        //done = true;
                    }
                }

                var playVideo = function () {

                    if (scope.times[scope.timesCounter] != null) {

                        var start = scope.times[scope.timesCounter] - (2* scope.frameDuration);
                        var end = scope.times[scope.timesCounter] + (3* scope.frameDuration);
                        if (start < 0) {
                            start = 0;
                            end = scope.frameDuration * 2;
                        }
                        player.loadVideoById({
                            'videoId': scope.videoid,
                            'startSeconds': start,
                            'endSeconds': end,
                            'suggestedQuality': 'large'
                        });
                    }
                }

                function stopVideo() {
                    player.stopVideo();

                    console.log("Video Stoped");
                    scope.timesCounter = scope.timesCounter + 1;
 
                    playVideo();
                }

                scope.$watch('times', function (newValue) {

                    console.log(newValue);
                    if(scope.times.length > 0){
                        scope.timesCounter = 0;
                        playVideo();
                    }
                });
            },
        }
    });