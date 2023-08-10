<script>
//MEMBER QUICK VIEW AND EMAIL BUTTON
x$(document).ready(function() {
x$('.membersListPage-user').closest('.module-body').addClass('memberList-body');
x$('.membersListPage-user .friendLink-icon.icon-user-add').closest('.membersListPage-user').addClass('notFriends');
x$('.membersListPage-user a.friendLink').closest('.membersListPage-user').addClass('hasButtons');
x$('<div class="memberInfo-container"><button class="memberInfo-Email" title="Message">&#9993<div class="infoEmail-container"</div></button><button class="memberInfo-button" title="Quick View">Quick View</button><div class="memberButton-header"><button class="closeMember-Info" title="Close">X</button></div></div>').appendTo('.membersListPage-user .matrix-item');
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
x$('.matrix-item.viewMemberInfo .memberInfo-Email > .infoEmail-container').load(x$('.matrix-item.viewMemberInfo a.media-img.avatar-frame').attr("href") + " .profileCoverArea-messageOptions > a");
x$('.matrix-item.viewMemberInfo .memberInfo-content').load(x$('.matrix-item.viewMemberInfo a.media-img.avatar-frame').attr("href") + " .module-body.aboutMember", function(){
x$('.membersListPage-user.viewing-MemberInfo .membersListPage-userInfo').show();
x$('body').css('cursor','default');
});
});
});
</script>


//EMAIL BUTTON ON MEMBER BLOCK
x$(document).ready(function() {
x$('.memberInfo-Email').click(function(){
x$('body').css('cursor','wait');
x$(this).closest('.matrix-item').addClass('viewMemberInfo-email');
x$('.matrix-item.viewMemberInfo-email .memberInfo-Email > .infoEmail-container').load(x$('.matrix-item.viewMemberInfo-email a.media-img.avatar-frame').attr("href") + " .profileCoverArea-messageOptions > a", function(){
x$('a.profileCoverArea-messageButton').hide();
setTimeout(function(){x$('.matrix-item.viewMemberInfo-email .infoEmail-container a.profileCoverArea-messageButton')[0].click()}, 800);
x$('body').css('cursor','default');
});
});
});



//MESSAGE BUTTON TO SHOW WAIT CURSOR
x$(document).ready(function() {
x$('a.profileCoverArea-messageButton').click(function){
x$('body').css('cursor','wait');
});
});



//CLOSE QUICK VIEW
x$(document).ready(function() {
x$('.closeMember-Info').click(function(){
x$('.membersListPage-user').removeClass('viewing-MemberInfo');
x$('.matrix-item').removeClass('viewMemberInfo viewMemberInfo-email');
x$('.infoEmail-container').empty();
x$('.memberInfo-show').remove();
x$('.closeMember-Info').hide();
x$('.memberInfo-button').show();
x$('#overlayMembers').hide();
//x$('body').css('overflow','visible');
});
});
