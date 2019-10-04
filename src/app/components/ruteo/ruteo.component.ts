import { OnInit, ViewChild, Component  } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { RuteoService } from '../../services/ruteo.service';
@Component({
  selector: 'app-ruteo',
  templateUrl: './ruteo.component.html',
  styleUrls: ['./ruteo.component.css']
})
export class RuteoComponent implements OnInit {
  public ELEMENT_DATAS: [] ;
  public ELEMENT_DATASDetalles: [];
  public ELEMENT_DATASNovedades: [];
  public ELEMENT_DATASConfiguracion: [];
  public ELEMENT_DATASBahias: [];
  public ELEMENT_DATASGrupos: [];
  public Json_repo: string;
  ordersData = [];
  rutvisua = [];
  initialSelection: any;
  dataSource;
  dataSourceDetalles;
  selection;
  public cargando: boolean;
  public mostrar: boolean;
  displayedColumns: string[] = ['select', 'preRuteoId', 'preRuteoFecha', 'preRuteoUsuario',
  'preRuteoConsecutivo', 'documentoId', 'action'  ];

  constructor(private  ruteoService: RuteoService, private router: Router   ) {
    this.cargando = true;
    this.ruteoService.getListPreruteo().subscribe(res => {
      this.ELEMENT_DATAS = res;
      console.log(this.ELEMENT_DATAS);
      if (!this.ELEMENT_DATAS) {
        alert('Error de servicio');
      } else {
          this.loaddata();
          this.cargando = false;
          this.mostrar = false;
      }
    });
        }
      @ViewChild(MatTable, {static: true}) table: MatTable<any>;
      @ViewChild(MatPaginator, {static: true})  paginator: MatPaginator;
      @ViewChild(MatSort, {static: true}) sort: MatSort;
       loaddata() {
         this.dataSource = new MatTableDataSource <PreruteoDTO>(this.ELEMENT_DATAS );
         this.selection = new SelectionModel<PreruteoDTO>(true, []);
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
  checkboxLabel(row?: PreruteoDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
       }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.preRuteoId + 1}`;

  }
  toggle(row?: PreruteoDTO) {
 this.selection.isSelected(row) ? this.selection.deselect(row) :  this.selection.select(row) ;

  }
   rutear() {

     const usuarioId = 1 ;
     const preruteodata = [];
    // tslint:disable-next-line: prefer-for-of
     for (let i = 0; i < this.selection.selected.length; i++) {
      const item = this.selection.selected[i];
      preruteodata.push({
        preRuteoid: item.preRuteoid,

          pedidoId : item.preRuteoFecha,
          usuarioId
              });
      }
     const obj = preruteodata;
     this.Json_repo = JSON.stringify(obj);
 }
// Inicio detalles
  openDialog(id) {
   }

  openDetalles(id) {
    this.ruteoService. getDetallesPreruteo(id)
    .subscribe( res => {
    if (res) {
      this.ELEMENT_DATASDetalles = res.table;
      this.mostrar = true;
    }
     });
}
    openConfiguracion(preRuteoId) {
      this.mostrar = false;

      this.ruteoService.getConfigurar(preRuteoId)
      .subscribe( res => {
      if (res) {
        this.ELEMENT_DATASConfiguracion = res;
        console.log( this.ELEMENT_DATASConfiguracion);
      }   });


      this.ruteoService.getBahia('2')
      .subscribe( res => {
      if (res) {
        this.ELEMENT_DATASBahias = res;
      }   });


      this.ruteoService.getGrupos()
      .subscribe( res => {
      if (res) {
        this.ELEMENT_DATASGrupos = res;
        console.log(this.ELEMENT_DATASGrupos);
      }   });
    }

    onClick() {
      this.mostrar = false;
    }

    novedad(novedadId) {
    this.ruteoService.getNovedadesPreruteo(novedadId)
    .subscribe( res => {
    if (res) {
      this.ELEMENT_DATASNovedades = res ;
      this.mostrar = true;
    }   });
    }
}

