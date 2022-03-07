// BY BIZZ 190222 VER1
// Pin by category option
x$(document).ready(function(){
/* Remove catergory from byline*/
if (!x$("body").hasClass("isAdmin")) {
x$('.entry-byline a[href$="pinnedContent"]').remove(); //Remove link from byline for category
}
/* Remove Admin Cat for non admins in category list */
if (!x$("body").hasClass("isAdmin")) {
x$('.categorySelectionList > optgroup:nth-child(1) > option').filter(function(){
return x$.trim(x$(this).text())== 'pinnedContent'}).remove(); // remove pinnedContent cat
}
if (!x$("body").hasClass("isAdmin")) {
x$('.categorySelectionList > option').filter(function(){
return x$.trim(x$(this).text())== 'pinnedContent'}).remove(); // remove pinnedContent cat
}
/* Remove Admin Cat for non admins in mobile select menu */
if (!x$("body").hasClass("isAdmin")) {
x$('select.subnav > option').filter(function(){
return x$.trim(x$(this).text())== 'pinnedContent'}).remove(); // remove pinnedContent cat
}
/* Remove options in nav if NOT admin */
if (!x$("body").hasClass("isAdmin")) {
x$('ul.subnav li a[href$="pinnedContent"]').remove(); // Remove pinnedContent tab from page nav
x$('ul.subnav li:empty').remove(); // Remove the empty list space
}
/* Hide Categories Box if none in it but show the pinned option for admins */
if (x$('.categorySelectionList > optgroup:nth-child(1) > option').length<= 0){
x$('.entryEditPage-categoryContainer').remove();
}
x$('.module-name a[href$="pinnedContent"]').closest('.grid-frame').addClass('pinnedPost-container');
x$('.pinnedPost-container .module-body').closest('.pinnedPost-container').addClass('pinned-hasContent');
x$('.photoDetailPage').closest('.central-content').addClass('is-photoDetailPage');
x$('.videoDetailPage').closest('.central-content').addClass('is-videoDetailPage');
x$('.blogDetailPage').closest('.central-content').addClass('is-blogDetailPage');
x$('.discussionDetailPage').closest('.central-content').addClass('is-forumDetailPage');
x$('.articleDetailPage').closest('.central-content').addClass('is-articleDetailPage');
x$('.eventDetailPage').closest('.central-content').addClass('is-eventDetailPage');
});



//SHARING VER10 CODE JBIZLEY 2022
x$(document).ready(function(){
x$('.discussionDetailPage .entry-content,.articleDetailPage .entry-content, .blogDetailPage .entry-content').each(function() {
if (x$(this).find('img').length <= 0) {
x$(this).closest('body').addClass('sharing-noImage');
} else {
x$(this).closest('body').addClass('sharing-hasImage').removeClass('sharing-noImage');
}
});
x$('.blogDetailPage .blogDetailPage-image').closest('body').addClass('sharing-hasImage');
x$('.articleDetailPage .articleDetailPage-image').closest('body').addClass('sharing-hasImage');
x$('.photoDetailPage').closest('body').addClass('sharePhoto sharing-hasImage');
x$('.videoDetailPage').closest('body').addClass('shareVideo sharing-hasImage');
x$('.eventDetailPage').closest('body').addClass('shareEvent sharing-hasImage');
if (ning.CurrentProfile === null){
x$('body').addClass('visitor');
}else {
x$('body').addClass('isMember');
}
const sharingWrapperContainer = x$('<div class="sharingOverlay"><div class="sharingWrapper-container"><div class="sharingWrapper-inner"><section class="sharingContainer-Part1"><header class="sharingHeader"><h1 class="sharingTitle">Sharing</h1></header><div class="sharingStart-container"><h3 class="sharingPage-title"></h3><span class="sharedTitle"></span><span class="sharingLink"></span><div class="saySomething-div"><h3>Say Something About This ?</h3><textarea class="saySomething" placeholder="You can add a short message about the post here..."></textarea></div><footer class="sharingStart-footer sharingFooter"><div class="sharing-footerButtons"><button class="shareCancel sharingButtons" title="Cancel">Cancel</button><button class="shareThis-button sharingButtons" title="Share This">Share</button></footer></section><section class="sharingFinish"><h1 class="finishTitle">Sharing Complete</h1><footer class="sharingComplete-footer sharingFooter"><div class="sharing-footerButtons"><button class="sharingFinish-close sharingButtons" title="Finish Sharing">Finish</button></div></section></div></div>').prependTo('body').hide();
let shareContainerActual = x$('.module-name:contains("sharingContainer-page")').closest('.section-activity').addClass('sharingContainer-Actual').hide();//this is the actual activity section
let hasSharing = x$('.sharingContainer-Actual').closest('body').addClass('sharingAvailable'); // if an activity has been added to a page for sharing
let shareActivitySection = x$('.sharingContainer-Actual .feed-story, .sharingContainer-Actual .activityFeed-updateButton,.sharingContainer-Actual .activityFeed-moreOldItemsButton').hide();
let attachActivity = x$('.sharingContainer-Actual').appendTo('.sharingActivity-container');
let shareOptions = x$('<div class="shareTools"><a class="shareTools-share" title="Share Post" href="#/" >Share This<span>&#8634</span></a><a class="shareTools-share-group" title="Share Group" href="#/" >Share Group<span>&#8634</span></a></div>').insertBefore('.discussionDetailPage-mainSection .entry-headline, .videoDetailPage .entry-headline, .photoDetailPage .entry-headline, .articleDetailPage .entry-headline, .blogDetailPage .entry-headline, .eventDetailPage .entry-headline,.pollDetailPage .entry-headline, .groupHub-groupTitleContainer').hide();
x$('body.sharing-noImage .sharedTitle').text("Shared Post....");
x$('body.sharing-hasImage .sharedTitle').text("Shared Post.....");
x$('body.sharePhoto.sharing-hasImage .sharedTitle').text("Shared Photo.....");
x$('body.shareVideo.sharing-hasImage .sharedTitle').text("Shared Video.....");
x$('body.shareEvent.sharing-hasImage .sharedTitle').text("Shared Event.....");
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
x$('.sharedTitle').text("Shared Group.....");
});
// Share Cancel Button
x$('.shareCancel').click(function(){
x$('.sharingOverlay').removeClass('active');
x$('.section-primaryContent').removeClass('isSharing');
x$('.shareTools-share').hide();
x$('.sharingGroup .shareTools-share-group').hide();
});
// Share This Button
x$('.shareThis-button ').click(function(){
var sharingPost =x$('.sharedTitle').text();
var sharingValue = x$('.sharingLink').text();
var sharingAddTitle =x$('.isSharing .entry-title').text().toUpperCase();
var saySomethingTxt = x$('.saySomething').val();
x$('.js-statusForm .input-full').append(sharingPost +"\n"+ sharingValue +"\n"+ sharingAddTitle +"\n"+ saySomethingTxt);
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
// Sharing Into Activity Feed
x$('.activityFeed-detailTitle.create_status:contains("Shared Group.....")').closest('.feed-story').addClass('sharedPost-activity shared-Group ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Post.....")').closest('.feed-story').addClass('sharedPost-activity sharedPost-hasImage ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Post...")').closest('.feed-story').addClass('sharedPost-activity sharedPost-noImage');
x$('.activityFeed-detailTitle.create_status:contains("Shared Photo.....")').closest('.feed-story').addClass('sharedPost-activity sharedPhoto sharedPost-hasImage ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Video.....")').closest('.feed-story').addClass('sharedPost-activity sharedVideo sharedPost-hasImage ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Event.....")').closest('.feed-story').addClass('sharedPost-activity sharedEvent sharedPost-hasImage ');
x$('.sharedPost-activity .activityFeed-headline').html(function() {
return x$(this).html().replace("posted a", "is sharing a");
});
x$('.sharedPost-activity.sharedEvent .activityFeed-headline').html(function() {
return x$(this).html().replace("is sharing a", "is sharing an");
});
x$('.sharedPost-activity header:nth-child(1) > a:nth-child(2)').text('post');
x$('.sharedPost-activity.sharedPhoto header:nth-child(1) > a:nth-child(2)').text('photo');
x$('.sharedPost-activity.sharedVideo header:nth-child(1) > a:nth-child(2)').text('video');
x$('.sharedPost-activity.sharedEvent header:nth-child(1) > a:nth-child(2)').text('event');
x$('.shared-Group header:nth-child(1) > a:nth-child(2)').text('group');
x$('.feedEvent-createStatus.shared-Group a.media-img').each(function() {
var url=x$(this).attr('href');
x$(this).load(url + " .groupHeader-image, .groupHeader-groupName");
});
// Sharing Into Activity Feed updating the new items with code on click of the update buttons rather than the code running all the time on the activity feed
x$('.activityFeed-updateButton.activityFeed-moreOldItemsButton, .activityFeed-updateButton.activityFeed-moreNewItemsButton').click(function(){
x$('.activityFeed').ajaxStop(function() {
x$('.activityFeed-detailTitle.create_status:contains("Shared Group.....")').closest('.feed-story').addClass('sharedPost-activity shared-Group ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Post.....")').closest('.feed-story').addClass('sharedPost-activity sharedPost-hasImage ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Post...")').closest('.feed-story').addClass('sharedPost-activity sharedPost-noImage');
x$('.activityFeed-detailTitle.create_status:contains("Shared Photo.....")').closest('.feed-story').addClass('sharedPost-activity sharedPhoto sharedPost-hasImage ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Video.....")').closest('.feed-story').addClass('sharedPost-activity sharedVideo sharedPost-hasImage ');
x$('.activityFeed-detailTitle.create_status:contains("Shared Event.....")').closest('.feed-story').addClass('sharedPost-activity sharedEvent sharedPost-hasImage ');
x$('.sharedPost-activity .activityFeed-headline').html(function() {
return x$(this).html().replace("posted a", "is sharing a");
});
x$('.sharedPost-activity header:nth-child(1) > a:nth-child(2)').text('post');
x$('.sharedPost-activity.sharedPhoto header:nth-child(1) > a:nth-child(2)').text('photo');
x$('.sharedPost-activity.sharedVideo header:nth-child(1) > a:nth-child(2)').text('video');
x$('.sharedPost-activity.sharedEvent header:nth-child(1) > a:nth-child(2)').text('event');
x$('.shared-Group header:nth-child(1) > a:nth-child(2)').text('group');
x$('.feedEvent-createStatus.shared-Group a.media-img').each(function() {
var url=x$(this).attr('href');
x$(this).load(url + " .groupHeader-image, .groupHeader-groupName");
});
});
});
});

//MEMBER QUICK VIEW
x$(document).ready(function() {
x$('.membersListPage-user').closest('.module-body').addClass('memberList-body');
x$('.membersListPage-user .friendLink-icon.icon-user-add').closest('.membersListPage-user').addClass('notFriends');
x$('.membersListPage-user a.friendLink').closest('.membersListPage-user').addClass('hasButtons');
x$('<div class="memberInfo-container"></button><button class="memberInfo-button" title="Quick View">Quick View</button><div class="memberButton-header"><button class="closeMember-Info" title="Close">X</button></div></div>').appendTo('.membersListPage-user .matrix-item');
x$('.closeMember-Info').hide();
x$("<div></div>").attr('id','overlayMembers').prependTo('.memberList-body').hide();
x$('.memberInfo-button').click(function(){
x$('html, body').animate({scrollTop: '0px'}, 500);
x$('#overlayMembers').show();
x$('body').css('cursor','wait');
//x$('body').css('overflow','hidden');
x$(this).closest('.membersListPage-user').addClass('viewing-MemberInfo');
x$(this).closest('.matrix-item').addClass('viewMemberInfo');
x$(this).closest('.memberInfo-container').append('<div class="memberInfo-show"><div class="memberInfo-showHeader">About Member</div><div class="memberInfo-content">Loading...</div></div>');
x$('.membersListPage-user.viewing-MemberInfo .membersListPage-userInfo').hide();
x$('.viewMemberInfo .closeMember-Info').show();
x$('.viewMemberInfo .memberInfo-button').hide();
x$('.matrix-item.viewMemberInfo .memberInfo-content').load(x$('.matrix-item.viewMemberInfo a.media-img.avatar-frame').attr("href") + " .module-body.aboutMember", function(){
x$('.membersListPage-user.viewing-MemberInfo .membersListPage-userInfo').show();
x$('body').css('cursor','default');
});
});
});

// Class for the new list pages for photos and bundles
x$(document).ready(function(){
x$('.photoListPage').addClass('newPhotoList-v5');
x$('.section-photoBundle').addClass('newPhotoList-v5');
});

// Photo And Photo Bundles Matrix
x$(document).ready(function(){
x$('.newPhotoList-v5').css("display","none");
x$('.newPhotoList-v5 .matrix-item').each(function() {
var photoLink = x$(this).attr("href");
x$(this).load(x$(this).attr("href") + " .photoDetailPage-mainSection", function() {
x$(".newPhotoList-v5 .photoDetailPage-moreEntries, .newPhotoList-v5 .adjacentEntryLink,.newPhotoList-v5 .photoDetailPage-mainSection .image-description,.newPhotoList-v5 .photoDetailPage-mainSection a.read-more-text").remove();
x$('.newPhotoList-v5').css("display","block");
});
});
});



//CLOSE QUICK VIEW
x$(document).ready(function() {
x$('.closeMember-Info').click(function(){
x$('.membersListPage-user').removeClass('viewing-MemberInfo');
x$('.matrix-item').removeClass('viewMemberInfo');
x$('.memberInfo-show').remove();
x$('.closeMember-Info').hide();
x$('.memberInfo-button').show();
x$('#overlayMembers').hide();
//x$('body').css('overflow','visible');
});
});

// Video And Photos Additional Classes
x$(document).ready(function(){
x$('.videoDetailPage').closest('body').addClass('isVideoDetailPage');
});

//If videos are iframed then css makes them responsive
x$(document).ready(function() {
if (x$('.videoDetailPage-video iframe').length > 0) {
x$('.videoDetailPage-video').addClass('iframed');
}
});


x$(document).ready(function(){
var socialTitle = 'Social Sharing';
x$('<a class="Social-more-switch" alt="More" title="Show / Hide">&#9776 Social Sharing</a>').prependTo('.socialButtons');
x$('.socialSharingList').hide();
x$('a.Social-more-switch').toggle(
function(){
x$('.socialSharingList').slideDown(300);
x$(this).html("&#9660 Social Sharing");
},
function(){
x$('.socialSharingList').slideUp(300);
x$(this).html("&#9776 Social Sharing");
});
});

