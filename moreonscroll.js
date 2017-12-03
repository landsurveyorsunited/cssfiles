// More Content on Scroll - List modules
// Copyright B K Services Inc. All Rights Reserved
// V5B - 3/10/2013
// Contact TJ@BKServ.com to purchase this app or to report
//  stolen versions or unauthorized use.
//  All violations will be prosecuted!
// LISTS: Photo, Video, Discussion (in Groups too), Blog, Group, Event, Member, Pages, Search Results
// ON/OFF SWITCH: Settings | Content Scrolling  - More Content on Scroll ON/OFF
// NEW in 4A:
//  Pages and Search Results scroll.  Discussions in Groups scroll.
//  NC can customize the Loading indicator using variable jQueryHelp_MOS_LoadingHTML
//  NC can customize the Blog List making it Titles Only using variable jQueryHelp_MOS_BlogTitlesOnly
// NEW in 4B: Automatic loading of more content is done when the pagination buttons (i.e. Next button) scrolls into view.
// NEW in 4C: Works for Featured Forum Discussions.
// NEW in 4D: Works for Main Forum Page Style of Latest Discussions by Category.
// NEW in 5A: Allows functions to run on items that are loaded.
// NEW in 5B: Adds a RightColumnFoot div that has a button to stop Autoload on Scroll.
// NEW in 5C: Works for Discussions by Category again.  Lets user determine Sticky Module Header and Body.


if (!window.console) console = { log: function() { } };

// Global Variables
var jQH_MOS_CurLoc = window.location.href + '';

var jQH_MOS_Page;
var jQH_MOS_MaxPage;
var jQH_MOS_PageSize;
var jQH_MOS_OverrideBaseURL = '';
var jQH_MOS_MoreLoading = 0;
var jQH_MOS_LoadingCode = '<div class="jQH_MOS_LoadingCode" style="padding:1em; border: solid 1px #dddddd; background-color: white;"><img class="align-center" src="http://api.ning.com:80/files/*hEUPDiLn3tyq2ATpoDZlpa9BLLTWY80f2NtE*XPwWQSed3H8YnT72ef4nolrvzgCPGkun-6e4SbicQ5N6wCnzw2JoPbPWyQ/survey.gif" alt= "" /></div>';
var jQH_MOS_BlogTitlesOnly = 0;

var jQH_MOS_ScrollSwitchValue = 1;  // Default to ON.  Set by cookie and Settings for Content Scrolliong.

var jQH_MOS_AllowAutoload = 1;  // Default to ON.  Set by button in Right Column Foot div. NEW in 5B!

var jQH_MOS_RightColumnFootSwitch = 1;  // Default to make a right column foot div at the end of the column with the Account module (Sticky Module).
// Next 2, Set at bottom of this code, if jQH_MOS_RightColumnFootSwitch = 1
var jQH_MOS_RightColumnFootHead = 'Sticky Module'  // Default Text for right column foot div Head (Sticky Module).
var jQH_MOS_RightColumnFootHTML = 'This block sticks to the top while loading more content for you.'  // Default HTML for the Sticky Module.

var jQH_MOS_StickyTop = 0;  // Top position in px of StickyTop div, if it exists.


// FUNCTIONS

function jQH_MOS_SetPage() {
    var curloc = jQH_MOS_CurLoc;
    var CurrentPage = curloc.indexOf('page=');
    if (CurrentPage > 0) {
        CurrentPage = curloc.substr(CurrentPage + 5);
        if (CurrentPage.indexOf('#') > -1) CurrentPage = CurrentPage.substr(0, CurrentPage.indexOf('#'));
        jQH_MOS_Page = CurrentPage;
    }
    else jQH_MOS_Page = 1;
}

function jQH_MOS_SetPageSize(jqsel) {
    jQH_MOS_PageSize = x$(jqsel).length;
}

function jQH_MOS_SetMaxPage() {
    var jQH_MOS_cnt;
    var jQH_MOS_cnt2;

    jQH_MOS_cnt = x$('span.count').text();

    jQH_MOS_cnt2 = x$('table.categories > thead > tr > th:first').text();
    if (jQH_MOS_cnt2.indexOf('(') > 0) jQH_MOS_cnt = jQH_MOS_cnt2
    jQH_MOS_cnt = jQH_MOS_cnt.replace(',', '');
    var jQH_MOS_op = jQH_MOS_cnt.indexOf('(');
    var jQH_MOS_cp = jQH_MOS_cnt.indexOf(')');
    jQH_MOS_cnt = parseInt(jQH_MOS_cnt.substring(jQH_MOS_op + 1, jQH_MOS_cp));
    jQH_MOS_MaxPage = Math.ceil(jQH_MOS_cnt / jQH_MOS_PageSize);
    if (isNaN(jQH_MOS_MaxPage)) jQH_MOS_MaxPage = 1;
}

function jQH_MOS_IsTriggeredAndReady() {
    var retval = false;
    var PSResult = 0;

    jQH_MOS_HandleStickyModule();

    if (jQH_MOS_AllowAutoload == 1) { // Auto should not trigger unless jQH_MOS_AllowAutoload is 1.

        if (typeof jQH_MOS_ProcessScroll == 'function') {
            PSResult = jQH_MOS_ProcessScroll();
        }

        if ((jQH_MOS_IsScrolledIntoView('ul.pagination')) || (PSResult > 0)) {
            if ((jQH_MOS_Page < jQH_MOS_MaxPage) && (jQH_MOS_MoreLoading == 0)) {
                retval = true;
                // REMOVE pagination controls
                x$('ul.pagination').remove();
            }
        }
    }

    return retval;
}

function jQH_MOS_GetBaseURL() {
    if (jQH_MOS_OverrideBaseURL == '') {
        var CurLocNoPound = jQH_MOS_CurLoc;
        if (CurLocNoPound.indexOf('#') > -1) CurLocNoPound = CurLocNoPound.substr(0, CurLocNoPound.indexOf('#'));

        var jQH_MOS_sch = '?'
        if (CurLocNoPound.indexOf(jQH_MOS_sch) > 0) jQH_MOS_sch = '&';
        return CurLocNoPound + jQH_MOS_sch;
    }
    else {
        return jQH_MOS_OverrideBaseURL;
    }
}

function jQH_MOS_IsScrolledIntoView(elt) {
    try {
        var docViewTop = x$(window).scrollTop();
        var docViewBottom = docViewTop + x$(window).height();

        var eltTop = x$(elt).offset().top;
        var eltBottom = eltTop + x$(elt).height();

        return ((eltBottom <= docViewBottom) && (eltTop >= docViewTop));
    }
    catch (err) {
        console.log('jQH_MOS_IsScrolledIntoView Error: ' + err.message);
        return false;
    }
}

function jQH_MOS_IsScrolledToTop(elt, eltTop) {
    try {
        var docViewTop = x$(window).scrollTop();

        console.log(docViewTop, eltTop);

        return (docViewTop >= eltTop);
    }
    catch (err) {
        console.log('jQH_MOS_IsScrolledToTop Error: ' + err.message);
        return false;
    }
}

function jQH_MOS_StopAutoload() {
    jQH_MOS_AllowAutoload = 0;
    x$('div#jQH_StickyFoot').remove();
    console.log('jQH_MOS_AllowAutoload = 0');
}

function jQH_MOS_HandleStickyModule() {
    // New in 5B - Check here for RightColumnFoot hitting the top of the page.  If so, stick it!
    if (jQH_MOS_RightColumnFootSwitch == 1) {
        if (jQH_MOS_IsScrolledToTop('div#jQH_StickyModule', jQH_MOS_StickyTop)) {
            x$('div#jQH_StickyModule').css({ 'position': 'fixed', 'top': '0px', 'width': '183px' });
        }
        else {
            x$('div#jQH_StickyModule').css({ 'position': 'relative', 'top': '', 'width': '' });
        }
    }
}

// Cookie Functions
function jQH_MOS_SetCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + "; path=/";
}

function jQH_MOS_GetCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}


function jQH_MOS_HandleLists() {

    // PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PHOTO
    // For Photo lists.

    // Should work for all photo list pages: All Photos, View Photos (View All link from Photo module on Main page), My Photos, My Favorites, Featured, Tagged, Search
    if ((x$('.xg_widget_photo_index_index').length > 0) || (x$('.xg_widget_photo_photo_list').length > 0) || (x$('.xg_widget_photo_photo_index').length > 0) || (x$('.xg_widget_photo_photo_listForContributor').length > 0) || (x$('.xg_widget_photo_photo_listFavorites').length > 0) || (x$('.xg_widget_photo_photo_listFeatured').length > 0) || (x$('.xg_widget_photo_photo_listTagged').length > 0) || (x$('.xg_widget_photo_photo_search').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.xg_list_photo_main li');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.xg_list_photo_main').append('<div id="jQH_MorePhotos"></div>');

            // REMOVE pagination controls
            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MorePhotos').append('<div id="jQH_MorePhotos' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');
                    x$('#jQH_MorePhotos' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .xg_list_photo_main', function() {
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MorePhotos' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        if (typeof jQH_MOS_ProcessMorePhotos == 'function') {
                            jQH_MOS_ProcessMorePhotos('#jQH_MorePhotos' + jQH_MOS_Page + '');
                        }
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PHOTO ALBUM
    // For Photo Album lists.

    // Should work for all photo Album list pages: All Albums, My Albums, Featured, Search
    else if ((x$('.xg_widget_photo_album_list').length > 0) || (x$('.xg_widget_photo_album_listForOwner').length > 0) || (x$('.xg_widget_photo_album_listFeatured').length > 0) || (x$('.xg_widget_photo_album_search').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.xg_list_albums_main li');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.xg_list_albums_main').append('<div id="jQH_MorePhotoAlbums"></div>');

            // REMOVE pagination controls
            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MorePhotoAlbums').append('<div id="jQH_MorePhotoAlbums' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');
                    x$('#jQH_MorePhotoAlbums' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .xg_list_albums_main', function() {
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MorePhotoAlbums' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        if (typeof jQH_MOS_ProcessMorePhotoAlbums == 'function') {
                            jQH_MOS_ProcessMorePhotoAlbums('#jQH_MorePhotoAlbums' + jQH_MOS_Page + '');
                        }
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV VIDEO
    // For Video lists.

    // Should work for all video list pages: Videos, All Videos, My Videos, My Favorites, Featured, Tagged, Search
    else if ((x$('.xg_widget_video_index_index').length > 0) || (x$('.xg_widget_video_video_index').length > 0) || (x$('.xg_widget_video_video_listForContributor').length > 0) || (x$('.xg_widget_video_video_listFavorites').length > 0) || (x$('.xg_widget_video_video_listFeatured').length > 0) || (x$('.xg_widget_video_video_listTagged').length > 0) || (x$('.xg_widget_video_video_search').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.xg_list_video_main li');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.xg_list_video_main').append('<div id="jQH_MoreVideos"></div>');

            // REMOVE pagination controls
            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MoreVideos').append('<div id="jQH_MoreVideos' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');
                    x$('#jQH_MoreVideos' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .xg_list_video_main', function() {
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MoreVideos' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        if (typeof jQH_MOS_ProcessMoreVideos == 'function') {
                            //console.log('PMV: ' + '#jQH_MoreVideos' + jQH_MOS_Page + '');
                            jQH_MOS_ProcessMoreVideos('#jQH_MoreVideos' + jQH_MOS_Page + '');
                        }
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD DISCUSSIONS (FORUM)
    // For Discussion lists.  Should work for all Discussions Lists except Latest Discussion by Catgory style.

    else if ((x$('.xg_widget_forum_topic_listForCategory').length > 0) || (x$('.xg_widget_forum_topic_listForContributor').length > 0) || (x$('.xg_widget_forum_topic_list').length > 0) || (x$('.xg_widget_forum_topic_featured').length > 0) || (x$('.xg_widget_groups_group_forum').length > 0)) {

        // See if there are 1 or 2 categories tables.  If 2, the first is Featured, don't add content there!
        if (x$('table.categories').eq(1).length < 1) {  // See if there is a second table...
            x$('table.categories').eq(0).after('<div id="jQH_MoreDiscussions"></div>');
            x$('table.categories').eq(0).find('tr').removeClass('last-child');
            jQH_MOS_SetPageSize('table.categories:eq(0) > tbody > tr');

        } else { // if there is a second categories table, add content to 2nd table, first is Featured Discussions!
            x$('table.categories').eq(1).after('<div id="jQH_MoreDiscussions"></div>');
            x$('table.categories').eq(1).find('tr').removeClass('last-child');
            jQH_MOS_SetPageSize('table.categories:eq(1) > tbody > tr');
        }

        jQH_MOS_SetPage();

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;
                    x$('#jQH_MoreDiscussions').append('<div id="jQH_MoreDiscussions' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MoreDiscussions' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' table.categories', function() {
                        x$('#jQH_MoreDiscussions' + jQH_MOS_Page).find('table.categories > thead').remove();
                        x$('#jQH_MoreDiscussions' + jQH_MOS_Page).find('tr').removeClass('last-child');
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MoreDiscussions' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        if (typeof jQH_MOS_ProcessMoreDiscussions == 'function') {
                            jQH_MOS_ProcessMoreDiscussions('#jQH_MoreDiscussions' + jQH_MOS_Page + '');
                        }
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD DISCUSSIONS (FORUM)
    // For Latest Discussion by Catgory style Forum Discussion Lists.

    else if (x$('.xg_widget_forum_index_index').length > 0) {

        jQH_MOS_isNextLink = false;
        if (x$('a:contains("Next ›")').length > 0) jQH_MOS_isNextLink = true;

        if (jQH_MOS_isNextLink == true) {

            jQH_MOS_SetPage();

            var nextURL = x$('a:contains("Next ›")').attr('href');
            nextURL = nextURL.substr(0, nextURL.indexOf('page='));

            //console.log(nextURL);  // For testing!

            x$('#category-view-pagination').before('<div id="jQH_MoreDiscussionCategories"></div>');

            x$(window).scroll(function() {

                if (jQH_MOS_IsScrolledIntoView('ul.pagination')) {
                    // REMOVE pagination controls
                    x$('ul.pagination').remove();

                    //console.log(jQH_MOS_isNextLink);
                    if ((jQH_MOS_isNextLink == true) && (jQH_MOS_MoreLoading == 0)) {
                        jQH_MOS_Page++;

                        jQH_MOS_MoreLoading = 1;
                        x$('#jQH_MoreDiscussionCategories').append('<div id="jQH_MoreDiscussionCategories' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                        x$('#jQH_MoreDiscussionCategories' + jQH_MOS_Page).load(nextURL + 'page=' + jQH_MOS_Page + ' div.xg_span-11 > .xg_module:eq(1)', function() {
                            // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                            //x$('#jQH_MoreDiscussions' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                            jQH_MOS_isNextLink = false;
                            if (x$('#jQH_MoreDiscussionCategories' + jQH_MOS_Page).find('ul.pagination').find('a:contains("Next ›")').length > 0) jQH_MOS_isNextLink = true;
                            x$('#jQH_MoreDiscussionCategories' + jQH_MOS_Page).find('div.xg_module_foot').remove();
                            if (typeof jQH_MOS_ProcessMoreDiscussionCategories == 'function') {
                                jQH_MOS_ProcessMoreDiscussionCategories('#jQH_MoreDiscussionCategories' + jQH_MOS_Page + '');
                            }
                            jQH_MOS_MoreLoading = 0;
                        });
                    }
                }
            })
        }
    }


    // BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB BLOGS
    // For Blog lists.

    // This should cover     All Blog Posts    My Blog   as well as someone's blog list.  Also Featured and Search.
    else if (jQH_MOS_CurLoc.indexOf('/profiles/blog/list') > 0) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.xg_blog_list .xg_module_body');  // WAS '.xg_blog_list > .xg_module_body' but changed for BlogJam.js

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.xg_blog_list > .xg_module_foot').before('<div id="jQH_MoreBlogs"></div>');

            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;
                    x$('#jQH_MoreBlogs').append('<div id="jQH_MoreBlogs' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MoreBlogs' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .xg_blog_list', function() {
                        // DO NOT Remove, BUT remove HTML from page controls! We need pagination now to trigger loading when it scrolls into view!
                        x$('#jQH_MoreBlogs' + jQH_MOS_Page).find('ul.pagination').html('');
                        x$('#jQH_MoreBlogs' + jQH_MOS_Page).find('div.xg_module_foot').remove();
                        if (jQH_MOS_BlogTitlesOnly > 0) {
                            x$('#jQH_MoreBlogs' + jQH_MOS_Page).find('div.xg_module_body').find('div.postbody').remove();
                            x$('#jQH_MoreBlogs' + jQH_MOS_Page).find('div.xg_module_body').find('p.small').remove();
                        }
                        if (typeof jQH_MOS_ProcessMoreBlogs == 'function') {
                            jQH_MOS_ProcessMoreBlogs('#jQH_MoreBlogs' + jQH_MOS_Page + '');
                        }
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG GROUPS
    // For Group lists.

    // This should cover     All Groups    My Groups  (After the OR, that handles the /groups page you get to from Main menu!), and Search.
    else if ((jQH_MOS_CurLoc.indexOf('/groups/group/list') > 0) || (x$('.xg_widget_groups_index_index').length > 0) || (x$('.xg_widget_groups_group_search').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.xg_list_groups_main li');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.xg_list_groups_main').append('<div id="jQH_MoreGroups"></div>');

            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MoreGroups').append('<div id="jQH_MoreGroups' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MoreGroups' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .xg_list_groups_main', function() {
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MoreGroups' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EVENTS
    // For Event lists.

    // This should cover     Upcoming Events    Past Events    My Events  (After the OR, that handles the /events page you get to from Main menu!), and Search.
    else if ((jQH_MOS_CurLoc.indexOf('/events/event/list') > 0) || (x$('.xg_widget_events_index_index').length > 0) || (x$('.xg_widget_events_event_search').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.body_events_main > .wrap li');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.body_events_main').append('<div id="jQH_MoreEvents"></div>');

            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MoreEvents').append('<div id="jQH_MoreEvents' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MoreEvents' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .body_events_main', function() {
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MoreEvents' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM MEMBERS
    // For Member lists.

    // This should cover     All Members  (and Friend lists, including My Friends) and Featured Members
    else if ((jQH_MOS_CurLoc.indexOf('/profiles/members') > 0) || (x$('.xg_widget_profiles_friend_list').length > 0) || (x$('.xg_widget_profiles_friend_listFeatured').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.members_list > .member_item');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.members_list').after('<div id="jQH_MoreMembers"></div>');

            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MoreMembers').append('<div id="jQH_MoreMembers' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MoreMembers' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .members_list', function() {
                        // DO NOT Remove, we need pagination now to trigger loading when it scrolls into view!
                        //x$('#jQH_MoreMembers' + jQH_MOS_Page).find('ul.pagination').remove();
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MoreMembers' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PAGES
    // For Page lists.

    // This should cover     All Pages  My Pages
    else if ((x$('.xg_widget_page_page_list').length > 0) || (x$('.xg_widget_page_index_index').length > 0) || (x$('.xg_widget_page_page_listForContributor').length > 0)) {

        jQH_MOS_SetPage();

        jQH_MOS_SetPageSize('.xg_module_body > div.wpage');

        jQH_MOS_SetMaxPage();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage + '|' + jQH_MOS_PageSize);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('ul.pagination').parent().append('<div id="jQH_MorePages"></div>');

            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MorePages').append('<div id="jQH_MorePages' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MorePages' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' div.module_searchbar ~ .xg_module', function() {
                        // DO NOT Remove, BUT remove HTML from page controls! We need pagination now to trigger loading when it scrolls into view!
                        x$('#jQH_MorePages' + jQH_MOS_Page).find('ul.pagination').html('');
                        x$('#jQH_MorePages' + jQH_MOS_Page).find('div.xg_module_foot').remove();
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }


    // SSSSSSSSSSSSSSSSSSSSSSSSSSSS SEARCH RESULTS
    // For Search Results lists.
    else if (x$('.xg_widget_main_search_search').length > 0) {

        jQH_MOS_SetPage();

        //SetMaxPage:
        jQH_MOS_MaxPage = x$('ul.pagination > li:last > a').text();

        console.log(jQH_MOS_Page + '|' + jQH_MOS_MaxPage);  // For testing!

        if (jQH_MOS_MaxPage > 1) {  // Only remove pagination and add content on scroll if there is more than one page!

            x$('.search_results').after('<div id="jQH_MoreSearchResults"></div>');

            //x$('ul.pagination').remove();

            x$(window).scroll(function() {
                if (jQH_MOS_IsTriggeredAndReady()) {
                    jQH_MOS_Page++;

                    jQH_MOS_MoreLoading = 1;

                    x$('#jQH_MoreSearchResults').append('<div id="jQH_MoreSearchResults' + jQH_MOS_Page + '">' + jQH_MOS_LoadingCode + '</div>');

                    x$('#jQH_MoreSearchResults' + jQH_MOS_Page).load(jQH_MOS_GetBaseURL() + 'page=' + jQH_MOS_Page + ' .search_results', function() {
                        // DO NOT Remove, we need pagination now to trigger loading when it scrolls into view!
                        //x$('#jQH_MoreSearchResults' + jQH_MOS_Page).find('ul.pagination').remove();
                        // ADD Empty Pagination - needed to trigger next load when scrolled into view.
                        x$('#jQH_MoreSearchResults' + jQH_MOS_Page).append('<ul class="pagination"></ul>');
                        jQH_MOS_MoreLoading = 0;
                    });
                }
            })
        }
    }

    else {
        jQH_MOS_StopAutoload();
        x$(window).scroll(function() {
            jQH_MOS_HandleStickyModule();
        });
    }
}

// SETTINGS - Add jQueryHelp apps tab and content
function jQH_MOS_SaveSettings() {
    var radioValue = x$("input[name='jQH_MOS_OnOff']:checked").val();
    //alert(radioValue);
    if (radioValue == 'off') jQH_MOS_SetCookie('jQH_MOS_ScrollSwitch', 0, 3650); else jQH_MOS_SetCookie('jQH_MOS_ScrollSwitch', 1, 3650);
    x$('#jQH_MOS_SaveResult').html('More Content On Scroll app is now ' + radioValue);
}

function jQH_MOS_ShowSettings() {
    //jQH_MOS_ScrollSwitchValue = jQH_MOS_GetCookie('jQH_MOS_ScrollSwitch');  // we now get this below
    console.log('In ShowSettings, jQH_MOS_ScrollSwitchValue currently ' + jQH_MOS_ScrollSwitchValue);
    var chkon = '';
    var chkoff = 'checked="checked"';
    if (jQH_MOS_ScrollSwitchValue == 1) {
        chkon = 'checked="checked"';
        chkoff = '';
    }

    var h = '<fieldset class="dy-form-2"><h3>More Content On Scroll</h3><dl><dt>On or Off:</dt><dd>';
    h += '<label><input class="radio" type="radio" ' + chkon + ' value="on" name="jQH_MOS_OnOff">On</label> &nbsp; ';
    h += '<label><input class="radio" type="radio" ' + chkoff + ' value="off" name="jQH_MOS_OnOff">Off</label>';
    h += '</dd></dl></fieldset><p class="buttongroup xg_lightborder"><input class="button" type="button" value="Save" onclick="jQH_MOS_SaveSettings();"> &nbsp; <span id="jQH_MOS_SaveResult"></span></p>';
    x$('div.page_ticker_content').html(h);
    x$('li').removeClass('this');
    x$('li#jQH_Settings_Item').addClass('this');
}


console.log('More List On Scroll 5C by TJ at jQueryHelp.ning.com');

// Check for a variable named jQueryHelp_MOS_LoadingHTML and use its value if there is one:
if (typeof (jQueryHelp_MOS_LoadingHTML) != 'undefined') jQH_MOS_LoadingCode = jQueryHelp_MOS_LoadingHTML;

// Check for a variable named jQueryHelp_MOS_RightColumnFootSwitch and use its value if there is one:
if (typeof (jQueryHelp_MOS_RightColumnFootSwitch) != 'undefined') jQH_MOS_RightColumnFootSwitch = jQueryHelp_MOS_RightColumnFootSwitch;

// Check for a variable named jQueryHelp_MOS_RightColumnFootHTML and use its value if there is one:
if (typeof (jQueryHelp_MOS_RightColumnFootHTML) != 'undefined') jQH_MOS_RightColumnFootHTML = jQueryHelp_MOS_RightColumnFootHTML;

// Check for a variable named jQueryHelp_MOS_RightColumnFootHead and use its value if there is one:
if (typeof (jQueryHelp_MOS_RightColumnFootHead) != 'undefined') jQH_MOS_RightColumnFootHead = jQueryHelp_MOS_RightColumnFootHead;

// Check for a variable named jQueryHelp_MOS_BlogTitlesOnly and use its value if there is one:
if (typeof (jQueryHelp_MOS_BlogTitlesOnly) != 'undefined') jQH_MOS_BlogTitlesOnly = jQueryHelp_MOS_BlogTitlesOnly;

x$('form#settings_form ul.page_tickers').append('<li id="jQH_Settings_Item"><a href="#" onclick="jQH_MOS_ShowSettings();">Content Scrolling</a></li>');

jQH_MOS_ScrollSwitchValue = jQH_MOS_GetCookie('jQH_MOS_ScrollSwitch');
if (jQH_MOS_ScrollSwitchValue != 0) jQH_MOS_ScrollSwitchValue = 1;  // If no cookie, turn app ON.

console.log('In MLOS Main, jQH_MOS_ScrollSwitchValue currently ' + jQH_MOS_ScrollSwitchValue);

// if jQH_MOS_RightColumnFootSwitch = 1 and we are NOT on the Main/Home page, then set up right column foot div (Sticky Module):
if ((jQH_MOS_RightColumnFootSwitch == 1) && (x$('.xg_widget_main_index_index').length <= 0)) {
    var RightColumnFootHTML = '<div id="jQH_StickyModule" class="xg_module"><div class="xg_module_head"><h2>' + jQH_MOS_RightColumnFootHead + 
      '</h2></div><div class="xg_module_body" style="background-color:#FFDDDD; font-size:150%">' +
      jQH_MOS_RightColumnFootHTML + '</div><div id="jQH_StickyFoot" class="xg_module_foot"><button onclick="jQH_MOS_StopAutoload();">Stop Autoload</button></div></div>';

    x$('div#column2, div.xj_classic_sidebar').append(RightColumnFootHTML);
    jQH_MOS_StickyTop = x$('div#jQH_StickyModule').position().top;
    if (x$('div#IMBarMain').height() == undefined) jQH_MOS_StickyTop += 96;  // I think this line is needed only if the user has IMing installed!
    console.log('jQH_MOS_StickyTop: ' + jQH_MOS_StickyTop);
}

if (jQH_MOS_ScrollSwitchValue == 1) jQH_MOS_HandleLists();
