import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-prestamos',
  templateUrl: './detalle-prestamos.page.html',
  styleUrls: ['./detalle-prestamos.page.scss'],
  standalone: false,
})
export class DetallePrestamosPage implements OnInit {
  prestamoId: string = '';
  prestamo: any = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.prestamoId = this.route.snapshot.paramMap.get('id')!;
    const docRef = doc(this.firestore, 'prestamos', this.prestamoId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      this.prestamo = snap.data();
    }
  }

  async pagarCuota() {
    if (!this.prestamo || this.prestamo.cuotasPagadas >= this.prestamo.cuotas) return;
    this.prestamo.cuotasPagadas = this.prestamo.cuotasPagadas || 0;
    this.prestamo.cuotasPagadas += 1;
    const docRef = doc(this.firestore, 'prestamos', this.prestamoId);
    await updateDoc(docRef, { cuotasPagadas: this.prestamo.cuotasPagadas });

    const toast = await this.toastCtrl.create({
      message: 'Cuota registrada ✅',
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}
