import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicContactUsComponentComponent } from './public-contact-us-component.component';

describe('PublicContactUsComponentComponent', () => {
  let component: PublicContactUsComponentComponent;
  let fixture: ComponentFixture<PublicContactUsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicContactUsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicContactUsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
