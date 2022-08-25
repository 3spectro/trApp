import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'journeys',
    loadChildren: () => import('./features/journeys/journeys.module').then(m => m.JourneysModule)
  },
  {
    path: 'applications',
    loadChildren: () => import('./features/applications/applications.module').then(m => m.ApplicationsModule)
  },
  {
    path: 'guests',
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
