$(document).ready(function() {
  
  $('.btn').click(function() {
    location.reload(true);
}); //reload page
  
	var counter = 0;
  // Start the changing images
  setInterval(function() {
  	if(counter == 5) { //count of img
  		counter = 0; 
      //unlock to show content ↓
      
  		// $('.loader').addClass('disable');
  		// $('main').addClass('show-content');
  	}
    
  	changeImage(counter);
  	counter++;
  }, 300); //speed of changing img
  // Set the percentage off
  loading();
});

function changeImage(counter) {
	var images = [
	'<img src="https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-1.jpg">',
	'<img src="https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-3.jpg">',
	'<img src="https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-4.jpg">',
	'<img src="https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-5.jpg">',
	'<img src="https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-6.jpg">'
	// '<img src="img/photos/13.jpg">',
	// '<img src="img/photos/5.jpg">',
  //and so on
	];

	$(".loader .image").html(""+ images[counter] +"");
}

function loading(){
	var num = 0;
	for(i=0; i<=100; i++) {
		setTimeout(function() { 
			$('.loader span').html(num+'%');

			if(num == 100) {
  				$('.loader').addClass('disable');
  				$('main').addClass('active');
  				loading();
  			}
  			num++;
  		},i*84); //speed of percentages
	};

}
