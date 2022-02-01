 x$('a.userprofilelink').attr('href', ning.CurrentProfile
    .profileUrl); 

 // Add a class to the location section for videos
x$(document).ready(function() {
        x$('.videoDetailPage-mainVideo div > a[href^="http://landsurveyorsunited.com/video/list/at/"]').parent()
            .addClass('videoLocation');
        if (x$('.videoDetailPage-video iframe').length > 0) {
            x$('.videoDetailPage-video').addClass('iframed');
        }
    });  

//dl link
x$('a.SP_Download').click(function() {
    if (x$('#xn_signout').html() != "Sign Out" || x$('#xn_signout').html() == null) {
        x$(window.location).attr('href', 'https://landsurveyorsunited.com/main/authorization/signUp?');
        return false;
    }
});

//downloadcard
 x$(
    '.discussionDetailPage .card .content a:contains("Download"), .discussionDetailPage .entry-content.cf a:contains("Download")'
    ).addClass('SP_Download'); 

//dl card
 x$(document).ready(function() {
    x$("address").each(function() {
        var embed =
            "<iframe width='100%' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q=" +
            encodeURIComponent(x$(this).text()) + "&amp;output=embed'></iframe>";
        x$(this).html(embed);
    });
}); 

//is video
x$(document).ready(function() {
    x$('.videoDetailPage').closest('body').addClass('isVideoDetailPage');
}); 

//footer links
x$(function() {
    x$('.footer-links-holder h3').click(function() {
        x$(this).parent().toggleClass('active');
    });
}); 


 x$(document).ready(function() {
    x$('.videoDetailPage').closest('body').addClass('isVideoDetailPage');
}); 

//features social channels
x$(".matrix-itemFrame").filter(
    '[data-item-id="d_DoEB4zWEQ"]').addClass('featured');
x$(".matrix-itemFrame").filter('[data-item-id="MYx4O2_Cc74"]').addClass('featured'); </script> 

//hub menues
x$(
function() {
    alignMenu();
    x$(window).resize(function() {
        x$(".page-hubs.groupHeader-nav.subnavline").append(x$(
            ".page-hubs .groupHeader-nav .subnavline li.hideshow ul").html());
        x$(".page-hubs .groupHeader-nav.subnavline li.hideshow").remove();
        alignMenu();
    });

    function alignMenu() {
        var w = 0;
        var mw = x$(".page-hubs .groupHeader-nav .subnavline").width() - 100;
        var i = -1;
        var menuhtml = '';
        jQuery.each(x$(".page-hubs .groupHeader-nav .subnavline").children(), function() {
            i++;
            w += x$(this).outerWidth(true);
            if (mw < w) {
                menuhtml += x$('<div>').append(x$(this).clone()).html();
                x$(this).remove();
            }
        });
        x$(".page-hubs .groupHeader-nav .subnavline").append(
            '<li style="position:relative;" href="#" class="hideshow">' + '<a href="#">more ' +
            '<span style="font-size:13px">&#8595;</span>' + '</a><ul>' + menuhtml + '</ul></li>');
        x$(".page-hubs .groupHeader-nav .subnavline li.hideshow ul").css("top", x$(
            ".page-hubs .groupHeader-nav .subnavline li.hideshow").outerHeight(true) + "px");
        x$('<div class="more_menu"></div>').appendTo('.page-hubs .groupHeader-nav');
        x$(".page-hubs .groupHeader-nav .subnavline li.hideshow ul").appendTo('.more_menu');
        x$(".page-hubs .groupHeader-nav .subnavline li.hideshow").click(function() {
            x$('.more_menu').toggle();
        });
    }
}); 


 
 x$("<div></div>").attr('class', 'videolistControl')
    .prependTo('.sourceContainer');
x$("<div></div>").attr('class', 'videolist').appendTo('.videolistControl');
x$(".feedListPage .module-body").clone(true).appendTo('.videolist');
x$('.videolist').hide(); </script> 
<script> x$(".videolistControl").click(function() {
    x$('.videolist').slideToggle(300);
    x$(this).toggleClass('close');
}); 

 x$('a.closer.pull-right.feedListPagePlayer-close').click(function() {
    x$(".videolistControl").removeClass('close');
    x$('.videolist').hide();
}); 

//
  x$(
    '.tabContainerSection-pane.section-channel ').addClass('otherpanes');
x$('.tabContainerSection-pane.section-channel:first').removeClass('otherpanes');
x$(".tabContainerSection-pane.section-channel.otherpanes .matrix-itemFluid.matrix-itemFrame.feedListPage-item").click(
    function() {
        x$(".tabContainerSection-pane.section-channel:first").show();
        x$('.tabContainerSection-pane.section-channel:first .matrix.row').hide();
        x$('.tabContainerSection-pane.section-channel:first .module-footer').hide();
        x$(".tabContainerSection-pane.section-channel").parents().find('li.tabContainerSection-tab:nth-child(1)')
            .addClass('navtabOne');
        x$("li.tabContainerSection-tab:nth-child(1).navtabOne").click(function() {
            x$(".tabContainerSection-pane.section-channel:first .matrix.row ").show();
            x$('.tabContainerSection-pane.section-channel:first .module-footer').show();
        });
    }); 


    // Add Class to events detail page and change text for featured event
    x$(document).ready(function() {
        x$('.eventDetailPage').closest('body').addClass('eventDetail');
        x$('.eventDetail .optionsDropdown-featureButton.feature-button.is-selected').text('Event Featured');
    }); 

{x$('div.bannerframe').insertBefore('div.bannerholder');
}


{x$('ul.pagination.clear').insertBefore('div.search_resultsSum');
}


{x$('div.grid-frame.sheet.section-aboutGroup').insertBefore('div.banner-frame');
}

{x$('div#socialActionscf.socialActions.cf').insertBefore('div.videoDetailPage');
}





// Remove group header crop
x$(document).ready(function() {
x$('.groupHeader.groupHeader-coverPhoto').each(function() {
var removegroupHeaderCrop = x$(this).css('background-image');
x$(this).css('background-image', removegroupHeaderCrop.replace(/\&height=\d+\&crop=\d+\%\d+\A\d+/, ''));
});
});

x$('.section-blogBundle .module-name > a[href="https://landsurveyorsunited.com/messages/Messages"]').closest('.section-blogBundle').hide();
x$(document).ready(function(){
x$('.section-blogBundle .module-name > a[href="https://landsurveyorsunited.com/messages/Messages"]').closest('.section-blogBundle').addClass('siteMessage').hide();
x$('<a class="close-siteMessage" title="Close">Close</a>').insertAfter('.siteMessage .entry-footnote');
x$('.siteMessage .likeButton a').attr('title','Do Not Show Again');
x$('.section-blogBundle').show();
x$('.siteMessage').show();
x$('.siteMessage .likeButton a.is-selected').closest('.siteMessage').addClass('dontshow').hide();
x$('.siteMessage .likeButton a').hover(function() {
x$(this).attr('title','Do not Show Again');
});
});

x$(document).ready(function() {
x$('a.close-siteMessage').click(function(){
x$('.siteMessage, .siteMessage.dontshow').hide();
});
});

x$(document).ajaxSuccess(function() {
x$('.activityFeed-headline > a[href^="https://landsurveyorsunited.com/messages"]').closest(".feedEvent-createBlogPostLike").addClass('activityMessageHide').hide();
});

// Move group join button
x$(document).ready(function() {
x$('.section-aboutGroup .buttonGroup').insertBefore('.aboutGroupSection .entry-content');
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

