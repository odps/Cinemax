import { Routes } from '@angular/router';
import { LandingComponent } from './views/landing/landing.component';
import { CinesComponent } from './views/cines/cines.component';
import { PeliculasComponent } from './views/peliculas/peliculas.component';
import { PromocionesComponent } from './views/promociones/promociones.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { AdminComponent } from './views/admin/admin.component';
import { CompraComponent } from './views/compra/compra.component';
import { ErrorComponent } from './views/error/error.component';
import { loggedinGuard } from './core/guards/loggedin.guard';
import { roleGuard } from './core/guards/role.guard';

// Definición de rutas principales de la aplicación. Se utiliza canActivate para proteger rutas según el rol del usuario.
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'cines', component: CinesComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'promociones', component: PromocionesComponent },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [loggedinGuard, roleGuard],
    data: { role: ['CLIENT', 'ADMIN'] },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [loggedinGuard, roleGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'compra',
    component: CompraComponent,
    canActivate: [loggedinGuard, roleGuard],
    data: { role: ['CLIENT', 'ADMIN'] },
  },
  { path: '**', component: ErrorComponent },
];
