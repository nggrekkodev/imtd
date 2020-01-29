export class LeafletMap {
  constructor(mapHtmlId, lat, lon, zoom, dataset, categories) {
    this.mapHtmlId = mapHtmlId;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    this.dataset = dataset;
    this.categories = categories;
    this.map = {};
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

    const context = this;
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
    console.log('display' + category);
  }

  hideMarkers(category) {
    console.log('hide' + category);
  }

  // if (cat == 1) {
  //   if (checked) displayLabMarkers();
  //   else hideLabMarkers();
  // } else if (cat == 2) {
  //   if (checked) displayCompanyMarkers();
  //   else hideCompanyMarkers();
  // } else if (cat == 3) {
  //   if (checked) displayEducationMarkers();
  //   else hideEducationMarkers();
  // }
}
