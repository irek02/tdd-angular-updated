import { Routes } from '@angular/router';
import { BookHomeComponent } from './src/components/book-home/book-home.component';
import { HomesComponent } from './src/components/homes/homes.component';

export const routes: Routes = [
  { path: '', component: HomesComponent },
  { path: 'book-home', component: BookHomeComponent },
  { path: 'homes/:id/book', component: BookHomeComponent },
];
