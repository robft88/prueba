import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Store } from './store';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileStore extends Store<Profile[]>{

  constructor(
    private profileService: ProfileService,
  ) {
    super();
  }

  protected override loadLogic(): Observable<Profile[]> {
    return this.profileService.getProfile();
  }

  // getProfile(): Profile | undefined {
  //   const entity = this.getEntity();
  //   return ento;
  // }

}