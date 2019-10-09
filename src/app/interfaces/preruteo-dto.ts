import { pedidoBahia } from './pedidoBahia';
import { grupoPreruteo } from './grupoPreruteo';

export class PreruteoDTO {

  preRuteoid: number;
  preRuteoFecha: string;
  preRuteoUsuario: string;
  preRuteoConsecutivo: number;
  documentoId: number;
  preRuteoPedidoEstado: number;
  pedidosBahias: pedidoBahia;
  gruposPreruteo: grupoPreruteo;

}
