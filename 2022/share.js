x$(document).ready(function(){
// sharingContainer-page
if (ning.CurrentProfile === null){
x$('body').addClass('visitor');
}else {
x$('body').addClass('isMember');
}
const sharingWrapperContainer = x$('<div class="sharingOverlay"><div class="sharingWrapper-container"><div class="sharingWrapper-inner"><section class="sharingContainer-Part1"><header class="sharingHeader"><h1 class="sharingTitle">Sharing</h1></header><div class="sharingStart-container"><h3 class="sharingPage-title"></h3><span class="sharingLink"></span><div class="saySomething-div"><h3>Say Something About This ?</h3><textarea class="saySomething" placeholder="You can add a short message about the post here..."></textarea></div><footer class="sharingStart-footer sharingFooter"><div class="sharing-footerButtons"><button class="shareCancel sharingButtons" title="Cancel">Cancel</button><button class="shareThis-button sharingButtons" title="Share This">Share</button></footer></section><section class="sharingFinish"><h1 class="finishTitle">Sharing Complete</h1><footer class="sharingComplete-footer sharingFooter"><div class="sharing-footerButtons"><button class="sharingFinish-close sharingButtons" title="Finish Sharing">Finish</button></div></section></div></div>').prependTo('body').hide();
let shareContainerActual = x$('.module-name:contains("sharingContainer-page")').closest('.section-activity').addClass('sharingContainer-Actual').hide();//this is the actual activity section
let hasSharing = x$('.sharingContainer-Actual').closest('body').addClass('sharingAvailable'); // if an activity has been added to a page for sharing
let shareActivitySection = x$('.sharingContainer-Actual .feed-story, .sharingContainer-Actual .activityFeed-updateButton,.sharingContainer-Actual .activityFeed-moreOldItemsButton').hide();
let attachActivity = x$('.sharingContainer-Actual').appendTo('.sharingActivity-container');
let shareOptions = x$('<div class="shareTools"><a class="shareTools-share" title="Share Post" href="#/" >Share This<span>&#8634</span></a><a class="shareTools-share-group" title="Share Group" href="#/" >Share Group<span>&#8634</span></a></div>').insertBefore('.discussionDetailPage-mainSection .entry-headline, .videoDetailPage .entry-headline, .photoDetailPage .entry-headline, .articleDetailPage .entry-headline, .blogDetailPage .entry-headline, .eventDetailPage .entry-headline,.pollDetailPage .entry-headline, .groupHub-groupTitleContainer').hide();
x$('body.visitor .shareTools').remove();
x$('.sharingLink').hide();
x$('.sharingAvailable .shareTools').show();
x$('.sharingAvailable .shareTools-share-group ').hide();
x$('.sharingAvailable .groupHub-group .shareTools-share').hide();
x$('.sharingAvailable .groupHub-group .shareTools-share-group').show();
x$('.sharingFinish').hide();
// Share Button
x$('.shareTools-share').click(function(){
x$(this).closest('.section-primaryContent').addClass('isSharing');
var PostsUrl = window.location.href;
x$('.sharingLink').append(PostsUrl);
x$('.isSharing .entry-title').clone().appendTo('.sharingPage-title');
x$('.sharingOverlay').addClass('active');
  });
//Share Group Button
x$('.shareTools-share-group').click(function(){
x$('.groupHub-group').removeClass('sharingGroup');
var GroupUrl=x$(this).closest('a.matrix-media-1-1').attr('href');
x$(this).closest('.groupHub-group').addClass('sharingGroup');
x$('.sharingGroup .groupHub-groupTitle').clone().appendTo('.sharingPage-title');
x$('.sharingLink').append(GroupUrl);
x$('.sharingOverlay').addClass('active');
  });
// Share Cancel Button
x$('.shareCancel').click(function(){
x$('.sharingOverlay').removeClass('active');
x$('.section-primaryContent').removeClass('isSharing');
  });
// Share This Button
x$('.shareThis-button ').click(function(){
var sharingValue = x$('.sharingLink').text();
var sharingAddTitle =x$('.isSharing .entry-title').text().toUpperCase();
var saySomethingTxt = x$('.saySomething').val();
x$('.js-statusForm .input-full').append(sharingValue +"&#10;&#13;"+ sharingAddTitle +"&#10"+ saySomethingTxt);
x$('.js-statusForm .button-primary').trigger('click');
x$('.sharingContainer-Part1').hide();
x$('.sharingFinish').show();
  });
// Share Finish Button
x$('.sharingFinish-close').click(function(){
x$('.sharingLink, .sharingPage-title').text('');
x$('.sharingWrapper-container').removeClass('active');
x$('.sharingAvailable .shareTools, .sharingAvailable .shareTools-share-group').hide();
x$('.sharingOverlay').removeClass('active');
x$('.section-primaryContent').removeClass('isSharing');
  });
});
