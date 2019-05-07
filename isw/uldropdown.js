var uldropdown = (function($){
	var defaults = {fx: 'default', duration: 300, overlay: false}
	var defaulttext = 'Select A Value'

	function positionMenu($parent, $menu){
		if ( ($parent.offset().left + $menu.outerWidth()) > $(window).width()){
			$menu.css('left', - $menu.outerWidth() + $parent.outerWidth())
		}
		else{
			$menu.css('left', 0)
		}	
	}

	function uldropdown(options){
		this.s = $.extend({}, defaults, options)
		this.s.onselect = this.s.onSelect || function($selected){} // define fallback onselect callback function
		this.$div = $('#' + this.s.dropid)
		this.$titletext = this.$div.find('.titletext').eq(0)
		this.$ul = this.$div.find('>ul')
		this.$links = this.$ul.find('a')
		if (!this.$div.is('div')){
			return true // move on to next matched element
		}
		if (this.s.overlay){
			this.$ul.addClass('overlay')
		}
		var thisdropdown = this

		this.$div.on('click.toggle', function(e){ // on toggle
			thisdropdown.isvisible = thisdropdown.$ul.is(':visible')
			if (thisdropdown.s.overlay && !thisdropdown.isvisible){
				positionMenu(thisdropdown.$div, thisdropdown.$ul)
			}
			if (thisdropdown.isvisible){
				thisdropdown.contract(e)
			}
			else{
				thisdropdown.expand(e)
			}
			e.stopPropagation()
		})

		this.$ul.on('click.select', function(e){ // on select of a menu item
			thisdropdown.selectit($(e.target))
		})

		$(document).on('click', function(e){
			var isvisible = thisdropdown.$ul.is(':visible')
			if (isvisible){
				thisdropdown.$div.trigger('click.toggle')
				thisdropdown.$links.removeClass('selected')
			}
		})

	}

	uldropdown.prototype = {

		expand:function(e){
			var thisdropdown = this
			this.$ul.slideDown({
				duration:thisdropdown.s.duration
			})
			if (e){
				e.stopPropagation()
			}
		},

		contract:function(e){
			var thisdropdown = this
			this.$ul.slideUp({
				duration:thisdropdown.s.duration
			})
			if (e){
				e.stopPropagation()
			}
		},

		selectit:function($target){
			var thisdropdown = this
			var $target = (typeof $target == "number")? this.$links.eq($target-1) : $target.closest('a')
			var text = $target.text()
			if (text){
				this.$titletext.attr('title', text)
				this.$titletext.animate({opacity:0}, 200, function(){
					thisdropdown.$titletext.text(text)
					thisdropdown.$titletext.animate({opacity:1}, 200)
				})
				this.$links.removeClass('selected')
				$target.addClass('selected')
				this.s.onselect($target)
			}
		},

		unselect:function(){
			var thisdropdown = this
			this.$titletext.attr('title', defaulttext)
			this.$titletext.animate({opacity:0}, 200, function(){
				thisdropdown.$titletext.text(defaulttext)
				thisdropdown.$titletext.animate({opacity:1}, 200)
			})
			this.$links.removeClass('selected')		
		}
	}

	return uldropdown;

})(jQuery);