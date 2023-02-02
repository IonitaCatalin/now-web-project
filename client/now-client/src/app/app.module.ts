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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {NotarPopupInfoComponent} from './map/popup-info/notary/notar-popup-info.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RatingComponent} from './utils/rating/rating.component';
import {MatTabsModule} from "@angular/material/tabs";
import {TranslatorPopupInfoComponent} from './map/popup-info/translator/translator-popup-info.component';
import {ReviewListComponent} from './reviews/review-list/review-list.component';
import {RateDialogComponent} from './dialogs/rate-dialog/rate-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthBackgroundComponent} from "./auth/auth-background.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRippleModule} from "@angular/material/core";
import {SearchDialogComponent} from './search/search-dialog/search-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {RdfaComponent} from './rdfa/rdfa.component';
import {HeaderInterceptor} from "./auth/header.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    NotarPopupInfoComponent,
    RatingComponent,
    TranslatorPopupInfoComponent,
    ReviewListComponent,
    RateDialogComponent,
    LoginComponent,
    SignupComponent,
    AuthBackgroundComponent,
    SearchDialogComponent,
    RdfaComponent,
    RdfaComponent,
  ],
  imports: [
    FontAwesomeModule,
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
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatRippleModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
