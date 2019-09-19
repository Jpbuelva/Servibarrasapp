import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PickingComponent } from './components/picking/picking.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { PreruteoComponent } from './components/preruteo/preruteo.component';

@NgModule({
  declarations: [
    AppComponent,
    PickingComponent,
    NavbarComponent,
    ProductosComponent,
    PreruteoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
