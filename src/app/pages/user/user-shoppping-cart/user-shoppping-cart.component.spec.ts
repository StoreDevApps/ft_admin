import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopppingCartComponent } from './user-shoppping-cart.component';

describe('UserShopppingCartComponent', () => {
  let component: UserShopppingCartComponent;
  let fixture: ComponentFixture<UserShopppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserShopppingCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserShopppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
