import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";

export interface AdvancedSearchOptions {
  options: {
    county: string[];
    languages: string[];
    services: string[];
  }
  selections: {
    selectedName: string;
    selectedCounties: string[];
    selectedLanguages: string[];
    selectedServices: string[];
  }
}

@Injectable({providedIn: 'root'})
export class SearchService {
  private _advancedSearchSubject = new BehaviorSubject<AdvancedSearchOptions>({
    options: {
      county: [],
      languages: [],
      services: [],
    },
    selections: {
      selectedName: '',
      selectedCounties: [],
      selectedLanguages: [],
      selectedServices: []
    }
  });
  private _advancedSearchObs = this._advancedSearchSubject.asObservable();

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

  public set selectCounties(_counties: string[]) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedCounties: _counties
      }
    })
  }

  public set selectLanguages(_counties: string[]) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedLanguages: _counties
      }
    })
  }

  public set selectServices(_services: string[]) {
    const old = this._advancedSearchSubject.value;
    this._advancedSearchSubject.next({
      ...old,
      selections: {
        ...old.selections,
        selectedCounties: _services
      }
    })
  }
}
