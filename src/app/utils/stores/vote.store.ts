import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vote } from '../interfaces/vote.interface';
import { VoteService } from '../services/vote.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class VoteStore extends Store<Vote[]> {

  constructor(
    private voteService: VoteService,
  ) {
    super();
  }

  protected override loadLogic(): Observable<Vote[]> {
    return of([]);
  }

  getVotesByExhibition(code: string): Vote[] | undefined {
    const votes = this.getEntity();
    return votes?.filter(vote => vote.exhibitionCode === code);
  }

}