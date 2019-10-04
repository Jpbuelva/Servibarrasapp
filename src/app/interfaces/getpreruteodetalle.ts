export interface Getpreruteodetalle {
  preRuteoId: number;
  preRuteoFecha: string;
  preRuteoUsuario: string;
  preRuteoConsecutivo: number;
  preRuteoDetalleId: number;
  novedadId: number;
  novedadDescripcion: string;
  presentacionId: number;
  presentacionCodigo: string;
  presentacionDescripcion: string;
  bodegaLogicaId: number;
  bodegaLogicaDescripcion: string;
  ubicacionCodigo: string;
  ubicacionDescripcion: string;
  preRuteoDetalleCantidad: number;
  preRuteoDetalleCantNovedad?: any;
  preRuteoDetalleCantRequerida: number;
  contenedorId?: any;
  valorPlantillaLoteValor: string;
}
