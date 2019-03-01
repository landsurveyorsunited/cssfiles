/* Parallax Slider By Dynamic Drive
* Created: Aug 19th, 2014 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/


jQuery.noConflict()

function parallaxSlider(options){
	var $=jQuery
	this.setting={displaymode:{type:'auto', pause:2000, stoponclick:false, cycles:2, pauseonmouseover:true}, delaybtwdesc:500, activeslideclass:'selectedslide', orientation:'h', persist:true, slideduration:500} //default settings
	jQuery.extend(this.setting, options) //merge default settings with options
	this.setting.displaymode.pause+=400+this.setting.slideduration // 400ms is default fade in time
	this.curslide=(this.setting.persist)? parallaxSlider.routines.getCookie("slider-"+this.setting.wrapperid) : 0
	this.curstep=0
	this.curzindex=0
	this.animation_isrunning=false //variable to indicate whether a slide is currently being slided in
	this.posprop=(this.setting.orientation=="h")? "left" : "top"
	options=null
	var slideshow=this, setting=this.setting, preloadimages=[], max=0, imagesloaded=0
	$(function(){ //on document.ready
		slideshow.$wrapperdiv=$('#'+setting.wrapperid)
		var $bgoverlays = slideshow.$wrapperdiv.find('div.bgoverlay').filter(function(i){
			var $this = $(this)
			return ($this.data('bgimage') || $this.css('backgroundImage')!='none')
		})
		var max = $bgoverlays.length
		for (var i=0; i<$bgoverlays.length; i++){ // preload bg images inside div.bgoverlays
			var $this = $bgoverlays.eq(i)
			if ($this.data('bgimage')){
				$this.css('backgroundImage', 'url(' + $this.data('bgimage') + ')')
			}
			var bgimagesrc = $this.css('backgroundImage')
			preloadimages[i]=new Image()
			$(preloadimages[i]).bind('load error', function(){
				imagesloaded++
				if (imagesloaded==max){ //when all images have preloaded
					slideshow.init($)
				}
			})
			preloadimages[i].src=bgimagesrc
		}
	})


	function positioncontrols($controls){
		var winwidth = $(window).outerWidth(),
				winheight = $(window).outerHeight(),
				controlwidth = $controls.eq(0).width(),
				controlheight = $controls.eq(0).height(),
				controltop, controlleft
				
		if (setting.orientation == 'h'){
			controltop = (setting.dimensions[1] > winheight)? winheight/2 : '50%'
			$controls.css({top: controltop, marginTop: -controlheight/2})
		}
		else if (setting.orientation == 'v'){
			controlleft = (setting.dimensions[0] > winwidth)? winwidth/2 : '50%'
			$controls.css({left: controlleft, marginLeft: -controlwidth/2})
		}
	}
	this.positioncontrols = positioncontrols

	$(window).bind('unload', function(){ //on window onload
		if (slideshow.setting.persist) //remember last shown slide's index?
			parallaxSlider.routines.setCookie("slider-"+setting.wrapperid, slideshow.curslide)
	})

	$(window).bind('resize', function(){
		if (setting.dimensions){
			setting.dimensions=[slideshow.$wrapperdiv.width(), slideshow.$wrapperdiv.height()]
			positioncontrols(slideshow.$controls)
		}
	})

}

parallaxSlider.prototype={

	slide:function(nextslide, dir){ //possible values for dir: "left", "right", "up", or "down"
		var navdir = /(left|top)/.test(dir)? 'back' : 'forth'
		if (this.curslide==nextslide)
			return
		var slider=this, setting=this.setting
		var createobj=parallaxSlider.routines.createobj
		var nextslide_initialpos=setting.dimensions[(dir=="right"||dir=="left")? 0 : 1] * ((dir=="right"||dir=="down")? -1 : 1)
		var curslide_finalpos=-nextslide_initialpos
		var posprop=this.posprop
		if (this.animation_isrunning!=null)
			this.animation_isrunning=true //indicate animation is running
		var $nextslide = this.$imageslides.eq(nextslide).show().css(createobj([posprop, nextslide_initialpos], ['zIndex', 1])) 
		var $nextdescs = $nextslide.data('$descs')
		var $curslide = this.$imageslides.eq(this.curslide)
		var $curdescs = $curslide.data('$descs')


		$nextslide //show upcoming slide: [.75,.03,0,.97] is easing "function". See http://cubic-bezier.com
			.stop().velocity(createobj([posprop, 0]), setting.slideduration, [.75,.03,0,.97], function(){
				var $this=jQuery(this)
				$this.addClass(setting.activeslideclass)
				slider.animation_isrunning=false
			})

		$nextdescs.each(function(i){ //show upcoming slide's descs
			var $desc = jQuery(this)
			$desc.stop().css(createobj([posprop, nextslide_initialpos])).velocity(createobj([posprop, 0]), [.75,.03,0,.97], $desc.data('duration'))
		})

		$curslide //unshow current slide
			.css({zIndex: 0})
			.removeClass(setting.activeslideclass)
			.stop().velocity(createobj([posprop, dir=='left' || dir =='up'? -100 : 100]), setting.slideduration, "ease-in-out", function(){
					var $this=jQuery(this)
					$this.hide()
			}) //hide outgoing slide

		$curdescs.each(function(i){ //unshow current slide's descs: [.52,.25,.94,.51] is easing "function". See http://cubic-bezier.com
			var $desc = jQuery(this)
			$desc.stop().velocity(createobj([posprop, dir=='left' || dir =='up'? '-100%' : '100%']), [.52,.25,.94,.51], $desc.data('duration') * .5)
		})		

		this.curslide=nextslide
	},

	navigate:function(keyword){ //keyword: "back" or "forth"
		var slideshow=this, setting=this.setting
		clearTimeout(this.rotatetimer)
		if (!setting.displaymode.stoponclick && setting.displaymode.type!="manual"){ //if slider should continue auto rotating after nav buttons are clicked on
			this.curstep=(keyword=="back")? this.curstep-1 : this.curstep+1 //move curstep counter explicitly back or forth depending on direction of slide
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
		}
		var dir=(keyword=="back")? (setting.orientation=="h"? "right" : "down") : (setting.orientation=="h"? "left" : "up")	
		var targetslide=(keyword=="back")? this.curslide-1 : this.curslide+1
		targetslide=(targetslide<0)? this.$imageslides.length-1 : (targetslide>this.$imageslides.length-1)? 0 : targetslide //wrap around
		if (this.animation_isrunning==false)
			this.slide(targetslide, dir)
	},

	rotate:function(){
		var slideshow=this, setting=this.setting
		if (this.ismouseover){ //pause slideshow onmouseover
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
			return
		}
		var nextslide=(this.curslide<this.$imageslides.length-1)? this.curslide+1 : 0
		this.slide(nextslide, this.posprop) //go to next slide, either to the left or upwards depending on setting.orientation setting
		if (setting.displaymode.cycles==0 || this.curstep<this.maxsteps-1){
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
			this.curstep++
		}
	},

	init:function($){
		var slideshow=this, setting=this.setting
		setting.dimensions=[this.$wrapperdiv.width(), this.$wrapperdiv.height()]
		this.$wrapperdiv.css({position:'relative', visibility:'visible', overflow:'hidden', backgroundImage:'none'})
		if (this.$wrapperdiv.length==0){ //if no wrapper DIV found
			alert("Error: DIV with ID \""+setting.wrapperid+"\" not found on page.")
			return
		}
		this.$imageslides=this.$wrapperdiv.find('div.slide').hide()
		this.curslide=(this.curslide==null || this.curslide>this.$imageslides.length-1)? 0 : parseInt(this.curslide) //make sure curslide index is within bounds
		this.$imageslides.each(function(i){
			var $descs = $(this).find('div.desc').css({position:'absolute', left:0, top:0, width:'100%', height:'100%'})
			$(this).data({$descs: $descs}) // cache references to "desc" divs inside each slide
			var descduration = setting.slideduration
			$descs.each(function(i){ // add additional time to each desc's slide duration
				$(this).data({duration: descduration+=setting.delaybtwdesc})
			})
		})
		this.$imageslides.eq(this.curslide).show() // work on current slide to show
			.css(parallaxSlider.routines.createobj([this.posprop, 0])) //set current slide's CSS position (either "left" or "top") to 0
			.addClass(setting.activeslideclass)
			.stop()
			.find('div.desc').css({left: 0})

		var orientation=setting.orientation
		var controlpaths=(orientation=="h")? setting.navbuttons.slice(0, 2) : setting.navbuttons.slice(2)
		var $controls =  $('<img class="navbutton" src="'+controlpaths[1]+'" data-dir="forth" style="position:absolute; z-index:5; cursor:pointer; ' + (orientation=='v'? 'bottom:8px; left:46%' : 'top:46%; right:8px;') + '" />'
			+ '<img class="navbutton" src="'+controlpaths[0]+'" data-dir="back" style="position:absolute;z-index:5; cursor:pointer; ' + (orientation=='v'? 'top:8px; left:45%' : 'top:45%; left:8px;') + '" />'
		)
		.css({opacity:0})
		.click(function(){
			var keyword = this.getAttribute('data-dir')
			setting.curslide = (keyword == "right")? (setting.curslide == setting.content.length-1? 0 : setting.curslide + 1)
				: (setting.curslide == 0? setting.content.length-1 : setting.curslide - 1)
			slideshow.navigate(keyword)
		})
		this.$controls = $controls.appendTo(this.$wrapperdiv)
		this.positioncontrols(this.$controls)
		if (setting.displaymode.type=="auto"){ //auto slide mode?
			setting.displaymode.pause+=setting.slideduration
			this.maxsteps=setting.displaymode.cycles * this.$imageslides.length
			if (setting.displaymode.pauseonmouseover){
				this.$wrapperdiv.mouseenter(function(){slideshow.ismouseover=true})
				this.$wrapperdiv.mouseleave(function(){slideshow.ismouseover=false})
			}
			this.rotatetimer=setTimeout(function(){slideshow.rotate()}, setting.displaymode.pause)
		}

		var swipeOptions={ // swipe object variables
			triggerOnTouchEnd : true,
			triggerOnTouchLeave : true,
			fallbackToMouseEvents : true, // enable mouse emulation of swipe navigation in non touch devices?
			allowPageScroll: setting.orientation == 'h'? "vertical" : "horizontal",
			swipethreshold: setting.swipethreshold,
			excludedElements:[]
		}

		swipeOptions.swipeStatus = function(event, phase, direction, distance){
			if (phase == 'start' && event.target.tagName == 'A'){ // cancel A action when finger makes contact with element
				evtparent.onclick = function(){
					return false
				}
			}
			if (phase == 'cancel' && event.target.tagName == 'A'){ // if swipe action canceled (so no proper swipe), enable A action
				evtparent.onclick = function(){
					return true
				}
			}
			if (phase == 'end'){
				var navkeyword = /(right)|(down)/i.test(direction)? 'back' : 'forth'
				if ( (setting.orientation == 'h' && /(left)|(right)/i.test(direction)) || (setting.orientation == 'v' && /(up)|(down)/i.test(direction)) )
					slideshow.navigate(navkeyword)
			}
		}

		if (this.$wrapperdiv.swipe){
			this.$wrapperdiv.swipe(swipeOptions)
		}

		this.$wrapperdiv.bind('mouseenter click', function(){
			if (slideshow.$controls && slideshow.$controls.length == 2){
				slideshow.$controls.stop().velocity({opacity: 1})
			}
		})
	
		this.$wrapperdiv.bind('mouseleave', function(){
			if (slideshow.$controls && slideshow.$controls.length == 2){
				slideshow.$controls.stop().velocity({opacity: 0}, 'fast')
			}
		})
	}

}

parallaxSlider.routines={

	getSlideHTML:function(setting, imgref, w, h, posprop){
		var posstr=posprop+":"+((posprop=="left")? w : h)
		return '<div class="slide" style="background-image:url(' + imgref[0] + '); position:absolute;'+posstr+';width:'+w+'; height:'+h+'; z-index: 0">'
							+ ((imgref[1])? '<div class="desc">' + imgref[1] + '</div>\n' : '')
							+	'</div>'
	},

	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},

	setCookie:function(name, value){
		document.cookie = name+"=" + value + ";path=/"
	},

	createobj:function(){
		var obj={}
		for (var i=0; i<arguments.length; i++){
			obj[arguments[i][0]]=arguments[i][1]
		}
		return obj
	}
}