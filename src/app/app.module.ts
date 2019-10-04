import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'; 


import { AppComponent } from './app.component';
import { PickingComponent } from './components/picking/picking.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { PreruteoComponent } from './components/preruteo/preruteo.component';
import { MaterialModule } from '../assets/material/material.module';
import { UbicacionesComponent } from './components/ubicaciones/ubicaciones.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GridComponent } from './components/grid/grid.component';
import { RuteoComponent } from './components/ruteo/ruteo.component';
import { DialogBoxComponent } from './components/shared/dialog-boxx/dialog-boxx.component';

@NgModule({
  declarations: [
    AppComponent,
    PickingComponent,
    NavbarComponent,
    ProductosComponent,
    PreruteoComponent,
    UbicacionesComponent,
    GridComponent,
    RuteoComponent,
    DialogBoxComponent
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
