var state;
function loadcoords(){
  alert("Function coming soon")
}
function toggle() {
	var x = document.getElementById("coords");
	var y = document.getElementById("showhide");
	if(!state) { 
		x.style.display="block";
		y.innerHTML="Hide Coordinates";
		state = "vis";
		return;
	}
	else {
		x.style.display="none";
		y.innerHTML="Show Coordinates";
		state = "";
		return;
	}
}
function copied() {
	var x = document.getElementById("copied");
	x.style.display="block";
	setTimeout(function(){ x.style.display="none"; toggle(); }, 3000);
}
function clearcoords() {
	document.getElementById("action").value="";
  toggle();
}
function nsearch() {
	var nloc = document.getElementById("search").value;
	geocoder.geocode( { 'address': nloc }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
				map.setCenter(results[0].geometry.location);
			} else {
				alert("No results found");
			}
		} else {
		alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

var myOptions = {
  center: new google.maps.LatLng(41.914420, -87.666609),
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.MAP
};


var drawingManager = new google.maps.drawing.DrawingManager({
  drawingMode: google.maps.drawing.OverlayType.POLYGON,
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [ google.maps.drawing.OverlayType.POLYGON ]
  },
  polylineOptions: {
    clickable: false,
    zIndex: 1,
    editable: false
  },
  polygonOptions: {
    editable: false,
	strokeColor: '#000000',
	strokeOpacity: 1,
	strokeWeight: 1,
	fillColor: '#000000',
	fillOpacity: 0.15
  }
});

var map;
var geocoder;
var address = "seattle, wa";

function initialize() {
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  geocoder = new google.maps.Geocoder();
  google.maps.event.addListener(map, 'click', function(event) {
    alert(event.latLng);
  });


  drawingManager.setMap(map);

  google.maps.event.addDomListener(drawingManager, 'polygoncomplete', function(polygon) {
        document.getElementById("action").value += "\n\n";
      path = polygon.getPath();
      for(var i = 0; i < path.length; i++) {
        document.getElementById("action").value += path.getAt(i).lat() + "," + path.getAt(i).lng();
        if (i != path.length-1) {
        document.getElementById("action").value += '\n';
        }
      }
      drawingManager.setOptions({
        drawingControl: true
      });
  });
  if (geocoder) {
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
}

function copyToClipboard(text) {
	alert(text);
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    copied();
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
		alert("Error copying.  Please manually copy.")
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(document.getElementById("map_canvas"), 'ready', function() { drawingManager.setMap(map) } );