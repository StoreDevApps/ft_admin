import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeForgotPasswordComponent } from './code-forgot-password.component';

describe('CodeForgotPasswordComponent', () => {
  let component: CodeForgotPasswordComponent;
  let fixture: ComponentFixture<CodeForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeForgotPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
