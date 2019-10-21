import { Component, OnInit, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { PedidosDTO } from '../../interfaces/pedidos-dto';
import { PreruteoService } from '../../services/preruteo.service';
import {Router} from '@angular/router';
 

@Component({
  selector: 'app-preruteo',
  templateUrl: './preruteo.component.html',
  styleUrls: ['./preruteo.component.css']
})

export class PreruteoComponent implements OnInit {
  public ELEMENT_DATAS: [] ;
  public Jsonrepo: string;
  dataSource;
  selection;
  public uniqueProcessId;
  public detallePedido;
  public cargando: boolean;
  vcambio: number;
  opcionSeleccionado  = '1';

  displayedColumns: string[] = ['select', 'pedidoId', 'pedidoConsecutivo', 'pedidoFechaEntrega',
  'pedidoFechaCarga', 'pedidoObservacion', 'pedidoDocumentoERP', 'pedidoConsecutivoERP', 'pedidoVersion',
  'pedidoFuente', 'sucursal', 'action'];

  constructor(private preruteoService: PreruteoService, private router: Router) {
    this.cargando = true;
    this.preruteoService.getArticulos().subscribe(res => {
      this.ELEMENT_DATAS = res;
      if (!this.ELEMENT_DATAS) {
        alert('Error de servicio');
      } else {
          this.loaddata();
          this.cargando = false;
      }
    });
      }
      @ViewChild(MatTable, {static: true}) table: MatTable<any>;
      @ViewChild(MatPaginator, {static: true})  paginator: MatPaginator;
      @ViewChild(MatSort, {static: true}) sort: MatSort;
       loaddata() {
         this.dataSource = new MatTableDataSource <PedidosDTO>(this.ELEMENT_DATAS );
         this.selection = new SelectionModel<PedidosDTO>(true, []);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         this.vcambio = 1;
             }
       applyFilter(filterValue: string) {
         this.dataSource.filter = filterValue.trim().toLowerCase();
       }

  ngOnInit() {
   this.cargando = true;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PedidosDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
       }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pedidoId + 1}`;

  }
 toggle(row?: PedidosDTO) {
 this.selection.isSelected(row) ? this.selection.deselect(row) :  this.selection.select(row) ;

  }
  
  prerutear() {

  if (this.opcionSeleccionado === '1') {
    const usuarioId = 1 ;
    this. uniqueProcessId =  Guid.create().toString();
    const preruteodata = [];
    this.vcambio = 2;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selection.selected.length; i++) {
      const item = this.selection.selected[i];
      preruteodata.push({
          pedidoId : item.pedidoId,
          usuarioId,
          uniqueProcessId: this.uniqueProcessId
      });
      }
    const obj = preruteodata;
    this.Jsonrepo = JSON.stringify(obj);
    this.preruteoService.addpreruteo(this.Jsonrepo).
    subscribe(res => {
      if (res) {
        this.setpreruteo(usuarioId, this.uniqueProcessId, -1);

      } else {
        alert('Error de servidor');
      }
             });
    } else {
      const usuarioId = 1 ;
      let preruteodata = [];
      this.vcambio = 2;
      for (let i = 0; i < this.selection.selected.length; i++) {
      const item = this.selection.selected[i];
      this.uniqueProcessId = Guid.create().toString();
      preruteodata.push({
          pedidoId : item.pedidoId,
          usuarioId,
          uniqueProcessId: this.uniqueProcessId
      });
      const obj = preruteodata;
      this.Jsonrepo = JSON.stringify(obj);
      preruteodata = [];
      this.preruteoService.addpreruteo(this.Jsonrepo).
      subscribe(res => {
      if (res) {
        this.setpreruteo(res[0].usuarioId, res[0].uniqueProcessId, i); }
                 });
      }
    }
 }
  setpreruteo(usuarioId, uniqueProcessId, numberdata) {
    const preruteo = '{"usuarioId":' + usuarioId + ',"uniqueProcessId":' + '"' + uniqueProcessId + '"' + '}';
    this.preruteoService.setpreruteos(preruteo).
    subscribe( resp => {
      if (numberdata === -1) {
        this.router.navigate (['/ruteo']);
        return;
        }
      if (numberdata === this.selection.selected.length - 1) {
        this.router.navigate (['/ruteo']);
        }
  });
  }

  openDetalles(pedidoId) {
    this.preruteoService.getpedidodetalle (pedidoId)
    .subscribe( res => {
         this.detallePedido = res.table;
        });
    }

  cambio() {
    this.vcambio = 1;
  }


}
