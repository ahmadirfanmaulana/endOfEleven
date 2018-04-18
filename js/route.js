function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('app'), {
    zoom: 16,
    center: {lat:-6.557147102152117, lng:107.82383544047548}
  });

  function dot(){
    this.origin = false;
    this.destination = false;
  };

  var Dot = new dot();

  var infowindow = new google.maps.InfoWindow({
    content: "huhu"
  });


  google.maps.event.addListener(map, 'click', function(event){
    if (Dot.origin == false) {
      Dot.origin = event.latLng;

      new google.maps.Marker({
        position : Dot.origin,
        map : map
      });
    }
    else if(Dot.origin && Dot.destination ==false){
      Dot.destination = event.latLng;

      var route = setRoute(Dot.origin, Dot.destination);
      // alert("Successfully set route");
    }
    else {
      Dot.origin = false;
      Dot.destination = false;

      // alert('Route is destroyed');
    }
  });


  function setRoute(origin, destination) {
    directionsDisplay.setMap(map);
    return directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var distance = response.routes[0].legs[0].distance.text;
        var duration = response.routes[0].legs[0].duration.text;
        var travelMode = response.request.travelMode;

        if (travelMode == "DRIVING") {
          travelMode = "Pake Mobil";
        }
        else if (travelMode == "WALKING") {
          travelMode = "Jalan Kaki";
        }

        document.getElementById('distance').innerHTML = distance;
        document.getElementById('duration').innerHTML = duration;
        document.getElementById('travelMode').innerHTML = travelMode;
        document.getElementById('from').innerHTML = response.routes[0].legs[0].start_address;
        document.getElementById('to').innerHTML = response.routes[0].legs[0].end_address;
        // document.getElementById('to').innerHTML = travelMode;

        console.log(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }


}
