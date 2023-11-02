import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileStore } from '../../../../utils/stores/profile.store';
import { Profile } from '../../../../utils/interfaces/profile.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit, OnDestroy {

  profile?: Profile;

  private profileSubscription?: Subscription;

  constructor(
    private profileStore: ProfileStore,
  ) { }

  ngOnInit(): void {
    this.profileStore.initialLoad().subscribe();
    this.profileStore.entity$.subscribe(r => {
      if (r) this.profile = r[0];
    });
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) this.profileSubscription.unsubscribe();
  }

}
