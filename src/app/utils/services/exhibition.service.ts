import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Exhibition } from '../interfaces/exhibition.interface';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionService {
  exhibitions?: Observable<Exhibition[]>;
  exhibitionsRef: AngularFireList<any>;

  constructor(
    private afd: AngularFireDatabase,
  ) {
    this.exhibitionsRef = this.afd.list('exhibitions');
  }

  public getExhibitions(): Observable<Exhibition[]> {
    return this.exhibitionsRef.snapshotChanges().pipe(
      map(value => value.map(v => {
        const $key = v.payload.key;
        const data = v.payload.val() as Exhibition;
        return { $key, ...data };
      }).sort((a, b) => a.id - b.id))
    )
  }

}
