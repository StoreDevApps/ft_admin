import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalesControlComponent } from './admin-sales-control.component';

describe('AdminSalesControlComponent', () => {
  let component: AdminSalesControlComponent;
  let fixture: ComponentFixture<AdminSalesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSalesControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSalesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
