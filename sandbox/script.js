const dataZone = 'data_zone.json';
const dataMarker = 'data_marker.json';
// const fileName = 'rodents.geojson';
const state = {};

// Read File
const loadFile = (callback, file) => {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
};

// Initialize Map
const initializeMap = (mapId, lat, lon, zoom) => {
  state.mymap = L.map(mapId).setView([lat, lon], zoom);
  state.mymap.on('click', e => {
    console.log(e);
  });
};

// initializeMap('mapid', 42.35, -71.08, 13); // Boston
initializeMap('mapid', 50.318, 3.51, 13); // Valenciennes

// Initialize Layer
const initializeLayer = (mapURI, options) => {
  L.tileLayer(mapURI, options).addTo(state.mymap);
};

// LayerMap Values
const mapURI =
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
const mapLayerOptions = {
  maxZoom: 18,
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11'
};

initializeLayer(mapURI, mapLayerOptions);

// Load data_marker file
loadFile(response => {
  data = JSON.parse(response);
  console.log(data);

  // Set marker
  const customMarker = L.icon({
    iconUrl: 'marker.png',
    iconSize: [50, 50]
  });

  // Add a marker for each feature
  L.geoJson(data, {
    pointToLayer: (feature, latlng) => {
      let marker = L.marker(latlng, { icon: customMarker });
      marker.bindPopup(feature.properties.name);
      return marker;
    }
  }).addTo(state.mymap);
}, dataMarker);

// Load data_zone file
loadFile(response => {
  data = JSON.parse(response);
  console.log(data);

  // Add a color layer for each feature
  L.geoJson(data, {
    pointToLayer: (feature, latlng) => {
      let marker = L.marker(latlng, { icon: customMarker });
      marker.bindPopup(feature.properties.name);
      return marker;
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<strong>Zone ${feature.properties.name}</strong><br/>`);
    }
  }).addTo(state.mymap);
}, dataZone);
