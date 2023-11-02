import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgChartsModule } from 'ng2-charts';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ExpandablePanelComponent } from './components/ui/expandable-panel/expandable-panel.component';
import { TextAreaComponent } from './components/ui/text-area/text-area.component';
import { TextInputComponent } from './components/ui/text-input/text-input.component';
import { ChartPage } from './pages/home/chart/chart.page';
import { ExhibitionListPage } from './pages/exhibition-list/exhibition-list.page';
import { HomePage } from './pages/home/home.page';
import { PhotoFormPage } from './pages/photo-form/photo-form.page';
import { PhotosPage } from './pages/photos/photos.page';
import { ProfilePage } from './pages/settings/profile/profile.page';
import { TablePage } from './pages/home/table/table.page';
import { CheckInputComponent } from './components/ui/check-input/check-input.component';
import { FileInputComponent } from './components/ui/file-input/file-input.component';
import { SettingsPage } from './pages/settings/settings.page';
import { ActionCallPage } from './pages/settings/action-call/action-call.page';
import { ExhibitionFormPage } from './pages/settings/exhibition-form/exhibition-form.page';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { SelectInputComponent } from './components/ui/select-input/select-input.component';


@NgModule({
  declarations: [
    ActionCallPage,
    ChartPage,
    ExhibitionFormPage,
    ExhibitionListPage,
    ExpandablePanelComponent,
    HomePage,
    MenuComponent,
    PhotosPage,
    PhotoFormComponent,
    PhotoFormPage,
    ProfileFormComponent,
    ProfilePage,
    SummaryComponent,
    TablePage,
    TextInputComponent,
    TextAreaComponent,
    CheckInputComponent,
    FileInputComponent,
    SettingsPage,
    FilterFormComponent,
    SelectInputComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    NgChartsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ChartsModule { }
