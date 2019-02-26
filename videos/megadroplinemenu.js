/*
	Mega Drop Line Menu v1.0
	Project URL: http://dynamicdrive.com/dynamicindex1/megadroplinemenu/
*/

(function(){

	var megadropline = document.getElementById('megadroplinemenu')
	var megatopul = megadropline.getElementsByTagName('ul')[0];
	var searchtoggler = document.getElementById('searchtoggler')
	if (searchtoggler){
		var searchfield = searchtoggler.getElementsByTagName('input')[0]
	}
	var burgertoggler = document.getElementById('burgertoggler')
	var subuls = megadropline.getElementsByTagName('ul')

  var isTouch = false //var to indicate current input type (is touch versus no touch) 
  var isTouchTimer 
  var curRootClass = '' //var indicating current document root class ("can-touch" or "")

	for (var i=0; i<subuls.length; i++){
		var parentA = subuls[i].parentNode.getElementsByTagName('a')[0]
		parentA.addEventListener('click', function(e){
			if (curRootClass == 'can-touch'){ // if user touches menu item with sub UL, disable default action to navigate to link
				e.preventDefault()
			}
		}, false)
	}

	if (searchtoggler && searchfield){
		searchtoggler.addEventListener('click', function(e){ //when user clicks on search icon
			searchfield.focus()
		}, false)
	}

	burgertoggler.addEventListener('click', function(e){
		megadropline.classList.toggle('open') // open mobile centric menu
		this.classList.toggle('open')
	}, false)

/* Code to detect touch support: http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml */
   
  function addtouchclass(e){
      clearTimeout(isTouchTimer)
      isTouch = true
      if (curRootClass != 'can-touch'){ //add "can-touch' class if it's not already present
          curRootClass = 'can-touch'
          document.documentElement.classList.add(curRootClass)
      }
      isTouchTimer = setTimeout(function(){isTouch = false}, 500) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
  }
   
  function removetouchclass(e){
      if (!isTouch && curRootClass == 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present
          isTouch = false
          curRootClass = ''
          document.documentElement.classList.remove('can-touch')
      }
  }
   
  document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
  document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
	
})()