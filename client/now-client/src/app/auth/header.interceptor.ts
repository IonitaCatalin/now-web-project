import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {UserService} from "./user.service";

@Injectable({providedIn: 'root'})
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_KEY = this.userService.getCurrentUser().authToken;
    return next.handle(req.clone({ setHeaders: { API_KEY } }));
  }
}
