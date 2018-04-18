
var map;

var Mapster = (function(){
  function Mapster(element, options) {
    // var map = new google.maps;
    this.gMap = new google.maps.Map(element, options);
  };

  Mapster.prototype = {

    _on : function(map, event, action){
      return google.maps.event.addListener(map, event, action);
    },
    gMarker : function(data){
      return new google.maps.Marker(data);
    },

  };

  return Mapster;
}());

Mapster.create = function(element, options){
  return new Mapster(element, options);
}

function initMap() {

  // variable for route service
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  // map
  var options = {
    center: {lat: -6.557089, lng: 107.823932},
    zoom: 19
  };
  var element = document.getElementById('app');

  map = Mapster.create(element, options);

  // set route
  // directionsDisplay.setMap(map);
  directionsService.route({
    origin: {lat:-6.556508644273163, lng:107.82432360251619},
    destination: { lat:-6.556369931242257, lng:107.7609121799469 },
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

  // set info

  map._on(map.gMap, 'click', function(e) {
    alert(e.latLng);
    // var quest = window.prompt("Enter info !");
    //
    // var infowindow = new google.maps.InfoWindow({
    //   content: quest
    // });
    // set center
    // map.gMap.setCenter(e.latLng);

    // make marker
    // marker = map.gMarker({
    //   position: e.latLng,
    //   map: map.gMap
    // });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

  });


}
