/***********************************************
* Youtube Video Gallery script (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
* Requires: JQuery 1.5+
* Last modified: April 15th, 16 v1.2 to fix iOS devices not loading videos
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for this script and 100s more
***********************************************/

var youtubeapidfd = $.Deferred()

function onYouTubeIframeAPIReady(){
	youtubeapidfd.resolve()
}

var ddyoutubeGallery = (function($){
	
	var youtubethumbnailsurl = 'http://img.youtube.com/vi/VIDEO-ID/default.jpg'
	var youtubescreenshotsurl = 'http://img.youtube.com/vi/VIDEO-ID/mqdefault.jpg'
	var idevice = /ipad|iphone|ipod/i.test(navigator.userAgent)

	function ddyoutubeGallery(setting){
		var thisinst = this
		this.$slider = $('#' + setting.sliderid)
		this.$videowrapper = this.$slider.find('.videoWrapper:eq(0)')
		this.$nav = this.$slider.find('.videoNav:eq(0)')
		this.totalvids = setting.playlist.length
		this.currentvid = setting.selected || 0
		this.$navbelt
		this.setting = setting
		var tempdiv = $('<div />').appendTo( this.$videowrapper ) // temporary DIV container to be replaced with Youtube IFRAME
	  var tag = document.createElement('script')
	  tag.src = "https://www.youtube.com/iframe_api"
	  var firstScriptTag = document.getElementsByTagName('script')[0]
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		youtubeapidfd.then(function(){
		  thisinst.player = new YT.Player(tempdiv.get(0), {
				playerVars: {
					controls: 1,
					playlist: setting.playlist.join(',')
				},
		    events: {
		      'onReady': function(e){
						thisinst.populatenav(setting.playlist)
						if (setting.autoplay && !idevice){
							thisinst.player.playVideoAt( thisinst.currentvid )
						}
					},
		      'onStateChange': function(e){
						if (setting.autoplay && e.data == 5 && !idevice){ // if auto play video and playlist is cued and not iOS devices. See https://developers.google.com/youtube/iframe_api_reference for e.data details 
							thisinst.player.playVideoAt( thisinst.currentvid )
						}
						if (setting.autocycle && e.data == 0 && !idevice){ // if auto cycle && current video finished playing
							var nextvid = (thisinst.currentvid < thisinst.totalvids-1)? thisinst.currentvid + 1 : 0
							thisinst._scrolltothumb( nextvid )
							thisinst.player.playVideoAt( nextvid )
						}
					}
		    }
		  })
		})
	}

	ddyoutubeGallery.prototype = {


		_scrolltothumb(index){
			var indexnum = parseInt(index)
			var selectedvid = (indexnum < 0)? 0 : (indexnum > this.totalvids-1)? this.totalvids-1 : indexnum
			var $imgs = this.$nav.find('img')
			var $targetimg = $imgs.eq(selectedvid)
			var rightpos = $targetimg.position().left
			if (selectedvid <= this.currentvid){ // if clicking on thumbnail to the left of current selected thumbnail
				var navwidth = this.$nav.width()
				var imgwidth = $targetimg.width()
				var imagemargin = parseInt($targetimg.css('marginRight')) + parseInt($targetimg.parent().css('marginRight')) 
				rightpos -= navwidth - imgwidth - imagemargin
			}
			this.$navbelt.animate({scrollLeft: rightpos}, 400)
			$imgs.eq(this.currentvid).removeClass('selected').end()
				.eq(selectedvid).addClass('selected')
			this.currentvid = selectedvid
		},

		populatenav(playlist){
			var thisinst = this
			var navhtml = '<ul>\n'
			for (var i=0; i<playlist.length; i++){
				navhtml += '<li><img src="' + youtubethumbnailsurl.replace('VIDEO-ID', playlist[i]) + '" data-videoindex="' + i +'"/></li>\n'
			}
			navhtml += '</ul>\n'
			this.$nav.empty().html( navhtml )
			this.$navbelt = this.$nav.find('ul:eq(0)')
			this.$nav.off('.selectvideos').on('click.selectvideos', function(e){
				if (e.target.tagName == 'IMG'){
					var $target = $(e.target)
					var selectedvid = parseInt($target.data('videoindex'))
					thisinst._scrolltothumb( selectedvid )
					if (typeof thisinst.player != "undefined"){
						if (idevice){
							thisinst.player.cueVideoById( thisinst.setting.playlist[ selectedvid ] )
						}
						else{
							thisinst.player.playVideoAt( selectedvid )
						}
					}
					this.currentvid = parseInt($target.data('videoindex'))
				}
			})
			this._scrolltothumb( this.currentvid )
		}
	}

	return ddyoutubeGallery

})(jQuery);