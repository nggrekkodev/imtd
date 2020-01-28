// Map initialization
var mymap = L.map('mapid').setView([50.318, 3.51], 16);
mymap.on('click', e => {
  console.log(e);
});

// Layer 1
// L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//   maxZoom: 18,
//   attribution:
//     'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   id: 'mapbox/streets-v11'
// }).addTo(mymap);

// Layer 2
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11'
  }
).addTo(mymap);

// Set Marker
var marker = L.marker([50.31895, 3.512819]).addTo(mymap);
marker.bindPopup('IMTD');

L.marker([50.319148, 3.509788])
  .addTo(mymap)
  .bindPopup('Technopôle Transalley')
  .on('click', e => {
    alert('Vous avez cliqué sur un marker');
  });
