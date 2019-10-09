import { OnInit, ViewChild, Component, Inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { RuteoService } from '../../services/ruteo.service'; 
import { DatePipe } from '@angular/common'; 
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PreruteoDTO } from '../../interfaces/preruteo-dto'; 
import { PreruteoDataDTO } from '../../interfaces/preruteodataDTO';
 

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
  public ELEMENT_DATASGrupos: [];
  public Json_repo: string;
  toppings = new FormControl();
  
  public PreruteoDTOData: PreruteoDTO[];
  preRuteoId ;
  usuarioId ;
  pedidosOrdenBahiaInfo: [];
  ruteosGrupos: [{grupoId, grupoCantidad} ];
getPreruteo: PreruteoDTO[];
  ordersData = [];
  animal: string;
  name: string;
  rutvisua = [];
  initialSelection: any;
  dataSource;
  dataSourceDetalles;
  selection;
  public cargando: boolean;
  public mostrar: boolean;
  displayedColumns: string[] = ['select', 'preRuteoId', 'preRuteoFecha', 'preRuteoUsuario',
  'preRuteoConsecutivo', 'documentoId', 'action'  ];
   constructor(private  ruteoService: RuteoService, private router: Router, private dialog: MatDialog   ) {
    this.cargando = true;
    this.ruteoService.getListPreruteo().subscribe(res => {
      this.ELEMENT_DATAS = res;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.preRuteoid + 1}`;

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
  openDetalles(id) {
    this.ruteoService.getDetallesPreruteo(id)
    .subscribe( res => {
    if (res) {
      this.ELEMENT_DATASDetalles = res.table;
      this.mostrar = true;
    }
     });
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

    openDialog(preRuteoId) {

      this.mostrar = false;
      this.ruteoService.getConfigurar(preRuteoId).subscribe( respedido => {
              if (respedido) {
              this.ELEMENT_DATASConfiguracion = respedido;
              console.log( this.ELEMENT_DATASConfiguracion);

              this.ruteoService.getBahia('2')
              .subscribe( respbahias => {
                    if (respbahias) {
                      this.ELEMENT_DATASBahias = respbahias;
                      this.ruteoService.getGrupos()
                  .subscribe( respGrupos => {
                        if (respGrupos) {

                          console.log(respGrupos);
                          this.ELEMENT_DATASGrupos = respGrupos;
                          this.cargadata();
                          }
                          });
                        }
                  });
            }
          });
      }

      cargadata() {
        const dialogRef = this.dialog.open( ModalruteoComponent , {
          width: '1000px',
          data: {
                 ELEMENT_DATASGrupos: this.ELEMENT_DATASGrupos,
                 ELEMENT_DATASBahias: this.ELEMENT_DATASBahias,
                 ELEMENT_DATASConfiguracion: this.ELEMENT_DATASConfiguracion          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          this.animal = result;
        });
      }
    }
// ---inicio de popup

@Component({
  selector: 'app-modalruteo',
  templateUrl: 'ruteoModal.html',
})
export class ModalruteoComponent {
  preruteodata: PreruteoDataDTO[];
  constructor(
    public dialogRef: MatDialogRef<ModalruteoComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    }
  displayedColumns: string[] = ['pedidoid', 'pedidoConsecutivo', 'pedidoFecha', 'pedidoFechaCarga', 'pedidoObservacion', 'bahias', 'orden'];
  dataSource = this.data.ELEMENT_DATASConfiguracion ;
  onNoClick(): void {
    this.dialogRef.close();
  }
click(data) {
debugger
console.log(data.pedidoBahiaItems);
console.log(data.GruposItems);
console.log(data.orden);

this.onNoClick();
}
selectRow(row){
  console.log(row);
}
}

