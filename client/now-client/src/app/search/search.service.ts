import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {MapboxService} from "../map/_service/mapbox.service";
import {HttpClient} from "@angular/common/http";

export interface AdvancedSearchOptions {
  options: {
    county: string[];
    languages: string[];
    services: string[];
  }
  selections: {
    selectedName: string;
    selectedCounties: string;
    selectedLanguages: string;
    selectedServices: string;
  }
}

@Injectable({providedIn: 'root'})
export class SearchService {
  private _advancedSearchSubject = new BehaviorSubject<AdvancedSearchOptions>({
    options: {
      county: ['Iasi', 'Focsani', 'Bucuresti'],
      languages: ['Romana', 'Engleza'],
      services: ['legalizare doc', 'traducere']
    },
    selections: {
      selectedName: '',
      selectedCounties: '',
      selectedLanguages: '',
      selectedServices: ''
    }
  });
  private _advancedSearchObs = this._advancedSearchSubject.asObservable();

  constructor(private mapboxService: MapboxService,
              private http: HttpClient) {
    this.mapboxService.countiesOptions$.subscribe(val => {
      const old = this._advancedSearchSubject.value;
      this._advancedSearchSubject.next({
        ...old,
        options: {
          ...old.options,
          county: val
        }
      })
    })

    this.mapboxService.languagesOptions$.subscribe(val => {
      const old = this._advancedSearchSubject.value;
      this._advancedSearchSubject.next({
        ...old,
        options: {
          ...old.options,
          languages: val
        }
      })
    })

    this.mapboxService.services$.subscribe(val => {
      const old = this._advancedSearchSubject.value;
      const serviceOptions = [];
      for (const key in val) {
        serviceOptions.push(val[key].name);
      }
      this._advancedSearchSubject.next({
        ...old,
        options: {
          ...old.options,
          services: serviceOptions
        }
      })
    })
  }

  public get availableOptions(): Observable<AdvancedSearchOptions['options']> {
    return this._advancedSearchObs.pipe(map(
      advancedSearch => ({
        ...advancedSearch['options']
      })
    ))
  }

  public get selectedOptions(): Observable<AdvancedSearchOptions['selections']> {
    return this._advancedSearchObs.pipe(map(
      advancedSearch => ({
        ...advancedSearch['selections']
      })
    ))
  }

  public set selectName(_name: string) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedName: _name
      }
    })
  }

  public set selectCounties(_counties: string) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedCounties: _counties
      }
    })
  }

  public set selectLanguages(_counties: string) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedLanguages: _counties
      }
    })
  }

  public set selectServices(_services: string) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedServices: _services
      }
    })
  }

  clearSelections() {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        selectedName: '',
        selectedCounties: '',
        selectedLanguages: '',
        selectedServices: ''
      }
    })
  }

  search() {
    this.mapboxService.advancedSearch(this._advancedSearchSubject.value.selections);
  }
}
