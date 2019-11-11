//DIV Content Overlay script- by JavaScript Kit (www.javascriptkit.com)
//Created: April 27th, 2011


jQuery.noConflict();

jQuery.extend(jQuery.easing, {easeOutExpo:function (x, t, b, c, d) { //see: http://gsgd.co.uk/sandbox/jquery/easing/
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	}
});

(function($){
  $.fn.overlaycontent=function(options) {  
    var setting={id:'', dir:'up', speed:200, opacity:1}
    return this.each(function(){
      $.extend(setting, options, (this.getAttribute('data-overlayid'))? {id:this.getAttribute('data-overlayid')} : {})
			var $target=$(this).css({position:'relative', overflow:'hidden'}) //set anchor DIV position to relative
			var $overlay=$('#'+(setting.id)) //reference overlay DIV box
			var startpoint={}
			if (setting.dir=="up" || setting.dir=="down"){ //set initial position of overlay box (either "top" or "left" property affected)
				startpoint={top:$target.outerHeight()* (setting.dir=="down"? -1 : 1)}
			}
			else{
				startpoint={left:$target.outerWidth()* (setting.dir=="right"? -1 : 1)}
			}
			var overlaydimenions={w:$target.outerWidth()-($overlay.outerWidth()-$overlay.width()), h:$target.outerHeight()-($overlay.outerHeight()-$overlay.height())}
			$overlay.css($.extend({position:'absolute', zIndex:'1000', width:overlaydimenions.w, height:overlaydimenions.h, left:0, top:0, visibility:'visible'}, startpoint)).appendTo($target)
			if (setting.opacity<1)
				$overlay.css({opacity:setting.opacity})
			$target.hover(
				function(){
					$overlay.dequeue().animate((setting.dir=="up" || setting.dir=="down")? {top:0} : {left:0}, setting.speed, 'easeOutExpo')
				},
				function(){
					$overlay.dequeue().animate(startpoint, setting.speed)
				}
			) //end hover
  	})
  }
})(jQuery);