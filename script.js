let autocomplete;
let selectedPlace = null;
let kitchen;

function initAutocomplete(){

  // kitchen defined AFTER google loads
  kitchen = new google.maps.LatLng(17.452623115758335,78.41967516576499);

  const input = document.getElementById("address");

  autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", function(){
    selectedPlace = autocomplete.getPlace();
  });

}

function calculateDistance(){

  if(!selectedPlace || !selectedPlace.geometry){
    alert("Please select address from dropdown");
    return;
  }

  const destination = selectedPlace.geometry.location;

  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix({

    origins:[kitchen],
    destinations:[destination],
    travelMode:"DRIVING"

  }, function(response,status){

    if(status !== "OK"){
      alert("Distance error");
      return;
    }

    const element = response.rows[0].elements[0];

    document.getElementById("result").innerHTML =
      "Distance: " + element.distance.text +
      "<br>Travel Time: " + element.duration.text;

  });

}
