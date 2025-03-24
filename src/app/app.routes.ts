import { Routes } from '@angular/router';
import { WorldComponent } from './world/world.component';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: WorldComponent },
];
