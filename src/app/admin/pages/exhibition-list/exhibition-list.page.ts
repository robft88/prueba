import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exhibition } from '../../../utils/interfaces/exhibition.interface';
import { ExhibitionStore } from '../../../utils/stores/exhibition.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exhibition-list',
  templateUrl: './exhibition-list.page.html',
  styleUrls: ['./exhibition-list.page.css']
})
export class ExhibitionListPage implements OnInit, OnDestroy {

  exhibitions: Exhibition[] = [];
  loading = true;
  exhibitionName = 'exposiciones';

  private exhibitionSubscription?: Subscription;

  constructor(
    private exhibitionStore: ExhibitionStore
  ) { }

  ngOnInit(): void {
    this.exhibitionStore.initialLoad().subscribe();
    this.exhibitionSubscription = this.exhibitionStore.entity$.subscribe(r => {
      if (r) {
        this.exhibitions = r;
        console.log(r);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.exhibitionSubscription) this.exhibitionSubscription.unsubscribe();
  }

  changeCode(code: string) {
    this.exhibitionStore.setExhibitionCodeObs = code;
  }

}
