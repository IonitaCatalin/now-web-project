import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {faUserTie} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../auth/user.service";
import {Router} from "@angular/router";
import {MapboxService} from "../map/_service/mapbox.service";
import {BehaviorSubject, combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {EntityTypesEnum} from "../map/_service/mapbox.service";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('mapComponent') myMap: MapComponent | undefined;
  isEditMode = false;
  sidenavIsOpen = false;
  searchTerm = '';
  faUserTie = faUserTie;
  currentUser$ = this.userService.getCurrentUser$();
  notaries$ = this.mapService.notaries$;
  translators$ = this.mapService.translators$;
  searchTermChanged = new BehaviorSubject<string>('');
  computedClosestEntities$ = this.computeClosestEntities();
  filteredClosestEntities$ = combineLatest([this.computedClosestEntities$, this.searchTermChanged.asObservable()]).pipe(
    map(([entities, searched]) => {
      if (!!this.searchTerm) {
        searched = searched.toUpperCase();
        return entities.filter(
          entity => entity.name.toUpperCase().includes(searched) ||
            entity.type.toUpperCase().includes(searched) ||
            entity.services.some(service => this.mapService.services[service].name.toUpperCase().includes(searched))
        )
      }

      return entities;
    })
  );

  constructor(
    private userService: UserService,
    private mapService: MapboxService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  toggleEdit($event: MatSlideToggleChange) {
    console.log("toggle change", $event);
  }

  onSidenavChange() {
    console.log("sidenav change");
  }

  search() {
    console.log("search");
    this.searchTermChanged.next(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchTermChanged.next(this.searchTerm);
  }

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }

  logout() {
    this.userService.logout();
  }

  login() {
    this.router.navigate(['auth', 'login']);
  }

  private computeClosestEntities(): Observable<{
    id: string;
    name: string;
    type: EntityTypesEnum;
    distance: number;
    coordinates: {
      lng: number;
      lat: number;
    }
    services: string[];
  }[]> {
    return combineLatest([this.currentUser$, this.translators$, this.notaries$]).pipe(
      map(([user, translators, notaries]) => {
          console.log(user);
          let entities: {
            id: string;
            name: string;
            type: EntityTypesEnum;
            distance: number;
            coordinates: {
              lng: number;
              lat: number;
            }
            services: string[];
          }[] = [];
          entities = entities.concat(translators.map((translator) => ({
            id: translator.id,
            name: translator.name,
            type: translator.type,
            distance: this.distance(user.coords.lat, user.coords.lng, translator.coordinates.lat, translator.coordinates.lng),
            coordinates: translator.coordinates,
            services: translator.services
          })));

          entities = entities.concat(notaries.map((notaries) => ({
            id: notaries.id,
            name: notaries.name,
            type: notaries.type,
            distance: this.distance(user.coords.lat, user.coords.lng, notaries.coordinates.lat, notaries.coordinates.lng),
            coordinates: notaries.coordinates,
            services: notaries.services
          })));
          console.log(entities);

          return entities.sort((e1, e2) => e1.distance - e2.distance);
        }
      )
    )
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  focusOn(id: string, coordinates: { lng: number; lat: number }, type: EntityTypesEnum) {
    console.log("focus on", coordinates);
    this.myMap?.triggerMarker(id, coordinates.lng, coordinates.lat, type);
  }

  searchNearby() {
    const coords = this.userService.getCurrentUser().coords;
    this.mapService.getNotariesInProximity(coords);
    this.mapService.getTranslatorsInProximity(coords);
  }
}
