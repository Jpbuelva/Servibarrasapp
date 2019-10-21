import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickingComponent } from './components/picking/picking.component';
import { PreruteoComponent } from './components/preruteo/preruteo.component';
import { RuteoComponent } from './components/ruteo/ruteo.component';




const routes: Routes = [
  {path: '', component: PreruteoComponent},
  {path: 'picking', component: PickingComponent},
  {path: 'preruteo', component: PreruteoComponent},
  {path: 'ruteo', component: RuteoComponent},
  {path: '**', component: PickingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
