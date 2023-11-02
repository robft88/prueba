import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { Vote } from '../interfaces/vote.interface';
import { mainInfo } from '../main-info';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  votesRef: AngularFireList<any>;

  constructor(private angularFire: AngularFireDatabase) {
    this.votesRef = this.angularFire.list('votes');
  }

  public saveVotes(photosLiked: Photo[]) {
    photosLiked.forEach(photo => {
      const vote: Vote = {
        date: new Date().getTime(),
        exhibitionCode: mainInfo.newExhibitionCode,
        idPhoto: photo.id,
        title: photo.title,
      }
      this.votesRef.push(vote);
    })
  }

  public getVotesByExhibition(code: string) {
    return this.votesRef.snapshotChanges().pipe(
      map(value => {
        let hashVotes: any = {};
        value.map(v => {
          const $key = v.payload.key!;
          const data = v.payload.val() as Vote;

          if (data.exhibitionCode !== code) return;

          (hashVotes)[data.title] ? (hashVotes)[data.title] += 1 : (hashVotes)[data.title] = 1;

          return { $key, ...data };
        })
        return hashVotes;
      }
      )
    );
  }
}
