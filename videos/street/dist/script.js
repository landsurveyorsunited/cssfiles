function initialize(lat, lng) {
  var center = new google.maps.LatLng(lat, lng);
  
  var panoramaOptions = {
    position: center,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById("map-canvas"), panoramaOptions);
}
// google.maps.event.addDomListener(window, 'load', initialize);

window.addEventListener('load', function() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      initialize(position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log('We can\'t find your location.');
  }
});