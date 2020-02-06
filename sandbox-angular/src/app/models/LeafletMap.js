import * as L from "leaflet";

export class LeafletMap {
  constructor(mapHtmlId, lat, lon, zoom, dataset, categories) {
    this.mapHtmlId = mapHtmlId;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    this.dataset = dataset;
    this.categories = categories;
    this.map = {}; // leaflet map object
    this.layers = {}; // contains all marker layers

    this.selectedCategories = [];
    this.searchedName = "";
  }

  // Initialize map object, set view and map events
  initializeMap() {
    this.map = L.map(this.mapHtmlId).setView([this.lat, this.lon], this.zoom);
    this.map.doubleClickZoom.disable();
    this.map.on("click", e => {
      // console.log("clicked !");
    });
  }

  // Initialize tile layer
  initializeTileLayer(tileLayerMapURI, tileLayerOptions) {
    this.tileLayer = L.tileLayer(tileLayerMapURI, tileLayerOptions);
    this.tileLayer.addTo(this.map);
  }

  // Initialize the custom icon for markers
  initializeCustomMarkerIcon() {
    this.customMarkerIcon = L.icon({
      iconUrl: "./../../assets/images/markers/marker.png",
      iconSize: [35, 35]
    });
  }

  // Set the custom marker icon for each interest point
  initializeCustomMarkers(data) {
    const context = this;
    this.customMarkers = L.geoJson(data, {
      pointToLayer: (feature, latlng) => {
        const marker = L.marker(latlng, { icon: context.customMarkerIcon });
        marker.bindPopup(feature.properties.name);
        return marker;
      }
    });
    // this.customMarkers.addTo(this.map);
  }

  addSelectedCategory(category) {
    this.selectedCategories.push(category);
  }

  removeSelectedCategory(category) {
    this.selectedCategories = this.selectedCategories.filter(
      element => element !== category
    );
  }

  setSearchedName(searchedName) {
    this.searchedName = searchedName;
  }

  displayMarkers() {
    // remove previous in order to display the new one
    this.map.removeLayer(this.layers);

    const filteredData = this.filter();

    this.layers = L.geoJson(filteredData, {
      pointToLayer: (feature, latlng) => {
        // default icon
        let icon = "./assets/images/icons/astrology.png";

        // get the category icon
        for (let category of this.categories) {
          if (feature.properties.category == category.name) {
            icon = category.iconFilePath;
            continue;
          }
        }

        // icon properties
        const iconMarker = L.icon({
          iconUrl: icon,
          iconSize: [33, 44]
        });

        // create marker with properties and events
        const marker = L.marker(latlng, { icon: iconMarker });
        marker.bindPopup(feature.properties.name);
        marker.on("mouseover", function(e) {
          this.openPopup();
        });
        // marker.on("mouseout", function(e) {
        //   this.closePopup();
        // });
        return marker;
      }
    });

    this.layers.addTo(this.map);
  }

  filter(fullGeoJson = true) {
    const filteredData = { ...this.dataset };

    // filter by category
    filteredData.features = filteredData.features.filter(feature =>
      this.selectedCategories.includes(feature.properties.category)
    );

    // filter by searched name
    filteredData.features = filteredData.features.filter(feature =>
      feature.properties.name
        .toLowerCase()
        .includes(this.searchedName.toLowerCase())
    );

    // return full geoJson data format or array with features
    return fullGeoJson ? filteredData : filteredData.features;
  }

  getGeoJsonObjectFormat() {
    return (data = {
      type: "FeatureCollection",
      features: []
    });
  }

  // Initialize a cluster group
  // initializeClusterGroup() {
  //   this.cluster = L.markerClusterGroup();
  //   this.cluster.addLayer(this.customMarkers);
  //   this.map.addLayer(this.cluster);
  // }

  // Initialize the filter control panel
  // initializeCommand() {
  //   // Create the html control panel and add it to the map
  //   this.command = L.control({ position: "topright" });
  //   this.command.onAdd = () => {
  //     let div = L.DomUtil.create("div", "command");
  //     div.innerHTML +=
  //       '<div style="text-align:center;"><span style="font-size:18px;">Filtre</span><br /></div>';
  //     // console.log(this.categories);
  //     this.categories.forEach(category => {
  //       div.innerHTML += `<form><input id='cb-${category.name}' type="checkbox" checked/> ${category.name}</form>`;
  //     });

  //     div.innerHTML += `<input id='searchBar' type="text" name="searchBar" value=""><br/>`;

  //     return div;
  //   };
  //   this.command.addTo(this.map);

  //   // Add events to the filter control panel
  //   const htmlCommand = document.querySelector(".command");

  //   // Toggle dragging when using filter
  //   htmlCommand.addEventListener(
  //     "mouseenter",
  //     () => this.map.dragging.disable(),
  //     false
  //   );
  //   htmlCommand.addEventListener(
  //     "mouseleave",
  //     () => this.map.dragging.enable(),
  //     false
  //   );

  //   this.categories.forEach(category => {
  //     document
  //       .getElementById(`cb-${category.name}`)
  //       .addEventListener("click", () => this.filter(), false);
  //   });
  //   const searchBar = document.querySelector("#searchBar");
  //   searchBar.addEventListener("input", () => this.filter(), false); // this == context
  // }

  // filter() {
  //   this.inputText = document.querySelector("#searchBar").value;

  //   // Get Selected categories from control panel in array
  //   this.selectedCategories = [];
  //   this.categories.forEach(category => {
  //     if (document.querySelector(`#cb-${category.name}`).checked) {
  //       this.selectedCategories.push(category.name);
  //     }
  //   });

  //   this.displayMarkers();
  // }

  // Initialize a custom polygon layer -> TESTING
  // initializePolygonLayer(data) {
  //   // const context = this;
  //   this.polygonLayer = L.geoJson(data, {
  //     pointToLayer: (feature, latlng) => {
  //       let marker = L.marker(latlng, { icon: context.customMarkerIcon });
  //       marker.bindPopup(feature.properties.name);
  //       return marker;
  //     },
  //     onEachFeature: (feature, layer) => {
  //       layer.bindPopup(
  //         `<strong>Zone ${feature.properties.name}</strong><br/>`
  //       );
  //     },
  //     style: (feature, layer) => {
  //       let weight = 1;
  //       let fillOpacity = 0.5;
  //       let color, fillColor;
  //       if (feature.properties.name === "uphf") {
  //         color = "#27f6e5";
  //         fillColor = "#99fbf3";
  //       } else if (feature.properties.name === "transalley") {
  //         color = "#ff7b02";
  //         fillColor = "#ffa757";
  //       } else {
  //         color = "#627aff";
  //         fillColor = "#c8d0ff";
  //       }
  //       return {
  //         color: color,
  //         weight: weight,
  //         fillColor: fillColor,
  //         fillOpacity: fillOpacity
  //       };
  //     }
  //   });
  //   this.polygonLayer.addTo(this.map);
  // }

  // hideMarkers(category) {
  //   console.log("hide " + category);
  //   this.map.removeLayer(this.layers[category]);
  // }

  // getGeoJsonFeaturesByCategory(category, fullGeoJson = true) {
  //   const filteredData = { ...this.dataset };

  //   // keep features that matches the category
  //   filteredData.features = filteredData.features.filter(
  //     feature => feature.properties.category === category
  //   );

  //   // return full geoJson data format or array with features
  //   return fullGeoJson ? filteredData : filteredData.features;
  // }
}
