/*** Timeline Carousel ***/
$('.desktop-owl.timeline').owlCarousel({
    loop: false,
    pagination: true,
    paginationNumbers: false,
    nav:true,
    center:false,
    margin:10,
    responsive:{
      0:{
        items:1
      },
      550: {
        items:2
      },
      900:{
        items:3
      },
      1000:{
        items:5
      }
    }
  });
  
  function matchTimelineHeight() {
    /* Add in the height placeholders for the images first */
    var imageHeights = [];
    $('.timeline-container .owl-carousel .owl-item img').each(function() {
      imageHeights.push($(this).height());
    });
    var tallest = Math.max.apply(null, imageHeights);
    $('.timeline-container .owl-carousel .owl-item .timeline-image').css("min-height", tallest);
  
    /* Now match heights with the placeholders added */
    var slideHeights = [];
    $('.timeline-container .owl-carousel .owl-item').each(function() {
      slideHeights.push($(this).height());
    });
    var tallest = Math.max.apply(null, slideHeights);
    $('.timeline-container .owl-carousel .owl-item').height(tallest);
    $('.timeline-container .owl-carousel .timeline-slide').css("min-height", tallest);
  }
matchTimelineHeight();
  
  /*** Newsfeed ***/
  $('.desktop-owl').owlCarousel({
    loop: true,
    pagination: true,
    paginationNumbers: false,
    nav:true,
    center: false,
    responsive:{
      0:{
        items:1
      }
    }
  });