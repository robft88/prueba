import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VoteToList } from '../../../../utils/interfaces/vote-to-list.interface';
import { VoteService } from '../../../../utils/services/vote.service';
import { ExhibitionStore } from '../../../../utils/stores/exhibition.store';

@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.css'],
})
export class TablePage implements OnInit, OnDestroy {

  photos: VoteToList[] = [];

  private voteSubscription?: Subscription;

  constructor(
    private exhibitionStore: ExhibitionStore,
    private voteService: VoteService,
  ) { }

  ngOnInit(): void {
    const code = this.exhibitionStore.getExhibitionCodeObs;
    this.voteSubscription = this.voteService.getVotesByExhibition(code).subscribe(data => {
      let hash = data;
      this.photos = Object.keys(hash).map(el => ({ title: el, votes: hash[el] })).sort((a, b) => b.votes - a.votes);
    });
  }

  ngOnDestroy(): void {
    if (this.voteSubscription) this.voteSubscription.unsubscribe();
  }

}
