import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'sales', loadComponent: () => import('./components/sales/sales.component').then(m => m.SalesComponent) }
];
