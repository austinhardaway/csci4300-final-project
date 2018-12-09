/**
 * Welcome to this monstrosity. At least there are comments. Good luck!
 * lol @ people who think frontend == css == easy
 * #whoneedsaframework #notme #killme
 */
console.log(input)
// This is the cardinal sin of JS. LOOK AT ALL THE GLOBAL VARS!!! LOOK AT THEM!
let map // the google API Map Object
let loc = { lat: 33.9238912, long: -83.36261119999999 } //fall-back lat-lng
let crawl = [] //array to be populated with picked bars
let currentBar = 0 //tracks where the user is in their crawl
let mapMarkers = [] //keeps track of our markers

/**
 * gets the current position of the user and sets it to the
 * regretfully global loc object. DOES NOT WORK over http
 * in which case the loc will always be at the predefined
 * lat long.
 */
function getPos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(a => {
      console.log('lat =' + a.coords.latitude + ' long = ' + a.coords.longitude)
      loc.lat = a.coords.latitude
      loc.long = a.coords.longitude
    })
  }
}
/**
 * Looks a little awful, but it picks numbars number of bars at
 * random from the results of the api call. No repeats.
 * This aint ya dads for loop...
 * @param {number} numbars
 * @param {Array} results
 */
function pickBars(numbars, results) {
  let set = new Set()
  for (
    let rand = Math.floor(Math.random() * results.length);
    crawl.length < numbars;
    rand = Math.floor(Math.random() * results.length)
  ) {
    if (!set.has(rand)) {
      crawl.push(results[rand])
      set.add(rand)
    }
    if (crawl.length === 20) break //this breaks hard if the user wants more than 20 bars. @TODO: Send ERROR 420 Calm down you drunkie!
  }
  console.dir(crawl)
}

/**
 * Callback function for the api call, picks the user specified
 *number of bars and saves them to the crawl array.
 * @param {Array} results
 * @param {String} status
 */
function handleResponse(results, status) {
  if (status === 'OK') {
    if (crawl.length === 0) {
      pickBars(input.numbars, results)
    }
  }
}

/**
 * Creates an initial Map, sets your location to the center and
 * launches an api call to get the bars near you.
 */
function initMap() {
  getPos()
  //defines the center of the map (temporarly) at user position
  const mapCenter = new google.maps.LatLng(loc.lat, loc.long)
  //creates the actual map object
  map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 15
  })
  //sets a marker at the user location
  mapMarkers.push(
    new google.maps.Marker({
      position: mapCenter,
      titile: 'You are here'
    })
  )
  setMarkers(map)
  //defines the options for the api call
  const request = {
    location: mapCenter,
    radius: input.radius * 1609.34, //miles -> meters
    type: 'bar',
    maxprice: input.price - 1,
    keyword: 'bar'
  }
  //Actual api call handled by the handleResponse callback
  new google.maps.places.PlacesService(map).nearbySearch(
    request,
    handleResponse
  )
}

//Sets the markers to appear on the map, clears the markers array if passed null
function setMarkers(map) {
  mapMarkers.forEach(e => {
    e.setMap(map)
  })
  if (map === null) {
    mapMarkers = []
  }
}

/**
 * resets the center of the map to be the center of you and the
 * next bar. As well as the fit the map around the two locations.
 */
function resetCenter() {
  let bounds = new google.maps.LatLngBounds() //google object that defines a rectangular space
  mapMarkers.forEach(e => {
    bounds.extend(e.getPosition()) // extends the bounds for each of the current markers (the user and the bar)
  })
  map.setCenter(bounds.getCenter()) //sets the center to the center of the new rectangle
  map.fitBounds(bounds) // fits the map zoom to the new bounds
}

document.getElementById('next').addEventListener('click', e => {
  //sets Text elements
  if (currentBar < crawl.length) {
    document.getElementById('barNum').innerHTML = `Bar #${currentBar + 1}`
    document.getElementById('name').innerHTML = crawl[currentBar].name
    document.getElementById('next').innerHTML =
      currentBar + 1 < crawl.length ? 'Next Bar' : 'Complete'

    setMarkers(null) //clears the map of current markers, seems hacky is in fact the offically google recomended method
    getPos() //refreshes the users position every time they ask for a new bar.
    mapMarkers.push(
      new google.maps.Marker({
        position: { lat: loc.lat, lng: loc.long },
        title: 'Your location'
      })
    )
    mapMarkers.push(
      new google.maps.Marker({
        position: crawl[currentBar].geometry.location,
        title: crawl[currentBar].name
      })
    )
    setMarkers(map) //sets the new markers
    resetCenter() //sets the new map center
    currentBar++
  } else if (currentBar == crawl.length) { // this however is every bit as hacky as it seems
    document.getElementById('endmessage').innerHTML =
      'Congrats on completing your crawl! Drink some water, take an advil, and get home safe! Ya animal.'
    document.getElementById('next').innerHTML = 'Back to Home'
    currentBar++
  } else {
    window.location = '/barcrawlapp'
  }
})
