import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AdvancedSearchOptions, SearchService} from "../search.service";
import {Subscription} from "rxjs";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit, OnDestroy {

  availableOptions = this.searchService.availableOptions;
  selections = {
    selectedName: '',
    selectedCounties: '',
    selectedLanguages: '',
    selectedServices: ''
  };
  subscription = new Subscription();

  @Output() closeEvent = new EventEmitter<boolean>();
  faXmark = faXmark;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.searchService.selectedOptions.subscribe(_selections => this.selections = _selections));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search() {
    this.searchService.search();
    this.close();
  }

  close() {
    this.closeEvent.emit(true);
  }

  onCountiesChange($event: string) {
    this.searchService.selectCounties = $event;
  }

  onNameChange($event: string) {
    this.searchService.selectName = $event;
  }

  onLanguagesChange($event: string) {
    this.searchService.selectLanguages = $event;
  }

  onServicesChange($event: string) {
    this.searchService.selectServices = $event;
  }

  clearSelections() {
    this.searchService.clearSelections();
  }
}
