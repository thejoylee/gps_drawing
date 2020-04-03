'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlam95bGVlIiwiYSI6ImNrN3BmZnZ5NDBqYjQzbW1pNGs0MWFiejkifQ.9stnbzBJqom6XYjX73VYcA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thejoylee/ck8jeyygq00ny1iml5aye553q',
    center: [114.150124, 22.247250],
    zoom: 15
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})
map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})
map.addControl(geolocate, 'top-left')

// create variable to keep track of user's location, default to center of the map
let current_location = [114.150124, 22.247250]

// update variable whenever geolocation event fires
geolocate.on('geolocate', function(event) {
    current_location = [event.coords.longitude, event.coords.latitude]
    console.log('geolocated', current_location)
})

// update the variable whenever you click on map
map.on('click',function(event) {
    current_location = [event.lngLat.lng, event.lngLat.lat]
    console.log('clicked',current_location)
})

