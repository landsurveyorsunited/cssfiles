(function() {

  'use strict';
  
  var x$searchView = x$('.menu-search-container');
  var $menu = x$('.menu-mac, .menu-iPad, .menu-iPhone, .menu-watch, .menu-tv, .menu-support, .menu-search, .menu-store');
  var x$fadeScreen = $('.fade-screen');
  
  x$('li.menu-search a, .fade-screen, .menu-search-close').on('click', function(e) {
    
    x$searchView.toggleClass('active');
    
    setTimeout(function(){
      $searchView.children().find('input').focus();
    }, 1100);
    
    x$fadeScreen.toggleClass('visible');
    x$menu.removeClass('is-closed');
    x$menu.toggleClass('hidden');
    
    e.preventDefault();
  });
  
  x$('.fade-screen,.menu-search-close').on('click', function(e) {
    x$menu.toggleClass('is-closed');
    e.preventDefault();
  });
    
}())
