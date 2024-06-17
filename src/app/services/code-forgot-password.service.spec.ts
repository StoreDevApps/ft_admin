import { TestBed } from '@angular/core/testing';

import { CodeForgotPasswordService } from './code-forgot-password.service';

describe('CodeForgotPasswordService', () => {
  let service: CodeForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
