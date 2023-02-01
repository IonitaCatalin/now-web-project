import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AnimationOptions} from "mapbox-gl";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error = '';
  errorMsg = 'Invalid username or password!';

  @Output() submitEM = new EventEmitter();

  faHouse = faHouse;

  submit() {
    if (this.form.valid) {
      this.userService.signup(this.form.value).subscribe({
        next: (res) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.error = err;
        }
      });
    }
  }

}
