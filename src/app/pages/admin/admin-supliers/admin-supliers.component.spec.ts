import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupliersComponent } from './admin-supliers.component';

describe('AdminSupliersComponent', () => {
  let component: AdminSupliersComponent;
  let fixture: ComponentFixture<AdminSupliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSupliersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSupliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
