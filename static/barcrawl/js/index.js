console.log("js loaded");

const key = "AIzaSyAXkrApyv2tJPktwkq_nVgVxs8S9O_Dfso";
const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const loc = { lat: 0, long: 0 };
let map;
let service;
let input;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(a => {
    console.log("lat =" + a.coords.latitude + " long = " + a.coords.longitude);
    loc.lat = a.coords.latitude;
    loc.long = a.coords.longitude;
  });
} else {
  loc = { lat: 33.9238912, long: -83.36261119999999 }; //My apartment....
}

function makeUri({ rad, price }) {
  return `${baseUrl}?location=${loc.lat},${
    loc.long
  }&radius=${rad}&type=bar&maxprice=${price - 1}&key=${key}`;
}

function handleResponse(results, status) {
  if (status === "OK") {
    let list = document.createElement("ol");
    for (let i = 0; i < results.length && i < input.numBars; i++) {
      let li = document.createElement("li");
      li.innerHTML = `${results[i].name} - ${results[i].vicinity}`;
      list.appendChild(li);
    }
    document.getElementById("output").appendChild(list);
  }
}

function initMap({ rad, price }) {
  const mapCenter = new google.maps.LatLng(loc.lat, loc.long);
  map = new google.maps.Map(document.getElementById("map"), {
    center: mapCenter,
    zoom: 15
  });
  const request = {
    location: mapCenter,
    radius: rad,
    type: "bar",
    maxprice: price - 1,
    keyword: "bar"
  };
  console.log(request);
  new google.maps.places.PlacesService(map).nearbySearch(
    request,
    handleResponse
  );
}

document.getElementById("submit").addEventListener("click", e => {
  input = {
    rad: document.getElementById("rad").value,
    numBars: document.getElementById("numbars").value,
    price: document.getElementById("price").value
  };
  initMap(input);
});

// fetch()

//  AIzaSyAXkrApyv2tJPktwkq_nVgVxs8S9O_Dfso  <- Api key
