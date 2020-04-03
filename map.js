'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlam95bGVlIiwiYSI6ImNrN3BmZnZ5NDBqYjQzbW1pNGs0MWFiejkifQ.9stnbzBJqom6XYjX73VYcA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thejoylee/ck8jeyygq00ny1iml5aye553q',
    center: [114.149991, 22.241631],
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
let current_location = [114.149991, 22.241631]

// update variable whenever geolocation event fires
geolocate.on('geolocate', function(event) {
    current_location = [event.coords.longitude, event.coords.latitude]
    console.log('geolocated', current_location)   

    if (active) {
        path.push(current_location)
        map.getSource('drawing').setData(geojson)   // update the layer because the path has changed
    }

})

map.on('click', function(event) {
    current_location = [event.lngLat.lng, event.lngLat.lat]
    console.log('clicked', current_location)        

    if (active) {                
        path.push(current_location)
        console.log(path)           
        map.getSource('drawing').setData(geojson)   // update the layer because the path has changed        
    }

})

let draw_btn = document.getElementById('draw_btn')

// conditional if statement which code is running by determining our active variable
draw_btn.addEventListener('click', function() {

    console.log('clicked draw_btn')

    if (active) {            // if we're already drawing, stop drawing
        stopDrawing()
    } else {                    // otherwise, start drawing
        startDrawing()
    }

})

let active = false
let start_marker = new mapboxgl.Marker()
let path = []

function startDrawing() {
    active = true

    start_marker.setLngLat(current_location)
    start_marker.addTo(map)

    draw_btn.style['background-color'] = "red"
    draw_btn.sttyle['color'] = "white"
    draw_btn.value = 'Stop and save'

    path.push(current_location)

    geojson.features.push({
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": path
        }
    })
    map.getSource('drawing').setData(geojson)
}

function stopDrawing() {
    active = false

    draw_btn.style['background-color'] = "white"
    draw_btn.sttyle['color'] = "black"
    draw_btn.value = 'Start'

}

map.on('load', function() {             // 'load' event handler
    map.addLayer({                      // add a layer
        'id': 'drawing',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': null
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#50C3DF',
            'line-width': 5,
            'line-opacity': .8
        }
    })
})

let geojson = {
    "type": "FeatureCollection",
    "features": []
}