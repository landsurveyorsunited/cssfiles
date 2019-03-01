/* 3D Drop In Notifier Panel
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
* v1.1 (Dec 22nd, 13): Fixed various issues in legacy browsers such as IE8/9 and Opera, adds alternate transition effect.
*/

var notifier = {
	defaults: {
		noteid: null,
		content: 'inline',
		freq: 'manual', // options: 'manual', 'session'
		defaultstate: 'open',
		state: 'closed initial',
		onopenclose: function($el, state){
		},
		oninit: function($el, state){
		}
	},
	
	open: function(){
		var scrolltopduration = (this.$doccontent.scrollTop()) > 10? 'normal' : 0
		this.$doccontent.stop().animate({scrollTop:0}, scrolltopduration, function(){
			notifier.$body.addClass('open_notify')
			if (notifier.transform3d)
				notifier.$body.css({transform: 'translate3d(0, ' + notifier.measures.noteheight + 'px, 0)'})
			else{
				notifier.$notify.slideDown('normal', function(){
					notifier.s.onopenclose.call(notifier, notifier.$notify, 'open')
				})
			}
		})
		this.s.state = 'open'
	},

	close: function(){
		this.$body.removeClass('open_notify')
		if (notifier.transform3d)
			this.$body.css({transform: 'translate3d(0, 0, 0)'})
		else{
			notifier.$notify.slideUp('normal', function(){
				notifier.s.onopenclose.call(notifier, notifier.$notify, 'closed')
			})
		}
		this.s.state = 'closed'
	},

	toggle: function(){
		if (this.s.state.indexOf('closed') != -1)
			this.open()
		else
			this.close()
	},

	getajaxcontent: function(url){
		$.ajax({
			url: url,
			dataType: 'html',
			error:function(ajaxrequest){
				alert('Error fetching content.<br />Server Response: '+ajaxrequest.responseText)
			},
			success:function(content){
				$(document.body).prepend(content)
				notifier.s.noteid = $(content).attr('id')
				notifier.setupnotifier()
			}
		})
	},

	setcookie: function(name, action){
		if (action == 'get'){
			var re=new RegExp(name+"=[^;]+", "i") //construct RE to search for target name/value pair
			if (document.cookie.match(re)) //if cookie found
				return document.cookie.match(re)[0].split("=")[1] //return its value
			return null
		}
		else{
			document.cookie = name + "=" + action + "; path=/"
		}
	},

	setupnotifier: function(){
		this.transform3d = typeof $(document.documentElement).css('perspective') != "undefined" // test for support for 3D transform
		this.$body = $(document.body)
		this.$doccontent=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
		this.$notify = $('#' + this.s.noteid).prependTo(document.body)
		var panelinitialstate = 'closed'
		var noteheight = this.$notify.outerHeight()
		var bodymargin = parseInt( this.$body.css('marginTop') )
		this.measures = {
			bodymargin: bodymargin,
			noteheight: parseInt( noteheight ),
			verticaldist: noteheight + bodymargin
		}
		if (notifier.transform3d){
			this.$notify.css({transform: 'translate3d(0, ' + -this.measures.verticaldist +'px, 0)'})
				.on('transitionend webkitTransitionEnd', function(e){
					if (/transform/i.test(e.originalEvent.propertyName)){ // check event fired on "transform" prop
						if (notifier.s.state.indexOf('initial') == -1){
							notifier.s.onopenclose.call(notifier, notifier.$notify, notifier.s.state)
						}
					}
				})
		}
		else{
			this.$notify.addClass('notransform').hide().css({position:'relative', visibility:'visible'})
		}
		if (this.s.freq == 'session'){
			var openedonce = this.setcookie('notifyopened', 'get')
			if (!openedonce){
				this.open()
				panelinitialstate = 'open'
			}
			this.setcookie('notifyopened', 1)
		}
		else if (this.s.defaultstate == 'open'){
			this.open()
			panelinitialstate = 'open'
		}
		this.$notify.find('.close').on('click', function(e){
			notifier.close()
			e.stopPropagation()
		})
		this.s.oninit.call(this, notifier.$notify, panelinitialstate)
	},

	init: function(options){
		this.s = $.extend({}, this.defaults, options)
		if (this.s.content == 'inline'){
			this.setupnotifier()
		}
		else{ // ajax content assumed
			this.getajaxcontent(this.s.content)
		}
	}

}