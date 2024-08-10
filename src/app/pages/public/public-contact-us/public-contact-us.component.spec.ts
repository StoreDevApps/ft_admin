import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicContactUsComponent } from './public-contact-us.component';

describe('PublicContactUsComponent', () => {
  let component: PublicContactUsComponent;
  let fixture: ComponentFixture<PublicContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicContactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
