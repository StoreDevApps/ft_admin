import { ApplicationConfig, Injectable } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './interceptors/auth-interceptor';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideAnimations(),
  ],
};