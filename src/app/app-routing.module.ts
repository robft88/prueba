import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'photo',
    loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)
  },
  {
    path: 'S4p!3nz4-c0qU!t0',
    loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
  },
  {
    path: '**',
    redirectTo: 'photo'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
