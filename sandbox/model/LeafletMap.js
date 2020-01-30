export class LeafletMap {
  constructor(mapHtmlId, lat, lon, zoom, dataset, categories) {
    this.mapHtmlId = mapHtmlId;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    this.dataset = dataset;
    this.categories = categories;
    this.map = {}; // leaflet map object
    this.markers = {}; // contains all marker layers
    this.layers = []; // contains all marker layers
  }

  // Init map view
  initializeMap() {
    this.map = L.map(this.mapHtmlId).setView([this.lat, this.lon], this.zoom);
    this.map.doubleClickZoom.disable();
    this.map.on('click', e => {
      // console.log('clicked !');
    });
  }

  // Init tile layer
  initializeTileLayer(tileLayerMapURI, tileLayerOptions) {
    this.tileLayer = L.tileLayer(tileLayerMapURI, tileLayerOptions);
    this.tileLayer.addTo(this.map);
  }

  initializeCustomMarkerIcon() {
    this.customMarkerIcon = L.icon({
      iconUrl: '/sandbox/marker.png',
      iconSize: [35, 35]
    });
  }

  initializeCustomMarkers(data) {
    const context = this;
    this.customMarkers = L.geoJson(data, {
      pointToLayer: (feature, latlng) => {
        // const marker = L.marker(latlng);
        const marker = L.marker(latlng, { icon: context.customMarkerIcon });
        marker.bindPopup(feature.properties.name);
        return marker;
      }
    });
    // this.customMarkers.addTo(this.map);
  }

  initializeClusterGroup() {
    this.cluster = L.markerClusterGroup();
    this.cluster.addLayer(this.customMarkers);
    this.map.addLayer(this.cluster);
  }

  initializePolygonLayer(data) {
    // const context = this;
    this.polygonLayer = L.geoJson(data, {
      pointToLayer: (feature, latlng) => {
        let marker = L.marker(latlng, { icon: context.customMarkerIcon });
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
    });
    this.polygonLayer.addTo(this.map);
  }

  // Initialize the filter control
  initializeCommand() {
    // this.categories = categories;
    // console.log(this.categories);
    const map = this.map;

    this.command = L.control({ position: 'topright' });

    this.command.onAdd = map => {
      var div = L.DomUtil.create('div', 'command');
      div.innerHTML += '<div style="text-align:center;"><span style="font-size:18px;">Filtre</span><br /></div>';

      this.categories.forEach(category => {
        div.innerHTML += `<form><input id='cb-${category}' type="checkbox"/>${category}</form>`;
      });

      return div;
    };

    this.command.addTo(map);

    console.log(this.categories);

    // const context = this;
    this.categories.forEach(category => {
      document.getElementById(`cb-${category}`).addEventListener(
        'click',
        e => {
          // console.log(e);
          const checked = event.target.checked;
          const cat = event.target.id.slice(3);

          if (category === cat && checked) {
            // display marker de cette catégorie
            this.displayMarkers(category);
          } else if (category === cat && !checked) {
            // hide marker de cette catégorie
            this.hideMarkers(category);
          }
        },
        false
      );
    });
  }

  displayMarkers(category) {
    console.log('display ' + category);
    this.markers.category = this.getGeoJsonFeaturesByCategory(category);
    const context = this;
    // let icon = '/sandbox/images/icon/automotive.png';
    // console.log(category == 'laboratoire');
    // console.log('laboratoire');
    let icon;
    if (category == 'laboratoire') {
      icon = '/sandbox/images/icon/science.png';
    } else if (category == 'formation') {
      icon = '/sandbox/images/icon/schools.png';
    } else if (category == 'entreprise') {
      icon = '/sandbox/images/icon/engineering.png';
    }

    const iconMarker = L.icon({
      iconUrl: icon,
      iconSize: [33, 44]
    });

    this.layers[category] = L.geoJson(this.markers.category, {
      pointToLayer: (feature, latlng) => {
        const marker = L.marker(latlng, { icon: iconMarker });
        marker.bindPopup(feature.properties.name);
        return marker;
      }
    });

    this.layers[category].addTo(this.map);
  }

  hideMarkers(category) {
    console.log('hide ' + category);
    this.map.removeLayer(this.layers[category]);
  }

  getGeoJsonFeaturesByCategory(category, fullGeoJson = true) {
    const filteredData = { ...this.dataset };
    // console.log(filteredData);
    // remove features that don't match the category
    filteredData.features = filteredData.features.filter(feature => feature.properties.category === category);

    // return full geoJson data format or array with features
    return fullGeoJson ? filteredData : filteredData.features;
  }

  getGeoJsonObjectFormat() {
    return (data = {
      type: 'FeatureCollection',
      features: []
    });
  }
}
