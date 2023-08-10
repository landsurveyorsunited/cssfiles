$('.hamb-wrap').on('click', function(){
  $(this).parent().children('p').toggle();
  $(this).children().toggleClass('active');
  $('nav').fadeToggle(200);
})