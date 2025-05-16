import { Component, Input, SimpleChanges } from '@angular/core';

import { Chart , registerables } from 'chart.js';
import { Dashboard } from '../../../shared/models/dashboard.model';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-graph',
  imports: [],
  templateUrl: './dashboard-graph.component.html',
  styleUrl: './dashboard-graph.component.css'
})
export class DashboardGraphComponent {
  @Input({required : true}) dashboard! : Dashboard
  barChart!: Chart;
  lineChart!: Chart;
  pieChart!: Chart;

  constructor() {}

  createBarChart() {
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: this.dashboard?.masseSalariales.map(m => m.periode.mois),
        datasets: [{
          label: '',
          data: this.dashboard?.masseSalariales.map(m => m.montant),
          backgroundColor: '#a259ff'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: value => `${(+value).toLocaleString()} CFA`
            }
          }
        }
      }
    });
  }

  createLineChart() {
    this.lineChart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: this.dashboard?.chargeSociales.map(p => p.periode.mois),
        datasets: [{
          label: '',
          data: this.dashboard?.chargeSociales.map(c => c.montant),
          borderColor: '#00aaff',
          backgroundColor: '#00aaff44',
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: value => `${(+value).toLocaleString()} CFA`
            }
          }
        }
      }
    });
  }

  createPieChart() {
    this.pieChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: this.dashboard?.repartitionDepartements.map(d => d.departement.nom),
        datasets: [{
          data: this.dashboard?.repartitionDepartements.map(r => r.pourcentage),
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  ngOnInit() {
    this.createBarChart();
    this.createLineChart();
    this.createPieChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dashboard'] && !changes['dashboard'].firstChange) {
      this.updateBarChart();
      this.updateLineChart();
      this.updatePieChart();
    }
  }

  updateBarChart() {
    if (!this.barChart) return;
    this.barChart.data.labels = this.dashboard?.masseSalariales.map(m => m.periode.mois);
    this.barChart.data.datasets[0].data = this.dashboard?.masseSalariales.map(m => m.montant);
    this.barChart.update();
  }

  updateLineChart() {
    if (!this.lineChart) return;
    this.lineChart.data.labels = this.dashboard?.chargeSociales.map(p => p.periode.mois);
    this.lineChart.data.datasets[0].data = this.dashboard?.chargeSociales.map(c => c.montant);
    this.lineChart.update();
  }

  updatePieChart() {
    if (!this.pieChart) return;
    this.pieChart.data.labels = this.dashboard?.repartitionDepartements.map(d => d.departement.nom);
    this.pieChart.data.datasets[0].data = this.dashboard?.repartitionDepartements.map(r => r.pourcentage);
    this.pieChart.update();
  }

}
