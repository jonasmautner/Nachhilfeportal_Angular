import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user";
import { ToastrService } from "ngx-toastr";


interface Token {
  exp: number,
  user: {
    id: string;
  }
}

@Injectable()

export class AuthenticationService {

  private api = 'http://www.nachhilfeportal.s1910456019.student.kwmhgb.at/api/auth';

  constructor(
    private http:HttpClient,
    private router:Router,
    private toastr:ToastrService
  ) {}

  login(email: string, password: string):Observable<any> {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public setSessionStorage(token:string) {
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id)
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    this.router.navigate(['/']);
    this.toastr.success("Sie wurden erfolgreich abgemeldet!");
  }

  public isLoggedIn() {
    if(sessionStorage.getItem("token")) {
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate:Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()) {
        console.log("Token abgelaufen!")
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

}
