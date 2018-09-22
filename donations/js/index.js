var player;
    
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('ytplayer', {
          height: '360',
          width: '615',
          videoId: 'XLpIKKW0u-U?rel=0&amp;controls=0&amp;showinfo=0&modestbranding=1',
          events: {
            'onStateChange': function(event) {
              if (event.data == YT.PlayerState.PLAYING) {
                 console.log("booboo")
                 $('.vid').removeClass('isAngled');
              } else {
                 $('.vid').addClass('isAngled');
              }
            }
          }
        });
      }

      // function pauseAudio() {
      //   ...
      // }