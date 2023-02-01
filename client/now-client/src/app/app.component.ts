import {Component} from '@angular/core';
import {productLD, sparqlrdf} from "./rdfa/myrdf";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myRdfa =  sparqlrdf;
}
