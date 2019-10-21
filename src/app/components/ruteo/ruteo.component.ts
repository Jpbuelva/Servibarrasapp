import { OnInit, ViewChild, Component, Inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { RuteoService } from '../../services/ruteo.service';
import { PreruteoService } from '../../services/preruteo.service';
import { UbicacionesService } from '../../services/Ubicaciones.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PreruteoDTO, pedidosBahiasOrden } from '../../interfaces/preruteo-dto';

import { Observable } from 'rxjs';
import { GrupoDto } from 'src/app/interfaces/grupo-dto';
import { pedidosPreruteo } from 'src/app/interfaces/pedidosPreRuteo-dto';
import { UbicacionesDTO } from 'src/app/interfaces/ubicacines-dto';



@Component({
  selector: 'app-ruteo',
  templateUrl: './ruteo.component.html',
  styleUrls: ['./ruteo.component.css']
})
export class RuteoComponent implements OnInit {
  pipe: DatePipe;
  public ELEMENT_DATAS;
  public ELEMENT_DATASDetalles: [];
  public ELEMENT_DATASNovedades: [];
  public ELEMENT_DATASConfiguracion: [];
  public ELEMENT_DATASBahias: [];

  public Json_repo: string;
  toppings = new FormControl();

  public PreruteoDTOData: PreruteoDTO[];
  preRuteoId;
  usuarioId;
  pedidosOrdenBahiaInfo: [];
  ruteosGrupos: [{ grupoId, grupoCantidad }];
  getPreruteo: PreruteoDTO[];
  ordersData = [];
  animal: string;
  name: string;
  rutvisua = [];
  initialSelection: any;
  dataSource;
  grupoList: Array<GrupoDto>;
  bahiasList: Array<UbicacionesDTO>;
  CantidadPedidosList: [number] = null;
  pedidosPreRuteoList: Array<pedidosBahiasOrden>;
  preRuteoList: Array<PreruteoDTO>;  
  selection;
  selectionGrupo;
  public cargando: boolean;
  public mostrar: boolean;

  constructor(private ruteoService: RuteoService, private preRuteoService: PreruteoService,
              private ubicacionesService: UbicacionesService, private router: Router,
              private dialog: MatDialog) {
    this.cargando = true;
    this.ruteoService.getListPreruteo().subscribe(res => {
      this.ELEMENT_DATAS = res;

      this.preRuteoList = [];

      res.forEach((x) => {
        this.preRuteoList.push(x);
      });


      if (!this.ELEMENT_DATAS) {
        alert('Error de servicio');
      } else {

        this.getBahia(2);
        this.getGrupos();
        this.loaddata();

        this.cargando = false;
        this.mostrar = false;
      }
    });

  }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loaddata() {
    this.dataSource = new MatTableDataSource<PreruteoDTO>(this.ELEMENT_DATAS);

    this.selection = new SelectionModel<PreruteoDTO>(true, []);
    this.selectionGrupo = new SelectionModel<GrupoDto>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    const numRows = this.preRuteoList.length;
    return numSelected === numRows;
  }

  isAllSelectedGrupos() {
    const numSelected = this.selectionGrupo.selected.length;
    const numRows = this.grupoList.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.preRuteoList.forEach(row => this.selection.select(row));
  }

  masterToggleGrupos() {
    this.isAllSelectedGrupos() ?
      this.selectionGrupo.clear() :
      this.grupoList.forEach(row => this.selectionGrupo.select(row));
  }

  toggle(row?: PreruteoDTO) {
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row);

  }
  toggleGrupo(row?: GrupoDto) {
    this.selectionGrupo.isSelected(row) ? this.selectionGrupo.deselect(row) : this.selectionGrupo.select(row);

  }

  getBahia(tipoUbicacionId) {
    this.ubicacionesService.getBahia(tipoUbicacionId)
      .subscribe(respBahias => {
        if (respBahias) {
          this.bahiasList = []
          respBahias.forEach((x) => {
            this.bahiasList.push(x);
          });
        }
      });
  }

  getpedidosPreruteo(row: PreruteoDTO) {

    if (!row) return;

    if (row.pedidosBahiasOrdenItems != undefined)
      if(row.pedidosBahiasOrdenItems.length > 0) return;

   
    this.preRuteoService.getpedidosPreruteo(row.preRuteoId)
      .subscribe(respPedidosPreRuteo => {
        if (respPedidosPreRuteo) {

          this.pedidosPreRuteoList = []
          respPedidosPreRuteo.forEach((x) => {
            this.pedidosPreRuteoList.push(x);
          });
          this.CantidadPedidosList = [this.pedidosPreRuteoList.length];
          for (let i = 0; i < this.pedidosPreRuteoList.length; i++) {
            this.CantidadPedidosList[i] = (i + 1);
          }

          row.pedidosBahiasOrdenItems = this.pedidosPreRuteoList;
        }
      });
  }

  getGrupos() {
    this.ruteoService.getGrupos()
      .subscribe(respGrupos => {
        if (respGrupos) {
          this.grupoList = [];
          respGrupos.forEach((x) => {
            this.grupoList.push(x);
          });
        }
      });
  }


}



