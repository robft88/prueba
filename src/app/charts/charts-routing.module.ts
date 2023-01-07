import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ChartComponent } from './pages/chart/chart.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    children: [
      { path: 'chart', component: ChartComponent },
      { path: 'table', component: TableComponent },
      { path: '**', redirectTo: 'chart' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
