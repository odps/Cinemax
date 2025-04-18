import { Routes } from '@angular/router';
import {LandingComponent} from './views/landing/landing.component';

export const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: '**', component: LandingComponent}
];
