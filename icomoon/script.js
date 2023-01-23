// Script should follow markup above
// CSS classList pollyfill: https://github.com/remy/polyfills/blob/6e87470526c496c0fc53fa87ed5a825eff61f1f3/classList.js
;(function () {

if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

var prototype = Array.prototype,
    push = prototype.push,
    splice = prototype.splice,
    join = prototype.join;

function DOMTokenList(el) {
  this.el = el;
  // The className needs to be trimmed and split on whitespace
  // to retrieve a list of classes.
  var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
  for (var x = 0; x < classes.length; x++) {
    push.call(this, classes[x]);
  }
};

DOMTokenList.prototype = {
  add: function(token) {
    if(this.contains(token)) return;
    push.call(this, token);
    this.el.className = this.toString();
  },
  contains: function(token) {
    return this.el.className.indexOf(token) != -1;
  },
  item: function(index) {
    return this[index] || null;
  },
  remove: function(token) {
    if (!this.contains(token)) return;
    for (var x = 0; x < this.length; x++) {
      if (this[x] == token) break;
    }
    splice.call(this, i, 1);
    this.el.className = this.toString();
  },
  toString: function() {
    return join.call(this, ' ');
  },
  toggle: function(token) {
    if (!this.contains(token)) {
      this.add(token);
    } else {
      this.remove(token);
    }

    return this.contains(token);
  }
};

window.DOMTokenList = DOMTokenList;

function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
        Object.defineProperty(obj, prop,{
            get : getter
        });
    } else {
        obj.__defineGetter__(prop, getter);
    }
}

defineElementGetter(Element.prototype, 'classList', function () {
  return new DOMTokenList(this);
});

})();

// Main Expand Search code

;(function(){
	var searchform = document.getElementById('search')
	var searchfield = document.getElementById('search-terms')
	var searchlabel = document.getElementById('search-label')
	var focustimer
	
	var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null
	var touchorclick = (ismobile)? 'touchstart' : 'click'
	 
	searchlabel.addEventListener(touchorclick, function(e){ // when user clicks on search label
			clearTimeout(focustimer)
	    searchform.classList.toggle('opensearch') // add or remove 'opensearch' to searchcontainer
	    if (!searchform.classList.contains('opensearch')){ // if hiding searchform
	        searchfield.blur() // blur search field
	    }
			else{
				focustimer = setTimeout(function(){
					searchfield.focus() // focus search field
				}, 500)
			}
			e.preventDefault() // disable default label action
	    e.stopPropagation() // stop event from bubbling upwards
	}, false)
	 
	searchfield.addEventListener(touchorclick, function(e){ // when user clicks on search field
	    e.stopPropagation() // stop event from bubbling upwards
	}, false)
	 
	document.addEventListener(touchorclick, function(e){ // when user clicks anywhere in document
	    searchform.classList.remove('opensearch')
	    searchfield.blur()
	}, false)
})();

