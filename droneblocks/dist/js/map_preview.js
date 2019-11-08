var marker_count = 2;
var google_map;
var home_location;
var mission_path;
var waypoint_markers = [];

// Global info window to display altitude and other params
var infoWindow;

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}

function getMapPreviewCode() {
  var code = 'var mission="";'
  code += Blockly.JavaScript.workspaceToCode(workspace);
  code = eval(code);
  return code;
}

function initMapPreview() {
  
  // Initialize the info window
  infoWindow = new google.maps.InfoWindow()
  
  var center = {lat: 39.57182223734374, lng: -98.7890625};
  
  google_map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center,
    mapTypeId: 'hybrid',
    tilt: 0,
    rotateControl: false
  });
  
  // New waypoint based on distance and heading
  google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
     dist = dist / 6371 / 3280.84;
     brng = brng.toRad();

     var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();
     var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                          Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

     var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                  Math.cos(lat1), 
                                  Math.cos(dist) - Math.sin(lat1) *
                                  Math.sin(lat2));

     if (isNaN(lat2) || isNaN(lon2)) return null;

     return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
  }

  // Load the existing home location or detect a new one
  var home_location_lat = localStorage.getItem("home_location_lat")
  
  if (home_location_lat) {
    
    home_location = new google.maps.LatLng({lat: parseFloat(home_location_lat), lng: parseFloat(localStorage.getItem("home_location_lng"))});
    
    addMarker(new google.maps.LatLng({lat: home_location.lat(), lng: home_location.lng()}), 'home', true, "Takeoff");
    
    google_map.setCenter({lat: home_location.lat(), lng: home_location.lng()});
    
    google_map.setZoom(17);
    
    drawMission();
    
  } else {
    
    estimateUserLocation();
    
  }
  
}

function estimateUserLocation() {
  
  // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var infoWindow = new google.maps.InfoWindow({map: google_map});
      infoWindow.setPosition(pos);
      infoWindow.setContent('This is an estimate of your current location. It will be used as the home location for your simulated mission. You can change the location by dragging the H marker to another place on the map.');
      google_map.setCenter(pos);
      google_map.setZoom(17);
      
      home_location = new google.maps.LatLng(pos);
      
      // Save the location in storage
      localStorage.setItem("home_location_lat", pos.lat);
      localStorage.setItem("home_location_lng", pos.lng);
      
      addMarker(home_location, 'home', true, "Takeoff");
      
      drawMission();
      
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The location service failed. Please pan and zoom to set your simulated home location.' : 'Error: Your browser doesn\'t support geolocation. Please pan and zoom to set your simulated home location.');
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addMarker(latlng, icon, isDraggable, content) {
  
  var marker = new google.maps.Marker({
    position: latlng,
    map: google_map,
    icon: 'icons/' + icon + '.png',
    draggable: isDraggable
  });
  
  // Listen for a click to display the info window
  marker.addListener('click', function() {
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
  });
  
  // Add marker to the array
  waypoint_markers.push(marker);
  
  // Make the home marker draggable
  if (icon == "home") {
    
    // Reset the home locaiton point
    google.maps.event.addListener(marker, "dragend", function(event) {
    
      home_location = new google.maps.LatLng({lat: event.latLng.lat(), lng: event.latLng.lng()});
      
      // Save the location in storage
      localStorage.setItem("home_location_lat", home_location.lat());
      localStorage.setItem("home_location_lng", home_location.lng());
      
      // Remove the polyline
      mission_path.setMap(null);
      
      // Remove all markers
      for (var i = 0; i < waypoint_markers.length; i++) {
          waypoint_markers[i].setMap(null);
      }
      
      // Reset the marker array
      waypoint_markers = [];
      
      // Reset the marker_count
      marker_count = 2;
      
      // Add the home marker again
      addMarker(home_location, 'home', true, "Takeoff");
      
      // Redraw the mission
      drawMission();
    
    }); 
  }
}

// takeoff,25|::fly_forward,25,10|yaw_right,90|::fly_forward,25,10|land
function drawMission() {
  
  // Get the code from the parent container
  var code = parent.getMapPreviewCode()
  var commands = code.split("|");
  
  var current_heading = 0;
  var current_location = home_location;
  var polyline_coords = [
    {lat: current_location.lat(), lng: current_location.lng()}
  ];

  var current_altitude = 0;
  var gimbal_pitch = 0;
  
  // Loop through the command string
  for (i=0; i < commands.length; i++) {
    
    var command = commands[i];
    console.log(command);
    
    if (command.indexOf("takeoff") != -1) {
      
      current_altitude = command.split(",")[1];
      
    } else if (command.indexOf("change_altitude") != -1) {
      
      current_altitude = command.split(",")[1];
      
    } else if (command.indexOf("fly_forward") != -1) {
      
      var infoWindowContent = "<strong>Lat:</strong> " + current_location.lat() + "<br />";
      infoWindowContent += "<strong>Lng:</strong> " + current_location.lng() + "<br />";
      infoWindowContent += "<strong>Altitude:</strong> " + current_altitude + " ft<br />";
      
      var params = command.split(",");
      var dist = params[1];
      
      current_location = current_location.destinationPoint(current_heading, parseInt(dist));
      polyline_coords.push({lat: current_location.lat(), lng: current_location.lng()});

      addMarker(current_location, 'marker' + marker_count, false, infoWindowContent);
      
      marker_count++;
      
    } else if (command.indexOf("yaw_right") != -1) {
      
      var params = command.split(",");
      var angle = params[1];
      
      current_heading += parseInt(angle);
      
    } else if (command.indexOf("yaw_left") != -1) {
      
      var params = command.split(",");
      var angle = params[1];
      
      current_heading -= parseInt(angle);
      
    }
    
  }
  
  // Draw the flight path
  mission_path = new google.maps.Polyline({
    path: polyline_coords,
    geodesic: true,
    strokeColor: '#FF00FF',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  
  mission_path.setMap(google_map);
  
}

