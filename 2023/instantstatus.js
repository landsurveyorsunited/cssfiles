//to ensure user has set the instant word variable or use default.
if(typeof istext === 'undefined') var istext = 'Instant';

if(typeof(x$) != 'undefined'){
//cookie jquery plugin
(function (x$, document, undefined) {
	var pluses = /\+/g;
	function raw(s) {
		return s;
	}
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}
	var config = x$.cookie = function (key, value, options) {
		// write
		if (value !== undefined) {
			options = x$.extend({}, config.defaults, options);
			if (value === null) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = config.json ? JSON.stringify(value) : String(value);
			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', 
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}
		return null;
	};
	config.defaults = {};
	x$.removeCookie = function (key, options) {
		if (x$.cookie(key) !== null) {
			x$.cookie(key, null, options);
			return true;
		}
		return false;
	};
})(jQuery, document);

//inject checkbox beside share button
x$('#status-button-wrapper').prepend('<input id="instantcheck" name="instantcheck" type="checkbox" style="margin-left:10px;font-size:12px;" value="true"><label for="instantcheck">&nbsp;'+ istext +'</label></input>');

//obtain cookie from user browser
var instantstat = x$.cookie('instantstat');
  if(instantstat == null || instantstat =='' || instantstat == 'undefined'){
  //cookie not found that means user has not yet selected whether they want instant or not
  //user has yet to check the checkbox , so uncheck it
  x$('#instantcheck').attr('checked',false);
  } else{
  //user has checked the checkbox in the past
  //so check the checkbox
  x$('#instantcheck').attr('checked',true);
  }
  
    x$('#instantcheck').live('click',function(){

    //user clicked on instantcheck checkbox
      if(x$(this).is(':checked')){
      //user checked the checkbox
      //create the cookie
       x$.cookie('instantstat',  'true' , { expires: 365, path: '/' });
      } else {
      //user uncheck the checkbox
      //destroy the cookie
       x$.removeCookie('instantstat', { path: '/' });
      }
    });
    
    //enter key click event
    x$('.xj_status_input').keypress(function(e) {
      if(e.which == 13) {
       //if the key is 13 , which is enter key
             if(x$('#instantcheck').is(':checked')){
               //instant is on
               //simulate click on the share button so the status will be posted.
               x$('#status-button-wrapper .feed-action-button').click();
             } else {
               //instant is off
               //do nothing 
             }
      } else {
      }
    });
} else {
}

}
