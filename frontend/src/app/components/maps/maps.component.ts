import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.mapElement = new google.maps.Map(document.getElementById('map'), {
      center: {lat: '41.2800161', lng: '1.9766294'},
      zoom: 12,
      styles: [
        {
          "featureType": "poi",
          "stylers": [ { "visibility": "off" } ]
        }
      ]
    });
  }
}
