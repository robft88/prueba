import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhibitionListPage } from './pages/exhibition-list/exhibition-list.page';
import { ChartPage } from './pages/home/chart/chart.page';
import { HomePage } from './pages/home/home.page';
import { TablePage } from './pages/home/table/table.page';
import { PhotoFormPage } from './pages/photo-form/photo-form.page';
import { PhotosPage } from './pages/photos/photos.page';
import { ExhibitionFormPage } from './pages/settings/exhibition-form/exhibition-form.page';
import { ProfilePage } from './pages/settings/profile/profile.page';
import { SettingsPage } from './pages/settings/settings.page';
import { ActionCallPage } from './pages/settings/action-call/action-call.page';

const routes: Routes = [
  {
    path: 'exhibitions/:code',
    component: HomePage,
    children: [
      { path: 'chart', component: ChartPage },
      { path: 'table', component: TablePage },
      { path: '**', redirectTo: 'chart' }
    ]
  },
  {
    path: 'exhibitions',
    component: ExhibitionListPage,
  },
  {
    path: 'photo/:id',
    component: PhotoFormPage,
  },
  {
    path: 'photos',
    component: PhotosPage,
  },
  {
    path: 'settings',
    component: SettingsPage,
    children: [
      { path: 'profile', component: ProfilePage },
      { path: 'action-call', component: ActionCallPage },
      { path: 'exhibitions', component: ExhibitionFormPage },
      { path: '**', redirectTo: 'profile' }
    ]
  },
  {
    path: '**',
    redirectTo: 'exhibitions',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
