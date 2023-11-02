import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photos?: Observable<Photo[]>;
  photosRef: AngularFireList<any>;

  constructor(
    private afd: AngularFireDatabase,
  ) {
    this.photosRef = this.afd.list('photos');
  }

  public getAllPhotos(): Observable<Photo[]> {
    return this.photosRef.snapshotChanges().pipe(
      map(value => value.map(v => {
        const $key = v.payload.key!;
        const data = v.payload.val() as Photo;
        return { $key, ...data };
      }).sort((a, b) => a.order - b.order)
      )
    );
  }

  public getPhotosToShow(): Observable<Photo[]> {
    return this.photosRef.snapshotChanges().pipe(
      map(value => value.map(v => {
        const $key = v.payload.key!;
        const data = v.payload.val() as Photo;
        return { $key, ...data };
      }).filter(value => value.toShow).sort((a, b) => a.order - b.order)
      )
    );
  }
}
