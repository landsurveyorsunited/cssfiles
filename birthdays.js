//MEMBERS LIST PAGE BIRTHDAY LABEL
x$(document).ready(function(){
var monthsDisplay = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var now = new Date();
var monthDisplay = monthsDisplay[now.getMonth()];
var birthMonth = "span.profileCoverArea-info:contains("+ monthDisplay +")";
var birthDay = now.getDate()
var birthDayIs = "span.profileCoverArea-info:contains("+ birthDay +")";
x$(birthMonth).closest('.profileCoverArea-info').addClass('birth-month');
x$(birthDayIs).closest('.profileCoverArea-info.birth-month').addClass('birth-Day');
x$('.profileCoverArea-info.birth-month.birth-Day').closest('.media-frame').addClass('membersBirthday');
x$('.profileCoverArea-info.birth-month.birth-Day').closest('.banner-frame.profileCoverArea-frame').addClass('membersBirthday-Profile');
x$('<div class="birthday-icon"></div>').appendTo('.membersBirthday .avatar-frame');
x$('<span class="birthdayMsg">Birthday Today</span>').insertAfter('span.profileCoverArea-info.birth-month.birth-Day');
});

//MEMBERS BIRTHDAY LINK PAGE AND PROFILE PAGE
x$(document).ready(function() {
x$('.page-birthday-today .content-header').load("/surveyors .content-header");
x$('<li><a class="birthdayMembersShow" href="/birthday-today">Birthdays Today</a></li>').insertAfter('.page-members .subnav li:last');
x$('.birthdayWidget').load("/surveyors .matrix", function(){
var monthsDisplay = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var now = new Date();
var monthDisplay = monthsDisplay[now.getMonth()];
var birthMonth = "span.profileCoverArea-info:contains("+ monthDisplay +")";
var birthDay = now.getDate()
var birthDayIs = "span.profileCoverArea-info:contains("+ birthDay +")";
x$(birthMonth).closest('.profileCoverArea-info').addClass('birth-month');
x$(birthDayIs).closest('.profileCoverArea-info.birth-month').addClass('birth-Day');
x$('.profileCoverArea-info.birth-month.birth-Day').closest('li').addClass('membersBirthday');
var hasBirthdays = x$('li.membersBirthday').closest('.birthdayWidget').addClass('hasBirthdays');
var hasBirthdaysCount = hasBirthdays.length
if(hasBirthdaysCount <=0){
x$('.birthdayWidget').addClass('noBirthdays');
}
x$('.profileCoverArea-info.birth-month.birth-Day').closest('.media-frame').addClass('membersBirthday');
x$('.profileCoverArea-info.birth-month.birth-Day').closest('.banner-frame.profileCoverArea-frame').addClass('membersBirthday-Profile');
x$('.tabContainerSection-tab > span:contains("Birthdays Today")').closest('.tabContainerSection-tab').addClass('birthTab');
x$('<span class="birthCounter"></span>').appendTo('.birthTab');
var todaysBirthday = x$('.profileCoverArea-info.birth-month.birth-Day').closest('li').addClass('membersBirthday');
var birthdaysCount = todaysBirthday.length;
x$('.birthdayWidget').closest('.section-html').addClass('birthWidge');
x$('.birthWidge .module-name').text('Birthdays Today '+birthdaysCount+' ');
x$('.birthCounter').append().text(''+birthdaysCount+'');
if(birthdaysCount <=0){
x$('.birthCounter').hide();
}
x$('<div class="birthday-icon"></div>').appendTo('.membersBirthday .avatar-frame');
x$('<span class="birthdayMsg">Birthday Today</span>').insertAfter('span.profileCoverArea-info.birth-month.birth-Day');
});
});
