let autocomplete;

const kitchen = {
lat: 0,
lng: 0
};

function initAutocomplete(){

const input = document.getElementById("address");

autocomplete = new google.maps.places.Autocomplete(input);

}

window.onload = initAutocomplete;

function calculateDistance(){

const place = autocomplete.getPlace();

if(!place || !place.geometry){
alert("Please select address from dropdown");
return;
}

const destination = {
lat: place.geometry.location.lat(),
lng: place.geometry.location.lng()
};

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

const distanceText = response.rows[0].elements[0].distance.text;

document.getElementById("result").innerHTML =
"Distance from kitchen: " + distanceText;

});

}
