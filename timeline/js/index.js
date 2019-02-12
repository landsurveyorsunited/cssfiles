$('#timeline-dates').slick({
	slidesToShow: 5,
  slidesToScroll: 1,
	infinite:false,
	initialSlide:2,
	asNavFor: '#timeline-details',
	centerMode:true,
	focusOnSelect: true,
	responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide:1
      }
    }
  ]
});
$('#timeline-details').slick({
	slidesToShow: 1,
  slidesToScroll: 1,
	initialSlide:2,
	infinite:false,
  arrows: false,
  fade: true,
  asNavFor: '#timeline-dates',
	responsive: [
    {
      breakpoint: 480,
      settings: {
        initialSlide:1
      }
    }
  ]
});

$('.timeline-title').arctext({radius:2400});