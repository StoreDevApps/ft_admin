import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServicesComponent } from './public-services.component';

describe('PublicServicesComponent', () => {
  let component: PublicServicesComponent;
  let fixture: ComponentFixture<PublicServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
