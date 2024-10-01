import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})
export class DiagnosePage implements OnInit {

  heartRateChart: any; // Variabel untuk chart

  constructor() { }

  ngOnInit() {
    this.initializeHeartRateChart();
  }

  initializeHeartRateChart() {
    const ctx = document.getElementById('heartRateChart') as HTMLCanvasElement;

    // Inisialisasi data awal
    const initialData = {
      labels: [],
      datasets: [{
        label: 'Detak Jantung (BPM)',
        data: [],
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      }]
    };

    // Konfigurasi chart
    this.heartRateChart = new Chart(ctx, {
      type: 'line',
      data: initialData,
      options: {
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Waktu (detik)'
            }
          },
          y: {
            beginAtZero: false,
            suggestedMin: 50,
            suggestedMax: 120,
            title: {
              display: true,
              text: 'Detak Jantung (BPM)'
            }
          }
        }
      }
    });

    // Perbarui data detak jantung setiap detik
    let time = 0;
    setInterval(() => {
      const newHeartRate = Math.floor(Math.random() * 40) + 60;

      // Tambahkan waktu dan data ke chart
      this.heartRateChart.data.labels.push(time);
      this.heartRateChart.data.datasets[0].data.push(newHeartRate);
      this.heartRateChart.update();

      // Tambah waktu
      time++;

      // Batasi data agar tidak terlalu panjang (misalnya maksimal 10 detik terakhir)
      if (this.heartRateChart.data.labels.length > 10) {
        this.heartRateChart.data.labels.shift();
        this.heartRateChart.data.datasets[0].data.shift();
      }
    }, 1000);
  }
}
