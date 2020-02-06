import { Component, OnInit, AfterViewInit } from "@angular/core";

import { dataAll as dataset, categories } from "./../../data/data.js";
import { LeafletMap } from "./../../models/LeafletMap.js";

@Component({
  selector: "app-leaflet-map",
  templateUrl: "./leaflet-map.component.html",
  styleUrls: ["./leaflet-map.component.css"]
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  // Custom leaflet map class
  private leafletMap: LeafletMap;
  private categories;

  constructor() {}

  ngOnInit() {
    this.categories = categories;
  }

  ngAfterViewInit(): void {
    this.leafletMap = new LeafletMap(
      "map",
      50.318,
      3.51,
      13,
      dataset,
      categories
    );
    this.leafletMap.initializeMap();

    // LayerMap Values
    const mapURI =
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";
    const mapLayerOptions = {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox/streets-v11"
    };

    this.leafletMap.initializeTileLayer(mapURI, mapLayerOptions);
    this.leafletMap.initializeCustomMarkerIcon();
    // this.leafletMap.initializeCommand();
    this.categories.forEach(category =>
      this.leafletMap.addSelectedCategory(category.name)
    );
    this.leafletMap.displayMarkers();
  }

  onChangeInput(event) {
    this.leafletMap.setSearchedName(event.target.value);
    this.leafletMap.displayMarkers();
  }

  onClickCheckbox(event) {
    // console.log(event.target);
    // if (event.target.checked) {
    //   this.leafletMap.addSelectedCategory(event.target.value);
    // } else {
    //   this.leafletMap.removeSelectedCategory(event.target.value);
    // }
    event.target.checked
      ? this.leafletMap.addSelectedCategory(event.target.value)
      : this.leafletMap.removeSelectedCategory(event.target.value);
    this.leafletMap.displayMarkers();
  }
}
