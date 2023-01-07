import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

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
}
