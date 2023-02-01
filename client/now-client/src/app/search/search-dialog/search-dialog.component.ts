import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdvancedSearchOptions} from "../search.service";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  @Input() options: AdvancedSearchOptions = {
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
  }
  @Output() closeEvent = new EventEmitter<boolean>();

  selectedName: string = '';
  selectedNames: string[] = [];


  constructor() {
  }

  ngOnInit(): void {
    // this.options = {
    //   county: ['Iasi', 'Focsani', 'Bucuresti'],
    //   languages: ['Romana', 'Engleza'],
    //   services: ['legalizare doc', 'traducere']
    // }
  }

  search() {
    // console.log(this.selectedCounties);
  }

  close() {
    this.closeEvent.emit(true);
  }

  addName(selectedName: string) {
    this.selectedNames.push(selectedName);
  }
}
