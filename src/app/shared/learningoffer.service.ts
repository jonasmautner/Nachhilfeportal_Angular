import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Learningoffer, Subject, User } from "./learningoffer";
import { LearningofferObservable } from "./learningoffer-observable";

@Injectable({
  providedIn: 'root'
})
export class LearningofferService {

  private api = 'http://www.nachhilfeportal.s1910456019.student.kwmhgb.at/api';

  constructor(
    private http:HttpClient
  ) {}

  getAll():Observable<Array<Learningoffer>> {
    return this.http.get<Array<Learningoffer>>(`${this.api}/offers`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(id:number):Observable<Learningoffer> {
    return this.http.get<Learningoffer>(`${this.api}/offers/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id:string):Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(offer:LearningofferObservable):Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(offer:Learningoffer):Observable<any>{
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  accept(offer:Learningoffer, learner:any):Observable<any> {
    return this.http.put(`${this.api}/offers/accept/${offer.id}`, learner)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  // check(isbn:string):Observable<Boolean> {
  //   console.log("check isbn");
  //   return this.http.get<Boolean>(`${this.api}/books/checkISBN/${isbn}`)
  //     .pipe(retry(3))
  //     .pipe(catchError(this.errorHandler));
  // }

  private errorHandler(error:Error|any):Observable<any>{
    return throwError(() => new Error(error));
  }

  getAllSubjects():Observable<Array<Subject>> {
    return this.http.get<Array<Learningoffer>>(`${this.api}/subjects`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getUserById(id:number):Observable<any> {
    return this.http.get<any>(`${this.api}/user/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
  }
}
