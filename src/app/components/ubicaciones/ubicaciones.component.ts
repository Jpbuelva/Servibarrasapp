import {  OnInit, ViewChild, Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UbicacionesDTO } from '../../interfaces/ubicacines-dto';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { Guid } from 'guid-typescript';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {
  public articulos;
   
 
  constructor(private ubicacionesService: UbicacionesService) {
     // tslint:disable-next-line: no-debugger
     
    this.ubicacionesService.getArticulos()
                .subscribe(res => {
                  this.articulos = res;
                  // this.dataSource = res;
                  console.log(this.articulos);

                  // console.log(res);
                  if (!this.articulos) {
                      // console.log(this.articulos);
                  }
                });
  }
 
  tipoUbicacionId?: number;
  tipoUbicacion?: any;
  ubicacionFisica?: any;

  id = Guid;
  displayedColumns: string[] = ['select', 'ubicacionId', 'ubicacionCodigo', 'ubicacionEtiqueta',
  'ubicacionDescripcion', 'ubicacionEstado', 'ubicacionFisicaId', 'tipoUbicacionId', 'tipoUbicacion',
  'ubicacionFisica'];
  dataSource = new MatTableDataSource <UbicacionesDTO>(this.articulos);
  selection = new SelectionModel<UbicacionesDTO>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 

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
      // console.log(this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UbicacionesDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
       }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ubicacionId + 1}`;

  }

  toggle(row?: UbicacionesDTO) {
 this.selection.isSelected(row) ? this.selection.deselect(row) :  this.selection.select(row) ;

  }
//  this.selctcol = this.selection.selected;
 // tslint:disable-next-line: prefer-for-of

  prerutear() {
    const usuarioId = 1 ;
    const uniqueProcessId = this.id.create() ;
    const employees = {
    data: []
    };

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selection.selected.length; i++) {
      const item = this.selection.selected[i];
      employees.data.push({
          pedidoId : item.ubicacionId,
          usuarioId,
          uniqueProcessId
      });
      }
    console.log(employees);
  }

}
