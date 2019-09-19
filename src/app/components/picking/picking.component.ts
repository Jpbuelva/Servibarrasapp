import { Component, OnInit } from '@angular/core';

import { PickingdtoService } from '../../services/pickingdto.service';
import { PickingDTO } from '../../interfaces/picking-dto';
import { PickingDTOUbicacionCapturada } from '../../interfaces/picking-dto-ubicacion-capturada';
import { PickingDTORuteo } from '../../interfaces/picking-dto-ruteo';

import { ProductosserviceService } from '../../services/productosservice.service';
import { Productos } from '../../interfaces/productos';


@Component({
  selector: 'app-picking',
  templateUrl: './picking.component.html',
  styleUrls: ['./picking.component.css']
})
export class PickingComponent implements OnInit {
 productos: Productos[];

  vcambio: number;
  picking: PickingDTO[] = [];
  ruteos: PickingDTORuteo[] = [];
  ubicacionCapturada: PickingDTOUbicacionCapturada[] = [];
  v1: string ;
  v2: string ;
  v3: string ;
  v4: string ;
  v5: string ;
  v6: string ;
  v7: string ;
  v8: string ;

  cv1: string ;
  cv2: string ;
  cv3: string ;
  cv4: string ;
  cv5: string ;
  cv6: string ;
  cv7: string ;
  cv8: string ;

  constructor(
    private pickingDtoService: PickingdtoService,
    private productoService: ProductosserviceService) {
    this.ruteos = this.pickingDtoService.getRuteos();
    this.vcambio = 1;
  
 }


  ngOnInit() {
 
  }
  BtnCaptuta(usuario: string) {
  this.ubicacionCapturada = this.pickingDtoService.getCaptura(usuario);

  // UBICACION CAPTURADA
  this.cv1 = this.ubicacionCapturada[0].ubicacionCodigo.substring(0, 2);
  this.cv2 = this.ubicacionCapturada[0].ubicacionCodigo.substring(2, 4);
  this.cv3 = this.ubicacionCapturada[0].ubicacionCodigo.substring(4, 6);
  this.cv4 = this.ubicacionCapturada[0].ubicacionCodigo.substring(6, 8);
  this.cv5 = this.ubicacionCapturada[0].ubicacionCodigo.substring(8, 10);
  this.cv6 = this.ubicacionCapturada[0].ubicacionCodigo.substring(10, 12);
  this.cv7 = this.ubicacionCapturada[0].ubicacionCodigo.substring(12, 14);
  this.cv8 = this.ubicacionCapturada[0].ubicacionCodigo.substring(14, 16);
 }

 btnRuteos(ruteo: number) {
  this.picking = this.pickingDtoService.getBase();
  this.vcambio = 2;
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.picking.length; i++) {
    if (this.picking[i].RuteoId === ruteo) {
    this.v1 = this.picking[i].ubicacionCodigo.substring(0, 2);
    this.v2 = this.picking[i].ubicacionCodigo.substring(2, 4);
    this.v3 = this.picking[i].ubicacionCodigo.substring(4, 6);
    this.v4 = this.picking[i].ubicacionCodigo.substring(6, 8);
    this.v5 = this.picking[i].ubicacionCodigo.substring(8, 10);
    this.v6 = this.picking[i].ubicacionCodigo.substring(10, 12);
    this.v7 = this.picking[i].ubicacionCodigo.substring(12, 14);
    this.v8 = this.picking[i].ubicacionCodigo.substring(14, 16);
    break;
   }
  }
 }
 btncabeza() {
   this.vcambio = 1;
 }

public getproducto() {
  this.productoService.getProducto().subscribe(res => {
  this.productos = res;
  console.log(this.productos);
});
 }
}
