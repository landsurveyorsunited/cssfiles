//var myPolygon;
function initialize() {
  // Map Center
  var myLatLng = new google.maps.LatLng(43.00692,-87.88428);
  // General Options
  var mapOptions = {
    zoom: 12,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.RoadMap
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  // Polygon Coordinates
  var triangleCoords = [
    new google.maps.LatLng(43.06452,-87.92514),
    new google.maps.LatLng(43.06427,-87.87329),
    new google.maps.LatLng(43.0442,-87.89149),
    new google.maps.LatLng(43.00692,-87.88428),
    new google.maps.LatLng(42.9744,-87.85201),
    new google.maps.LatLng(42.97089,-87.92033),
    new google.maps.LatLng(43.02362,-87.92788)
  ];
  // Styling & Controls
  myPolygon = new google.maps.Polygon({
    paths: triangleCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });

  myPolygon.setMap(map);
  google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
}

//Display Coordinates below map
function getPolygonCoords() {
  var len = myPolygon.getPath().getLength();
  var htmlStr = "";
  for (var i = 0; i < len; i++) {
    htmlStr += "(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "),";
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  document.getElementById('info').innerHTML = htmlStr;
}
function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}