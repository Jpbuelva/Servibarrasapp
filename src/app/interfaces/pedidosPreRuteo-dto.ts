export interface pedidosPreruteo {
    pedidoId:number,
    sucursalId:number,
    pedidoConsecutivo:number,
    pedidoFecha:Date,
    pedidoFechaEntrega:Date,
    pedidoFechaCarga:Date,
    pedidoFechaMalla:Date,
    pedidoObservacion:string,
    pedidoDocumentoERP:string,
    pedidoConsecutivoERP:number,
    pedidoVersion:number,
    pedidoEstado:number,
    pedidoFuente:string,
    puntoOperacionId:number,
    puntoOperacion:null,
    sucursal:string,
    pedidosDetalle:[],
    preRuteosPedidos:[],
    ruteosPedidos:[],
    bahiaId?:number,
    orden?:number
  }
   



