import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken
    }),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
