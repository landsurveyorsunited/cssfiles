// movenav to before ningbar
x$(document).ready(function() {
  x$("nav.header-nav.navbar").insertBefore(".ningbar-userLinks.linkbar");
});
x$(document).ready(function() {

  x$("<div class="videoFirst-container"><div class="videoFirst-controls"><a class="videoFirst-play" title="Play" href="#/">Play</a></div></div>").insertBefore(".videoListPage-metadata");
});
x$(document).ready(function() {
  //VIEW BUTTON ADDED TO ENTRY IN FORUM ARTICLES BLOGS
  x$(".articleListPage-entry .entry-footnote, .blogListPage-entry .entry-footnote, .discussionListPage-entry .media-body").append("<div class="footer-button-container"><a class="viewButton" href="#/" title="View">View Post</a></div>");
  x$("a.viewButton").click(function() {
    x$(this).closest(".entry").addClass("activeTitle");
    var urlNew = x$(".activeTitle .entry-title > a").attr("href");
    x$(".viewButton").attr("href", urlNew);
  });
});
x$(document).ready(function() {
  x$("a#username, .ningbar-profilePhoto > a").on("click", function(e) {
    x$(".ningbar-box").addClass("open")
    e.preventDefault();
  });

  x$(".ningbar-box").click(function() {
    x$(this).removeClass("open");
  });
});
x$("a.userprofilelink").attr("href", ning.CurrentProfile.profileUrl);
x$(document).ready(function() {
  x$(".ningbar-userLinks #username").closest("li").addClass("userLi");
  x$("<div class="ningbar-box"><div class="ningbar-box-container"></div></div>").prependTo(".userLi");
  if (ning.CurrentProfile != null){ x$(".ningbar-userLinks.linkbar #username").prepend("<div class="ningbar-profilePhoto"><a href="" + ning.CurrentProfile.profileUrl + ""><img style="margin:0px;padding:0px;" src="" + ning.CurrentProfile.photoUrl + "" width="30" height="30" /></a></div>");
};
//CALENDAR
x$(document).ready(function() {
    x$(".videoDetailPage").closest("body").addClass("isVideoDetailPage");
    x$(function() {
      x$(".footer-links-holder h3").click(function() {
        x$(this).parent().toggleClass("active");
      });
    });
    x$(function() {
      alignMenu();
      x$(window).resize(function() {
        x$(".page-hubs.groupHeader-nav.subnavline").append(x$(".page-hubs .groupHeader-nav .subnavline li.hideshow ul").html());
        x$(".page-hubs .groupHeader-nav.subnavline li.hideshow").remove();
        alignMenu();
      });

      function alignMenu() {
        var w = 0;
        var mw = x$(".page-hubs .groupHeader-nav .subnavline").width() - 100;
        var i = -1;
        var menuhtml = "";
        jQuery.each(x$(".page-hubs .groupHeader-nav .subnavline").children(), function() {
          i++;
          w += x$(this).outerWidth(true);
          if (mw < w) {
            menuhtml += x$("<div>").append(x$(this).clone()).html();
            x$(this).remove();
          }
        });
        x$(".page-hubs .groupHeader-nav .subnavline").append("<li style="position:relative;" href="#" class="hideshow">" + "<a href="#">more " + "<span style="font-size:13px">&#8595;</span>" + "</a><ul>" + menuhtml + "</ul></li>");
        x$(".page-hubs .groupHeader-nav .subnavline li.hideshow ul").css("top", x$(".page-hubs .groupHeader-nav .subnavline li.hideshow").outerHeight(true) + "px");
        x$("<div class="more_menu"></div>").appendTo(".page-hubs .groupHeader-nav");
        x$(".page-hubs .groupHeader-nav .subnavline li.hideshow ul").appendTo(".more_menu");
        x$(".page-hubs .groupHeader-nav .subnavline li.hideshow").click(function() {
          x$(".more_menu").toggle();
        });
      }
    });
    // Add Class to events detail page and change text for featured event
    x$(document).ready(function() {
      x$(".eventDetailPage").closest("body").addClass("eventDetail");
      x$(".eventDetail .optionsDropdown-featureButton.feature-button.is-selected").text("Event Featured");
    });  
      x$("div.lf-input__wrap.social_login").insertBefore("<button id="whatsapp-login"/>");
    })
    x$("div.grid-frame.sheet.section-aboutGroup").insertBefore("section.entry-content.cf");
  } {
    x$("div#socialActionscf.socialActions.cf").insertBefore("div.videoDetailPage");
  }
  // Remove group header crop
  x$(document).ready(function() {
    x$(".groupHeader.groupHeader-coverPhoto").each(function() {
      var removegroupHeaderCrop = x$(this).css("background-image");
      x$(this).css("background-image", removegroupHeaderCrop.replace(/\&height=\d+\&crop=\d+\%\d+\A\d+/, ""));
    });
  });
  // Move group join button
  x$(document).ready(function() {
    x$(".section-aboutGroup .buttonGroup").insertBefore(".aboutGroupSection .entry-content");
  });
  // Move group page links to top
  x$(document).ready(function() {
    x$(".groupHeader-nav ul.subnavline").insertBefore(".banner-frame");
  });
  // Move 3 rows of members into banner area
  x$(document).ready(function() {
    x$("ul.matrix.row.membersSection-avatars.membersSection-smallAvatars.membersSection-3Rows").insertAfter("div.banner-actions.groupHeader-actions");
  });
  // Class for the new list pages for photos Bundles
  x$(document).ready(function() {
    x$(".section-photoBundle").addClass("newPhotoList-v5");
  });
  // Photo And Photo Bundles Matrix
  x$(document).ready(function() {
    x$(".newPhotoList-v5").css("display", "none");
    x$(".newPhotoList-v5 .matrix-item").each(function() {
      var photoLink = x$(this).attr("href");
      x$(this).load(x$(this).attr("href") + " .photoDetailPage-mainSection", function() {
        x$(".newPhotoList-v5 .photoDetailPage-moreEntries, .newPhotoList-v5 .adjacentEntryLink,.newPhotoList-v5 .photoDetailPage-mainSection .image-description,.newPhotoList-v5 .photoDetailPage-mainSection a.read-more-text").remove();
        x$(".newPhotoList-v5").css("display", "block");
      });
    });
  }); x$(document).ready(function() {
    x$("<div class="profile Bio-wrapperOuter"><div class="profile Bio-wrapper"><div class="profile Bio-container"><div class="profile Bio-header"><h1 class="Bio-member"></h1></div><a class="Bio-more-switch" alt="More" title="Show / Hide Bio">&#9776</a><div class="Bio-info"></div></div></div></div>").prependTo(".profileCoverArea-frame .banner-footer");
    x$(".profileCoverArea-bio h2").appendTo(".profile .Bio-member");
    x$(".profileCoverArea-bio p").appendTo(".profile .Bio-info");
    x$(".Bio-info p:has(span)").closest(".Bio-info p").addClass("p-Content");
    x$(".Bio-info p:has(span)").closest(".Bio-container").addClass("hasSpan");
  });
  // Show Hide Bio Info
  x$(document).ready(function() {
    x$(".Bio-info").hide();
    x$("a.Bio-more-switch").toggle(function() {
      x$(".Bio-info").slideDown(300);
      x$(this).html("&#9660");
    }, function() {
      x$(".Bio-info").slideUp(300);
      x$(this).html("&#9776");
    });
  });
  //Add friend, email member user links to profile page
  x$(document).ready(function() {
    x$(".ningbar-userLinks.linkbar").appendTo(".profileCoverArea-frame");
  });
}
                   )(x$(".readmore").on("click", function(e) {
  e.preventDefault();
  x$(this).prev().prev().toggleClass("hidden");
  x$(this).prev().toggleClass("hidden");
  x$(this).text(function(i, text) {
    return text === "Show More" ? "Show Less" : "Show More";
  });
});
x$(".thisusername").html(ning.CurrentProfile.fullName);
x$("a.userprofilelink").attr("href", ning.CurrentProfile.profileUrl);
var sizeofthumb = 100;
x$(".userthumb").html("<img src="" + ning.CurrentProfile.photoUrl + "&width=" + sizeofthumb + "">");
x$(document).ready(function() {
  let StartMonth = x$(".eventPage-details .span10 ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)").addClass("startMonth");
  let januaryEvent = x$(".eventListPage .startMonth:contains(Jan)").closest("article.entry").addClass("january-events").wrapAll("<div id="januaryWrap" class="calendarGrid"></div>");
  let februaryEvent = x$(".eventListPage .startMonth:contains(Feb)").closest("article.entry").addClass("february-events").wrapAll("<div id="februaryWrap" class="calendarGrid"></div>");
  let marchEvent = x$(".eventListPage .startMonth:contains(Mar)").closest("article.entry").addClass("march-events").wrapAll("<div id="marchWrap" class="calendarGrid"></div>");
  let aprilEvent = x$(".eventListPage .startMonth:contains(Apr)").closest("article.entry").addClass("april-events").wrapAll("<div id="aprilWrap" class="calendarGrid"></div>");
  let mayEvent = x$(".eventListPage .startMonth:contains(May)").closest("article.entry").addClass("may-events").wrapAll("<div id="mayWrap" class="calendarGrid"></div>");
  let juneEvent = x$(".eventListPage .startMonth:contains(Jun)").closest("article.entry").addClass("june-events").wrapAll("<div id="juneWrap" class="calendarGrid"></div>");
  let julyEvent = x$(".eventListPage .startMonth:contains(Jul)").closest("article.entry").addClass("july-events").wrapAll("<div id="julyWrap" class="calendarGrid"></div>");
  let augustEvent = x$(".eventListPage .startMonth:contains(Aug)").closest("article.entry").addClass("august-events").wrapAll("<div id="augustWrap" class="calendarGrid"></div>");
  let septemberEvent = x$(".eventListPage .startMonth:contains(Sep)").closest("article.entry").addClass("september-events").wrapAll("<div id="septemberWrap" class="calendarGrid"></div>");
  let octoberEvent = x$(".eventListPage .startMonth:contains(Oct)").closest("article.entry").addClass("october-events").wrapAll("<div id="octoberWrap" class="calendarGrid"></div>");
  let novemberEvent = x$(".eventListPage .startMonth:contains(Nov)").closest("article.entry").addClass("november-events").wrapAll("<div id="novemberWrap" class="calendarGrid"></div>");
  let decemberEvent = x$(".eventListPage .startMonth:contains(Dec)").closest("article.entry").addClass("december-events").wrapAll("<div id="decemberWrap" class="calendarGrid"></div>");
  let januaryOuter = x$("#januaryWrap").wrap("<div class="januaryOuter monthContainer"></div>");
  let febuaryOuter = x$("#februaryWrap").wrap("<div class="februaryOuter monthContainer"></div>");
  let marchOuter = x$("#marchWrap").wrap("<div class="marchOuter monthContainer"></div>");
  let aprilOuter = x$("#aprilWrap").wrap("<div class="aprilOuter monthContainer"></div>");
  let mayOuter = x$("#mayWrap").wrap("<div class="mayOuter monthContainer"></div>");
  let juneOuter = x$("#juneWrap").wrap("<div class="juneOuter monthContainer"></div>");
  let julyOuter = x$("#julyWrap").wrap("<div class="julyOuter monthContainer"></div>");
  let augustOuter = x$("#augustWrap").wrap("<div class="augustOuter monthContainer"></div>");
  let septemberOuter = x$("#septemberWrap").wrap("<div class="septemberOuter monthContainer"></div>");
  let octoberOuter = x$("#octoberWrap").wrap("<div class="octoberOuter monthContainer"></div>");
  let novemberOuter = x$("#novemberWrap").wrap("<div class="novemberOuter monthContainer"></div>");
  let decemberOuter = x$("#decemberWrap").wrap("<div class="decemberOuter monthContainer"></div>");
  let calendarWrap = x$(".monthContainer").wrapAll("<div class="calendarWrap-container"></div>");
  x$("<h1 class="monthTitle">January</h1>").prependTo(".januaryOuter");
  x$("<h1 class="monthTitle">Feburary</h1>").prependTo(".febuaryOuter");
  x$("<h1 class="monthTitle">March</h1>").prependTo(".marchOuter");
  x$("<h1 class="monthTitle">April</h1>").prependTo(".aprilOuter");
  x$("<h1 class="monthTitle">May</h1>").prependTo(".mayOuter");
  x$("<h1 class="monthTitle">June</h1>").prependTo(".juneOuter");
  x$("<h1 class="monthTitle">July</h1>").prependTo(".julyOuter");
  x$("<h1 class="monthTitle">August</h1>").prependTo(".augustOuter");
  x$("<h1 class="monthTitle">September</h1>").prependTo(".septemberOuter");
  x$("<h1 class="monthTitle">October</h1>").prependTo(".octoberOuter");
  x$("<h1 class="monthTitle">November</h1>").prependTo(".novemberOuter");
  x$("<h1 class="monthTitle">December</h1>").prependTo(".decemberOuter");
  x$(".eventPage-details").wrap("<div class="eventDetail-wrap"></div>");
});
// Calendar Header and Buttons
x$(document).ready(function() {
  x$(".calendarGrid .eventListPage-startDate").closest(".span3").addClass("hasStartDate");
  x$("<div class="eventListPage-SameDate"></div>").appendTo(".calendarGrid .span3");
  x$(".calendarGrid .span3.hasStartDate .eventListPage-SameDate").remove();
  x$("<header class="calendarHeader"><span>Events Calendar</span><div class="calendarDisplay"><button type="button" class="calendarGrid-btn cdBtn-active"><span>&#9638</span>Grid</button><button type="button" class="calendarList-btn"><span>&#9636</span>List</button><button type="button" class="calendarDetail-btn"><span>&#x1F4CB</span>Show Details</button></header>").prependTo(".calendarWrap-container");
  x$(".calendarList-btn").click(function() {
    x$(".calendarGrid").addClass("cgList");
    x$(this).addClass("cdBtn-active");
    x$(".calendarGrid-btn").removeClass("cdBtn-active");
  });
  x$(".calendarGrid-btn").click(function() {
    x$(".calendarGrid").removeClass("cgList");
    x$(this).addClass("cdBtn-active");
    x$(".calendarList-btn").removeClass("cdBtn-active");
  });
  x$(".calendarDetail-btn").click(function() {
    x$(".calendarGrid .span13").toggleClass("showingEvent-details");
    x$(this).toggleClass("cdBtnDetails-active");
  });
});
// Calendar months for header
x$(document).ready(function() {
  x$("<div class="monthFilter"><span class="monthFilter-title">Filter Month</span><ul><li><button class="mth-filterAll filter-active">All</button></li></ul></div>").insertBefore(".monthContainer:first");
  x$(".januaryOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterJan">January</button></li>");
  x$(".februaryOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterFeb">February</button></li>");
  x$(".marchOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterMar">March</button></li>");
  x$(".aprilOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterApr">April</button></li>");
  x$(".mayOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterMay">May</button></li>");
  x$(".juneOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterJun">June</button></li>");
  x$(".julyOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterJul">July</button></li>");
  x$(".augustOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterAug">August</button></li>");
  x$(".septemberOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterSep">September</button></li>");
  x$(".octoberOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterOct">October</button></li>");
  x$(".novemberOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterNov">November</button></li>");
  x$(".decemberOuter").parents().find(".monthFilter ul").append("<li><button class="mth-filterDec">December</button></li>");
  x$(".monthFilter button").click(function() {
    x$(".monthFilter button").removeClass("filter-active");
    x$(".monthContainer").hide();
    if (x$(this).hasClass("mth-filterAll")) {
      x$(this).addClass("filter-active");
      x$(".monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterJan")) {
      x$(this).addClass("filter-active");
      x$(".januaryOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterFeb")) {
      x$(this).addClass("filter-active");
      x$(".februaryOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterMar")) {
      x$(this).addClass("filter-active");
      x$(".marchOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterApr")) {
      x$(this).addClass("filter-active");
      x$(".aprilOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterMay")) {
      x$(this).addClass("filter-active");
      x$(".mayOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterJun")) {
      x$(this).addClass("filter-active");
      x$(".juneOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterJul")) {
      x$(this).addClass("filter-active");
      x$(".julyOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterAug")) {
      x$(this).addClass("filter-active");
      x$(".augustOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterSep")) {
      x$(this).addClass("filter-active");
      x$(".septemberOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterOct")) {
      x$(this).addClass("filter-active");
      x$(".octoberOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterNov")) {
      x$(this).addClass("filter-active");
      x$(".novemberOuter.monthContainer").show();
    }
    if (x$(this).hasClass("mth-filterDec")) {
      x$(this).addClass("filter-active");
      x$(".decemberOuter.monthContainer").show();
    }
  });
});
//MEMBERS LIST PAGE BIRTHDAY LABEL
x$(document).ready(function() {
  var monthsDisplay = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var now = new Date();
  var monthDisplay = monthsDisplay[now.getMonth()];
  var birthMonth = "span.profileCoverArea-info:contains(" + monthDisplay + ")";
  var birthDay = now.getDate()
  var birthDayIs = "span.profileCoverArea-info:contains(" + birthDay + ")";
  x$(birthMonth).closest(".profileCoverArea-info").addClass("birth-month");
  x$(birthDayIs).closest(".profileCoverArea-info.birth-month").addClass("birth-Day");
  x$(".profileCoverArea-info.birth-month.birth-Day").closest(".media-frame").addClass("membersBirthday");
  x$(".profileCoverArea-info.birth-month.birth-Day").closest(".banner-frame.profileCoverArea-frame").addClass("membersBirthday-Profile");
  x$("<div class="birthday-icon"></div>").appendTo(".membersBirthday .avatar-frame");
  x$("<span class="birthdayMsg">Birthday Today</span>").insertAfter("span.profileCoverArea-info.birth-month.birth-Day");
});
//MEMBERS BIRTHDAY LINK PAGE AND PROFILE PAGE
x$(document).ready(function() {
  x$(".page-birthday-today .content-header").load("/members .content-header");
  x$("<li><a class="birthdayMembersShow" href="/birthday-today">Birthdays Today</a></li>").insertAfter(".page-members .subnav li:last");
  x$(".birthdayWidget").load("/members .matrix", function() {
    var monthsDisplay = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var now = new Date();
    var monthDisplay = monthsDisplay[now.getMonth()];
    var birthMonth = "span.profileCoverArea-info:contains(" + monthDisplay + ")";
    var birthDay = now.getDate()
    var birthDayIs = "span.profileCoverArea-info:contains(" + birthDay + ")";
    x$(birthMonth).closest(".profileCoverArea-info").addClass("birth-month");
    x$(birthDayIs).closest(".profileCoverArea-info.birth-month").addClass("birth-Day");
    x$(".profileCoverArea-info.birth-month.birth-Day").closest("li").addClass("membersBirthday");
    var hasBirthdays = x$("li.membersBirthday").closest(".birthdayWidget").addClass("hasBirthdays");
    var hasBirthdaysCount = hasBirthdays.length
    if (hasBirthdaysCount <= 0) {
      x$(".birthdayWidget").addClass("noBirthdays");
    }
    x$(".profileCoverArea-info.birth-month.birth-Day").closest(".media-frame").addClass("membersBirthday");
    x$(".profileCoverArea-info.birth-month.birth-Day").closest(".banner-frame.profileCoverArea-frame").addClass("membersBirthday-Profile");
    x$(".tabContainerSection-tab > span:contains("Birthdays Today")").closest(".tabContainerSection-tab").addClass("birthTab");
    x$("<span class="birthCounter"></span>").appendTo(".birthTab");
    var todaysBirthday = x$(".profileCoverArea-info.birth-month.birth-Day").closest("li").addClass("membersBirthday");
    var birthdaysCount = todaysBirthday.length;
    x$(".birthdayWidget").closest(".section-html").addClass("birthWidge");
    x$(".birthWidge .module-name").text("Birthdays Today " + birthdaysCount + " ");
    x$(".birthCounter").append().text("" + birthdaysCount + "");
    if (birthdaysCount <= 0) {
      x$(".birthCounter").hide();
    }
    x$("<div class="birthday-icon"></div>").appendTo(".membersBirthday .avatar-frame");
    x$("<span class="birthdayMsg">Birthday Today</span>").insertAfter("span.profileCoverArea-info.birth-month.birth-Day");
  });
});
// BY BIZZ 190222 VER1
// Pin by category option
x$(document).ready(function() {
  /* Remove catergory from byline*/
  if (!x$("body").hasClass("isAdmin")) {
    x$(".entry-byline a[href$="pinnedContent"]").remove(); //Remove link from byline for category
  }
  /* Remove Admin Cat for non admins in category list */
  if (!x$("body").hasClass("isAdmin")) {
    x$(".categorySelectionList > optgroup:nth-child(1) > option").filter(function() {
      return x$.trim(x$(this).text()) == "pinnedContent"
    }).remove(); // remove pinnedContent cat
  }
  if (!x$("body").hasClass("isAdmin")) {
    x$(".categorySelectionList > option").filter(function() {
      return x$.trim(x$(this).text()) == "pinnedContent"
    }).remove(); // remove pinnedContent cat
  }
  /* Remove Admin Cat for non admins in mobile select menu */
  if (!x$("body").hasClass("isAdmin")) {
    x$("select.subnav > option").filter(function() {
      return x$.trim(x$(this).text()) == "pinnedContent"
    }).remove(); // remove pinnedContent cat
  }
  /* Remove options in nav if NOT admin */
  if (!x$("body").hasClass("isAdmin")) {
    x$("ul.subnav li a[href$="pinnedContent"]").remove(); // Remove pinnedContent tab from page nav
    x$("ul.subnav li:empty").remove(); // Remove the empty list space
  }
  /* Hide Categories Box if none in it but show the pinned option for admins */
  if (x$(".categorySelectionList > optgroup:nth-child(1) > option").length <= 0) {
    x$(".entryEditPage-categoryContainer").remove();
  }
  x$(".module-name a[href$="pinnedContent"]").closest(".grid-frame").addClass("pinnedPost-container");
  x$(".pinnedPost-container .module-body").closest(".pinnedPost-container").addClass("pinned-hasContent");
  x$(".photoDetailPage").closest(".central-content").addClass("is-photoDetailPage");
  x$(".videoDetailPage").closest(".central-content").addClass("is-videoDetailPage");
  x$(".blogDetailPage").closest(".central-content").addClass("is-blogDetailPage");
  x$(".discussionDetailPage").closest(".central-content").addClass("is-forumDetailPage");
  x$(".articleDetailPage").closest(".central-content").addClass("is-articleDetailPage");
  x$(".eventDetailPage").closest(".central-content").addClass("is-eventDetailPage");
});
//SHARING VER10 CODE JBIZLEY 2022
x$(document).ready(function() {
  x$(".discussionDetailPage .entry-content,.articleDetailPage .entry-content, .blogDetailPage .entry-content").each(function() {
    if (x$(this).find("img").length <= 0) {
      x$(this).closest("body").addClass("sharing-noImage");
    } else {
      x$(this).closest("body").addClass("sharing-hasImage").removeClass("sharing-noImage");
    }
  });
  x$(".blogDetailPage .blogDetailPage-image").closest("body").addClass("sharing-hasImage");
  x$(".articleDetailPage .articleDetailPage-image").closest("body").addClass("sharing-hasImage");
  x$(".photoDetailPage").closest("body").addClass("sharePhoto sharing-hasImage");
  x$(".videoDetailPage").closest("body").addClass("shareVideo sharing-hasImage");
  x$(".eventDetailPage").closest("body").addClass("shareEvent sharing-hasImage");
  if (ning.CurrentProfile === null) {
    x$("body").addClass("visitor");
  } else {
    x$("body").addClass("isMember");
  }
  const sharingWrapperContainer = x$("<div class="sharingOverlay"><div class="sharingWrapper-container"><div class="sharingWrapper-inner"><section class="sharingContainer-Part1"><header class="sharingHeader"><h1 class="sharingTitle">Sharing</h1></header><div class="sharingStart-container"><h3 class="sharingPage-title"></h3><span class="sharedTitle"></span><span class="sharingLink"></span><div class="saySomething-div"><h3>Say Something About This ?</h3><textarea class="saySomething" placeholder="You can add a short message about the post here..."></textarea></div><footer class="sharingStart-footer sharingFooter"><div class="sharing-footerButtons"><button class="shareCancel sharingButtons" title="Cancel">Cancel</button><button class="shareThis-button sharingButtons" title="Share This">Share</button></footer></section><section class="sharingFinish"><h1 class="finishTitle">Sharing Complete</h1><footer class="sharingComplete-footer sharingFooter"><div class="sharing-footerButtons"><button class="sharingFinish-close sharingButtons" title="Finish Sharing">Finish</button></div></section></div></div>").prependTo("body").hide();
  let shareContainerActual = x$(".module-name:contains("sharingContainer-page")").closest(".section-activity").addClass("sharingContainer-Actual").hide(); //this is the actual activity section
  let hasSharing = x$(".sharingContainer-Actual").closest("body").addClass("sharingAvailable"); // if an activity has been added to a page for sharing
  let shareActivitySection = x$(".sharingContainer-Actual .feed-story, .sharingContainer-Actual .activityFeed-updateButton,.sharingContainer-Actual .activityFeed-moreOldItemsButton").hide();
  let attachActivity = x$(".sharingContainer-Actual").appendTo(".sharingActivity-container");
  let shareOptions = x$("<div class="shareTools"><a class="shareTools-share" title="Share Post" href="#/" >Share This<span>&#8634</span></a><a class="shareTools-share-group" title="Share Group" href="#/" >Share Group<span>&#8634</span></a></div>").insertBefore(".discussionDetailPage-mainSection .entry-headline, .videoDetailPage .entry-headline, .photoDetailPage .entry-headline, .articleDetailPage .entry-headline, .blogDetailPage .entry-headline, .eventDetailPage .entry-headline,.pollDetailPage .entry-headline, .groupHub-groupTitleContainer").hide();
  x$("body.sharing-noImage .sharedTitle").text("Shared Post....");
  x$("body.sharing-hasImage .sharedTitle").text("Shared Post.....");
  x$("body.sharePhoto.sharing-hasImage .sharedTitle").text("Shared Photo.....");
  x$("body.shareVideo.sharing-hasImage .sharedTitle").text("Shared Video.....");
  x$("body.shareEvent.sharing-hasImage .sharedTitle").text("Shared Event.....");
  x$("body.visitor .shareTools").remove();
  x$(".sharingLink").hide();
  x$(".sharingAvailable .shareTools").show();
  x$(".sharingAvailable .shareTools-share-group ").hide();
  x$(".sharingAvailable .groupHub-group .shareTools-share").hide();
  x$(".sharingAvailable .groupHub-group .shareTools-share-group").show();
  x$(".sharingFinish").hide();
  // Share Button
  x$(".shareTools-share").click(function() {
    x$(this).closest(".section-primaryContent").addClass("isSharing");
    var PostsUrl = window.location.href;
    x$(".sharingLink").append(PostsUrl);
    x$(".isSharing .entry-title").clone().appendTo(".sharingPage-title");
    x$(".sharingOverlay").addClass("active");
  });
  //Share Group Button
  x$(".shareTools-share-group").click(function() {
    x$(".groupHub-group").removeClass("sharingGroup");
    var GroupUrl = x$(this).closest("a.matrix-media-1-1").attr("href");
    x$(this).closest(".groupHub-group").addClass("sharingGroup");
    x$(".sharingGroup .groupHub-groupTitle").clone().appendTo(".sharingPage-title");
    x$(".sharingLink").append(GroupUrl);
    x$(".sharingOverlay").addClass("active");
    x$(".sharedTitle").text("Shared Group.....");
  });
  // Share Cancel Button
  x$(".shareCancel").click(function() {
    x$(".sharingOverlay").removeClass("active");
    x$(".section-primaryContent").removeClass("isSharing");
    x$(".shareTools-share").hide();
    x$(".sharingGroup .shareTools-share-group").hide();
  });
  // Share This Button
  x$(".shareThis-button ").click(function() {
    var sharingPost = x$(".sharedTitle").text();
    var sharingValue = x$(".sharingLink").text();
    var sharingAddTitle = x$(".isSharing .entry-title").text().toUpperCase();
    var saySomethingTxt = x$(".saySomething").val();
    x$(".js-statusForm .input-full").append(sharingPost + "\n" + sharingValue + "\n" + sharingAddTitle + "\n" + saySomethingTxt);
    x$(".js-statusForm .button-primary").trigger("click");
    x$(".sharingContainer-Part1").hide();
    x$(".sharingFinish").show();
  });
  // Share Finish Button
  x$(".sharingFinish-close").click(function() {
    x$(".sharingLink, .sharingPage-title").text("");
    x$(".sharingWrapper-container").removeClass("active");
    x$(".sharingAvailable .shareTools, .sharingAvailable .shareTools-share-group").hide();
    x$(".sharingOverlay").removeClass("active");
    x$(".section-primaryContent").removeClass("isSharing");
  });
  // Sharing Into Activity Feed
  x$(".activityFeed-detailTitle.create_status:contains("Shared Group.....")").closest(".feed-story").addClass("sharedPost-activity shared-Group ");
  x$(".activityFeed-detailTitle.create_status:contains("Shared Post.....")").closest(".feed-story").addClass("sharedPost-activity sharedPost-hasImage ");
  x$(".activityFeed-detailTitle.create_status:contains("Shared Post...")").closest(".feed-story").addClass("sharedPost-activity sharedPost-noImage");
  x$(".activityFeed-detailTitle.create_status:contains("Shared Photo.....")").closest(".feed-story").addClass("sharedPost-activity sharedPhoto sharedPost-hasImage ");
  x$(".activityFeed-detailTitle.create_status:contains("Shared Video.....")").closest(".feed-story").addClass("sharedPost-activity sharedVideo sharedPost-hasImage ");
  x$(".activityFeed-detailTitle.create_status:contains("Shared Event.....")").closest(".feed-story").addClass("sharedPost-activity sharedEvent sharedPost-hasImage ");
  x$(".sharedPost-activity .activityFeed-headline").html(function() {
    return x$(this).html().replace("posted a", "is sharing a");
  });
  x$(".sharedPost-activity.sharedEvent .activityFeed-headline").html(function() {
    return x$(this).html().replace("is sharing a", "is sharing an");
  });
  x$(".sharedPost-activity header:nth-child(1) > a:nth-child(2)").text("post");
  x$(".sharedPost-activity.sharedPhoto header:nth-child(1) > a:nth-child(2)").text("photo");
  x$(".sharedPost-activity.sharedVideo header:nth-child(1) > a:nth-child(2)").text("video");
  x$(".sharedPost-activity.sharedEvent header:nth-child(1) > a:nth-child(2)").text("event");
  x$(".shared-Group header:nth-child(1) > a:nth-child(2)").text("group");
  x$(".feedEvent-createStatus.shared-Group a.media-img").each(function() {
    var url = x$(this).attr("href");
    x$(this).load(url + " .groupHeader-image, .groupHeader-groupName");
  });
  // Sharing Into Activity Feed updating the new items with code on click of the update buttons rather than the code running all the time on the activity feed
  x$(".activityFeed-updateButton.activityFeed-moreOldItemsButton, .activityFeed-updateButton.activityFeed-moreNewItemsButton").click(function() {
    x$(".activityFeed").ajaxStop(function() {
      x$(".activityFeed-detailTitle.create_status:contains("Shared Group.....")").closest(".feed-story").addClass("sharedPost-activity shared-Group ");
      x$(".activityFeed-detailTitle.create_status:contains("Shared Post.....")").closest(".feed-story").addClass("sharedPost-activity sharedPost-hasImage ");
      x$(".activityFeed-detailTitle.create_status:contains("Shared Post...")").closest(".feed-story").addClass("sharedPost-activity sharedPost-noImage");
      x$(".activityFeed-detailTitle.create_status:contains("Shared Photo.....")").closest(".feed-story").addClass("sharedPost-activity sharedPhoto sharedPost-hasImage ");
      x$(".activityFeed-detailTitle.create_status:contains("Shared Video.....")").closest(".feed-story").addClass("sharedPost-activity sharedVideo sharedPost-hasImage ");
      x$(".activityFeed-detailTitle.create_status:contains("Shared Event.....")").closest(".feed-story").addClass("sharedPost-activity sharedEvent sharedPost-hasImage ");
      x$(".sharedPost-activity .activityFeed-headline").html(function() {
        return x$(this).html().replace("posted a", "is sharing a");
      });
      x$(".sharedPost-activity header:nth-child(1) > a:nth-child(2)").text("post");
      x$(".sharedPost-activity.sharedPhoto header:nth-child(1) > a:nth-child(2)").text("photo");
      x$(".sharedPost-activity.sharedVideo header:nth-child(1) > a:nth-child(2)").text("video");
      x$(".sharedPost-activity.sharedEvent header:nth-child(1) > a:nth-child(2)").text("event");
      x$(".shared-Group header:nth-child(1) > a:nth-child(2)").text("group");
      x$(".feedEvent-createStatus.shared-Group a.media-img").each(function() {
        var url = x$(this).attr("href");
        x$(this).load(url + " .groupHeader-image, .groupHeader-groupName");
      });
    });
  });
});
//MEMBER QUICK VIEW
x$(document).ready(function() {
  x$(".membersListPage-user").closest(".module-body").addClass("memberList-body");
  x$(".membersListPage-user .friendLink-icon.icon-user-add").closest(".membersListPage-user").addClass("notFriends");
  x$(".membersListPage-user a.friendLink").closest(".membersListPage-user").addClass("hasButtons");
  x$("<div class="memberInfo-container"></button><button class="memberInfo-button" title="Quick View">Quick View</button><div class="memberButton-header"><button class="closeMember-Info" title="Close">X</button></div></div>").appendTo(".membersListPage-user .matrix-item");
  x$(".closeMember-Info").hide();
  x$("<div></div>").attr("id", "overlayMembers").prependTo(".memberList-body").hide();
  x$(".memberInfo-button").click(function() {
    x$("html, body").animate({
      scrollTop: "0px"
    }, 500);
    x$("#overlayMembers").show();
    x$("body").css("cursor", "wait");
    //x$("body").css("overflow","hidden");
    x$(this).closest(".membersListPage-user").addClass("viewing-MemberInfo");
    x$(this).closest(".matrix-item").addClass("viewMemberInfo");
    x$(this).closest(".memberInfo-container").append("<div class="memberInfo-show"><div class="memberInfo-showHeader">About Member</div><div class="memberInfo-content">Loading...</div></div>");
    x$(".membersListPage-user.viewing-MemberInfo .membersListPage-userInfo").hide();
    x$(".viewMemberInfo .closeMember-Info").show();
    x$(".viewMemberInfo .memberInfo-button").hide();
    x$(".matrix-item.viewMemberInfo .memberInfo-content").load(x$(".matrix-item.viewMemberInfo a.media-img.avatar-frame").attr("href") + " .module-body.aboutMember", function() {
      x$(".membersListPage-user.viewing-MemberInfo .membersListPage-userInfo").show();
      x$("body").css("cursor", "default");
    });
  });
});
// Class for the new list pages for photos and bundles
x$(document).ready(function() {
  x$(".photoListPage").addClass("newPhotoList-v5");
  x$(".section-photoBundle").addClass("newPhotoList-v5");
});
// Photo And Photo Bundles Matrix
x$(document).ready(function() {
  x$(".newPhotoList-v5").css("display", "none");
  x$(".newPhotoList-v5 .matrix-item").each(function() {
    var photoLink = x$(this).attr("href");
    x$(this).load(x$(this).attr("href") + " .photoDetailPage-mainSection", function() {
      x$(".newPhotoList-v5 .photoDetailPage-moreEntries, .newPhotoList-v5 .adjacentEntryLink,.newPhotoList-v5 .photoDetailPage-mainSection .image-description,.newPhotoList-v5 .photoDetailPage-mainSection a.read-more-text").remove();
      x$(".newPhotoList-v5").css("display", "block");
    });
  });
});
//CLOSE QUICK VIEW
x$(document).ready(function() {
  x$(".closeMember-Info").click(function() {
    x$(".membersListPage-user").removeClass("viewing-MemberInfo");
    x$(".matrix-item").removeClass("viewMemberInfo");
    x$(".memberInfo-show").remove();
    x$(".closeMember-Info").hide();
    x$(".memberInfo-button").show();
    x$("#overlayMembers").hide();
    //x$("body").css("overflow","visible");
  });
});
// Video And Photos Additional Classes
x$(document).ready(function() {
  x$(".videoDetailPage").closest("body").addClass("isVideoDetailPage");
});
//If videos are iframed then css makes them responsive
x$(document).ready(function() {
  if (x$(".videoDetailPage-video iframe").length > 0) {
    x$(".videoDetailPage-video").addClass("iframed");
  }
});
x$(document).ready(function() {
  var socialTitle = "Social Sharing";
  x$("<a class="Social-more-switch" alt="More" title="Show / Hide">&#9776 Social Sharing</a>").prependTo(".socialButtons");
  x$(".socialSharingList").hide();
  x$("a.Social-more-switch").toggle(function() {
    x$(".socialSharingList").slideDown(300);
    x$(this).html("&#9660 Social Sharing");
  }, function() {
    x$(".socialSharingList").slideUp(300);
    x$(this).html("&#9776 Social Sharing");
  });
});
x$("<div></div>").attr("class", "videolistControl").prependTo(".sourceContainer");
x$("<div></div>").attr("class", "videolist").appendTo(".videolistControl");
x$(".feedListPage .module-body").clone(true).appendTo(".videolist");
x$(".videolist").hide();  x$(".videolistControl").click(function() {
x$(".videolist").slideToggle(300);
x$(this).toggleClass("close");
});
x$("a.closer.pull-right.feedListPagePlayer-close").click(function() {
  x$(".videolistControl").removeClass("close");
  x$(".videolist").hide();
});
