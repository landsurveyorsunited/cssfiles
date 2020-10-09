(function(){
  
  'use-strict';
  
    // Init app
    $('.container').css({
      'max-width':'417px',
      height:'480px'			
    });
    $('.device-front').css({
      'max-width':'320px',
      height:'480px'			
    });
  
  
  // Iphone
  $('.iphone').on('click',function(){
    $('.container').animate({
      'max-width':'417px',
      height:'480px'			
    },1000);
    $('.device-front').animate({
      'max-width':'320px',
      height:'480px'			
    },1000);
  });
  
  // Tablet
  $('.tablet').on('click',function(){
    $('.container').animate({
      'max-width':'861px',
      height:'1024px'			
    },1000);
    $('.device-front').animate({
      'max-width':'768px',
      height:'1024px'		
    },1000);
  });
  
  // Laptop
  $('.laptop').on('click',function(){
    $('.container').animate({
      'max-width':'1297px',
      height:'800px'			
    },1000);
    $('.device-front').animate({
      'max-width':'1200px',
      height:'800px'			
    },1000);
  });
  
  // Desktop
  $('.desktop').on('click',function(){
    $('.container').animate({
      'max-width':'1497px',
      height:'800px'			
    },1000);
    $('.device-front').animate({
      'max-width':'1400px',
      height:'800px'			
    },1000);
  });
  
  // Change Url
  $('#goTo').on('click',function(){
    $(this).text('Loading..');
    setTimeout(function(){
      $('#goTo').text('Go to other');
    }, 2000);
    $('.device-front').attr('src',$('#site').val());
    return false;
  });
}).call(this);