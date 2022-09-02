/*
 * Showing geofences that include the specified position
 *
 * Usage:
 *   set position in format "latitude, longitude" and press Apply button
 *   doubleclick on the map to set position of click
 *   choose unit from the list to set position of selected unit
 *   (click Refresh button to update matching position by current unit position)
 *
 * Implementation:
 *   
 *   1. Load library 'resourceZones' by:
 *
 *        var session = wialon.core.Session.getInstance();
 *        session.loadLibrary('resourceZones');
 *
 *   2. Subscribe for latest unit position,
 *                and resource list with their geofences:
 *
 *        var unitFlags     = wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastPosition,
 *            resourceFlags = wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.zones;
 *
 *        session.updateDataFlags([
 *          {type: 'type', data: 'avl_unit', flags: unitFlags, mode: 0},
 *          {type: 'type', data: 'avl_resource', flags: resourceFlags, mode: 0}
 *        ], callback);
 *
 *   3. To find geofences, that contains some point use wialon.util.Helper.getZonesInPoint:
 *
 *        wialon.util.Helper.getZonesInPoint({
 *          lat: lat, lon: lon,
 *          zoneId: {<resourceId>: [<zoneId>, ...], ...}
 *        }, callback);
 *
 *      If you want to find in all zones in the resource, pass an empty array, like that:
 *
 *        zoneId: {<resourceId>: [], <otherResourceId>: []}
 *
 *      To find in all resources you need pass all resources ids.
 *
 *      In callback you will receive error code in the first argument and the response in the second,
 *      response will be in format of get_zones_by_point Remote API call:
 *
 *        https://sdk.wialon.com/wiki/en/sidebar/remoteapi/apiref/resource/get_zones_by_point
 *
 *      So, it have the same format as your zoneId parameter, keys of object — resource ids, values — arrays of zone ids.
 *
 *   4. If you want get some additional data of geofences, you can use resource.getZonesData, example:
 *
 *        https://sdk.wialon.com/playground/demo/get_zone_params
 *
 *      API: https://sdk.wialon.com/wiki/en/sidebar/remoteapi/apiref/resource/get_zone_data
 *
 *      You also can pass flags to get only specified data:
 *
 *        var zoneFlags = wialon.item.MZone.flags.area | wialon.item.MZone.flags.perimeter;
 *
 *        resource.getZonesData([<zoneId>, ...], zoneFlags, callback);
 *
 *      If you are requesting perimeter or area,
 *      be accurate with values, cause it can be not only meters, but foots too, depends on resource settings,
 *      check resource.getMeasureUnits() and documentation for decoding values (general property "mu"):
 *
 *        https://sdk.wialon.com/wiki/en/sidebar/remoteapi/apiref/format/resource
 */

// Token that will be used for auth
// For more info about how to generate token check
// http://sdk.wialon.com/playground/demo/app_auth_token
var TOKEN = '5dce19710a5e26ab8b7b8986cb3c49e58C291791B7F0A7AEB8AFBFCEED7DC03BC48FF5F8';

// global variables
var map, marker, markerByUnit = {},
    currentPoint = null,
    currentUnitId = null;

// Unit markers constructor
function getUnitMarker(unit) {
  // check for already created marker
  var marker = markerByUnit[unit.getId()];
  if (marker) return marker;
    
  var unitPos = unit.getPosition();
  
  // don't create marker if unit haven't a position
  if (!unitPos) return null;
    
  marker = L.marker([unitPos.y, unitPos.x], {
    clickable: true,
    draggable: false,
    icon: L.icon({
      iconUrl: unit.getIconUrl(32),
      iconAnchor: [16, 16] // set icon center
    })
  });
  marker.on('click', function(e) {
    // select unit in UI
    $('#units').val(unit.getId());

    getGeofencesByUnitId(unit.getId());
  });

  // save marker
  markerByUnit[unit.getId()] = marker;
  
  return marker;
}

// Print message to log
function msg(text) { $('#log').prepend(text + '<br/>'); }

function onlyTwoSignsAfterComma(n) {
  return Math.round(n * 100) / 100;
}

// show area in feets or meters (miles or kilometers)
function prettyPrintArea(area, measureUnits) {
  if (typeof measureUnits !== 'number') measureUnits = 0;
  
  var multiplier, small, big;
  
  if (measureUnits === 1 || measureUnits === 2) { // feets/miles
    multiplier = 5280 * 5280;
    small = ' ft²';
    big = ' mi²';
  } else { // meters/kilometers
    multiplier = 1000;
    small = ' m²';
    big = ' km²';
  }

  if (area < multiplier) return Math.ceil(area) + small;
  else return onlyTwoSignsAfterComma(area / multiplier) + big;
}
// show distance in feets or meters (miles or kilometers)
function prettyPrintDistance(distance, measureUnits) {
  if (typeof measureUnits !== 'number') measureUnits = 0;
  
  var multiplier, small, big;
  
  if (measureUnits === 1 || measureUnits === 2) { // feets/miles
    multiplier = 5280;
    small = ' ft';
    big = ' mi';
  } else { // meters/kilometers
    multiplier = 1000;
    small = ' m';
    big = ' km';
  }
    
  if (distance < multiplier) return Math.ceil(distance) + small;
  else return onlyTwoSignsAfterComma(distance / multiplier) + big;
}

function init() { // Execute after login succeed
  // get instance of current Session
  var session = wialon.core.Session.getInstance();
    
  // load Geofences Library 
  session.loadLibrary('resourceZones');
  // load Icon Library
  session.loadLibrary('itemIcon');
    
  // specify what kind of data should be returned
  var unitFlags = wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastPosition,
      resourceFlags = wialon.item.Item.dataFlag.base | wialon.item.Resource.dataFlag.zones;
  
  // load items to the current session
  session.updateDataFlags(
    // Items specification, request unit list and resource list
    [{type: 'type', data: 'avl_unit', flags: unitFlags, mode: 0},
     {type: 'type', data: 'avl_resource', flags: resourceFlags, mode: 0}],
    function (error) { // updateDataFlags callback
      if (error) {
        // show error, if update data flags was failed
        msg(wialon.core.Errors.getErrorText(error));
      } else {
        msg('Units&Resources are loaded');
        
        initUIData();
      }
    }
  );
}

// will be called after updateDataFlags success
function initUIData() {
  var session = wialon.core.Session.getInstance();
  
  var units = session.getItems('avl_unit'),
      resources = session.getItems('avl_resource');
  
  var unitsEl = $('#units'),
      resourcesEl = $('#resources');
  
  units.forEach(function(unit) {
    // add option to the select with unit id and name
    unitsEl.append($('<option>').text(unit.getName()).val(unit.getId()));
      
    var unitMarker = getUnitMarker(unit);
    if (unitMarker) unitMarker.addTo(map);
    
    // listen for new messages
    unit.addListener('changePosition', function(event) {
      // event is qx.event.type.Data
      // extract message data
      var pos = event.getData();
      
      // move or create marker, if not exists
      if (pos) {
        if (unitMarker) {
          unitMarker.setLatLng([pos.y, pos.x]);
        } else {
          // create new marker
          unitMarker = getUnitMarker(unit);
          
          if (unitMarker) {
            unitMarker.addTo(map);
          } else {
            msg('Got message with pos, but unit don\'t have a position');
          }
        }
      }
    });
  });
  
  resources.forEach(function(resource) {
    // add options to the select with resource id and name
    resourcesEl.append($('<option>').text(resource.getName()).val(resource.getId()));
  });
  
  // on unit selected
  unitsEl.change(function() {
    getGeofencesByUnitId(unitsEl.val());
  });
  
  var positionEl = $('#latlng');
  
  $('#apply-location-button').click(function() {
    // extracts two numbers divided by non-digits
    var latlngRegex = /^[^\d]*?(-?\d+(?:\.\d+)?)[^\.\d]+?(-?\d+(?:\.\d+)?)[^\d]*$/;
    
    var groups = latlngRegex.exec(positionEl.val());
    if (!groups) { // invalid string
      positionEl.addClass('invalid');
      return;
    }
    
    var lat = parseFloat(groups[1]),
        lon = parseFloat(groups[2]);
    
    if (isFinite(lat) && isFinite(lon) && (-90 <= lat && lat <= 90) && (-180 <= lon && lon <= 180)) {
      // deselect unit, because we have selected location manually
      $('#units').val('0');
      
      getGeofencesByPoint(lat, lon);
    } else {
      positionEl.addClass('invalid');
    }
  });
  
  // refresh on resource selected
  resourcesEl.change(function() {
    if (currentUnitId !== null) {
      getGeofencesByUnitId(currentUnitId);
    } else if (currentPosition) {
      getGeofencesByPoint(currentPosition.lat, currentPosition.lon);
    }
  });
  
  // refresh unit
  $('#unit-refresh-button').click(function() {
    if (currentUnitId) getGeofencesByUnitId(currentUnitId);
  });
}

function getGeofencesByUnitId(unitId) {
  unitId = parseInt(unitId, 10);
  if (!isFinite(unitId)) {
      msg('Bad unit id');
      return;
  }
  
  // save for refreshes
  currentUnitId = unitId;
    
  if (unitId === 0) {
    $('#unit-refresh-button').hide();
    return;
  }
    
  var session = wialon.core.Session.getInstance();
          
  var unit = session.getItem(unitId);
  if (!unit) {
    msg('Unit not found');
    $('#unit-refresh-button').hide();
    return;
  }
  
  // Show button for refreshing data by current unit position
  $('#unit-refresh-button').show();
  
  var position = unit.getPosition();
  if (!position) {
    msg('Unit haven\'t a position');
    $('#results-table').hide();
    $('#no-results').hide();
    return;
  }

  _getGeofencesInPoint(position.y, position.x);
}
function getGeofencesByPoint(lat, lon) {
  // save for refreshes
  currentUnitId = null;
    
  // hide unit refresh button
  $('#unit-refresh-button').hide();

  _getGeofencesInPoint(lat, lon);
}

// implementation
function _getGeofencesInPoint(lat, lon) {
  currentPosition = {lat: lat, lon: lon};
    
  // center map at the point
  map.setView([lat, lon]);

  // move marker, or create, if not exists
  if (marker) {
    marker.setLatLng([lat, lon]);
  } else {
    marker = L.marker([lat, lon], {
      clickable: false,
      draggable: false,
      zIndexOffset: 1000
    });
    marker.addTo(map);
  }
  
  // five signs is precise enough
  var displayLat = Math.round(lat * 100000) / 100000,
      displayLon = Math.round(lon * 100000) / 100000;
  
  // show position
  $('#latlng').val(displayLat + ', ' + displayLon);
  $('#latlng').removeClass('invalid');
  
  // get selected resource
  var resourceId = parseInt($('#resources').val());
  
  // object with requested resources to find zones in
  var requestZoneId = {};
  
  var session = wialon.core.Session.getInstance();
  
  if (resourceId === 0) {
    // add all resources to the search
    session.getItems('avl_resource').forEach(function(resource) {
      requestZoneId[resource.getId()] = [];
    });
  } else {
    // empty array means "search for all geofences in this resource"
    requestZoneId[resourceId] = [];
  }
  
  msg('Loading zones in point');
  
  // do a request
  wialon.util.Helper.getZonesInPoint({
    lat: lat, lon: lon,
    zoneId: requestZoneId
  }, function(error, data) {
    if (error) {
      msg(wialon.core.Errors.getErrorText(error));
      return;
    }
      
    msg('Zones have loaded');
    
    handleZonesInPointResult(data);
  });
}

function handleZonesInPointResult(data) {
  var session = wialon.core.Session.getInstance();

  var resultsTableBodyEl = $('#results-table-body');
  
  // remove old results
  resultsTableBodyEl.empty();

  // numerify result rows
  var zoneI = 0;
  
  // format of response: https://sdk.wialon.com/wiki/en/sidebar/remoteapi/apiref/resource/get_zones_by_point

  // Save zones to make a batch request for additional data
  // {resource: wialon.item.Resource,
  //  zonesIds: [<zoneId>, ...],
  //  zonesElements: [{
  //    area: <DOMElement>,
  //    perimeter: <DOMElement>
  //  }, ...]}
  var resourcesToLoadData = [];

  for (var resourceId in data) if (data.hasOwnProperty(resourceId)) {
    var foundZonesIds = data[resourceId];
    
    resourceId = parseInt(resourceId);
    var resource = session.getItem(resourceId);
    
    var resourceToLoadData = {
      resource: resource,
      zonesIds: [],
      zonesElements: []
    };
    resourcesToLoadData.push(resourceToLoadData);
    
    foundZonesIds.forEach(function(zoneId) {
      var zone = resource.getZone(zoneId);
      
      // zone data format:
      // https://sdk.wialon.com/wiki/en/sidebar/remoteapi/apiref/resource/get_zone_data
     
      var zoneType;
      switch (zone.t) {
          case 1: zoneType = 'Line'; break;
          case 2: zoneType = 'Polygon'; break;
          case 3: zoneType = 'Circle'; break;
          default: zoneType = 'Unknown';
      }
      
      var tr = $('<tr>');
      
      var zoneElements = {
        // Save elements to update them when area and perimeter will be loaded
        area: $('<td>Loading...</td>'),
        perimeter: $('<td>Loading...</td>')
      };
      resourceToLoadData.zonesIds.push(zoneId);
      resourceToLoadData.zonesElements.push(zoneElements);
      
      tr.append('<td>' + (++zoneI) + '</td>'); // #
      tr.append('<td>' + zone.n + '</td>'); // Name
      tr.append('<td>' + zoneType + '</td>'); // Type
        
      tr.append(zoneElements.area); // Area
      tr.append(zoneElements.perimeter); // Perimeter
      
      tr.append('<td>' + resource.getName() + '</td>'); // Resource name
      
      resultsTableBodyEl.append(tr);
    });
  }

  var remote = wialon.core.Remote.getInstance();
  // Start a batch to do all getZonesData in one HTTP request
  remote.startBatch();

  resourcesToLoadData.forEach(function(toLoad) {
    // request only area and perimeter
    var zoneFlags = wialon.item.MZone.flags.area | wialon.item.MZone.flags.perimeter;
    
    // all requests will be batched and executed only after finishBatch call
    toLoad.resource.getZonesData(toLoad.zonesIds, zoneFlags, function(error, data) {
      if (error) {
        msg(wialon.core.Errors.getErrorText(error));
        return;
      }
      
      // update all table rows
      data.forEach(function(zone, i) {
        toLoad.zonesElements[i].area.text(prettyPrintArea(zone.ar, toLoad.resource.getMeasureUnits()));
        toLoad.zonesElements[i].perimeter.text(prettyPrintDistance(zone.pr, toLoad.resource.getMeasureUnits()));
      });
    });
  });

  msg('Loading extra zones data (area & perimeter)');

  // perform all getZonesData requests
  remote.finishBatch(function(error) {
    if (error) msg(wialon.core.Errors.getErrorText(error));
    else msg('Extra zone data have loaded');
  });
  
  if (zoneI > 0) {
    $('#results-table').show();
    $('#no-results').hide();
  } else {
    $('#results-table').hide();
    $('#no-results').show();
  }
}

function initMap() {
  // create a map in the "map" div, set the view to a given place and zoom
  map = L.map('map', {
    // disable zooming, because we will use double-click to set up marker
    doubleClickZoom: false
  }).setView([53.9, 27.55], 14);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    // copyrights
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="http://gurtam.com">Gurtam</a>'
  }).addTo(map);
  
  // handle mouse double-click event
  map.on('dblclick', function(e) {
    // hide hint
    $('#doubleclick-hint').hide();
      
    // deselect unit, because we are selected location manually
    $('#units').val('0');
    
    getGeofencesByPoint(e.latlng.lat, e.latlng.lng);
  });
}

// execute when DOM ready
$(document).ready(function () {  
  // init session
  wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");

  wialon.core.Session.getInstance().loginToken(TOKEN, "", // try to login
    function (code) { // login callback
      // if error code - print error message
      if (code){ msg(wialon.core.Errors.getErrorText(code)); return; }
      msg('Logged successfully');
      initMap();
      init(); // when login suceed then run init() function
    }
  );
});
