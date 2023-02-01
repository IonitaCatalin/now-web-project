import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {environment} from "../../environments/environment";

export interface NowUser {
  username: string;
  email: string;
  isAuth: boolean;
  authToken: string;
  coords: {
    lng: number;
    lat: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userInit: NowUser = {
    username: 'username',
    email: 'anonymous@email.com',
    isAuth: false,
    authToken: '',
    coords: {
      lat: 47.17396317620398,
      lng: 27.57494318626357
    }
  }

  private _mockUser: NowUser = {
    username: 'test',
    email: 'test@test.com',
    isAuth: true,
    authToken: '123',
    coords: {
      lat: 47.17396317620398,
      lng: 27.57494318626357
    }
  }

  private _userSubject = new BehaviorSubject<NowUser>(this._userInit);

  public getCurrentUser(): NowUser {
    return this._userSubject.value;
  }

  public getCurrentUser$(): Observable<NowUser> {
    return this._userSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    const nowUser = window.localStorage.getItem('nowUser');
    if (!!nowUser) {
      const currentUser: NowUser = JSON.parse(nowUser);
      this._userSubject.next(currentUser);
    }
  }

  login(loginData: {
    username: string;
    password: string;
  }) {
    // return this.http.post<{
    //   access_token: string
    // }>(`${environment.AUTH_URL}/auth/login`, loginData).pipe(
    //   tap(token => this._userSubject.next(({
    //     ...this._userSubject.value,
    //     isAuth: true,
    //     authToken: token.access_token,
    //     username: loginData.username,
    //   }))),
    //   tap(user => this.persistIntoLocalStorage(this._userSubject.value))
    // );
    return of(this._mockUser).pipe(
      tap(user => this._userSubject.next(user)),
      tap(user => this.persistIntoLocalStorage(user))
    );
  }

  signup(signupData: {
    username: string;
    email: string;
    password: string;
  }) {
    // return this.http.post<{
    //   access_token: string
    // }>(`${environment.AUTH_URL}/auth/login`, signupData).pipe(
    //   tap(token => this._userSubject.next(({
    //     ...this._userSubject.value,
    //     isAuth: true,
    //     authToken: token.access_token,
    //     username: signupData.username,
    //     email: signupData.email,
    //   }))),
    //   tap(user => this.persistIntoLocalStorage(this._userSubject.value))
    // );

    return of(this._mockUser).pipe(
      tap(user => this._userSubject.next(user)),
      tap(user => this.persistIntoLocalStorage(user))
    );
  }

  logout() {
    this._userSubject.next(this._userInit);
    window.localStorage.removeItem('nowUser');
  }

  updateCoords(coords: {
    lng: number;
    lat: number;
  }) {
    const tmpUser = this._userSubject.value;
    this._userSubject.next({
      ...tmpUser,
      coords
    });
  }

  private persistIntoLocalStorage(user: NowUser) {
    window.localStorage.setItem('nowUser', JSON.stringify(user));
  }
}
