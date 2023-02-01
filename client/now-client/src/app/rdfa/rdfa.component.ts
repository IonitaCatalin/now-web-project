import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {MapboxService} from "../map/_service/mapbox.service";

@Component({
  selector: 'app-my-rdfa',
  template: '<div [innerHTML]="html"></div>'
})
export class RdfaComponent implements OnInit {
  @Input() itemLD: any;
  html: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer,
              private mapService: MapboxService) { }

  ngOnInit() {
    // this.html = this.getSafeHTML(this.itemLD);
    this.mapService.myRDF$.subscribe(val => {
      this.html = this.getSafeHTML(val);
    })
  }

  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
