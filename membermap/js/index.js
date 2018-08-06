


// INTERFACE ----------------------------------

// Primary Button

$('#one').click(function(){
  $('#one.one').addClass('active');
  $('.stage').addClass('display');
  $('#close').addClass('showme');
  $('#close').css({'display':'inline-block'});
});

// UI Reset (click on background)

//('body').click(function(){
// if($('body #one.active').length) $('body #one.active').removeClass('active');
//});

// UI Buttons

//$('figcaption').click(function(){
//  $('.description').toggleClass('showme');
//});

$('figcaption').on('click', function(e) {
    e.preventDefault();
    $('figure.show .description').toggleClass('showme');
});

$('#close').on('click', function(e) {
    e.preventDefault();
    $('#one.one').removeClass('active');
    $('.stage').removeClass('display');
    $('#close').removeClass('showme');
    $('#close').css({'display':'none'});
});

$('#button1').click(
    function(){
        $('#myEltId span').css({
            'border-width' : '0',
            'border-style' : 'none',
            'border-color' : 'transparent'
        });
    });

$('#fullscreen').click(function(){
  $('#one').toggleClass('fullscreen');
});

$("li").bind('click', function(){
   // remove the active class if it's there
   if($("li.active").length) $("li.active").removeClass('active');
   // add the active class to the clicked element
   $(this).addClass('active');
}); 

  

// FONT ----------------------------------

// headline fontsize reset (add set on width - use .live()

//$(".spinner h1").css({
//    fontSize: 20
//}); 
//
//$(".spinner h1").animate({'font-size':width.perc+'%'});

// SLIDESHOW ----------------------------------

var counter = 0, // to keep track of current slide
    $items = $('#one .diy-slideshow figure'), // a collection of all of the slides, caching for performance  
    numItems = $items.length; // total number of slides

// this function is what cycles the slides, showing the next or previous slide and hiding all the others
var showCurrent = function(){
    var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
   
  $items.removeClass('show'); // remove .show from whichever element currently has it
  $items.eq(itemToShow).addClass('show');    
};

// add click events to prev & next buttons 
$('.next').on('click', function(){
    counter++;
    showCurrent(); 
});
$('.prev').on('click', function(){
    counter--;
    showCurrent(); 
});

// if touch events are supported then add swipe interactions using TouchSwipe https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
if('ontouchstart' in window){
  $('.diy-slideshow').swipe({
    swipeLeft:function() {
      counter++;
      showCurrent(); 
    },
    swipeRight:function() {
      counter--;
      showCurrent(); 
    }
  });
}