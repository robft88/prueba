import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from './components/summary/summary.component';
import { ChartComponent } from './pages/chart/chart.component';
import { TableComponent } from './pages/table/table.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    AdminComponent,
    SummaryComponent,
    ChartComponent,
    TableComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ChartsRoutingModule,
    SharedModule
  ]
})
export class ChartsModule { }
