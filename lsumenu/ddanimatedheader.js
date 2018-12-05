var fixedheadermenu = (function($){

	var mql = window.matchMedia("screen and (max-width: 860px)") // specify media break point where top menu turns into mobile accordion menu 

	var $root = $(document.documentElement)
	var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null
	var touchorhover = (ismobile)? 'touchstart' : 'mouseenter'
	var touchorclick = (ismobile)? 'touchstart' : 'click'
	var scrolltimer, resizetimer
	var menuzindex = 100
	var containerszindex = 100
	var KEYCODE_ESC = 27

	var $ddfixedheader, $mainulmenu, $mainulmenusubuls, $mainulmenuheaders = $()
	var $hamburgertoggler
	var $ddsearchcontainer, $searchfield, $searchlabel	
	var $ddmobilemenucontainer, $ddmobilemenu, $ddmobilemenusubuls, $prevopenheader = null
	var accordionheaderarrow = '<span class="accordionarrow"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>' // specify full HTML that renders "right" arrow inside accordion menu headers

	var mainfunc = {

		getmeasures: function(){
			$mainulmenuheaders.each(function(i){
				var $header = $(this)
				var $subul = $header.data('$subul')
				$header.data('measures', {text: $header.find('a:eq(0)').text(), offsetx: $header.offset().left, width: $header.outerWidth(), subwidth: $subul.outerWidth()})
			})			
		},
	
		init:function(){
			$ddfixedheader = $('#ddfixedheader')
			$mainulmenu =  $('#ddmainulmenu')
			$mainulmenusubuls = $mainulmenu.find('ul')
			$hamburgertoggler = $('#hamburgertoggler')
			$ddmobilemenucontainer = $('<div id="ddmobilemenucontainer" />').appendTo(document.body)
			$ddmobilemenu = $mainulmenu.clone().appendTo( $ddmobilemenucontainer )
	
			$ddsearchcontainer = $('#ddsearchcontainer')
			$searchfield = $('#search-terms')
			$searchlabel = $('#search-label')		


			$(window).on('scroll', function(){ /* collapse and expand fixed header */
				clearTimeout(scrolltimer)
				scrolltimer = setTimeout(function(){
					var scrollTop = $(this).scrollTop()
					if ( scrollTop === 0 && $root.hasClass('collapseheader') ){
						$root.removeClass('collapseheader')
					}
					else if ( !$root.hasClass('collapseheader') ){
						$root.addClass('collapseheader')
					}
				}, 20)
			})

			$mainulmenusubuls.each(function(i){ /* Loop through main menu UL and assign drop down and click behavior */
				var $subul = $(this)
				var $header = $subul.parent()
				$header.data('$subul', $subul)
				$mainulmenuheaders = $mainulmenuheaders.add( $header )
				var $headerA = $header.find('a:eq(0)')
				$header.data('measures', {offsetx: $header.offset().left, width: $header.outerWidth(), subwidth: $subul.outerWidth()})
				$header.on(touchorhover, function(e){
					var $header = $(this)
					$subul.css('zIndex', menuzindex++)
					var measures = $header.data('measures')
					if ( measures.offsetx + measures.subwidth > $(window).width() ){
						$subul.css('left', -measures.subwidth + measures.width)
					}
					else{
						$subul.css('left', 0)
					}
				})
				$headerA.on('click', function(e){
					e.preventDefault()
				})
			})
			
			$(window).on('resize', function(){ /* recalculate main UL menu dimensions and offsets */
				clearTimeout(resizetimer)
				resizetimer = setTimeout(function(){
					mainfunc.getmeasures()
				}, 50)
			})

			$hamburgertoggler.on(touchorclick, function(e){ /* toggle mobile menu visibility */
				$ddmobilemenucontainer.css('top', $ddfixedheader.outerHeight() + 'px')
			  $root.toggleClass('openddmobilemenu') // add or remove 'openddmobilemenu' to root element
			  if ($root.hasClass('openddmobilemenu')){ // if showing mobile menu
					$ddmobilemenucontainer.css('zIndex', containerszindex++)
			  }
				e.stopPropagation()
			})

			$ddmobilemenucontainer.on('touchstart', function(e){
				e.stopPropagation()
			})

			$ddmobilemenucontainer.on('click', function(e){ /* dismiss mobile menu container when clicked on */
				$root.removeClass('openddmobilemenu')
				e.stopPropagation()
			})

			$ddmobilemenu = $ddmobilemenucontainer.find('>ul')
			$ddmobilemenusubuls = $ddmobilemenu.find('ul')
			
			$ddmobilemenu.on('click', function(e){ /* collapse accordion menu when clicked on */
				$ddmobilemenusubuls.css('display', 'none')
				$prevopenheader.removeClass('active')
			})
			
			$ddmobilemenusubuls.each(function(e){ /* assign click behavior to accordion menu headers */
				var $subul = $(this)
				var $headerA = $subul.parent().find('a:eq(0)')
				$headerA.data('$subul', $subul).addClass('header')
				$headerA.append(accordionheaderarrow)
				$headerA.on(touchorclick, function(e){
					var $header = $(this)
					var laststate = $subul.css('display')
					if ($prevopenheader && ($prevopenheader.get(0) != $header.get(0))){
						$prevopenheader.removeClass('active')
						$prevopenheader.data('$subul').slideUp()
					}
					$subul.slideToggle()
					if (laststate == 'none'){ // if opening current header
						$header.addClass('active')
						$prevopenheader = $header
					}
					else{
						$header.removeClass('active')
					}
					e.stopPropagation()
					e.preventDefault()
				})
			}) // end each()

			$searchlabel.on(touchorclick, function(e){ // when user clicks on search label
					$ddsearchcontainer.css('top', $ddfixedheader.outerHeight() + 'px')
			    $root.toggleClass('opensearch') // add or remove 'opensearch' to searchcontainer
			    if (!$root.hasClass('opensearch')){ // if hiding searchcontainer
			        $searchfield.blur() // blur search field
			    }
					else{
							$ddsearchcontainer.css('zIndex', containerszindex++)
							$root.removeClass('openfullscreenmenu')
			        $searchfield.focus() // focus search field
					}
					e.preventDefault() // prevent default label behavior of focusing on search field again
			    e.stopPropagation() // stop event from bubbling upwards
			})
			 
			$searchfield.on(touchorclick, function(e){ // when user clicks on search field
			    e.stopPropagation() // stop event from bubbling upwards
			})

			$(document).on(touchorclick + ' keyup', function(e){ // when user clicks anywhere in document or presses esc key
					if (e.type != 'keyup' || e.keyCode == KEYCODE_ESC){
				    $root.removeClass('openddmobilemenu')
				    $root.removeClass('opensearch')
				    $searchfield.blur()
					}
			})

			mql.addListener(function(mql){
				if (mql.matches){ // if media query matches

				}
 				else{
  				$root.removeClass('openddmobilemenu')					
				}
			})
			
		}

	}

	return mainfunc

})(jQuery)