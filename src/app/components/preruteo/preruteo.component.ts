import { Component, OnInit, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { PedidosDTO } from '../../interfaces/pedidos-dto';
import { PreruteoService } from '../../services/preruteo.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-preruteo',
  templateUrl: './preruteo.component.html',
  styleUrls: ['./preruteo.component.css']
})

export class PreruteoComponent implements OnInit {
  public ELEMENT_DATAS: [] ;
  public Json_repo;
  ordersData = [];
  initialSelection: any;
  dataSource;
  selection;
  cargando = false;
  vcambio: number;

  displayedColumns: string[] = ['select', 'pedidoId', 'pedidoConsecutivo', 'pedidoFechaEntrega',
  'pedidoFechaCarga', 'pedidoObservacion', 'pedidoDocumentoERP', 'pedidoConsecutivoERP', 'pedidoVersion',
  'pedidoFuente', 'sucursal', ];

  constructor(private preruteoService: PreruteoService, private router: Router) {
    this.preruteoService.getArticulos().subscribe(res => {
      this.ELEMENT_DATAS = res;
      this.loaddata();
    });
      }

      @ViewChild(MatPaginator, {static: true})  paginator: MatPaginator;
      @ViewChild(MatSort, {static: true}) sort: MatSort;
      @ViewChild(PreruteoComponent, {static: true})preruteoComponent: PreruteoComponent;
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
    let usuarioId = 1 ;
    let uniqueProcessId =  Guid.create().toString();
    const preruteodata = [];
    this.vcambio = 2;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selection.selected.length; i++) {
      const item = this.selection.selected[i];
      preruteodata.push({
          pedidoId : item.pedidoId,
          usuarioId,
          uniqueProcessId
      });
      }
    const obj = preruteodata;
    this.Json_repo = JSON.stringify(obj);
    this.preruteoService.addpreruteo(this.Json_repo).
    subscribe(res => {
            this.setpreruteo(usuarioId, uniqueProcessId);
             });
 }

  setpreruteo(usuarioId, uniqueProcessId) {
    const preruteo = "{\"usuarioId\":"+usuarioId+",\"uniqueProcessId\":"+"\""+uniqueProcessId+"\""+"}";
    this.preruteoService.setpreruteos(preruteo).
    subscribe( resp => {
      debugger;
      console.log(resp);
  });
  }
  cambio(){
    this.vcambio = 1;

  }
}
