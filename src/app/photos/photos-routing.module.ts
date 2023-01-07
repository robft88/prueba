import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MainComponent,
  //   children: [
  //     { path: 'detail/:id', component: DetailComponent },
  //     { path: '**', redirectTo: '' }
  //   ]
  // }
  {
    path: 'list',
    component: MainComponent,
  },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
