import { Routes } from '@angular/router';
import { CharacterDetails } from './components/character-details/character-details';

export const routes: Routes = [
  // Main page: filter + list
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', loadComponent: () => import('./app').then(m => m.App) },

  // Details page
  { path: 'characters/:id', component: CharacterDetails },

  // Fallback
  { path: '**', redirectTo: 'characters' }
];