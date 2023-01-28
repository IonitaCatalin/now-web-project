import { Component, OnInit } from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isEditMode = false;
  sidenavIsOpen = false;
  searchTerm = '';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidenav() {
    console.log("sidenav");
  }

  toggleEdit($event: MatSlideToggleChange) {
    console.log("toggle change", $event);
  }

  onSidenavChange() {
    console.log("sidenav change");
  }

  search() {
    console.log("search");
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
