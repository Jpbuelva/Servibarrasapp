import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickingComponent } from './components/picking/picking.component';
import { PreruteoComponent } from './components/preruteo/preruteo.component';




const routes: Routes = [
  {path: 'picking', component: PickingComponent},
  {path: 'preruteo', component: PreruteoComponent},
  {path: '**', component: PickingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
