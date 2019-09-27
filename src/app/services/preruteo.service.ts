import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PedidosDTO } from '../interfaces/pedidos-dto';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PreruteoService {
  private url = 'http://52.224.236.78/tecnocedi/api';
  cargando = true;
  productos: PedidosDTO[] = [];
  productosFiltrado: PedidosDTO[] = [];
  httpOptionsNoAuth: any;
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) {
  }
headers: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8'
});

  getArticulos(): Observable<any> {
    return this.http.get(`${this.url}/getpedidos`);
    }

  addpreruteo(data): Observable<any> {
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/AddPedidosPreruteo`, data, {headers: myheader});
    }

    setpreruteos(data): Observable<any> {
      const myheader = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(`${this.url}/SetPreruteo`, data, {headers: myheader});
      }
  }
