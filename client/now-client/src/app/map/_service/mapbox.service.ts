import {Injectable} from '@angular/core';

enum EntityTypesEnum {
  NOTARY = 'Notary',
  TRANSLATOR = 'Translator'
}

export interface Notary {
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
}

export interface Translator {
  type: EntityTypesEnum
  name: string;
  appealCourt: string;
  address: string;
  city: string;
  county: string;
  description: string;
  phoneNumbers: string[];
  languages: string[];
  coordinates: {
    lng: number;
    lat: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private inMemoryNotaries: Notary[] = [
    {
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
      }
    },
    {
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
      }
    }
  ];

  private inMemoryTranslators: Translator[] = [
    {
      type: EntityTypesEnum.TRANSLATOR,
      name: "ABAZA VIOLETA",
      appealCourt: "Iasi",
      address: "",
      city: "IA\u015eI",
      county: "IA\u015eI",
      description: "Translator",
      phoneNumbers: ["RDS: 0332 404 300", "Mobil: 0742 643 516"],
      languages: ["Rom\u00e2na", " Engleza", " Franceza"],
      coordinates: {
        lng: 27.5194076,
        lat: 47.182899
      }
    },
    {
      type: EntityTypesEnum.TRANSLATOR,
      name: "RADOI STEFAN",
      appealCourt: "Iasi",
      address: "",
      city: "IA\u015eI",
      county: "IA\u015eI",
      description: "Translator",
      phoneNumbers: ["RDS: 0332 404 300", "Mobil: 0742 643 516"],
      languages: ["Rom\u00e2na", " Engleza", " Franceza"],
      coordinates: {
        lng: 27.5294076,
        lat: 47.172899
      }
    }
  ];

  constructor() {
  }

  public get notaries() {
    return this.inMemoryNotaries;
  }

  public get translators() {
    return this.inMemoryTranslators;
  }
}
