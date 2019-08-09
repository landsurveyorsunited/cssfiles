// Geody Home Config - Favorite Links

var shwFav=true; // Show Favorite Links
var startshwFav=true; // Show Favorite Links at startup (if shwFav=true)
var favNewWin='_self'; // New Window behavior: '_self': same window, '_blank': a new window for every instance, 'new': reuse the same window for all links
if (window.innerWidth>smlwinw) {var favsprow=5;} else {var favsprow=0;} // Favorite links per row (0: No limit)
var favs=new Array(); // Title, Web Address (URL), Image (suggested size: 32 x 32 pixels)
i=0;
++i; favs[i]=new Array('Google','https://www.google.com/','img/websites/favx_google_favicon.gif');
++i; favs[i]=new Array('GMail','https://mail.google.com/','img/websites/favx_gmail_favicon.gif');
++i; favs[i]=new Array('Notes','https://keep.google.com/','img/websites/favx_googlekeep_favicon.gif');
if (window.innerWidth<=smlwinw) {++i; favs[i]=new Array('','!+','img/websites/fav_more_bigpad_blu.gif','img/websites/fav_less_bigpad_blu.gif');} // Extra links: you can open as many extra links sections as you like
++i; favs[i]=new Array('ID Gen','https://www.elfqrin.com/fakeid.php','img/websites/favx_eq-man_favicon.gif');
if (window.innerWidth>smlwinw) {++i; favs[i]=new Array('','!+','img/websites/fav_more_bigpad_blu.gif','img/websites/fav_less_bigpad_blu.gif');} // Extra links: you can open as many extra links sections as you like
++i; favs[i]=new Array('News','https://news.google.com/','img/websites/favx_google-news_favicon.gif');
++i; favs[i]=new Array('YouTube','https://www.youtube.com/','img/websites/favx_youtube_favicon.gif');
++i; favs[i]=new Array('Netflix','https://www.netflix.com/','img/websites/favx_netflix_favicon.gif');
++i; favs[i]=new Array('Facebook','https://www.facebook.com/','img/websites/favx_facebook_favicon.gif');
++i; favs[i]=new Array('Dictionary','https://www.merriam-webster.com/','img/websites/favx_merriam-webster_favicon.gif');
// ++i; favs[i]=new Array('Translator','https://translate.google.com/','img/websites/favx_google-translate_favicon.gif');

var favsn=i; // Total Number of Favorite Links
