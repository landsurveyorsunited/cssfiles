/*Events Month List Widget Code, John Bizley 28-02-17 ver( 3.0 )*/
x$(document).ready(function(){
x$('.module-name:contains(eventsMonthWidget)').closest('.section-eventBundle').addClass('eventsMonthWidget');
x$('.eventsMonthWidget .module-name').text('Events This Month');
x$('.eventsMonthWidget .module-body').html('<h1 class="eventsMonthWidget-updating">Updating...</h1>');
x$('.eventsMonthWidget .module-body').load("/events-demo .eventListPage .entry .media-frame.eventPage-details", function(){
//NOW RUN THE CODE TO UPDATE THE MODULE FOR THE DATES
//SHOW EVENTS ONLY FOR THE MONTH YOU ARE IN
var WidgetClass = x$('.module-name:contains(eventsMonthWidget)').closest('.section-eventBundle').addClass('eventsMonthWidget');
var monthsDisplay = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var now = new Date();
var month = months[now.getMonth()];
var monthDisplay = monthsDisplay[now.getMonth()];
var monthselector = ".section-eventBundle.eventsMonthWidget ul:nth-child(1) > li:nth-child(2) > a:nth-child(1):contains("+ month +")";
var monthClass = x$(monthselector).closest('.media-frame').addClass(month);
var presentMonth = monthClass;
var notThisMonth = x$('.section-eventBundle.eventsMonthWidget .media-frame');
notThisMonth.not(presentMonth).remove();
var eventsPresentCount = presentMonth.length;
if(eventsPresentCount <=0){
x$('.section-eventBundle.eventsMonthWidget .module-name').text('No Upcoming '+monthDisplay+' Events');
}else if(eventsPresentCount === 1){
x$('.section-eventBundle.eventsMonthWidget .module-name').text(' '+monthDisplay+' ('+eventsPresentCount+') Event');
}else{
x$('.section-eventBundle.eventsMonthWidget .module-name').text(' '+monthDisplay+' ('+eventsPresentCount+') Events');
}
x$('.section-eventBundle.eventsMonthWidget .module-footer > a.pull-right').text('View All Events');
x$('.column-narrow .section-eventBundle.eventsMonthWidget .module-name').css('text-align','center');
x$('.eventsMonthWidget .span6.narrow16.tablet16.mobile16').hide();
});
});
