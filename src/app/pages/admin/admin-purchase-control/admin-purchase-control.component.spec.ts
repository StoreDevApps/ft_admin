import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPurchaseControlComponent } from './admin-purchase-control.component';

describe('AdminPurchaseControlComponent', () => {
  let component: AdminPurchaseControlComponent;
  let fixture: ComponentFixture<AdminPurchaseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPurchaseControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPurchaseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
