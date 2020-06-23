var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*
* Tadas Juozapaitis ( kasp3rito@gmail.com )
*
* Modifed by Zazar:
* 24.06.2011 - Corrected pausing issue with multiple instances
*
*/

(function($){

$.fn.vTicker = function(options) {
	var defaults = {
		speed: 700,
		pause: 4000,
		showItems: 3,
		animation: '',
		mousePause: true,
		isPaused: false
	};

	var options = $.extend(defaults, options);

	moveUp = function(obj2, height, paused){
		if(paused) return;
		
		var obj = obj2.children('ul');
		
	    	first = obj.children('li:first').clone(true);
		
    		obj.animate({top: '-=' + height + 'px'}, options.speed, function() {
        		$(this).children('li:first').remove();
	        	$(this).css('top', '0px');
        	});
		
		if(options.animation == 'fade') {
			obj.children('li:first').fadeOut(options.speed);
			obj.children('li:last').hide().fadeIn(options.speed);
		}

	    	first.appendTo(obj);
	};
	
	return this.each(function() {
		var obj = $(this);
		var maxHeight = 0;
		var itempause = options.isPaused;

		obj.css({overflow: 'hidden', position: 'relative'})
			.children('ul').css({position: 'absolute', margin: 0, padding: 0})
			.children('li').css({margin: 0, padding: 0});

		obj.children('ul').children('li').each(function(){

			if($(this).height() > maxHeight) {
				maxHeight = $(this).height();
			}
		});

		obj.children('ul').children('li').each(function() {
			$(this).height(maxHeight);
		});

		obj.height(maxHeight * options.showItems);
		
    		var interval = setInterval(function(){ moveUp(obj, maxHeight, itempause); }, options.pause);
		
		if (options.mousePause)
		{
			obj.bind("mouseenter",function() {
				itempause = true;
			}).bind("mouseleave",function() {
				itempause = false;
			});
		}
	});
};
})(jQuery);

}
/*
     FILE ARCHIVED ON 09:31:48 Nov 14, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:21:18 Jun 23, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 1893.488 (3)
  CDXLines.iter: 37.157 (3)
  exclusion.robots.policy: 0.259
  PetaboxLoader3.datanode: 1901.211 (4)
  esindex: 0.02
  load_resource: 84.865
  exclusion.robots: 0.277
  RedisCDXSource: 19.486
  captures_list: 1956.074
  PetaboxLoader3.resolve: 40.766
*/
