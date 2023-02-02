import {Component} from "@angular/core";
import {AnimationOptions} from "mapbox-gl";

@Component({
  selector: 'app-auth-bg',
  templateUrl: './auth-background.component.html',
  styleUrls: ['./auth-background.component.scss']
})
export class AuthBackgroundComponent {
  center: [number, number] = [0, 0];
  panToOptions: AnimationOptions = { duration: 10000, easing: (t) => t };

  moveCenter() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const targetY = this.center[0];
    if (targetY === 0) {
      this.center = [90, 0];
    } else if (targetY === 90) {
      this.center = [180, 0];
    } else if (targetY === 180) {
      this.center = [-90, 0];
    } else if (targetY === -90) {
      this.center = [0, 0];
    }
  }
}
