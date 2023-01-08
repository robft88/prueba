import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileMinComponent } from './components/profile-min/profile-min.component';
import { LoaderImageComponent } from './components/loader-image/loader-image.component';



@NgModule({
  declarations: [
    ProfileInfoComponent,
    HeaderComponent,
    ProfileMinComponent,
    LoaderImageComponent
  ],
  exports: [
    ProfileInfoComponent,
    HeaderComponent,
    ProfileMinComponent,
    LoaderImageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
