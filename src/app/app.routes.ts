import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CodeForgotPasswordComponent } from './pages/code-forgot-password/code-forgot-password.component';
import { ChangeForgotPasswordComponent } from './pages/change-forgot-password/change-forgot-password.component';
import { Error404Component } from './pages/error404/error404.component';
import { PublicLayoutComponent } from './pages/public/public-layout/public-layout.component';
import { PublicHomeComponent } from './pages/public/public-home/public-home.component';
import { PublicProductsComponent } from './pages/public/public-products/public-products.component';
import { PublicServicesComponent } from './pages/public/public-services/public-services.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { UserProductsComponent } from './pages/user/user-products/user-products.component';
import { UserShopppingCartComponent } from './pages/user/user-shoppping-cart/user-shoppping-cart.component';
import { AdminSalesControlComponent } from './pages/admin/admin-sales-control/admin-sales-control.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminSettingsComponent } from './pages/admin/admin-settings/admin-settings.component';
import { AdminInventoryComponent } from './pages/admin/admin-inventory/admin-inventory.component';
import { CreateWorkerComponent } from './pages/admin/create-worker/create-worker.component';
import { WorkerLayoutComponent } from './pages/worker/worker-layout/worker-layout.component';
import { WorkerSalesControlComponent } from './pages/worker/worker-sales-control/worker-sales-control.component';
import { WorkerViewInventoryComponent } from './pages/worker/worker-view-inventory/worker-view-inventory.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { WorkerHomeComponent } from './pages/worker/worker-home/worker-home.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { AdminPurchaseControlComponent } from './pages/admin/admin-purchase-control/admin-purchase-control.component';
import { PublicContactUsComponent } from './pages/public/public-contact-us/public-contact-us.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Store',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign Up - Store',
  },
  {
    path: 'code-forgot-password',
    component: CodeForgotPasswordComponent,
    title: 'Code Forgot Password - Store',
  },
  {
    path: 'change-forgot-password',
    component: ChangeForgotPasswordComponent,
    title: 'Change Forgot Password - Store',
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'inicio',
        component: PublicHomeComponent,
        title: 'Inicio - Store',
      },
      {
        path: 'productos',
        component: PublicProductsComponent,
        title: 'Productos - Store',
      },
      {
        path: 'servicios',
        component: PublicServicesComponent,
        title: 'Servicios - Store',
      },
      {
        path: 'contacto',
        component: PublicContactUsComponent,
        title: 'Contacto - Store',
      },
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
    ],
  },
  {
    path: 'usuario',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: PublicHomeComponent,
        title: 'Inicio - Store',
      },
      {
        path: 'productos',
        component: UserProductsComponent,
        title: 'Productos - Store',
      },
      {
        path: 'servicios',
        component: PublicServicesComponent,
        title: 'Servicios - Store',
      },
      {
        path: 'contacto',
        component: PublicContactUsComponent,
        title: 'Contacto - Store',
      },
      {
        path: 'carrito',
        component: UserShopppingCartComponent,
        title: 'carrito - Store',
      },
      { path: '', redirectTo: '', pathMatch: 'prefix' },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['administrador'] },
    children: [
      { path: '', component: AdminHomeComponent, title: 'Inicio - Admin' },
      {
        path: 'control-ventas',
        component: AdminSalesControlComponent,
        title: 'Control de ventas - Admin',
      },
      {
        path: 'control-compras',
        component: AdminPurchaseControlComponent,
        title: 'Control de compras - Admin',
      },
      {
        path: 'inventario',
        component: AdminInventoryComponent,
        title: 'Inventario - Admin',
      },
      {
        path: 'trabajadores',
        component: CreateWorkerComponent,
        title: 'Crear trabajador - Admin',
      },
      {
        path: 'configuracion',
        component: AdminSettingsComponent,
        title: 'Configuración - Admin',
      },
      { path: '', redirectTo: '', pathMatch: 'prefix' },
    ],
  },
  {
    path: 'trabajador',
    component: WorkerLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['trabajador'] },
    children: [
      {
        path: '',
        component: WorkerHomeComponent,
        title: 'Inicio - Trabajador',
      },
      {
        path: 'control-ventas',
        component: WorkerSalesControlComponent,
        title: 'Control de ventas - Trabajador',
      },
      {
        path: 'ver-inventario',
        component: WorkerViewInventoryComponent,
        title: 'Ver inventario - Trabajador',
      },
    ],
  },
  {
    path: '**',
    component: Error404Component,
    title: 'Error 404 - Store',
    pathMatch: 'full',
  },
];
