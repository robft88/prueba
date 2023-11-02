import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VoteToList } from '../../../utils/interfaces/vote-to-list.interface';
import { VoteService } from '../../../utils/services/vote.service';
import { ExhibitionStore } from '../../../utils/stores/exhibition.store';
import { MenuItem } from '../../../utils/interfaces/menu-item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, OnDestroy {

  exhibitionName: string = '';
  leastVoted: VoteToList[] = [];
  loading = true;
  mostVoted: VoteToList[] = [];
  totalPhotos: number = 0;
  totalVotes: number = 0;
  code = '';
  version = '';
  menu?: MenuItem[];

  private voteSubscription?: Subscription;
  private exhibitionSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private exhibitionStore: ExhibitionStore,
    private voteService: VoteService,
  ) { }

  ngOnInit(): void {
    this.getExhibition();
    this.getSummaryData();
    this.setMenuList();
  }

  ngOnDestroy(): void {
    if (this.voteSubscription) this.voteSubscription.unsubscribe();
    if (this.exhibitionSubscription) this.exhibitionSubscription.unsubscribe();
  }

  getExhibition(): void {
    const code = this.activatedRoute.snapshot.params['code'];
    if (code) this.exhibitionStore.setExhibitionCodeObs = code;
    this.code = this.exhibitionStore.getExhibitionCodeObs;

    if (!this.exhibitionStore.isInitialized()) {
      console.log('here');
      this.exhibitionStore.initialLoad().subscribe();
      this.exhibitionSubscription = this.exhibitionStore.entity$.subscribe(() => {
        this.setExhibitionName();
      })
      return;
    }
    this.setExhibitionName();
  }

  getSummaryData(): void {
    this.voteSubscription = this.voteService.getVotesByExhibition(this.code).subscribe(data => {
      let hash = data;
      let result: VoteToList[] = Object.keys(hash).map(el => ({ title: el, votes: hash[el] })).sort((a, b) => b.votes - a.votes);
      this.totalVotes = result.reduce((acc, el) => acc + el.votes, 0) / 3;
      this.totalPhotos = result.length;
      this.mostVoted = result.slice(0, 3);
      this.leastVoted = result.slice(this.totalPhotos - 3, this.totalPhotos);
      this.loading = false;
    });
  }

  setExhibitionName(): void {
    const exhibition = this.exhibitionStore.getExhibition(this.code);
    console.log(exhibition);
    this.version = exhibition?.version ?? '';
    this.exhibitionName = exhibition?.name ?? '';
  }

  setMenuList(): void {
    this.menu = [
      {
        icon: 'fa-solid fa-chart-pie',
        route: `/S4p!3nz4-c0qU!t0/exhibitions/${this.code}/chart`,
      },
      {
        icon: 'fa-solid fa-list-ul',
        route: `/S4p!3nz4-c0qU!t0/exhibitions/${this.code}/table`,
      }
    ]
  }
}
