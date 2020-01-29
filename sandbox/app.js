/**
 * IMPORT HARD DATA
 */
import { dataMarker } from './data/dataMarker.js';
import { dataZone } from './data/dataZone.js';
import { dataLab, dataCompany, dataEducation } from './data/data.js';
import { dataCategory } from './data/dataCategory.js';

console.log(dataMarker);
console.log(dataZone);
console.log(dataLab);
console.log(dataCategory);

import { readFile } from './utils/readFile.js';

// const dataZone = 'data_zone.json';
// const dataMarker = 'data_marker.json';

// const fileName = 'rodents.geojson';

/**
 * APP CONFIG
 */
const state = {};
let data;

// // Read File
// const readFile = (callback, file) => {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType('application/json');
//   xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
//   xobj.onreadystatechange = function() {
//     if (xobj.readyState == 4 && xobj.status == '200') {
//       // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//       callback(xobj.responseText);
//     }
//   };
//   xobj.send(null);
// };

/**
 * MAP SETUP
 */
// Initialize Map
const initializeMap = (mapId, lat, lon, zoom) => {
  state.map = L.map(mapId).setView([lat, lon], zoom);
  state.map.doubleClickZoom.disable();
  state.map.on('click', e => {
    // console.log(e);
  });
};

initializeMap('mapid', 50.318, 3.51, 13); // Valenciennes

/**
 * MAP LAYER
 */
// Initialize Layer
const initializeLayer = (mapURI, options) => {
  L.tileLayer(mapURI, options).addTo(state.map);
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

/**
 * MARKER
 */
const customMarker = L.icon({
  iconUrl: 'marker.png',
  iconSize: [50, 50]
});

// Add a marker for each feature
const markers = L.geoJson(dataMarker, {
  pointToLayer: (feature, latlng) => {
    let marker = L.marker(latlng, { icon: customMarker });
    marker.bindPopup(feature.properties.name);
    return marker;
  }
});

// Cluster Group
const clusters = L.markerClusterGroup();
clusters.addLayer(markers);
state.map.addLayer(clusters);

/**
 * LAYER
 */
L.geoJson(dataZone, {
  pointToLayer: (feature, latlng) => {
    let marker = L.marker(latlng, { icon: customMarker });
    marker.bindPopup(feature.properties.name);
    return marker;
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`<strong>Zone ${feature.properties.name}</strong><br/>`);
  },
  style: (feature, layer) => {
    let weight = 1;
    let fillOpacity = 0.5;
    let color, fillColor;
    if (feature.properties.name === 'uphf') {
      color = '#27f6e5';
      fillColor = '#99fbf3';
    } else if (feature.properties.name === 'transalley') {
      color = '#ff7b02';
      fillColor = '#ffa757';
    } else {
      color = '#627aff';
      fillColor = '#c8d0ff';
    }
    return { color: color, weight: weight, fillColor: fillColor, fillOpacity: fillOpacity };
  }
}).addTo(state.map);

/**
 * COMMAND
 */

const command = L.control({ position: 'topright' });
const map = state.map;

command.onAdd = map => {
  var div = L.DomUtil.create('div', 'command');
  div.innerHTML += '<div style="text-align:center;"><span style="font-size:18px;">Filtre</span><br /></div>';
  dataCategory.forEach(category => {
    div.innerHTML += `<form><input id='category-${category.id}' type="checkbox"/>${category.id} - ${category.name}</form>`;
  });
  return div;
};
command.addTo(state.map);

/**
 * COMMAND EVENT LISTENER
 */

// LAB MARKER
let labMarkers;
const displayLabMarkers = () => {
  console.log('displayLabMarkers()');
  const customMarker = L.icon({
    iconUrl: './images/icon/science.png',
    iconSize: [33, 44]
  });

  labMarkers = L.geoJson(dataLab, {
    pointToLayer: (feature, latlng) => {
      let marker = L.marker(latlng, { icon: customMarker });
      marker.bindPopup(feature.properties.name);
      return marker;
    }
  }).addTo(state.map);
};

const hideLabMarkers = () => {
  console.log('hideLabMarkers()');
  state.map.removeLayer(labMarkers);
};

// EDUCATION MARKER
let educationMarkers;
const displayEducationMarkers = () => {
  console.log('displayEducationMarkers()');
  const customMarker = L.icon({
    iconUrl: './images/icon/schools.png',
    iconSize: [33, 44]
  });

  educationMarkers = L.geoJson(dataEducation, {
    pointToLayer: (feature, latlng) => {
      let marker = L.marker(latlng, { icon: customMarker });
      marker.bindPopup(feature.properties.name);
      return marker;
    }
  }).addTo(state.map);
};

const hideEducationMarkers = () => {
  console.log('hideEducationMarkers()');
  state.map.removeLayer(educationMarkers);
};

// COMPANY MARKER
let companyMarkers;
const displayCompanyMarkers = () => {
  console.log('displayCompanyMarkers()');
  const customMarker = L.icon({
    iconUrl: './images/icon/engineering.png',
    iconSize: [33, 44]
  });

  companyMarkers = L.geoJson(dataCompany, {
    pointToLayer: (feature, latlng) => {
      let marker = L.marker(latlng, { icon: customMarker });
      marker.bindPopup(feature.properties.name);
      return marker;
    }
  }).addTo(state.map);
};

const hideCompanyMarkers = () => {
  console.log('hideCompanyMarkers()');
  state.map.removeLayer(companyMarkers);
};

const handleCommand = event => {
  // console.log(event);
  const checked = event.target.checked;
  const cat = event.target.id.slice(9);
  // console.log(cat);

  if (cat == 1) {
    if (checked) displayLabMarkers();
    else hideLabMarkers();
  } else if (cat == 2) {
    if (checked) displayCompanyMarkers();
    else hideCompanyMarkers();
  } else if (cat == 3) {
    if (checked) displayEducationMarkers();
    else hideEducationMarkers();
  }
};

dataCategory.forEach(category => {
  document.getElementById(`category-${category.id}`).addEventListener('click', handleCommand, false);
});
