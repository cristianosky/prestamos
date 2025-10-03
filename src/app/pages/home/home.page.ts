import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AgregarModelComponent } from './agregar-model/agregar-model.component';
import { FirebaseDataService } from 'src/app/auth/firebase-data.service';
import { doc, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ConfirmacionEliminarComponent } from 'src/app/modals/confirmacion-eliminar/confirmacion-eliminar.component';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
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
    private alertCtrl: AlertController,
    private firebaseService: FirebaseDataService,
    private firestore: Firestore,
    private _platform: Platform
  ) {
    this.isDark = document.body.classList.contains('dark');

    if(this._platform.is('capacitor')) {
      this.initNotifications();
    }
  }

  initNotifications() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
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

  async confirmarEliminar(prestamo: any) {
    const modal = await this.modalCtrl.create({
      component: ConfirmacionEliminarComponent,
      componentProps: { nombre: prestamo.nombre },
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
      handle: true,
      cssClass: 'modal-bottom-sheet'
    });

    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.eliminarPrestamo(prestamo.id);
    }
  }

  eliminarPrestamo(id: string) {
    this.firebaseService.eliminarPrestamo(id).then(() => {
      // Puedes actualizar el listado si es necesario
      // this.cargarPrestamos(); // si tienes una función así
    });
  }
}
