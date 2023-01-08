import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  animations: [
    trigger('imageAnimation', [
      state('show-image', style({
        opacity: '1',
      })),
      state('hide-image', style({
        opacity: '0'
      })),
      transition('show-image <=> hide-image', animate('500ms ease-in')),
    ])
  ]
})
export class PhotoListComponent implements OnInit {
  imageCtrl: string = 'hide-image';
  contentCtrl: string = 'show-image';

  showPrueba: boolean = false;

  @Input() photoList!: Photo[];

  constructor(private ps: PhotosService) { }

  ngOnInit(): void {
  }
  getDetailPhoto(id: any) { }

  checkIfLike(id: number) {
    // console.log(id);
    // console.log(this.ps.userLikesList);
    return this.ps.userLikesList.filter(photo => photo.id === id).length === 1;
  }

  prueba() {
    console.log("entra");
    this.showPrueba = true;
    this.imageCtrl = 'show-image';
    this.contentCtrl = 'hide-image';
  }
}
