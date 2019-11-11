//Drop Down Panel script (March 29th, 08'): By JavaScript Kit: http://www.javascriptkit.com

var jkpanel={
	controltext: 'Panel Content',
	$mainpanel: null, contentdivheight: 0,

	openclose:function($, speed){
		this.$mainpanel.stop() //stop any animation
		if (this.$mainpanel.attr('openstate')=='closed')
			this.$mainpanel.animate({top: 0}, speed).attr({openstate: 'open'})
		else
			this.$mainpanel.animate({top: -this.contentdivheight+'px'}, speed).attr({openstate: 'closed'})
	},
	
	init:function(file, height, speed){
		jQuery(document).ready(function($){
			jkpanel.$mainpanel=$('<div id="dropdownpanel"><div class="contentdiv"></div><div class="control">'+jkpanel.controltext+'</div></div>').prependTo('body')
			var $contentdiv=jkpanel.$mainpanel.find('.contentdiv')
			var $controldiv=jkpanel.$mainpanel.find('.control').css({cursor: 'wait'})
			$contentdiv.load(file, '', function($){
					var heightattr=isNaN(parseInt(height))? 'auto' : parseInt(height)+'px'
					$contentdiv.css({height: heightattr})
					jkpanel.contentdivheight=parseInt($contentdiv.get(0).offsetHeight)
					jkpanel.$mainpanel.css({top:-jkpanel.contentdivheight+'px', visibility:'visible'}).attr('openstate', 'closed')
					$controldiv.css({cursor:'hand', cursor:'pointer'})
			})
			jkpanel.$mainpanel.click(function(){jkpanel.openclose($, speed)})		
		})
	}
}

//Initialize script: jkpanel.init('path_to_content_file', 'height of content DIV in px', animation_duration)
jkpanel.init('panelcontent.htm', '200px', 500)