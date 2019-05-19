import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})

export class GooglemapsComponent implements OnInit {
  map: GoogleMap;
  constructor() { 

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
      'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

  }

  ngOnInit() {}

}
