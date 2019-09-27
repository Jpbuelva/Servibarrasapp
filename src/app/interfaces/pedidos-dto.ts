export interface PedidosDTO {
  pedidoId: number;
  sucursalId: number;
  pedidoConsecutivo: number;
  pedidoFecha: string;
  pedidoFechaEntrega: string;
  pedidoFechaCarga: string;
  pedidoFechaMalla: string;
  pedidoObservacion: string;
  pedidoDocumentoERP: string;
  pedidoConsecutivoERP: string;
  pedidoVersion: number;
  pedidoEstado: number;
  pedidoFuente?: string;
  puntoOperacionId: number;
  puntoOperacion?: any;
  sucursal?: any;
  pedidosDetalle: any[];
  preRuteosPedidos: any[];
  ruteosPedidos: any[];
}
