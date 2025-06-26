import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AgregarModelComponent } from './agregar-model/agregar-model.component';
import { FirebaseDataService } from 'src/app/auth/firebase-data.service';
import { doc, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  isDark = false;
  filtro: string = '';
  prestamos: any[] = [];
  prestamosFiltrados: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private firebaseService: FirebaseDataService,
    private firestore: Firestore
  ) {
    this.isDark = document.body.classList.contains('dark');
  }

  ngOnInit() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.firebaseService.obtenerDatos('prestamos').subscribe(data => {
      this.prestamos = data;
      this.filtrarPrestamos(); 
    });
  }

  logout() {
    this.authService.logout().then(() => this.router.navigateByUrl('/login'));
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: AgregarModelComponent,
    });
    await modal.present();
  }

  pagarCuota(prestamo: any) {
    const cuotasPagadas = prestamo.cuotasPagadas ? prestamo.cuotasPagadas + 1 : 1;

    if (cuotasPagadas > prestamo.cuotas) {
      alert('¡Este préstamo ya fue pagado completamente!');
      return;
    }

    const docRef = doc(this.firestore, `prestamos/${prestamo.id}`);
    updateDoc(docRef, { cuotasPagadas }).then(() => {
      console.log('Cuota pagada correctamente');
    }).catch((err) => {
      console.error('Error al pagar cuota:', err);
    });
  }

  filtrarPrestamos() {
    const termino = this.filtro.trim().toLowerCase();

    if (!termino) {
      this.prestamosFiltrados = [...this.prestamos];
      return;
    }

    this.prestamosFiltrados = this.prestamos.filter(p =>
      p.nombre.toLowerCase().includes(termino)
    );
  }
  
  verEstadisticas() {
    this.router.navigateByUrl('/estadisticas');
  }
}
