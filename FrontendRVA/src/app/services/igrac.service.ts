import { Igrac } from './../models/igrac';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IgracService {

  private readonly API_URL = 'http://localhost:8083/igrac/';
  private readonly API_URL_BYID = 'http://localhost:8083/igracZaTimId/';

  dataChange : BehaviorSubject<Igrac[]> = new BehaviorSubject<Igrac[]>([]);

  constructor( private httpClient: HttpClient ) { }

  public getAllIgrac(): Observable<Igrac[]> {
    this.httpClient.get<Igrac[]>(this.API_URL).subscribe(data =>{
      this.dataChange.next(data);
    });
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
    return this.dataChange.asObservable();
  }

  public getIgracZaTim(idTima: number) : Observable<Igrac[]> {
    this.httpClient.get<Igrac[]>(this.API_URL_BYID + idTima).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }

  public addIgrac(igrac: Igrac): void {
    this.httpClient.post(this.API_URL, igrac).subscribe();
  }

  public updateIgrac(igrac: Igrac): void {
    this.httpClient.put(this.API_URL, igrac).subscribe();
  }

  public deleteIgrac(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
