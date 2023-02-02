import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {EntityTypesEnum, MapboxService, Notary, Translator} from "./_service/mapbox.service";
import * as mapboxgl from "mapbox-gl";
import {Marker} from "mapbox-gl";
import {Observable} from "rxjs";
import {UserService} from "../auth/user.service";
import {MarkerComponent} from "ngx-mapbox-gl";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // @ts-ignore
  public map: mapboxgl.Map;
  public notaries$: Observable<Notary[]> = this.mapboxService.notaries$;
  public translators$: Observable<Translator[]> = this.mapboxService.translators$;

  public mapStyle = 'mapbox://styles/mapbox/streets-v11';
  public mapZoom = 16;
  // UAIC FII
  public initLat = 47.17396317620398;
  public initLng = 27.57494318626357;
  public activeUserLng = this.initLng;
  public activeUserLat = this.initLat;
  @ViewChildren('notaryMarker') notaryMarkersComp: QueryList<MarkerComponent> | undefined;
  @ViewChildren('translatorMarker') translatorsMarkersComp: QueryList<MarkerComponent> | undefined;

  private markers: Marker[] = [];
  showNotaryPopupInfo = false;
  showTranslatorPopupInfo = false;
  showAdvancedSearchDialog = false;
  selectedNotary: Notary | undefined;
  selectedTranslator: Translator | undefined;


  constructor(private mapboxService: MapboxService,
              private userService: UserService) {
  }

  ngOnInit(): void {

  }

  public mapReady(map: mapboxgl.Map) {
    this.map = map;
    console.log(this.map);
    const userMarker = new mapboxgl.GeolocateControl({
      trackUserLocation: true,
      showAccuracyCircle: false
    });
    userMarker.on('geolocate', (e) => {
      // @ts-ignore
      const lon = e.coords.longitude;
      // @ts-ignore
      const lat = e.coords.latitude;
      const position = [lon, lat];
      console.log(position);
      this.activeUserLng = position[0];
      this.activeUserLat = position[1];
      this.userService.updateCoords({
        lng: lon,
        lat: lat
      })
    });
    this.map.addControl(userMarker);
    this.mapboxService.getNotariesInProximity({
      lng: this.activeUserLng,
      lat: this.activeUserLat
    });
    this.mapboxService.getTranslatorsInProximity({
      lng: this.activeUserLng,
      lat: this.activeUserLat
    });
  }

  triggerMarker(id: string, lng: number, lat: number, type: EntityTypesEnum) {
    this.easeCameraTo(lng, lat);
    if (type === EntityTypesEnum.TRANSLATOR) {
      const foundTranslatorMarker = this.translatorsMarkersComp?.find((item) => {
          const coords = (item.lngLat as Array<number>);
          const translatorId = item.content.nativeElement.firstChild.dataset.sectionvalue;
          return translatorId === id && coords[0] === lng && coords[1] === lat
        }
      )
      foundTranslatorMarker?.togglePopup();
    } else {
      const foundNotaryMarker = this.notaryMarkersComp?.find((item) => {
          const coords = (item.lngLat as Array<number>);
          const notaryId = item.content.nativeElement.firstChild.dataset.sectionvalue;
          return notaryId === id && coords[0] === lng && coords[1] === lat
        }
      )
      foundNotaryMarker?.togglePopup();
    }
  }

  easeCameraTo(lng: number, lat: number) {
    this.map.easeTo({center: [lng, lat]});
  }

  public onTranslatorClick(translator: Translator) {
    console.log(translator);
    this.selectedTranslator = translator;
    this.showTranslatorPopupInfo = true;
  }

  public onNotaryClick(notary: Notary) {
    console.log(notary);
    this.selectedNotary = notary;
    this.showNotaryPopupInfo = true;
  }

  focusTranslator(translator: Translator) {
    this.easeCameraTo(translator.coordinates.lng, translator.coordinates.lat);
  }

  focusNotary(notary: Notary) {
    this.easeCameraTo(notary.coordinates.lng, notary.coordinates.lat);
  }

  onClosePopupInfo() {
    this.showNotaryPopupInfo = false;
    this.showTranslatorPopupInfo = false;
    this.showAdvancedSearchDialog = false;
  }

  advancedSearchDialog() {
    this.showAdvancedSearchDialog = true;
  }
}
