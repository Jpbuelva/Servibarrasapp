import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RuteoService {

  constructor( private http: HttpClient) { }

  getListPreruteo(): Observable<any> {
    return this.http.get('http://52.224.236.78/tecnocedi/api/getpreruteos');
    }
  getDetallesPreruteo(id: string): Observable<any> {
      return this.http.get(`http://52.224.236.78/tecnocedi/api/getpreruteodetalle/${id}`);
    }
  getNovedadesPreruteo(id: string): Observable<any> {
        return this.http.get(`http://52.224.236.78/tecnocedi/api/getpreruteodetallenovedad/${id}`);
      }

  getBahia(id: string): Observable<any> {
        return this.http.get(`http://52.224.236.78/tecnocedi/api/getubicacionesbytipoubicacionid/${id}`);
      }

      getConfigurar(id: string): Observable<any> {
        return this.http.get(`http://52.224.236.78/tecnocedi/api/getpedidospreruteo/${id}`);
      }

      getGrupos(): Observable<any>{
          return this.http.get(`http://52.224.236.78/tecnocedi/api/getgrupos`);
      }
}
