import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardNoLoginComponent } from './product-card-no-login.component';

describe('ProductCardNoLoginComponent', () => {
  let component: ProductCardNoLoginComponent;
  let fixture: ComponentFixture<ProductCardNoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardNoLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCardNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
