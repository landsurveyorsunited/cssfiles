//Load in google webfonts to make things pretty.
WebFontConfig = {
	google: { families: [ 'Exo', 'Satisfy' ] }
};

(function() {
   var wf = document.createElement('script');
   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
   wf.type = 'text/javascript';
   wf.async = 'true';
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(wf, s);
})();


(function($) {
	//Use prefixed
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	var fail = function(e) {
		$(video).html("Whoops, Video isn't working :(");
	}
	
	function createPhotostrip(video) {
		var canvas = document.querySelector('canvas');
	  var ctx = canvas.getContext('2d');		
		
		function takeSnapshot(i) {
			if (i) {
				var gutter = i*20;
			} else {
				gutter = 0;
			}
			// 640 is the default width of the video element. If the video element has a different width, this needs to change.
			var width = 640;
			var x = width*i + gutter;
			ctx.drawImage(video, x, 0);
			var photoStrip = canvas.toDataURL();
			document.querySelector('img').src = photoStrip;
			$('#download').attr('href', photoStrip);
		}
		
		/*
		 *  n is the countdown time
		 *  i is the number of snapshots to be taken
		 * 
		 **  Running window.setTimeout in a loop function allows
		 **  setTimeout to properly timeout each time before the 
		 **  countdownLoop function runs again; as opposed to a for loop 
		 **  which would cause all setTimeout functions to run at once.
		 */
		function countdownLoop(n,i) {
			window.setTimeout(function() {
				if (n == 0 && i < 3) {
					$('#countdown').html('Cheese!');
					takeSnapshot(i);
					i++;
					n = 3;
					countdownLoop(n,i);
				} else if (i == 3) {
					$('#countdown').html('');
					$('#download').css({"height": "3em"})
					return true;
				} else {
					$('#countdown').html(n);
					n--;
					countdownLoop(n,i);
				}
			},1000);
		}
		
		n=3;
		i=0;	
		countdownLoop(n,i);
	}
	
	if (navigator.getUserMedia) {
	  navigator.getUserMedia({video: true}, function(stream) {
	  	var video = document.querySelector('video');
	    video.srcObject = stream;
	    video.play();
	    
	    $('#activate').click(function(e) {
          e.preventDefault();
	    		$(this).css({"height":"0","margin":"0 auto"});
	    		$('#countdown').css({"height":"auto"});
	    		if(stream) {
	    			createPhotostrip(video);
	    		}
	    });
	  }, fail);
	} else {
	  var video = document.querySelector('video');
	  $(video).html("Whoops, Video isn't working :(");
	}
})(jQuery);