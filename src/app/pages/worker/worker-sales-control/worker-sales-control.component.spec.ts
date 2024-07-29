import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSalesControlComponent } from './worker-sales-control.component';

describe('WorkerSalesControlComponent', () => {
  let component: WorkerSalesControlComponent;
  let fixture: ComponentFixture<WorkerSalesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerSalesControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerSalesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
