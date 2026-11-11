import { Component, effect, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import { EmployeeTotalHours } from '../models/employee';
import { Chart, ArcElement, Legend, PieController, Tooltip } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})
export class PieChart implements OnDestroy {
  readonly employees = input.required<EmployeeTotalHours[]>();

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart?: Chart;

  constructor() {
    effect(() => {
      const canvas = this.canvas();
      const employee = this.employees();
      if (!canvas) return;
      this.draw(canvas.nativeElement, employee);
    });
  }

  private draw(canvasEl: HTMLCanvasElement, employees: EmployeeTotalHours[]): void {
    this.chart?.destroy();

    const total = employees.reduce((sum, e) => sum + e.totalHours, 0);
    const precent = (hours: number) => (total > 0 ? (hours / total) * 100 : 0);

    this.chart = new Chart(canvasEl, {
      type: 'pie',
      data: {
        labels: employees.map((e) => `${e.name} (${precent(e.totalHours).toFixed(1)}%)`),
        datasets: [
          {
            data: employees.map((e) => e.totalHours),
            backgroundColor: employees.map((_, i) => `hsl(${(i * 360) / employees.length},65%,55%`),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.toFixed(2)} hours` } },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
