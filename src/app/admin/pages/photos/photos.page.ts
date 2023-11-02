import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Photo } from '../../../utils/interfaces/photo.interface';
import { PhotoStore } from '../../../utils/stores/photo.store';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.css']
})
export class PhotosPage implements OnInit, OnDestroy {


  photoList?: Photo[];
  showPanel: boolean = false;
  private photoSubscription?: Subscription;

  constructor(
    private photoStore: PhotoStore,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.photoStore.initialLoad().subscribe();
    this.photoSubscription = this.photoStore.entity$.subscribe(resp => {
      this.photoList = resp?.sort((a, b) => {
        if (a.toShow === b.toShow) return 0;
        else if (a.toShow) return -1;
        else return 1;
      });
    })
  }

  ngOnDestroy(): void {
    if (this.photoSubscription) this.photoSubscription.unsubscribe();
  }

  trackByItems(_index: number, item: Photo): number {
    return item.id;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  getPanelState(ev: boolean) {
    this.showPanel = ev;
  }

}
