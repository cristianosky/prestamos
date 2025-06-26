import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { FirebaseDataService } from 'src/app/auth/firebase-data.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: false,
})
export class EstadisticasPage implements AfterViewInit {
  constructor(private firebaseService: FirebaseDataService) {}

  async ngAfterViewInit() {
    const prestamosOb = await this.firebaseService.obtenerDatos('prestamos'); // Asegúrate que esto devuelva array

    prestamosOb.subscribe((prestamos: any[]) => {
      const porMes: { [mes: string]: number } = {};
    prestamos.forEach((p:any) => {
      const fecha = new Date(p.fecha || p.createdAt || Date.now());
      const mes = fecha.toLocaleString('default', { month: 'short', year: 'numeric' });
      porMes[mes] = (porMes[mes] || 0) + +p.monto;
    });

    console.log(prestamos);
    

    const labels = Object.keys(porMes);
    const data = Object.values(porMes);

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Préstamos por mes',
          data,
          backgroundColor: '#ff4081',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
    });
  }
}
