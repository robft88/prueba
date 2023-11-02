import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { PhotoService } from '../services/photo.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class PhotoStore extends Store<Photo[]>{

  constructor(
    private photoService: PhotoService,
  ) {
    super();
  }

  protected override loadLogic(): Observable<Photo[]> {
    return this.photoService.getAllPhotos();
  }

  getPhotoById(id: number): Photo | undefined {
    const entity = this.getEntity();
    return entity?.find(x => x.id === id);
  }

  // getProfile(): Profile | undefined {
  //   const entity = this.getEntity();
  //   return ento;
  // }

}