import {Injectable} from '@angular/core';
import {BehaviorSubject, map, of, shareReplay, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserService} from "../../auth/user.service";

export interface LngLatProximity {
  lng: number;
  lat: number;
}

export enum EntityTypesEnum {
  NOTARY = 'Notary',
  TRANSLATOR = 'Translator'
}

interface ProvidersDTO {
  notaries: NotaryDTO[];
  translators: TranslatorDTO[];
}

interface NotaryDTO {
  identifier: string;
  name: string;
  addressLocality: string;
  addressRegion: string;
  areaServed: string;
  description: string;
  location: string,
  streetAddress: string,
  email: string,
  offerId: string,
  telephone: string;
  knowsLanguage: string;
  rating: string;
}

interface TranslatorDTO {
  identifier: string;
  name: string;
  addressLocality: string;
  addressRegion: string;
  location: string,
  streetAddress: string,
  offerId: string,
  telephone: string;
  knowsLanguage: string;
  rating: string;
}

interface CountiesDTO {
  addressRegion: string;
}

export interface Notary {
  id: string;
  type: EntityTypesEnum
  name: string;
  room: string;
  address: string;
  city: string;
  county: string;
  description: string;
  phoneNumbers: string[];
  email: string;
  languages: string[];
  coordinates: {
    lng: number;
    lat: number;
  };
  rating: number;
  services: string[];
}

export interface Translator {
  id: string;
  type: EntityTypesEnum
  name: string;
  appealCourt: string;
  address: string;
  city: string;
  county: string;
  phoneNumbers: string[];
  languages: string[];
  coordinates: {
    lng: number;
    lat: number;
  };
  rating: number;
  services: string[];
}

export interface NowService {
  [id: string]: {
    id: string;
    name: string;
    description: string;
  }
}

export interface NowServiceDTO {
  offerId: string;
  offerName: string;
  offerDesc: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private inMemoryNotaries: Notary[] = [
    {
      id: 'N1',
      type: EntityTypesEnum.NOTARY,
      name: "ANTOHIE R\u0102ZVAN",
      room: "IA\u015eI",
      address: "Soseaua Pacurari nr. 6, bl. 558, parter",
      city: "IA\u015eI",
      county: "IA\u015eI",
      description: "Biroul notarial Antohie Razvan \u00ee\u015fi desf\u0103\u015foar\u0103 activitatea \u00een cadrul Camerei notarilor publici Iasi \u00een circumscriptia judec\u0103toriei Iasi din localitatea Iasi, jude\u0163ul Iasi",
      phoneNumbers: ["RDS: 0332 404 300", "Mobil: 0742 643 516"],
      email: "notar.antohie@gmail.com",
      languages: ["Rom\u00e2na", " Engleza", " Franceza"],
      coordinates: {
        lng: 27.5194076,
        lat: 47.172899
      },
      rating: 3,
      services: [
        'Service 1',
        'Service 2',
        'Service 3',
        'Service 1',
        'Service 2',
        'Service 3'
      ]
    },
    {
      id: 'N2',
      type: EntityTypesEnum.NOTARY,
      name: "JESCU OTILIA-ELENA",
      room: "IA\u015eI",
      address: "B-dul Socola nr. 5, bl. D4, sc. A, parter, ap. 1-2",
      city: "IA\u015eI",
      county: "IA\u015eI",
      description: "Biroul notarial Jescu Otilia Elena \u00ee\u015fi desf\u0103\u015foar\u0103 activitatea \u00een cadrul Camerei notarilor publici Iasi \u00een circumscriptia judec\u0103toriei Iasi din localitatea Iasi, jude\u0163ul Iasi",
      phoneNumbers: ["Fix: 0232 233 323", "E-mailbnpazj@yahoo.com"],
      email: "bnpazj@yahoo.com",
      languages: ["Rom\u00e2na", " Engleza"],
      coordinates: {
        lng: 27.589159,
        lat: 47.150161
      },
      rating: 4,
      services: [
        'Service 1',
        'Service 2',
        'Service 3',
        'Service 1',
        'Service 2',
        'Service 3',
        'legalizare documente'
      ]
    }
  ];

  private inMemoryTranslators: Translator[] = [
    {
      id: 'T1',
      type: EntityTypesEnum.TRANSLATOR,
      name: "ABAZA VIOLETA",
      appealCourt: "Iasi",
      address: "",
      city: "IA\u015eI",
      county: "IA\u015eI",
      phoneNumbers: ["RDS: 0332 404 300", "Mobil: 0742 643 516"],
      languages: ["Rom\u00e2na", " Engleza", " Franceza"],
      coordinates: {
        lng: 27.5194076,
        lat: 47.182899
      },
      rating: 3,
      services: [
        'Service 1',
        'Service 2',
        'Service 3',
        'Service 1',
        'Service 2',
        'Service 3'
      ]
    },
    {
      id: 'T2',
      type: EntityTypesEnum.TRANSLATOR,
      name: "RADOI STEFAN",
      appealCourt: "Iasi",
      address: "",
      city: "IA\u015eI",
      county: "IA\u015eI",
      phoneNumbers: ["RDS: 0332 404 300", "Mobil: 0742 643 516"],
      languages: ["Rom\u00e2na", " Engleza", " Franceza"],
      coordinates: {
        lng: 27.5294076,
        lat: 47.172899
      },
      rating: 3,
      services: [
        'Service 1',
        'Service 2',
        'Service 3',
        'Service 1',
        'Service 2',
        'Service 3'
      ]
    }
  ];

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.loadServices();
    this.loadCounties();
    this.loadLanguages();
  }

  private _notariesSubject = new BehaviorSubject<Notary[]>([]);
  private _translatorsSubject = new BehaviorSubject<Translator[]>([]);
  private _servicesSubject = new BehaviorSubject<NowService>({});
  private _myRDFSubject = new BehaviorSubject({});
  private _myCountiesSubject = new BehaviorSubject<string[]>([]);
  private _myLanguagesSubject = new BehaviorSubject<string[]>([]);

  public get languagesOptions$() {
    return this._myLanguagesSubject.asObservable();
  }

  public loadLanguages() {
    return this.http.get<{
      knowsLanguage: string;
    }[]>(`${environment.BASE_URL}/now/languages`).pipe(shareReplay(1)).subscribe(
      value => {
        let languages = value.map(val => val.knowsLanguage);
        languages = languages.filter((l, idx, self) => {
          if(!!l) {
            return idx === self.indexOf(l)
          }
          return false;
        }).sort();
        this._myLanguagesSubject.next(languages);
      }
    )
  }

  public get countiesOptions$() {
    return this._myCountiesSubject.asObservable();
  }

  public loadCounties() {
    return this.http.get<CountiesDTO[]>(`${environment.BASE_URL}/now/counties`).pipe(shareReplay(1)).subscribe(
      value => {
        let counties = value.map(val => val.addressRegion);
        counties = counties.filter(c => !!c);
        this._myCountiesSubject.next(counties);
      }
    )
  }

  public get services$() {
    if (Object.keys(this._servicesSubject.value).length === 0) {
      this.loadServices();
    }

    return this._servicesSubject.asObservable();
  }

  public get services() {
    return this._servicesSubject.value;
  }

  private loadServices() {
    return this.http.get<NowServiceDTO[]>(`${environment.BASE_URL}/now/services`)
      .pipe(shareReplay(1)).subscribe(
        (_services) => {
          const tmpService: NowService = {};
          _services.forEach(
            _service => {
              tmpService[_service.offerId] = {
                id: _service.offerId,
                name: _service.offerName,
                description: _service.offerDesc
              }
            }
          )
          this._servicesSubject.next(
            tmpService
          )
        }
      )
  }

  public get myRDF$() {
    if (Object.keys(this._myRDFSubject.value).length === 0) {
      this.loadRDF();
    }

    return this._myRDFSubject.asObservable();
  }

  private loadRDF() {
    return this.http.get(`${environment.BASE_URL}/now/schema`).pipe(shareReplay(1)).subscribe(
      val => this._myRDFSubject.next(val)
    )
  }

  public get notaries$() {
    return this._notariesSubject.asObservable();
  }

  public get translators$() {
    return this._translatorsSubject.asObservable();
  }

  advancedSearch(selections: { selectedName: string; selectedCounties: string; selectedLanguages: string; selectedServices: string }) {
    this.http.get<ProvidersDTO>(`${environment.BASE_URL}/now/providers`, {
      params: {
        coordinates: `${this.userService.getCurrentUser().coords.lat},${this.userService.getCurrentUser().coords.lng}`,
        name: selections.selectedName,
        county: selections.selectedCounties,
        language: selections.selectedLanguages,
        services: selections.selectedServices,
        limit: 50
      }
    }).subscribe(providers => {
      const notariesDTO = providers.notaries;
      const translatorsDTO = providers.translators;
      this._notariesSubject.next(this.mapNotariesDTOToNotaries(notariesDTO));
      this._translatorsSubject.next(this.mapTranslatorsDTOToTranslators(translatorsDTO));
    })
  }

  public getNotariesInProximity(proximity: LngLatProximity) {
    this.http.get<NotaryDTO[]>(`${environment.BASE_URL}/now/notary`, {
      params: {
        coordinates: `${proximity.lat},${proximity.lng}`,
        limit: 50
      }
    }).pipe(
      map((notariesDTO): Notary[] => {
        return this.mapNotariesDTOToNotaries(notariesDTO);
      }),
    ).subscribe({
      next: (notaries) => {
        this._notariesSubject.next(notaries);
      },
      error: (err) => console.log(err)
    });
  }

  mapNotariesDTOToNotaries(notariesDTO: NotaryDTO[]): Notary[] {
    return notariesDTO.map(notaryDTO => {
      const _coords = notaryDTO.location.substring(notaryDTO.location.indexOf('(') + 1, notaryDTO.location.indexOf(')')).split(' ');
      const _services = notaryDTO.offerId.split(',');
      return {
        id: notaryDTO.identifier,
        type: EntityTypesEnum.NOTARY,
        name: notaryDTO.name,
        room: notaryDTO.areaServed,
        address: notaryDTO.streetAddress,
        city: notaryDTO.addressLocality,
        county: notaryDTO.addressRegion,
        description: notaryDTO.description,
        phoneNumbers: notaryDTO.telephone.split(","),
        email: notaryDTO.email,
        languages: notaryDTO.knowsLanguage.split(","),
        coordinates: {
          lng: parseFloat(_coords[1]),
          lat: parseFloat(_coords[0])
        },
        rating: parseInt(notaryDTO.rating),
        services: _services
      }
    });
  }

  public getTranslatorsInProximity(proximity: LngLatProximity) {
    this.http.get<TranslatorDTO[]>(`${environment.BASE_URL}/now/translator`, {
      params: {
        coordinates: `${proximity.lat},${proximity.lng}`,
        limit: 50
      }
    }).pipe(
      map((translatorsDTO): Translator[] => {
        return this.mapTranslatorsDTOToTranslators(translatorsDTO);
      }),
    ).subscribe({
      next: (translators) => {
        this._translatorsSubject.next(translators);
      },
      error: (err) => console.log(err)
    });
  }

  mapTranslatorsDTOToTranslators(translatorsDTO: TranslatorDTO[]): Translator[] {
    return translatorsDTO.map(translatorDTO => {
      const _coords = translatorDTO.location.substring(translatorDTO.location.indexOf('(') + 1, translatorDTO.location.indexOf(')')).split(' ');
      const _services = translatorDTO.offerId.split(',');
      return {
        id: translatorDTO.identifier,
        type: EntityTypesEnum.TRANSLATOR,
        name: translatorDTO.name,
        appealCourt: translatorDTO.addressRegion,
        address: translatorDTO.streetAddress,
        city: translatorDTO.addressLocality,
        county: translatorDTO.addressRegion,
        phoneNumbers: translatorDTO.telephone.split(","),
        languages: translatorDTO.knowsLanguage.split(","),
        coordinates: {
          lng: parseFloat(_coords[1]),
          lat: parseFloat(_coords[0])
        },
        rating: parseInt(translatorDTO.rating),
        services: _services
      }
    });
  }
}
