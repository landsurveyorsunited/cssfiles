/*!
 * GEOCOMs_Sign-Up_Sign-In_Pop-Up v4 *
 * George H. Compton IV *
 * george_compton@hotmail.com *
 * �2015 GEOCOM software\webware Inc *
 * Date: MAY 01 7:56am 2016 *
 */

x$(document).ready(function() {
 null === ning.CurrentProfile && (x$("BODY DIV.date-count-down").show(), x$("DIV.date-count-down-2, DIV.Geo.signUpPage-signUpForm, A#date-count-down.button").hide(), x$("A#date-count-down3.button").click(function() {
   x$("DIV.Geo.signUpPage-signUpForm").load("/main/authorization/signUp?")
  }), x$("A#date-count-downIE.button").click(function() {
   x$("DIV.Geo.signUpPage-signUpForm").load("/main/authorization/signUp? DIV.site-body.container-fixedFull.signUpPage.signInFlow")
  }), x$("DIV.date-count-down-2").load("/main/authorization/signIn? .site-body.container-fixedFull.signInPage.signInFlow"),
  x$("A#date-count-down, A#date-count-down1").live("click", function(a) {
   x$("DIV.date-count-down, A#date-count-down.button").toggle("show")
  }), x$("A#date-count-down2.button").live("click", function(a) {
   x$("DIV.date-count-down-2, a#date-count-downxx.button").toggle("show")
  }), x$("A#date-count-downxx.button").live("click", function(a) {
   x$("DIV.date-count-down-2, DIV.Geo.signUpPage-signUpForm, a#date-count-downxx.button").hide()
  }), x$("A#date-count-down3.button, A#date-count-downIE.button").live("click", function(a) {
   x$("DIV.Geo.signUpPage-signUpForm, a#date-count-downxx.button").toggle("show")
  }),
  x$("a#date-count-downxx.button").hide())
});

function GEOHTMLpu(a, c) {
 var b = document.createElement("div");
 b.id = "geo_html_jspu";
 b.innerHTML = a;
 document.querySelector(c || "body").appendChild(b.firstChild)
}
if (null === ning.CurrentProfile) {
 GEOHTMLpu("\x3c!--[if IE]><style>DIV.date-count-down P#IE{ display:block!important;} DIV.date-count-down P#notIE{ display:none!important;}</style><![endif]--\x3e");
 GEOHTMLpu('<div class="date-count-down" style="display:none;"><a id="date-count-down1" class="button">X</a><BR><p class="date-count-down-top-big">Welcome to</p><p class="your-text">If you would like to become a member<BR><P class="date-count-down-bottom-big">\x3c!--[if IE]> <div id="IEroot"> <![endif]--\x3e <p id="IE"><a id="date-count-downIE" class="button">Sign-Up</a></p> <p id="notIE"><a id="date-count-down3" class="button">Sign-Up</a></p> \x3c!--[if IE]> </div> <![endif]--\x3e</p></p><a id="date-count-downxx" class="button">Close</a><div class="Geo signUpPage-signUpForm"></div><div class="date-count-down-2"></div><a id="date-count-down2" class="button">or Sign-In</a></div>');
 GEOHTMLpu('<a id="date-count-down" class="button isAdmin"  style="display:none;">Open Network Welcome</a>');
 var GEOCOMpu = document.getElementsByTagName("body")[0],
  GEONodepu = document.createElement("link");
 GEONodepu.type = "text/css";
 GEONodepu.rel = "stylesheet";
 GEONodepu.media = "screen";
 GEOCOMpu.appendChild(GEONodepu);
 GEONodepu.href = "http://api.ning.com:80/files/D4tgE4d4mNruBR6k1TW9IpL5BoY10SMRG*wSr6iJDERTSFNrm-Jma379l8258SJ-pEYoplM4MunKJk3ucnp8DyL17mA2cuHr/G_P_U.css"
}
x$("#RE_UP_15").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
 }, 15E3)
});
x$("#RE_UP_30").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
 }, 3E4)
});
x$("#RE_UP_45").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
 }, 45E3)
});
x$("#RE_UP_60").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
 }, 6E4)
});
