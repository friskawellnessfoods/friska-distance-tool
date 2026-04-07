let autocomplete;
let selectedPlace = null;

const kitchen = {
  lat: 17.452623115758335,
  lng: 78.41967516576499
};

function initAutocomplete(){

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
    travelMode: "DRIVING",
    unitSystem: google.maps.UnitSystem.METRIC

  }, function(response,status){

    if(status !== "OK"){
      alert("Error calculating distance");
      return;
    }

    const element = response.rows[0].elements[0];

    document.getElementById("result").innerHTML =
      "Distance: " + element.distance.text +
      "<br>Travel Time: " + element.duration.text;

  });

}
