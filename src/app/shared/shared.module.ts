import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LoaderImageComponent } from './components/loader-image/loader-image.component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { RouterModule } from '@angular/router';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PhotoPreviewComponent,
    LoaderImageComponent,
    SidenavMenuComponent,
  ],
  exports: [
    HeaderComponent,
    PhotoPreviewComponent,
    LoaderImageComponent,
    SidenavMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
