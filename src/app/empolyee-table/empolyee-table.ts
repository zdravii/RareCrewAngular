import { Component, inject, signal } from '@angular/core';
import { Employee } from '../services/employee';
import { EmployeeTotalHours } from '../models/employee';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-empolyee-table',
  imports: [],
  templateUrl: './empolyee-table.html',
  styleUrl: './empolyee-table.css',
})
export class EmpolyeeTable {
  private readonly EmployeeService = inject(Employee);

  readonly lowHours = 100;

  readonly employees = signal<EmployeeTotalHours[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.EmployeeService.getEmployeesTotals().subscribe({
      next: (totals) => {
        this.employees.set(totals);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Could not load data.');
        this.loading.set(false);
      },
    });
  }

  isLow(employee: EmployeeTotalHours): boolean {
    return employee.totalHours < this.lowHours;
  }
}
