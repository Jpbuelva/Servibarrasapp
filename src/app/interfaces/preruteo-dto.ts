export interface PreruteoDTO {

  preRuteoId: number;
  preRuteoFecha: string;
  preRuteoUsuario: string;
  preRuteoConsecutivo: number;
  documentoId: number;
  preRuteoPedidoEstado: number;
  pedidosBahiasOrdenItems?: Array<pedidosBahiasOrden>;
  gruposruteoItems?: Array<Gruposruteo>;

}

export interface pedidosBahiasOrden {

      preRuteoId?:number;
      pedidoId:number;
      pedidoConsecutivo:number,
      bahiaId?:1361;
      orden?:number;

}


export interface Gruposruteo {

  preRuteoId:number;
  pedidoId:number;
  bahiaId:number;
  orden:number;

}


