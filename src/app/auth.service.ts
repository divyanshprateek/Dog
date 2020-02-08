import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { AuthResponse } from './auth-response';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  res: any;
  url: string = "http://13.233.55.160";
  AUTH_SERVER_ADDRESS: string = "http://13.233.55.160";
  authSubject = new BehaviorSubject(false);
  _user: any;

    constructor(private http: HttpClient, private router: Router) {
      // this.ifLoggedIn();
    }

    // ifLoggedIn() {
    //   localStorage.get("user").then(response => {
    //     if (response) {
    //       this.authSubject.next(true);
    //     }
    //   });
    // }
  
    register(user: any): Observable<AuthResponse> {
      user.clientId = "dog";
      return this.http
        .post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/signup`, user)
        .pipe(
          tap(async (res: AuthResponse) => {
            if (res.success === false) {
            } else {
              if (res.user) {
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("ACCESS_TOKEN", res.token);
                this._user = res.user;
                this.authSubject.next(true);
              }
            }
          })
        );
    }
  
    login(user: User): Observable<AuthResponse> {
      return this.http
        .post(`${this.AUTH_SERVER_ADDRESS}/api/login`, user, {
          headers: new HttpHeaders().set("Content-Type", "application/json"),
        })
        .pipe(
          tap(async (res: AuthResponse) => {
            if (res.success == true) {
              localStorage.setItem("user", JSON.stringify(res.user));
  
              localStorage.setItem("ACCESS_TOKEN", res.token);
              this.authSubject.next(true);
            }
          })
        );
    }
  
    // pay(user: User): Observable<AuthResponse> {
    //   return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/instaPay`, user).pipe(
    //     tap(async (res: AuthResponse) => {
  
    //       if (res.status) {
    //         await this.storage.set("Data", res.user.data);
    //         await this.storage.set("EXPIRES_IN", res.user.expires_in);
    //         this.authSubject.next(true);
    //       }
    //     })
    //   );
    // }
  
    async logout() {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("user");
      this.authSubject.next(false);
      this.router.navigateByUrl('/login');
    }
  
    isLoggedIn() {
      const user = localStorage.getItem("user");
        const token = localStorage.getItem("ACCESS_TOKEN");
          console.log(user);
          if (user == null || user == undefined) {
            this.authSubject.next(true);
          }
    }
    
    isAuthenticated() {
      return this.authSubject.value;
    }
  
    get user() {
      return this._user;
    }

    getData(): Observable<any> {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("ACCESS_TOKEN");
      var index = token.indexOf(" ");
      var tokenstr = token.substr(index + 1);
  
      const httpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer validToke."
      });
      console.log(this.http);
      return this.http
        .get(`${this.url}/api/getDogOrders/` + user._id + "/" + tokenstr)
    }
}
