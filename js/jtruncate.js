(function($){$.fn.jTruncate=function(options){var defaults={length:300,minTrail:20,moreText:"more",lessText:"less",ellipsisText:"...",moreAni:"",lessAni:""};var options=$.extend(defaults,options);return this.each(function(){obj=$(this);var body=obj.html();if(body.length>options.length+ options.minTrail){var splitLocation=body.indexOf(' ',options.length);if(splitLocation!=-1){var splitLocation=body.indexOf(' ',options.length);var str1=body.substring(0,splitLocation);var str2=body.substring(splitLocation,body.length- 1);obj.html(str1+'<span class="truncate_ellipsis">'+ options.ellipsisText+'</span>'+'<span class="truncate_more">'+ str2+'</span>');obj.find('.truncate_more').css("display","none");obj.append('<div class="clearboth">'+'<a href="#" class="truncate_more_link">'+ options.moreText+'</a>'+'</div>');var moreLink=$('.truncate_more_link',obj);var moreContent=$('.truncate_more',obj);var ellipsis=$('.truncate_ellipsis',obj);moreLink.click(function(){if(moreLink.text()==options.moreText){moreContent.show(options.moreAni);moreLink.text(options.lessText);ellipsis.css("display","none");}else{moreContent.hide(options.lessAni);moreLink.text(options.moreText);ellipsis.css("display","inline");}
return false;});}}});};})(jQuery);
/*
     FILE ARCHIVED ON 01:42:54 Jun 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:31:05 Apr 19, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 198.721 (3)
  esindex: 0.006
  captures_list: 225.933
  CDXLines.iter: 19.018 (3)
  PetaboxLoader3.datanode: 70.698 (5)
  exclusion.robots: 0.274
  exclusion.robots.policy: 0.248
  RedisCDXSource: 0.946
  PetaboxLoader3.resolve: 490.622 (3)
  load_resource: 1952.589
*/