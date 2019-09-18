export interface Productos {

  productoId: number;
  productoCodigo: string;
  productoDescripcion: string;
  productoCantidadManejo: number;
  productoCantidadEscalar: number;
  productoUnidadInventario: number;
  productoManejaLote: number;
  productoEstado: number;
  productoCodigoAlternativo: string;
  productoManejaDimension: number;
  titularId: number;
  unidadManejoId: number;
  unidadEscalarId: number;
  productoTipo: number;
  titular?: any;
  unidadEscalar?: any;
  unidadManejo?: any;
  pedidosDetalle: any[];
  plantillasProductos: any[];
  presentaciones: any[];
  productosAtributos: any[];
  productosClasificaciones: any[];
  productosCombosproductoIdComboNavigation: any[];
  productosCombosproductoIdDestinoNavigation: any[];
  productosContenedores: any[];
  productosLotes: any[];
  reglas: any[];
  saldos: any[];
}
