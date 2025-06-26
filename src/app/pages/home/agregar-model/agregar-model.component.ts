import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseDataService } from 'src/app/auth/firebase-data.service';

@Component({
  selector: 'app-agregar-model',
  templateUrl: './agregar-model.component.html',
  styleUrls: ['./agregar-model.component.scss'],
  standalone: false,
})
export class AgregarModelComponent {
  nombre = '';
  monto: number | null = null;
  interes: number | null = null;
  cuotas: number | null = null;
  valorCuota: number = 0;
  
  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseDataService
  ) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (!this.nombre || !this.monto || !this.interes || !this.cuotas) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevoPrestamo = {
      nombre: this.nombre,
      monto: this.monto,
      interes: this.interes,
      cuotas: this.cuotas,
      creadoEn: new Date(),
      valorCuota: this.valorCuota,
    };

    this.firebaseService.agregarDato(nuevoPrestamo, 'prestamos').then(() => {
      this.modalCtrl.dismiss(nuevoPrestamo);
    }).catch(err => {
      console.error('Error al guardar:', err);
      alert('Ocurrió un error al guardar.');
    });
  }

  calcularCuota() {
  if (this.monto && this.interes && this.cuotas) {
    const total = this.monto + (this.monto * this.interes / 100);
    this.valorCuota = total / this.cuotas;
  } else {
    this.valorCuota = 0;
  }
}
}
