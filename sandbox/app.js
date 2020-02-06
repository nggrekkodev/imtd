/**
 * IMPORT HARD DATA
 */
// import { dataMarker } from './data/dataMarker.js';
// import { dataZone } from './data/dataZone.js';
// import { dataAll, dataLab, dataCompany, dataEducation } from './data/data.js';
import { dataAll } from './data/data.js';
import { dataCategory, getCategoriesFromData } from './data/dataCategory.js';
import { dataCity } from './data/dataCity.js';
import { LeafletMap } from './model/LeafletMap.js';

console.log(dataAll);
console.log(dataCategory);
const categories = getCategoriesFromData();
const leafletMap = new LeafletMap('mapid', 50.318, 3.51, 13, dataAll, categories, dataCategory, dataCity);
leafletMap.initializeMap();

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
leafletMap.initializeCommand();
leafletMap.filter();
// leafletMap.initializeCustomMarkers(dataMarker);
// leafletMap.initializeClusterGroup();
// leafletMap.initializePolygonLayer(dataZone);
