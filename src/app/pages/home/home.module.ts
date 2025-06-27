import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AgregarModelComponent } from './agregar-model/agregar-model.component';
import { ConfirmacionEliminarComponent } from 'src/app/modals/confirmacion-eliminar/confirmacion-eliminar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, AgregarModelComponent, ConfirmacionEliminarComponent]
})
export class HomePageModule {}
