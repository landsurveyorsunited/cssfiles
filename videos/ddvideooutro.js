// YouTube/ Vimeo Video Outro Script
// Created: Sept 15th, 16' v1.01

var ddyoutubeapidfd = jQuery.Deferred()
var vimeoapidfd = jQuery.Deferred()

var ddoutroapi = (function($){

var youtubeapi = ['https://www.youtube.com/iframe_api', false]
var vimeoapi = ['https://player.vimeo.com/api/player.js', false]

var validyoutubelink = /(youtube?\.com|youtu\.be)/i
var validvimeolink = /vimeo\.com/i

var defaults = {templateid: 'outrotemplate', onvideoend:function($outro){}}

var customclasssuffix = 0 // suffix to add to dynamic 'ddvideowrapper' class 
var vimeoapitimer

	function loadvideoapi(targetapi){
		var api
		if (targetapi == 'youtube'){
			api = youtubeapi
			api[1] = (typeof window['YT'] != 'undefined')? 'yes' : api[1] // check if API is already loaded
		}
		else if (targetapi == 'vimeo'){
			api = vimeoapi
			api[1] = (typeof window['Vimeo'] != 'undefined')? 'yes' : api[1] // check if API is already loaded
		}
		if (api.length && api[1] == false ){
			var tag = document.createElement('script')
			tag.src = api[0]
			var firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
			api[1] = true // indicate API has been loaded already
			if (targetapi == 'vimeo'){
				vimeoapitimer = setInterval(function(){
					if (typeof window['Vimeo'] != 'undefined'){
						vimeoapidfd.resolve()
						clearTimeout(vimeoapitimer)
					}
				}, 50)
			}
		}
	}

	function addoutro($vidcontainer, $iframe, playertype, settings){
		var outrotemplate = $('#' +  settings.templateid)
		if ( outrotemplate.length == 0){
			console.log('No outro template DIV with id ' + settings.templateid + ' found')
			return
		}
		var $outrodiv = $('<div class="ddoutro" />').html( $('#' + settings.templateid).html() )
		$outrodiv.find('.ddclosebutton').on('click', function(){
			showhideoutro($outrodiv, 'hide')
		})
		if ( playertype == 'youtube' ){ // if youtube video
			$outrodiv.appendTo( $vidcontainer )
			ddyoutubeapidfd.then(function(){
			  var player = new YT.Player($iframe.get(0), {
			    height: '368',
			    width: '640',
			    events: {
						'onStateChange': function(event){
							if (event.data == YT.PlayerState.ENDED){
								showhideoutro($outrodiv, 'show')
								settings.onvideoend($outrodiv)
							}
							else{
								showhideoutro($outrodiv, 'hide')
							}
						}
			    }
			  }) // end new YT.Player
			}) // end ddyoutubeapidfd.then()
		}
		else if ( playertype == 'vimeo' ){ // if vimeo video
			$outrodiv.appendTo( $vidcontainer )
			vimeoapidfd.then(function(){
				var player = new Vimeo.Player($iframe.get(0))
				player.on('ended', function(){
					settings.onvideoend($outrodiv)
					showhideoutro($outrodiv, 'show')
				})
				player.on('seeked', function(){
					showhideoutro($outrodiv, 'hide')
				})
			})
		}
	}

	function showhideoutro($outro, action){
		if (action == 'show'){
			$outro.addClass('reveal')
		}
		else if ($outro.hasClass('reveal')){
			$outro.removeClass('reveal')
		}
	}

	$.fn.ddvideooutro = function(options){ // set up jquery ddvideooutro plugin
		if (options && options.bottomgap){ // if custom bottom gap value for outtro DIV versus default value defined in .css file
			var customclass =  '.ddvideowrapper' + (++customclasssuffix)
			var customstyle = '<style>' + customclass + ' > div.ddoutro{bottom:' + options.bottomgap + 'px;}\n<\/style>'
			$("head").append(customstyle)
		}
		return this.each(function(){ //return jQuery obj
			var s = $.extend({}, defaults, options)
			var $vidcontainer = $(this)
			var $iframe = $vidcontainer.find('iframe')
			if ( $iframe.length != 1){
				console.log('Error: Element doesn\'t contain an IFRAME. Skipping to next element')
				return true
			}
			var playertype = validyoutubelink.test( $iframe.attr('src') )? 'youtube' : validvimeolink.test( $iframe.attr('src') )? 'vimeo' : 'none'
			if (playertype !='none'){
				loadvideoapi(playertype)
				if (s.bottomgap){
					$vidcontainer.addClass( customclass.substr(1) )
				}
				addoutro($vidcontainer, $iframe, playertype, s)
			}

		}) // end return this.each

	}

	return {
		showhideoutro: function($videocontainer, action){
			var $outro = $videocontainer.find('div.ddoutro:eq(0)')
			showhideoutro($outro, action)
		}
	}

})(jQuery);

function onYouTubeIframeAPIReady() {
	ddyoutubeapidfd.resolve()
}