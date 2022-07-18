// jq loaded
(function($, window, undefined){
  // dom ready
  $(function(){
    var $map = $('.map'),
        homeMarker,
        map;
    
    // init map - iffy
    (function initMap() {
      // default location - beatuiflul vienna
      var lat = 48.2081743,
      	lng = 16.3738189,
        // create initial latlng object
        latlng = new google.maps.LatLng(lat, lng),
        // map options
        myOptions = {
        	center: latlng,
          keyboardShortcuts: false,
          mapTypeControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          zoom: 13,
          zoomControl: false
        };

      // init map
      map = new google.maps.Map(
        document.getElementById("map_canvas"),
        myOptions
      );
      
      // set marker on start-position
      homeMarker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: 'Home'
      });
  })();
    
    function mapSetInteraction(state) {
      var classname = 'loading';
      state = state || false;
      $map.toggleClass(classname, state);
    }
    
    // get location by geolocation
    function getGeoLocation() {
      // modernizr feature-check
      if (Modernizr.geolocation) {
        // show interaction aka loading-info
        mapSetInteraction(true); 

        // request location-data
        navigator.geolocation.getCurrentPosition(function (data) {
          var coords = data.coords;
          // get positions by given geolocation
          setLocation(coords.latitude, coords.longitude);

          // hide interaction
          mapSetInteraction();
        });
      }
      else {
        alert('could not access geoloaction');
        return false;
      }
		};
    
    // get location by text
    function getTextLocation() {
      var $location = $('#location'),
      	address = $location.val(),
        addressData = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + address);
      
      if (address.length <= 0) {
        $location.focus();
        alert('no location inserted');
        return false;
      }

      // process xhr
      addressData.done(function (data) {
        var results = data.results;

        // set location of first result if possible
        if (results.length) {
          var location = results[0].geometry.location;
          setLocation(location.lat, location.lng);
        } 
        else {
          throw new Error('no valid location found');
          return false;
        }
      });
    }
    
    // set location
    function setLocation(lat, lng) {
      if (!lat || !lng) {
        alert('no location data given');
        return false;
      }

      // show latlng data (for debug)
      $('#lat').val(lat);
      $('#lng').val(lng);

      // create latlng object
      var latlng = new google.maps.LatLng(lat, lng);
      // reset marker
      homeMarker.setPosition(latlng);
      // center map
      map.setCenter(latlng);
    }
    
    // geo location button listener (event handler)
    $('#getLocation').on('click', function () {
      getGeoLocation();
    });
    
    // form submit listener
    $('form').on('submit', function (e) {
      e.preventDefault();
      getTextLocation();
      return false;
    });
});
}(jQuery, window));