

x$('.tabContainerSection-pane.section-channel ').addClass('otherpanes');
x$('.tabContainerSection-pane.section-channel:first').removeClass('otherpanes');
x$(".tabContainerSection-pane.section-channel.otherpanes .matrix-itemFluid.matrix-itemFrame.feedListPage-item").click(function(){
x$(".tabContainerSection-pane.section-channel:first").show();
x$('.tabContainerSection-pane.section-channel:first .matrix.row').hide();
x$('.tabContainerSection-pane.section-channel:first .module-footer').hide();
x$(".tabContainerSection-pane.section-channel").parents().find('li.tabContainerSection-tab:nth-child(1)').addClass('navtabOne');
x$("li.tabContainerSection-tab:nth-child(1).navtabOne").click(function(){
x$(".tabContainerSection-pane.section-channel:first .matrix.row ").show();
x$('.tabContainerSection-pane.section-channel:first .module-footer').show();
});
});



x$('<div/>',{ class : 'photoDisplayClose'}).prependTo('body').hide();
x$('<a class="photoDisplayCloser">X</a>').appendTo('.photoDisplayClose');



// closes the photo display
x$('a.photoDisplayCloser').click(function(){
x$('.photoDisplayOne, .photoDisplayClose').hide();
x$(document.body).css({'overflow':'visible' })
});



x$(document).ready(function(){
x$('<a href="javascript: history.go(-1)" class="activityPhotoDisplayback">Go Back</a>').prependTo('.photoListPage').hide();
});



x$(document).ready(function(){
x$("<div></div>").attr('id','loading').prependTo('.central-content').hide();
x$('<div/>',{ class : 'photoDisplayOne'}).prependTo('.central-content').hide();
x$('<div/>',{ class : 'photoDisplayOneContent'}).appendTo('.photoDisplayOne');
x$("<iframe></iframe>",{ class : 'activityPhotoOne'}).appendTo(".photoDisplayOneContent");
});



x$(document).ready(function(){
     x$('body').on('click','a.activityFeed-image, .feedEvent-createPhotoRollup .activityFeed-content a.media-img, .feedEvent-createPhotoLike .activityFeed-content a.media-img, .feedEvent-createPhotoComment .activityFeed-content a.media-img', function(e){
        e.preventDefault();
x$("#loading").show();  
        x$(".photoDisplayOneContent iframe:nth-child(1)").attr("src", x$(this).attr("href"));
x$(document.body).css({ 'cursor': 'wait' });
x$(".photoDisplayOneContent iframe").load(function (){
x$('.photoDisplayOneContent iframe').contents().find("head").append(x$("<style type='text/css'>  .content-name{font-size:22px;} .content-header{display:none;} .photoDetailPage-moreEntries{display:none;} .site-headerFrame{display:none} .site-footerFrame{display:none} .ningbar{display:none} .banner-frame{display:none} .site-bodyFrame{padding-left:0px} .site-body{padding:0px} .photoDisplayClose{display:none} .content-body{padding:10px} .activityPhotoDisplayback{display:block!important} .entry-headline a:hover{cursor:default} a.avatar-frame.media-img:hover{cursor:default} .comments-metadata a:hover{cursor:default} .entry-tags a{cursor:default} .adjacentEntryLink{display:none}  .column-narrow{display:none}</style>"));
x$('.photoDisplayOne').show();
x$(document.body).css({ 'cursor': 'default','overflow':'hidden' });
x$("#loading").hide();
x$('.photoDisplayClose').show();
});
});
});



x$(document).ready(function(){
x$( " .blogListPage .entry-tags > a" ).clone().appendTo(".tagsList");
x$('.tagsList').closest('.section-html').addClass('tagslistbox');
});



//SCROLL UP THE PHOTO TO HEADLINE
    x$('html, body').animate({
        scrollTop: x$("div.photoDetailPage .entry-headline").offset().top
    }, 800);



x$(document).ready(function(){
x$("<div></div>").attr('id','overlayLight').prependTo('.central-content').hide();
});



x$("<div></div>").attr('class','slideshowControls').prependTo('.photoListPage .module-header ');
x$("<div></div>").attr('class','slideshowControls').appendTo('.photoListPage .matrix.row');
x$(".slideshowControls").append('<a class="slideshowstart" title="Start Slideshow">Start Slideshow</a><a class="Stopslideshow" title="Pause Slideshow">Pause</a><a class="ReStartslideshow" title="Play Slideshow">Play</a><a class="fullslideshow" title="Full Screen Slideshow">Full Screen</a><a class="exitslideshow" title="Exit Slideshow">Exit</a>');
x$(".slideshowControls a").css('cursor','pointer');
x$('a.exitslideshow').click(function(){
x$('.photoListPage').removeClass('photoshower2');
x$('.site-bodyFrame,this').removeClass('photoview');
x$('.matrix-itemFluid.photoListPage-entry').removeClass('fullscreenslides');
x$("#overlay").slideUp(200);
x$('.photoListPage-entry').show();
x$('.SP_Photo_Title').hide();
});



x$('a.slideshowstart').click(function(){
x$('.site-bodyFrame,this').addClass('photoview');
x$("#overlay").show();
x$('.SP_Photo_Title').show();
x$('.photoListPage').addClass('photoshower2');
var myIndex = 0;
var timer;
carousel();
function carousel() {  
var i;
    var x = x$('.photoshower2 .matrix-itemFluid.photoListPage-entry');
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";
timer = setTimeout(carousel, 3000);
}
x$('.matrix-itemFluid.photoListPage-entry, a.exitslideshow, a.Stopslideshow').click(function(event){
    clearTimeout(timer);
x$('a.ReStartslideshow').click(function(event){
x$(this).resumeTimer = setTimeout(carousel, 3000).resume();
      });   
   });
});



x$('a.ReStartslideshow').hide();
x$('a.Stopslideshow').click(function(){
x$(this).hide();
x$('a.ReStartslideshow').show().css('display','inline-block');
});



x$('a.ReStartslideshow').click(function(){
x$(this).hide();
x$('a.Stopslideshow').show().css('display','inline-block');
});



x$('a.fullslideshow').click(function(){
x$('.photoshower2 .matrix-itemFluid.photoListPage-entry').toggleClass('fullscreenslides');
});



x$('a.fullslideshow').toggle(
function(){
x$(this).addClass('fullscreenmode');
x$(this).text('X');
x$('a.Stopslideshow').addClass('fullscreenmode').text('II');
x$('a.ReStartslideshow').addClass('fullscreenmode').text('V');
},
function(){
x$(this).removeClass('fullscreenmode');
x$(this).text('Full Screen');
x$('a.Stopslideshow').removeClass('fullscreenmode').text('Pause');
x$('a.ReStartslideshow').removeClass('fullscreenmode').text('Play');
});



x$(document).ready(function() {
x$('a.slideshowstart').click(function(){
x$('DIV.matrix-media-4-3').each(function() {
  var GCmatrix = x$(this).css('background-image');
  x$(this).css('background-image', GCmatrix.replace(/\?width=\d+/, ''));
});
});
});



x$('.feedListPagePlayer .nav').click(function(){
x$(".matrix-itemFrame").removeClass('videoActive');
  var _c = x$(this);
  var id = _c.data("itemId");
  var _e = _c.data("itemSource");
 x$(".matrix-itemFrame[data-item-id='" + id + "'][data-item-source='" + _e + "']").addClass('videoActive');
x$('.matrix-itemFluid.matrix-itemFrame.feedListPage-item.videoActive').first().focus();
   });



x$(".matrix-itemFluid.matrix-itemFrame.feedListPage-item").click(function(){
x$(".matrix-itemFluid.matrix-itemFrame.feedListPage-item").removeClass('videoActive');
x$(this).addClass('videoActive');
});



x$("<div></div>").attr('class','videolistControl').prependTo('.sourceContainer');
x$("<div></div>").attr('class','videolist').appendTo('.videolistControl');
x$( ".feedListPage .module-body" ).clone(true).appendTo('.videolist');
x$('.videolist').hide();



x$(".videolistControl").click(function(){
x$('.videolist').slideToggle(300);
x$(this).toggleClass('close');
});



x$('a.closer.pull-right.feedListPagePlayer-close').click(function(){
x$(".videolistControl").removeClass('close');
x$('.videolist').hide();
});



x$(document).ready(function(){
x$("<div></div>").attr('id','overlayLight').prependTo('.central-content').hide();
});



x$("<div></div>").attr('class','slideshowControls').prependTo('.photoListPage .module-header ');
x$("<div></div>").attr('class','slideshowControls').appendTo('.photoListPage .matrix.row');
x$(".slideshowControls").append('<a class="slideshowstart" title="Start Slideshow">Start Slideshow</a><a class="Stopslideshow" title="Pause Slideshow">Pause</a><a class="ReStartslideshow" title="Play Slideshow">Play</a><a class="fullslideshow" title="Full Screen Slideshow">Full Screen</a><a class="exitslideshow" title="Exit Slideshow">Exit</a>');
x$(".slideshowControls a").css('cursor','pointer');
x$('a.exitslideshow').click(function(){
x$('.photoListPage').removeClass('photoshower2');
x$('.site-headerFrame,this').removeClass('photoview');
x$('.site-bodyFrame,this').removeClass('photoview');
x$('.matrix-itemFluid.photoListPage-entry').removeClass('fullscreenslides');
x$("#overlayLight").slideUp(200);
x$('.photoListPage-entry').show();
x$('.SP_Photo_Title').hide();
});



x$('a.slideshowstart').click(function(){
x$('.site-headerFrame,this').addClass('photoview');
x$('.site-bodyFrame,this').addClass('photoview');
x$("#overlayLight").show();
x$('.SP_Photo_Title').show();
x$('.photoListPage').addClass('photoshower2');
var myIndex = 0;
var timer;
carousel();
function carousel() {  
var i;
    var x = x$('.photoshower2 .matrix-itemFluid.photoListPage-entry');
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";
timer = setTimeout(carousel, 3000);
}
x$('.matrix-itemFluid.photoListPage-entry, a.exitslideshow, a.Stopslideshow').click(function(event){
    clearTimeout(timer);
x$('a.ReStartslideshow').click(function(event){
x$(this).resumeTimer = setTimeout(carousel, 3000).resume();
      });   
   });
});



x$('a.ReStartslideshow').hide();
x$('a.Stopslideshow').click(function(){
x$(this).hide();
x$('a.ReStartslideshow').show().css('display','inline-block');
});



x$('a.ReStartslideshow').click(function(){
x$(this).hide();
x$('a.Stopslideshow').show().css('display','inline-block');
});



x$('a.fullslideshow').click(function(){
x$('.photoshower2 .matrix-itemFluid.photoListPage-entry').toggleClass('fullscreenslides');
});



x$('a.fullslideshow').toggle(
function(){
x$(this).addClass('fullscreenmode');
x$(this).text('X');
x$('a.Stopslideshow').addClass('fullscreenmode').text('II');
x$('a.ReStartslideshow').addClass('fullscreenmode').text('V');
},
function(){
x$(this).removeClass('fullscreenmode');
x$(this).text('Full Screen');
x$('a.Stopslideshow').removeClass('fullscreenmode').text('Pause');
x$('a.ReStartslideshow').removeClass('fullscreenmode').text('Play');
});



x$(document).ready(function() {
x$('a.slideshowstart').click(function(){
x$('DIV.matrix-media-4-3').each(function() {
  var GCmatrix = x$(this).css('background-image');
  x$(this).css('background-image', GCmatrix.replace(/\?width=\d+/, ''));
});
});
});

