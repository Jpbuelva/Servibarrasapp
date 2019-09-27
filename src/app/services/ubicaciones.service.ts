import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor( private http: HttpClient) {
  }


  getArticulos(): Observable<any> {
    return this.http.get('http://52.224.236.78/tecnocedi/api/getubicaciones');
    }
}
