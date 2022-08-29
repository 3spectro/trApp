import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'journeys',
    pathMatch: 'full',
    // vcanActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'journeys',
    canLoad: [LoginGuard],
    loadChildren: () => import('./features/journeys/journeys.module').then(m => m.JourneysModule)
  },
  {
    path: 'applications',
    canLoad: [LoginGuard],
    loadChildren: () => import('./features/applications/applications.module').then(m => m.ApplicationsModule)
  },
  {
    path: 'guests',
    canLoad: [LoginGuard],
    loadChildren: () => import('./features/guests/guests.module').then(m => m.GuestsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
