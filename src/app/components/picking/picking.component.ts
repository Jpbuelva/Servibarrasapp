import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Productos } from '../../interfaces/productos';
import { MatTabChangeEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import { PickingdtoService } from '../../services/picking.service';
import { FormControl } from '@angular/forms';
import { ModalnovedadComponent } from '../popup/modalnovedad/modalnovedad.component';
import { ModalordenpickingComponent } from '../popup/modalordenpicking/modalordenpicking.component';



@Component({
  selector: 'app-picking',
  templateUrl: './picking.component.html',
  styleUrls: ['./picking.component.css']
})


export class PickingComponent implements OnInit {

  displayedColumns2: string[] = [ 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8'];
  dataSourceUbica: Array<any> = [];
  dataCaptura;
  dataCapturaVer: Array<any> = [];
  public cargando = true;
  novedadAccionId;
  novedadId;
  public dialogRef;
  dataSourceNovedad;
  dataSourcedata;
  dataSourceNovedadAccion;
  usuarioId = 67;
  ubicacion;
  dataSource;
  dataruteo: Array<any> = [];
  productoCodigo;
  productoNombre;
  value = 0;
  buttoprocesar = true;
  valueCont = 0;
  valueclass = 3;
  picking;
  ubicacionCapturada;
  idRuteo;
  @ViewChild('tabGroup', {static: true}) tabGroup;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  this.value = 0;
  this.valueclass = 0;
  this.valueCont = 0;

  }
  constructor(
    private pickingDtoService: PickingdtoService,
    public dialog: MatDialog ) {


this.pickingDtoService.getRuteos().subscribe(res => {
  this.dataSourcedata = res;
  if (res) {
    this.cargando = false;
  }
});
       }
 ngOnInit() {
  }

 btnRuteos(ruteoId: number) {
  this.idRuteo = ruteoId;
  this.dataSourceUbica = [];
  this.cargando = true;
  this.buttoprocesar = true;

  this.dataruteo = [];
  const dataruteo = '{"ruteoId":' + this.idRuteo + ',"ruteoDetalleId":' + 0 + ' }';
  this.picking = [];
  this.pickingDtoService.getRuteosid(dataruteo)
  .subscribe(resp => {
    console.log(resp);
    if (resp) {
    this.picking = resp.table;
    this.productoCodigo = this.picking[0].presentacionCodigo;
    this.productoNombre = this.picking[0].presentacionDescripcion;
    this.dataSourceUbica.push({
          v1 : this.picking[0].ubicacionCodigo.substring(0, 2),
          v2 : this.picking[0].ubicacionCodigo.substring(2, 4),
          v3 : this.picking[0].ubicacionCodigo.substring(4, 6),
          v4 : this.picking[0].ubicacionCodigo.substring(6, 8),
          v5 : this.picking[0].ubicacionCodigo.substring(8, 10),
          v6 : this.picking[0].ubicacionCodigo.substring(10, 12),
          v7 : this.picking[0].ubicacionCodigo.substring(12, 14),
          v8 : this.picking[0].ubicacionCodigo.substring(14, 16)}
          );
    this.dataSource = new MatTableDataSource(this.dataSourceUbica);
    this.value = 1;
    this.valueCont = 1;
    this.valueclass = 3;
    this.cargando = false; }

  });
 }

 applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}

 BtnCaptura(usuario: string) {
  this.buttoprocesar = false;
  this.dataCaptura = [];
  this.cargando = true;
  this.dataCapturaVer = [];
  this.pickingDtoService.getubicacionbyusuario(67)
  .subscribe(res => {
    if (res) {
      this.ubicacionCapturada = res;
      this.ubicacionCapturada = '0201031401010101';

      this.dataCaptura = {
      v1 : this.ubicacionCapturada.substring(0, 2),
      v2 : this.ubicacionCapturada.substring(2, 4),
      v3 : this.ubicacionCapturada.substring(4, 6),
      v4 : this.ubicacionCapturada.substring(6, 8),
      v5 : this.ubicacionCapturada.substring(8, 10),
      v6 : this.ubicacionCapturada.substring(10, 12),
      v7 : this.ubicacionCapturada.substring(12, 14),
      v8 : this.ubicacionCapturada.substring(14, 16)
  };
      this.dataCapturaVer.push(this.dataCaptura);
      if (this.dataSourceUbica.length > 1) {
          this.dataSourceUbica.splice(1, 1);
      }
      if (JSON.stringify(this.dataSourceUbica ) === JSON.stringify(this.dataCapturaVer)) {
              console.log('They are equal!');
              this.buttoprocesar = false;

              this.valueclass = 1;
              this.valueCont = this.dataSourceUbica.length ;
      } else {
              this.buttoprocesar = true;
              this.dataSourceUbica.push(this.dataCaptura);
              this.valueclass = 0;
              this.valueCont = this.dataSourceUbica.length ;
              }
      this.dataSource = new MatTableDataSource( this.dataSourceUbica);
      this.cargando = false;
  }

  });
 }

 BtnProcesar() {
  if (JSON.stringify(this.dataSourceUbica ) === JSON.stringify(this.dataCapturaVer)) {
    this.usuarioId = 67;
    this.ubicacion = this.picking[0].ubicacionCodigo;
    const datapickingruteo  = '{"contenedorTag":""' + ',"ubicacionTag":' + '"' + this.ubicacion + '"' +
    ',"novedadId":' +  this.novedadId + ',"novedadAccionId":' + this.novedadAccionId + ',"usuarioId":' + this.usuarioId + '}';
    this.pickingDtoService.setpickingruteo(datapickingruteo)
    .subscribe(resp => {
      alert(resp);
    });
} else {
     alert('no son iguales');
   }
 }

// Modal Novedad 
 openDialogNovedad(): void {
  this.pickingDtoService.getNovedadPicking().subscribe(res => {
    if (res) {
      this.dataSourceNovedad = res;
      this.pickingDtoService.getnovedadesacciones().subscribe(resp => {
    if (resp) {
      this.dataSourceNovedadAccion = resp;
      debugger;
      this.dialogRef = this.dialog.open( ModalnovedadComponent , {
        width: '700px',
        data: {
              dataNovedadAccion: this.dataSourceNovedadAccion,
              dataNovedad: this.dataSourceNovedad,
              novedadAccionId: this.novedadAccionId,
              novedadId: this.novedadId
        }
      });
      this.dialogRef.afterClosed().subscribe( result => {
                if (result) {
                  debugger;
                  this.novedadAccionId = result.novedadAccionId;
                  this.novedadId = result.novedadId;
                  this.ubicacion = this.picking[0].ubicacionCodigo;
                  const datapickingruteo  = '{"contenedorTag":""' + ',"ubicacionTag":' + '"' + this.ubicacion + '"' +
                  ',"novedadId":' +  this.novedadId + ',"novedadAccionId":' + this.novedadAccionId + ',"usuarioId":' + this.usuarioId + '}';
                  this.pickingDtoService.setpickingruteo(datapickingruteo)
                  .subscribe( resp => {
                    if (resp) {
                      this.btnRuteos(this.idRuteo);
                    }
                    alert(resp);
                  });

                } else {
                }
              });
            }

        });
    }
  });
}

// Modal Orden
openDialogOrden() {

  this.dialogRef = this.dialog.open( ModalordenpickingComponent , {
    width: '700px',
    data: {
          dataNovedadAccion: 'Josué'
    }
  });
  this.dialogRef.afterClosed().subscribe( result => {
            if (result) {
                alert(result);
            }
          });
        }
}
