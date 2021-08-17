import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "environments/environment.prod";

import { User } from "../../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public currentUserContext: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  respUser: any;

  constructor(private _http: HttpClient, private _router: Router) {
    this.currentUserContext = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("User") || "{}")
    );
    this.currentUser = this.currentUserContext.asObservable();
  }

  setCurrentUserContext(respUser: any) {
    localStorage.setItem("User", JSON.stringify(respUser));
    this.currentUserContext.next(respUser);
  }

  public get currentUserValue(): User {
    return this.currentUserContext.value;
  }

  login(form: any): Observable<any> {
    const env = { environment };
    return this._http.post(`${env.environment.api}/login`, form).pipe(
      map((user: any) => {
        this.respUser = user;
        if (this.respUser) {
          this.setCurrentUserContext(this.respUser);
        }
        return user;
      })
    );
  }

  commandCenter(command: any): Observable<any> {
    const env = {environment};
    const headers = new HttpHeaders().set(
      "Authorization", "Bearer " + this.currentUserValue.token
    );
    return this._http.post(`${env.environment.api}/command-center`, command, {
      headers: headers
    }).pipe(map(res => {
      return res;
    }));
  }

  logout() {
    localStorage.removeItem("User");
    this.currentUserContext.next(null);
    this._router.navigate(["/login"]);
    localStorage.clear();
  }
}