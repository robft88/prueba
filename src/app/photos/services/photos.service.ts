import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { VoteToChart } from '../interfaces/vote-to-chart.interface';
import { Vote } from '../interfaces/vote.interface';
import { VoteToList } from '../interfaces/vote-to-list.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  photos!: Observable<Photo[]>;
  photosRef!: AngularFireList<any>;
  votesRef!: AngularFireList<any>;

  public userLikesList: Photo[] = JSON.parse(localStorage.getItem('userVote')!) || [];

  constructor(private afd: AngularFireDatabase) {
    this.photosRef = this.afd.list('photos');
    this.votesRef = this.afd.list('votes');
  }

  public getPhotoList(): Observable<Photo[]> {
    return this.photosRef.snapshotChanges().pipe(
      map(value => value.map(v => {
        const $key = v.payload.key!;
        const data = v.payload.val() as Photo;
        return { $key, ...data };
      }).filter(value => value.toShow)
      )
    );
  }

  public saveVotes(photosLiked: Photo[]) {
    photosLiked.forEach(photo => {
      const vote: Vote = {
        idPhoto: photo.id,
        title: photo.title,
        date: new Date().getTime()
      }
      this.votesRef.push(vote);
    })
  }

  public getPhotoById(id: number) {
    return this.getPhotoList().pipe(
      map(v => v.filter(p => p.id === id))
    );
  }

  public getVotes() {
    return this.votesRef.snapshotChanges().pipe(
      map(value => {
        let hashVotes: any = {};
        value.map(v => {
          const $key = v.payload.key!;
          const data = v.payload.val() as Vote;
          return { $key, ...data };
        }).forEach(v => {
          (hashVotes)[v.title] ? (hashVotes)[v.title] += 1 : (hashVotes)[v.title] = 1;
        })
        return hashVotes;
      }
      )
    );
  }

  public setAltAttribute(name: string): string {
    return name.toLowerCase().replace(/ /gi, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
