x$(function() {
    var images = ['https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-2.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-1.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-3.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-4.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-5.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-6.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-7.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-8.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-9.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-10.jpg', 'https://landsurveyorsunited.github.io/cssfiles/2pane/img/img-11.jpg'];
    x$('#background').css({'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'});
   });
