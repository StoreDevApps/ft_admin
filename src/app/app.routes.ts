import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CodeForgotPasswordComponent } from './pages/code-forgot-password/code-forgot-password.component';
import { ChangeForgotPasswordComponent } from './pages/change-forgot-password/change-forgot-password.component';
import { Error404Component } from './pages/error404/error404.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Store'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password - Store'
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign Up - Store'
  },
  {
    path: 'code-forgot-password',
    component: CodeForgotPasswordComponent,
    title: 'Code Forgot Password - Store'
  },
  {
    path: 'change-forgot-password',
    component: ChangeForgotPasswordComponent,
    title: 'Change Forgot Password - Store'
  },
  {
    path: 'inicio',
    component: HomeComponent,
    title: 'Inicio - Store'
  },
  {
    path: 'productos',
    component: ProductsComponent,
    title: 'Productos - Store'
  },
  {
    path: 'carrito',
    component: ShoppingCartComponent,
    title: 'carrito - Store'
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: Error404Component,
  },

];
