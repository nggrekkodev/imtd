/**
 * IMPORT HARD DATA
 */
import { dataMarker } from './data/dataMarker.js';
import { dataZone } from './data/dataZone.js';
import { dataAll, dataLab, dataCompany, dataEducation } from './data/data.js';
import { dataCategory, getCategoriesFromData } from './data/dataCategory.js';
import { LeafletMap } from './model/LeafletMap.js';

console.log(dataAll);
// console.log(dataMarker);
// console.log(dataZone);
// console.log(dataLab);
// console.log(dataCategory);

/**
 * APP CONFIG
 */
// const leafletMap = {};
// let data;
const categories = getCategoriesFromData();
const leafletMap = new LeafletMap('mapid', 50.318, 3.51, 13, dataAll, categories);
leafletMap.initializeMap();
/**
 * MAP SETUP
 */
// Initialize Map
// const initializeMap = (mapId, lat, lon, zoom) => {
//   leafletMap.map = L.map(mapId).setView([lat, lon], zoom);
//   leafletMap.map.doubleClickZoom.disable();
//   leafletMap.map.on('click', e => {
//     // console.log(e);
//   });
// };

// initializeMap('mapid', 50.318, 3.51, 13); // Valenciennes

/**
 * MAP LAYER
 */
// Initialize Layer
// const initializeLayer = (mapURI, options) => {
//   L.tileLayer(mapURI, options).addTo(leafletMap.map);
// };

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

leafletMap.initializeTileLayer(mapURI, mapLayerOptions);
leafletMap.initializeCustomMarkerIcon();
leafletMap.initializeCustomMarkers(dataMarker);
leafletMap.initializeClusterGroup();
// leafletMap.tileLayer.addTo(leafletMap.map);

/**
 * MARKER
 */
// const customMarker = L.icon({
//   iconUrl: 'marker.png',
//   iconSize: [50, 50]
// });

// Add a marker for each feature
// const markers = L.geoJson(dataMarker, {
//   pointToLayer: (feature, latlng) => {
//     let marker = L.marker(latlng, { icon: leafletMap.customMarkerIcon });
//     marker.bindPopup(feature.properties.name);
//     return marker;
//   }
// });

// Cluster Group
// const clusters = L.markerClusterGroup();
// clusters.addLayer(markers);
// leafletMap.map.addLayer(clusters);

/**
 * LAYER
 */
leafletMap.initializePolygonLayer(dataZone);
// L.geoJson(dataZone, {
//   pointToLayer: (feature, latlng) => {
//     let marker = L.marker(latlng, { icon: customMarker });
//     marker.bindPopup(feature.properties.name);
//     return marker;
//   },
//   onEachFeature: (feature, layer) => {
//     layer.bindPopup(`<strong>Zone ${feature.properties.name}</strong><br/>`);
//   },
//   style: (feature, layer) => {
//     let weight = 1;
//     let fillOpacity = 0.5;
//     let color, fillColor;
//     if (feature.properties.name === 'uphf') {
//       color = '#27f6e5';
//       fillColor = '#99fbf3';
//     } else if (feature.properties.name === 'transalley') {
//       color = '#ff7b02';
//       fillColor = '#ffa757';
//     } else {
//       color = '#627aff';
//       fillColor = '#c8d0ff';
//     }
//     return { color: color, weight: weight, fillColor: fillColor, fillOpacity: fillOpacity };
//   }
// }).addTo(leafletMap.map);

/**
 * COMMAND
 */
// const command = L.control({ position: 'topright' });
// const map = leafletMap.map;

leafletMap.initializeCommand();

// command.onAdd = map => {
//   var div = L.DomUtil.create('div', 'command');
//   div.innerHTML += '<div style="text-align:center;"><span style="font-size:18px;">Filtre</span><br /></div>';

//   categories.forEach(category => {
//     div.innerHTML += `<form><input id='cb-${category}' type="checkbox"/>${category}</form>`;
//   });
//   // dataCategory.forEach(category => {
//   //   div.innerHTML += `<form><input id='category-${category.id}' type="checkbox"/>${category.name}</form>`;
//   // });
//   return div;
// };
// command.addTo(leafletMap.map);

/**
 * COMMAND EVENT LISTENER
 */
// LAB MARKER
// let labMarkers;
// const displayLabMarkers = () => {
//   console.log('displayLabMarkers()');
//   const customMarker = L.icon({
//     iconUrl: './images/icon/science.png',
//     iconSize: [33, 44]
//   });

//   labMarkers = L.geoJson(dataLab, {
//     pointToLayer: (feature, latlng) => {
//       let marker = L.marker(latlng, { icon: customMarker });
//       marker.bindPopup(feature.properties.name);
//       return marker;
//     }
//   }).addTo(leafletMap.map);
// };

// const hideLabMarkers = () => {
//   console.log('hideLabMarkers()');
//   leafletMap.map.removeLayer(labMarkers);
// };

// EDUCATION MARKER
// let educationMarkers;
// const displayEducationMarkers = () => {
//   console.log('displayEducationMarkers()');
//   const customMarker = L.icon({
//     iconUrl: './images/icon/schools.png',
//     iconSize: [33, 44]
//   });

//   educationMarkers = L.geoJson(dataEducation, {
//     pointToLayer: (feature, latlng) => {
//       let marker = L.marker(latlng, { icon: customMarker });
//       marker.bindPopup(feature.properties.name);
//       return marker;
//     }
//   }).addTo(leafletMap.map);
// };

// const hideEducationMarkers = () => {
//   console.log('hideEducationMarkers()');
//   leafletMap.map.removeLayer(educationMarkers);
// };

// COMPANY MARKER
// let companyMarkers;
// const displayCompanyMarkers = () => {
//   console.log('displayCompanyMarkers()');
//   const customMarker = L.icon({
//     iconUrl: './images/icon/engineering.png',
//     iconSize: [33, 44]
//   });

//   companyMarkers = L.geoJson(dataCompany, {
//     pointToLayer: (feature, latlng) => {
//       let marker = L.marker(latlng, { icon: customMarker });
//       marker.bindPopup(feature.properties.name);
//       return marker;
//     }
//   }).addTo(leafletMap.map);
// };

// const hideCompanyMarkers = () => {
//   console.log('hideCompanyMarkers()');
//   leafletMap.map.removeLayer(companyMarkers);
// };

// const handleCommand = event => {
//   // console.log(event);
//   const checked = event.target.checked;
//   const cat = event.target.id.slice(3);
//   // console.log(cat);

//   if (cat == 1) {
//     if (checked) displayLabMarkers();
//     else hideLabMarkers();
//   } else if (cat == 2) {
//     if (checked) displayCompanyMarkers();
//     else hideCompanyMarkers();
//   } else if (cat == 3) {
//     if (checked) displayEducationMarkers();
//     else hideEducationMarkers();
//   }
// };

// categories.forEach(category => {
//   document.getElementById(`cb-${category}`).addEventListener('click', handleCommand, false);
// });
// dataCategory.forEach(category => {
//   document.getElementById(`cb-${category}`).addEventListener('click', handleCommand, false);
// });
