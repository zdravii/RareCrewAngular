// Root component: just show the table. (File is app.ts in Angular 20+, app.component.ts before that.)
import { Component } from '@angular/core';
import { EmpolyeeTable } from './empolyee-table/empolyee-table';

@Component({
  selector: 'app-root',
  imports: [EmpolyeeTable],
  template: `<app-empolyee-table />`,
})
export class App {}
