import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePrestamosPageRoutingModule } from './detalle-prestamos-routing.module';

import { DetallePrestamosPage } from './detalle-prestamos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePrestamosPageRoutingModule
  ],
  declarations: [DetallePrestamosPage]
})
export class DetallePrestamosPageModule {}
