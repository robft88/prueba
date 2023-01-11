
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Photo } from 'src/app/photos/interfaces/photo.interface';
import { PhotosService } from 'src/app/photos/services/photos.service';

@Component({
  selector: 'image-async',
  templateUrl: './loader-image.component.html',
  animations: [
    trigger('imageAnimation', [
      state('show-image', style({
        opacity: '1',
      })),
      state('hide-image', style({
        opacity: '0'
      })),
      transition('show-image <=> hide-image', animate('1000ms ease-in')),
    ])
  ]
})
export class LoaderImageComponent implements OnInit {
  imageCtrl: string = 'hide-image';

  showPrueba: boolean = false;

  @Input() imageUrl!: string;
  @Input() imageName!: string;
  @Input() cssClassChild!: string;


  constructor(private ps: PhotosService) { }

  ngOnInit() { }



  prueba() {
    this.showPrueba = true;
    this.imageCtrl = 'show-image';
  }

  setAltAttribute(): string {
    return this.ps.setAltAttribute(this.imageName);
  }
}
