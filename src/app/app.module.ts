import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppComponent } from './app.component';
import { PickingComponent  } from './components/picking/picking.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { PreruteoComponent } from './components/preruteo/preruteo.component';
import { MaterialModule } from '../assets/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RuteoComponent } from './components/ruteo/ruteo.component';
import { ReactiveFormsModule} from '@angular/forms';
import { ModalnovedadComponent } from './components/popup/modalnovedad/modalnovedad.component';
import { ModalordenpickingComponent } from './components/popup/modalordenpicking/modalordenpicking.component';

@NgModule({
  declarations: [
    AppComponent,
    PickingComponent,
    NavbarComponent,
    PreruteoComponent,
    RuteoComponent, 
    ModalnovedadComponent,
    ModalordenpickingComponent,
    ModalnovedadComponent
   
  ],
  entryComponents: [
    ModalordenpickingComponent,
    ModalnovedadComponent 
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
    MatPaginatorModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
