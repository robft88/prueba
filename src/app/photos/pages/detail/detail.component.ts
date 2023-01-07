import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Photo } from '../../interfaces/photo.interface';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  photo!: Photo;

  constructor(private activatedRoute: ActivatedRoute, private ps: PhotosService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.ps.getPhotoById(parseInt(id)))
      )
      .subscribe(photo => this.photo = photo[0]);
  }

}
