import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpolyeeTable } from './empolyee-table';

describe('EmpolyeeTable', () => {
  let component: EmpolyeeTable;
  let fixture: ComponentFixture<EmpolyeeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpolyeeTable],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpolyeeTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
