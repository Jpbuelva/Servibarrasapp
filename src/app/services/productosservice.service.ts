import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Productos } from '../interfaces/productos';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductosserviceService {
  cargando = true;
  productos: Productos[] = [];
  public url: string;

  constructor( private http: HttpClient) {
    this.url = 'http://52.224.236.78/tecnocedi/api/productos' ;
     }

     getProducto(): Observable<any> {


      // const headers = new HttpHeaders({
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET',
      // 'Content-Type': 'application/json'});, {headers}
      // tslint:disable-next-line: max-line-length
      // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '52.224.236.78', 'Content-Type': 'application/x-www-form-urlencoded'});

      return this.http.get('http://52.224.236.78/tecnocedi/api/productos');
      }
}


