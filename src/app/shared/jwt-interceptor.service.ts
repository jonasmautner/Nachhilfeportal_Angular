import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private toastr:ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event:HttpEvent<any>) => {  // next handle = Outgoing des Requests -> liefert Observable (rxjs) -> Abfangen mit pipe
        if(event instanceof HttpResponse){
          // success 200
        }
      },
      (error:any) => {
        if (error instanceof HttpErrorResponse) { // error
          if(error.status === 401) {
            this.toastr.error("Benutzername oder Passwort falsch!", "Fehler");
          }
          if(error.status === 500) {
            this.toastr.error("Token möglicherweise abgelaufen!", "Serverfehler");
          }
        }
      }));
  }
}
