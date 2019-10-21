import { Injectable} from '@angular/core'; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class PickingdtoService {
    
  private url = 'http://52.224.236.78/tecnocedi/api'; 
 
  constructor( private http: HttpClient) {
  }

  getBase() {
    // return  this.picking;
  }

  getCaptura(usuario) {
    // return  this.UbicacionCaptuda;
  }

  getNovedadPicking() {
    return this.http.get(`${this.url}/getnovedadespicking`);
  }
  getnovedadesacciones() {
    return this.http.get(`${this.url}/getnovedadesacciones`);
  }

  getRuteos() {
    return this.http.get(`${this.url}/getruteos`);
  }

  getRuteosid(data): Observable<any> {
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/getruteoDetalle`, data, {headers: myheader});
    }

    setpickingruteo(data): Observable<any> {
      const myheader = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(`${this.url}/setpickingruteo`, data, {headers: myheader});
      }

    getubicacionbyusuario(usuarioId) {
      return this.http.get(`${this.url}/getubicacionbyusuarioId/${usuarioId}`);
    }
}

