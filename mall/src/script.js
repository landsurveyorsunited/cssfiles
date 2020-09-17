var animate = function(cb){
  $('.grid').addClass('closed');
  setTimeout(function(){
    $('.grid').removeClass('closed');
  }, 3000);
  setTimeout(cb, 2000);
};
$('.pannel button, .floor button').click(function(){
  var floor = parseInt($(this).text()); 
  if(isNaN(floor)) floor = 0;
  animate(function(){
    $('#elevator').css({top: (-100 * floor )+'%'});
  });
});