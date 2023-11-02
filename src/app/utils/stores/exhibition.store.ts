import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Exhibition } from '../interfaces/exhibition.interface';
import { ExhibitionService } from '../services/exhibition.service';
import { Store } from './store';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionStore extends Store<Exhibition[]>{

  private exhibitionCode$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get getExhibitionCodeObs(): string {
    return this.exhibitionCode$.value;
  }

  set setExhibitionCodeObs(code: string) {
    this.exhibitionCode$.next(code);
  }

  constructor(
    private exhibitionService: ExhibitionService,
    private profileService: ProfileService,
  ) {
    super();
  }

  protected override loadLogic(): Observable<Exhibition[]> {
    // return this.exhibitionService.getExhibitions();
    return this.profileService.getProfile().pipe(
      map(r => r.flatMap(v => v.exhibitions))
    );
  }

  getExhibition(code: string): Exhibition | undefined {
    const entity = this.getEntity();
    return entity?.find(x => x.code === code);
  }

}