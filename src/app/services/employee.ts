import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EmployeeTotalHours, EmployeeModel } from '../models/employee';

const API_URL = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries';
const API_KEY = 'vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  private readonly http = inject(HttpClient);

  getEmployeesTotals(): Observable<EmployeeTotalHours[]> {
    return this.http
      .get<EmployeeModel[]>(API_URL, { params: { code: API_KEY } })
      .pipe(map((employees) => this.toTotals(employees)));
  }

  private toTotals(employees: EmployeeModel[]): EmployeeTotalHours[] {
    const hoursByName = new Map<string, number>();

    for (const employee of employees) {
      const name = employee.EmployeeName?.trim();
      if (!name || employee.DeletedOn) continue;

      const start = Date.parse(employee.StarTimeUtc);
      const end = Date.parse(employee.EndTimeUtc);
      if (Number.isNaN(start) || Number.isNaN(end) || end < start) continue;

      const hours = (end - start) / 3600000;
      hoursByName.set(name, (hoursByName.get(name) ?? 0) + hours);
    }

    return [...hoursByName]
      .map(([name, totalHours]) => ({ name, totalHours }))
      .sort((a, b) => b.totalHours - a.totalHours);
  }
}
