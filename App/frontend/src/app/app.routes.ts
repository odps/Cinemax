import { Routes } from '@angular/router';
import {LandingComponent} from './views/landing/landing.component';
import {CinesComponent} from './views/cines/cines.component';
import {PeliculasComponent} from './views/peliculas/peliculas.component';
import {PromocionesComponent} from './views/promociones/promociones.component';
import { PerfilComponent } from './views/perfil/perfil.component';

export const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'cines', component: CinesComponent},
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'promociones', component: PromocionesComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '**', component: LandingComponent}
];
