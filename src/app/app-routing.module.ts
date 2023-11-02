import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'photos',
    loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)
  },
  {
    path: 'S4p!3nz4-c0qU!t0',
    loadChildren: () => import('./admin/admin.module').then(m => m.ChartsModule)
  },
  {
    path: '**',
    redirectTo: 'photos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
