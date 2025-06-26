import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePrestamosPage } from './detalle-prestamos.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePrestamosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePrestamosPageRoutingModule {}
