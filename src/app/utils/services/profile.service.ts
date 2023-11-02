import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile?: Observable<Profile>;
  profileRef: AngularFireList<any>;

  constructor(
    private afd: AngularFireDatabase,
  ) {
    this.profileRef = this.afd.list('profile');
  }

  public getProfile(): Observable<Profile[]> {
    return this.profileRef.snapshotChanges().pipe(
      map(value => value.map(v => {
        console.log(v);
        const $key = v.payload.key!;
        const data = v.payload.val() as Profile;
        return { $key, ...data };
      }))
    )
  }

}