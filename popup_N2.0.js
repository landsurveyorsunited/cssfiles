x$(document).ready(function() {
 null === ning.CurrentProfile && (x$("BODY DIV.date-count-down").show(), x$("DIV.date-count-down-2, DIV.Geo.signUpPage-signUpForm, A#date-count-down.button").hide());
 null !== ning.CurrentProfile && (x$("DIV.date-count-down-2, A#date-count-down2.button, DIV.Geo.signUpPage-signUpForm").hide(), x$(".isAdmin  A#date-count-down.button.isAdmin").show());
 x$("A#date-count-down, A#date-count-down1").live("click", function(b) {
  x$("DIV.date-count-down, A#date-count-down.button").toggle("show")
 });
 x$("A#date-count-down2.button").live("click", function(b) {
  x$("DIV.date-count-down-2").toggle("show")
 });
 x$("A#date-count-downxx.button").live("click", function(b) {
  x$("DIV.date-count-down-2, DIV.Geo.signUpPage-signUpForm").hide()
 });
 x$("A#date-count-down3.button").live("click", function(b) {
  x$("DIV.Geo.signUpPage-signUpForm").toggle("show")
 })
});

function GEOHTMLpu(b, a) {
 var c = document.createElement("div");
 c.id = "geo_html_jspu";
 c.innerHTML = b;
 document.querySelector(a || "body").appendChild(c.firstChild)
}
GEOHTMLpu('<div class="date-count-down" style="display:none;"><a id="date-count-down1" class="button">X</a><BR><p class="date-count-down-top-big">Welcome to</p><p class="your-text">If you would like to become a member<BR><P class="date-count-down-bottom-big"><a id="date-count-down3" class="button">Sign-Up</a></p></p><div class="Geo signUpPage-signUpForm"><a id="date-count-downxx" class="button">X</a><h3 class="form-legend">Create a new account\u2026</h3><form class="form1" action="/main/authorization/doSignUp?" method="post" novalidate="novalidate"><div class="form-field"><label for="signup_email">Email Address</label> <input name="emailAddress" value="" id="signup_email" class="input-full" maxlength="320" type="email" ></input></div><div class="form-field"><label for="signup_password">Password</label> <input name="password" value="" id="signup_password" class="input-full" maxlength="64" type="password" ></input></div><div class="form-field"><label for="signup_password_confirm">Retype Password</label> <input name="passwordConfirmation" value="" id="signup_password_confirm" class="input-full" maxlength="64" type="password" ></input></div><div id="submitContainer" class="form-actions"><input class="button button-primary" value="Sign Up" type="submit" ></input></div></form></div><div class="date-count-down-2"><a id="date-count-downxx" class="button">X</a><form class="form1" action="/main/authorization/doSignIn" method="post" novalidate="novalidate"><input name="xg_token" value="" type="hidden" /><div class="form-field "><br /> <label for="signin_email">Email Address</label><br /> <input name="emailAddress" value="" id="signin_email" class="input-full" type="email" /></div><div class="form-field "><br /> <label for="signin_password">Password</label><br /> <input name="password" value="" id="signin_password" class="input-full" type="password" /></div><div class="form-actions"><input class="button button-primary" value="Sign In" type="submit" /></div></form></div><a id="date-count-down2" class="button">or Sign-In</a></div>');
GEOHTMLpu('<a id="date-count-down" class="button isAdmin"  style="display:none;">Open Network Welcome</a>');
var GEOCOMpu = document.getElementsByTagName("body")[0],
 GEONodepu = document.createElement("link");
GEONodepu.type = "text/css";
GEONodepu.rel = "stylesheet";
GEONodepu.media = "screen";
GEOCOMpu.appendChild(GEONodepu);
GEONodepu.href = "//api.ning.com/files/aMLkUWs6eSNNdgFXCFTpBpYHdZfIYfSEPYRkaWo0qkFDLncO3hJwvb4IdUV70YXmrw4k5AV27J9p5udBwGzAKwHwygYB31HN/G_P_U.css";

function addGeoStyleopu(b) {
 if (null === ning.CurrentProfile) {
  var a = document.getElementById("geo_styles_jsopu");
  a || (a = document.createElement("style"), a.type = "text/css", a.id = "geo_styles_jsopu", document.getElementsByTagName("body")[0].appendChild(a));
  a.appendChild(document.createTextNode(b))
 }
}
addGeoStyleopu("HTML DIV.date-count-down{display:block;}");
x$("#RE_UP_15").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
  x$("a#date-count-down.button").hide();
 }, 15E3)
});
x$("#RE_UP_30").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
  x$("a#date-count-down.button").hide();
 }, 3E4)
});
x$("#RE_UP_45").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
  x$("a#date-count-down.button").hide();
 }, 45E3)
});
x$("#RE_UP_60").length && null == ning.CurrentProfile && x$(document).ready(function() {
 window.setInterval(function() {
  x$("DIV.date-count-down").show("slow")
  x$("a#date-count-down.button").hide();
 }, 6E4)
});
