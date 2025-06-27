import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-eliminar',
  templateUrl: './confirmacion-eliminar.component.html',
  styleUrls: ['./confirmacion-eliminar.component.scss'],
  standalone: false,
})
export class ConfirmacionEliminarComponent {
  @Input() nombre: string = '';

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmar() {
    this.modalCtrl.dismiss(true, 'confirm');
  }
}
