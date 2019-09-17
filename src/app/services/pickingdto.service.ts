import { Injectable } from '@angular/core';
import { PickingDTO } from '../interfaces/picking-dto';
import { PickingDTOUbicacionCapturada } from '../interfaces/picking-dto-ubicacion-capturada';
import { PickingDTORuteo } from '../interfaces/picking-dto-ruteo';


@Injectable({
  providedIn: 'root'
})
export class PickingdtoService {

private picking: PickingDTO[] = [
  {
    RuteoId: 1,
    ubicacionCodigo: '1111111111111111' ,
    productoCodigo: '96526108370001' ,
    productoNombre: 'RINGO VITALITY CACHORROS X 8KG BULTO',
    cantidad: '60'
  },
  {
    RuteoId: 1,
    ubicacionCodigo: '2222222222222222' ,
    productoCodigo: '96526108370001' ,
    productoNombre: 'RINGO VITALITY CACHORROS X 8KG BULTO',
    cantidad: '60'
  },
  {
    RuteoId: 2,
    ubicacionCodigo: '3333333333333333' ,
    productoCodigo: '96526108370001' ,
    productoNombre: 'RINGO VITALITY CACHORROS X 8KG BULTO',
    cantidad: '60'
  }
];

  private UbicacionCaptuda: PickingDTOUbicacionCapturada[] = [
    {
      ubicacionCodigo: '0301070200010201'
    }];

  private RuteosConsecutivos: PickingDTORuteo[] = [
    {
      RuteoId: 1,
      RuteoConsecutivo: '111'
    },
    {
      RuteoId: 2,
      RuteoConsecutivo: '222'
    },
    {
      RuteoId: 3,
      RuteoConsecutivo: '333'
    },
    {
      RuteoId: 4,
      RuteoConsecutivo: '444'
    }
  ];
  constructor() { }

  getBase() {
    return  this.picking;
  }

  getCaptura(usuario) {
    return  this.UbicacionCaptuda;
  }

  getRuteos() {
    return  this.RuteosConsecutivos;
  }

}
