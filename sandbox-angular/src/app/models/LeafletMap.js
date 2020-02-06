import * as L from "leaflet";

export class LeafletMap {
  constructor(
    mapHtmlId,
    lat,
    lon,
    zoom,
    dataset,
    categories,
    dataCategory,
    dataCity
  ) {
    this.mapHtmlId = mapHtmlId;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    this.dataset = dataset;
    this.categories = categories;
    this.dataCategory = dataCategory;
    this.dataCity = dataCity;
    this.map = {}; // leaflet map object
    // this.markers = {}; // contains all marker layers
    // this.layers = []; // contains all marker layers
    this.layers = {}; // contains all marker layers
    // this.searchName = '';
  }

  // Init map view
  initializeMap() {
    this.map = L.map(this.mapHtmlId).setView([this.lat, this.lon], this.zoom);
    this.map.doubleClickZoom.disable();
    this.map.on("click", e => {
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
      iconUrl: "./../../assets/images/markers/marker.png",
      iconSize: [35, 35]
    });
  }

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
        layer.bindPopup(
          `<strong>Zone ${feature.properties.name}</strong><br/>`
        );
      },
      style: (feature, layer) => {
        let weight = 1;
        let fillOpacity = 0.5;
        let color, fillColor;
        if (feature.properties.name === "uphf") {
          color = "#27f6e5";
          fillColor = "#99fbf3";
        } else if (feature.properties.name === "transalley") {
          color = "#ff7b02";
          fillColor = "#ffa757";
        } else {
          color = "#627aff";
          fillColor = "#c8d0ff";
        }
        return {
          color: color,
          weight: weight,
          fillColor: fillColor,
          fillOpacity: fillOpacity
        };
      }
    });
    this.polygonLayer.addTo(this.map);
  }

  // Initialize the filter control
  initializeCommand() {
    // const map = this.map;

    this.command = L.control({ position: "topright" });
    this.command.onAdd = () => {
      let div = L.DomUtil.create("div", "command");
      div.innerHTML +=
        '<div style="text-align:center;"><span style="font-size:18px;">Filtre</span><br /></div>';

      this.categories.forEach(category => {
        div.innerHTML += `<form><input id='cb-${category}' type="checkbox" checked/>${category}</form>`;
      });

      div.innerHTML += `<input id='searchBar' type="text" name="searchBar" value=""><br/>`;
      // div.innerHTML += `<select name="city">`;
      // for (const feature of this.dataCity.features) {
      //   div.innerHTML += `<option value="t">t2</option>`;
      // }
      // this.dataCity.features.forEach(city => {
      // console.log(city);
      // div.innerHTML += `<option value="${this.dataCity.features[0].properties.name}">${this.dataCity.features[0].properties.name}</option>`;
      // });
      // <option value="volvo">Volvo</option>
      // <option value="saab">Saab</option>
      // <option value="fiat">Fiat</option>
      // <option value="audi">Audi</option>
      // div.innerHTML += `</select>`;

      // div.innerHTML += `<input list="browsers"><datalist id="browsers">`;
      // this.dataCity.features.forEach(city => {
      //   div.innerHTML += `<option value="${city.properties.name.toLowerCase()}">`;
      // });
      // div.innerHTML += `</datalist></form>`;

      return div;
    };

    this.command.addTo(this.map);

    const htmlCommand = document.querySelector(".command");
    htmlCommand.addEventListener(
      "mouseenter",
      () => this.map.dragging.disable(),
      false
    );
    htmlCommand.addEventListener(
      "mouseleave",
      () => this.map.dragging.enable(),
      false
    );

    // console.log(this.categories);

    this.dataCategory.forEach(category => {
      document
        .getElementById(`cb-${category.name}`)
        .addEventListener("click", () => this.filter(), false);
    });
    const searchBar = document.querySelector("#searchBar");
    searchBar.addEventListener("input", () => this.filter(), false); // this == context
  }

  filter() {
    this.inputText = document.querySelector("#searchBar").value;

    // Get Selected categories in array
    this.selectedCategories = [];
    this.dataCategory.forEach(category => {
      if (document.querySelector(`#cb-${category.name}`).checked) {
        this.selectedCategories.push(category.name);
      }
    });

    this.displayMarkers();
  }

  displayMarkers() {
    this.map.removeLayer(this.layers);

    const filteredData = this.getGeoJsonFeaturesByFilter();
    let icon;

    this.layers = L.geoJson(filteredData, {
      pointToLayer: (feature, latlng) => {
        if (feature.properties.category == "laboratoire") {
          icon = "./../../assets/images/icons/science.png";
        } else if (feature.properties.category == "formation") {
          icon = "./../../assets/images/icons/schools.png";
        } else if (feature.properties.category == "entreprise") {
          icon = "./../../assets/images/icons/engineering.png";
        }

        const iconMarker = L.icon({
          iconUrl: icon,
          iconSize: [33, 44]
        });

        const marker = L.marker(latlng, { icon: iconMarker });
        marker.bindPopup(feature.properties.name);
        marker.on("mouseover", function(e) {
          this.openPopup();
        });
        marker.on("mouseout", function(e) {
          this.closePopup();
        });
        return marker;
      }
    });

    this.layers.addTo(this.map);
  }

  hideMarkers(category) {
    console.log("hide " + category);
    this.map.removeLayer(this.layers[category]);
  }

  getGeoJsonFeaturesByCategory(category, fullGeoJson = true) {
    const filteredData = { ...this.dataset };

    // keep features that matches the category
    filteredData.features = filteredData.features.filter(
      feature => feature.properties.category === category
    );

    // return full geoJson data format or array with features
    return fullGeoJson ? filteredData : filteredData.features;
  }

  getGeoJsonFeaturesByFilter(fullGeoJson = true) {
    const filteredData = { ...this.dataset };

    // filter by category
    filteredData.features = filteredData.features.filter(feature =>
      this.selectedCategories.includes(feature.properties.category)
    );

    // filter by searched name
    filteredData.features = filteredData.features.filter(feature =>
      feature.properties.name
        .toLowerCase()
        .includes(this.inputText.toLowerCase())
    );

    // return full geoJson data format or array with features
    return fullGeoJson ? filteredData : filteredData.features;
  }

  getGeoJsonObjectFormat(fullGeoJson = true) {
    return (data = {
      type: "FeatureCollection",
      features: []
    });
  }
}
