let autocomplete;
let selectedPlace = null;

const kitchen = new google.maps.LatLng(17.452623115758335,78.41967516576499);

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
travelMode: google.maps.TravelMode.DRIVING,
unitSystem: google.maps.UnitSystem.METRIC

}, function(response,status){

if(status !== "OK"){
alert("Error calculating distance");
return;
}

const element = response.rows[0].elements[0];

if(element.status !== "OK"){
document.getElementById("result").innerHTML = "Route not found";
return;
}

document.getElementById("result").innerHTML =
"Distance: " + element.distance.text +
"<br>Travel Time: " + element.duration.text;

});

}
