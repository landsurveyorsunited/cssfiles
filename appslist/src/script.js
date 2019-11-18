//Sheetsu URL
var sheetsJSON = "https://spreadsheets.google.com/feeds/list/1vrGiUdjeOgE8tcV8eIxlRS2loAWear1ifQYpOwB5ICo/od6/public/values?alt=json";

var appsContainer = document.getElementById('apps');

var appTemplate = function( app ) {
  
  //console.log();
  var appName = [
      '<div class="topcoat-button-bar__item">',
        '<button class="topcoat-button-bar__button hint" data-hint="App Name">',
          '<span class="">',app.Name,'</span>',
        '</button>',
      '</div>'
  ];
  
  var appIcon = function( link, icon, name ) {
      if( is.empty(link) ) return '';
      var html = [
        '<div class="topcoat-button-bar__item">',
          '<a href="',link,'" class="topcoat-button-bar__button duplicate hint" data-hint="',name,'" alt="',name,'">',
            '<i class="fa ',icon,'"></i>',
          '</a>',
        '</div>'
       ];
    return html.join("");
  }
  
  var htmlArray = [
    '<li>',
      '<div class="topcoat-button-bar edit-bar animated fadeInUp" data-info="">',
        appName.join(""),
        appIcon(app.iOS, "fa-apple", "iOS"),
        appIcon(app.Android, "fa-android", "Android"),
      '</div>',
    '</li>'
  ];
  
  return htmlArray.join("");//Output with no separators
}

var request = new XMLHttpRequest();

request.open('GET', sheetsJSON, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    
    var apps = data.feed.entry;
    
    console.log( apps );
    
    for (i = 0; i < apps.length; i++) { 
      //console.log( apps[i] );
      var row = apps[i];
      var app = {};
      app.Name = row.gsx$name.$t;
      app.iOS = row.gsx$ios.$t;
      app.Android = row.gsx$android.$t;
      var el = appTemplate(app);
      appsContainer.insertAdjacentHTML('beforeend', el);
    }
    
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();