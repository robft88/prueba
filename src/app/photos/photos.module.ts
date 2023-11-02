import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ActionCallComponent } from './components/action-call/action-call.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { MainPage } from './pages/main/main.page';
import { PhotosRoutingModule } from './photos-routing.module';


@NgModule({
  declarations: [
    ActionCallComponent,
    FooterComponent,
    MainPage,
    ProfileInfoComponent,
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    SharedModule
  ]
})
export class PhotosModule { }
