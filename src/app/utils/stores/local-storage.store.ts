import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { VoteService } from '../services/vote.service';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageStore extends Store<Photo[]> {

  newKeyList = 'userSelectedImages_v2';
  newKeyHasVoted = 'userHasVoted_v2';

  private oldKeyList = 'userVote';
  private oldKeyHasVoted = 'userHasVoted';

  constructor(
    private voteService: VoteService,
  ) {
    super();
  }

  protected override loadLogic(): Observable<Photo[]> {
    const storedImages = localStorage.getItem(this.newKeyList);
    const userSelectedImages = storedImages ? JSON.parse(storedImages) : [];
    return of(userSelectedImages).pipe(
      map(r => {
        return r;
      })
    );
  }

  addSelectedImage(data: Photo): void {
    const storedImages = localStorage.getItem(this.newKeyList);
    const userSelectedImages = storedImages ? JSON.parse(storedImages) : [];

    const index = userSelectedImages.findIndex((x: Photo) => x.id === data.id);
    if (index === -1) {
      if (userSelectedImages.length < 3) userSelectedImages.push(data);
    } else {
      userSelectedImages.splice(index, 1);
    }
    localStorage.setItem(this.newKeyList, JSON.stringify(userSelectedImages));
    this.entitySub.next(userSelectedImages);
    if (userSelectedImages.length === 3) this.saveVotes(userSelectedImages);
  }

  itemExists(key: string): boolean {
    if (localStorage.getItem(key)) return true;
    else return false;
  }

  verifyOldKeyExists(): void {
    const existsOldKeyList = this.itemExists(this.oldKeyList),
      existsOldKeyHasVoted = this.itemExists(this.oldKeyHasVoted);

    if (existsOldKeyList || existsOldKeyHasVoted) {
      localStorage.removeItem(this.oldKeyList);
      localStorage.removeItem(this.oldKeyHasVoted);
    }
  }

  private saveVotes(data: Photo[]): void {
    localStorage.setItem(this.newKeyHasVoted, JSON.stringify(true));
    this.voteService.saveVotes(data);
  }
}
