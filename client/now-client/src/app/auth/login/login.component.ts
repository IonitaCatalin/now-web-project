import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error = '';
  errorMsg = 'Invalid username or password!';

  @Output() submitEM = new EventEmitter();
  faHouse = faHouse;

  submit() {
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe({
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
