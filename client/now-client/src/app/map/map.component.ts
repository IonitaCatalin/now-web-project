import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {MapboxService} from "./_service/mapbox.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // @ts-ignore
  public map: mapboxgl.Map;
  private style = 'mapbox://styles/mapbox/streets-v11';

  // UAIC FII
  private lat = 47.17396317620398;
  private lng = 27.57494318626357;

  constructor(private mapboxService: MapboxService) {
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 17,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    const marker1 = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    const marker2 = new mapboxgl.Marker()
      .setLngLat([27.5996997051251, 47.1605983])
      .addTo(this.map);

    this.mapboxService.getMarkers();
  }

}
