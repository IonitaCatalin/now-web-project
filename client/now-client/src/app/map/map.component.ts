import {Component, OnInit} from '@angular/core';
import {MapboxService, Notary, Translator} from "./_service/mapbox.service";
import {Marker} from "mapbox-gl";
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // @ts-ignore
  public map: mapboxgl.Map;
  public notaries: Notary[] = [];
  public translators: Translator[] = [];

  public mapStyle = 'mapbox://styles/mapbox/streets-v11';
  public mapZoom = 16;
  // UAIC FII
  public initLat = 47.17396317620398;
  public initLng = 27.57494318626357;

  private markers: Marker[] = [];


  constructor(private mapboxService: MapboxService) {
  }

  ngOnInit(): void {

  }

  public mapReady(map: mapboxgl.Map) {
    this.map = map;
    console.log(this.map);
    this.notaries = this.mapboxService.notaries;
    this.translators = this.mapboxService.translators;
    // this.addMarkers(this.notaries);
  }

  public onMarkerClick(markerId: number) {
    console.log("marker click", markerId);
  }

  private addMarkers(notaries: Notary[]) {
    this.markers = notaries.map(
      notary => new mapboxgl.Marker()
        .setLngLat([notary.coordinates.lng, notary.coordinates.lat])
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
        .addTo(this.map)
    );
  }

  public onTranslatorClick(translator: Translator) {
    console.log(translator);
  }

  easeCameraTo(lng: number, lat: number) {
    this.map.easeTo({center: [lng, lat]});
  }

  onNotaryClick(notary: Notary) {
    console.log(notary);
  }

  focusTranslator(translator: Translator) {
    this.easeCameraTo(translator.coordinates.lng, translator.coordinates.lat);
  }

  focusNotary(notary: Notary) {
    this.easeCameraTo(notary.coordinates.lng, notary.coordinates.lat);
  }
}
