import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../../../utils/interfaces/photo.interface';
import { Profile } from '../../../utils/interfaces/profile.interface';
import { PhotoService } from '../../../utils/services/photo.service';
import { LocalStorageStore } from '../../../utils/stores/local-storage.store';
import { ProfileStore } from '../../../utils/stores/profile.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.css']
})
export class MainPage implements OnInit, OnDestroy {

  exhibitionName?: string;
  mailToFooter?: string;
  photoList!: Photo[];
  profile?: Profile;

  private photoSubscription?: Subscription;
  private profileSubscription?: Subscription;

  constructor(
    private lsStore: LocalStorageStore,
    private photoService: PhotoService,
    private profileStore: ProfileStore,
  ) {

  }

  ngOnInit(): void {
    this.lsStore.initialLoad().subscribe();
    this.lsStore.verifyOldKeyExists();

    this.profileStore.initialLoad().subscribe();
    this.profileSubscription = this.profileStore.entity$.subscribe(r => {
      if (r) {
        this.profile = r[0];
        this.exhibitionName = this.profile.exhibitions[this.profile.exhibitions.length - 1].name;
        this.mailToFooter = this.profile.exhibitions[this.profile.exhibitions.length - 1].mailToFooter;
      }
    });

    this.photoSubscription = this.photoService.getPhotosToShow().subscribe(resp => {
      this.photoList = resp;
    })
  }

  ngOnDestroy(): void {
    if (this.photoSubscription) this.photoSubscription.unsubscribe();
    if (this.profileSubscription) this.profileSubscription.unsubscribe();
  }

  imageSelected(id: number): Observable<number | undefined> {
    return this.lsStore.entity$.pipe(
      map(r => r?.findIndex(x => x.id === id))
    );
  }

  toggleSelectImage(photo: Photo): void {
    if (this.lsStore.itemExists(this.lsStore.newKeyHasVoted)) return;
    this.lsStore.addSelectedImage(photo);
  }

  trackByItems(_index: number, item: Photo): number {
    return item.id;
  }

  userHasAlreadyVoted(): boolean {
    return this.lsStore.itemExists(this.lsStore.newKeyHasVoted);
  }

}
