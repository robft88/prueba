import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { VoteToChart } from '../interfaces/vote-to-chart.interface';
import { Vote } from '../interfaces/vote.interface';
import { VoteToList } from '../interfaces/vote-to-list.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  public userLikesList: Photo[] = JSON.parse(localStorage.getItem('userVote')!) || [];

  photosList: Photo[] = [
    { id: 1, title: 'Una zancada más', toShow: true, format: '50x70cm' },
    { id: 2, title: 'Arrópame', toShow: true, format: '50x70cm' },
    { id: 3, title: 'La niña', toShow: true, format: '50x70cm' },
    { id: 4, title: 'Enrredo', toShow: true, format: '50x70cm' },
    { id: 5, title: 'Se me escapa de las manos', toShow: true, format: '50x70cm' },
    { id: 6, title: 'El lazo', toShow: true, format: '50x70cm' },
    { id: 7, title: 'La duda', toShow: true, format: '50x70cm' },
    { id: 8, title: 'Mi piel', toShow: true, format: '50x70cm' },
    { id: 9, title: 'Disonancia', toShow: true, format: '50x70cm' },
    { id: 10, title: 'Lo vivido', toShow: true, format: '50x70cm' },
    { id: 11, title: 'El descanso', toShow: false, format: '50x70cm' },
    { id: 12, title: 'Fatiga', toShow: false, format: '50x70cm' },
    { id: 13, title: 'Terciopelo', toShow: false, format: '50x70cm' },
    { id: 14, title: 'Narciso sin reflejo', toShow: true, format: '' },
    { id: 15, title: 'El perdón', toShow: true, format: '50x70cm' },
    { id: 16, title: 'La derrota', toShow: false, format: '50x70cm' },
    { id: 17, title: 'El guerrero', toShow: false, format: '50x70cm' },
    { id: 18, title: 'Todo para mi', toShow: true, format: '50x70cm' },
    { id: 19, title: 'Erizada', toShow: true, format: '50x70cm' },
    { id: 20, title: 'Sentencia', toShow: false, format: '50x70cm' },
    { id: 21, title: 'Aprendiendo', toShow: true, format: '50x70cm' }
  ];

  votesList: Vote[] = [
    { id: '1', idPhoto: 2, title: 'Arrópame', date: new Date() },
    { id: '2', idPhoto: 20, title: 'Sentencia', date: new Date() },
    { id: '3', idPhoto: 19, title: 'Erizada', date: new Date() },
    { id: '4', idPhoto: 20, title: 'Sentencia', date: new Date() },
    { id: '5', idPhoto: 21, title: 'Aprendiendo', date: new Date() },
    { id: '6', idPhoto: 9, title: 'Disonancia', date: new Date() },
    { id: '1', idPhoto: 2, title: 'Arrópame', date: new Date() },
    { id: '2', idPhoto: 20, title: 'Sentencia', date: new Date() },
    { id: '3', idPhoto: 19, title: 'Erizada', date: new Date() },
    { id: '4', idPhoto: 20, title: 'Sentencia', date: new Date() },
    { id: '5', idPhoto: 19, title: 'Erizada', date: new Date() },
    { id: '6', idPhoto: 13, title: 'Terciopelo', date: new Date() },
  ];

  constructor() { }

  public getPhotoList() {
    return this.photosList.filter(photo => photo.toShow);
  }

  public getPhotoById(id: number) {
    console.log(id);
    console.log(this.photosList.filter(photo => photo.id === id));
    return of(this.photosList.filter(photo => photo.id === id));
  }

  private getVotesToTransform() {
    let hashVotes: any = {};
    this.votesList.forEach(vote => {
      (hashVotes)[vote.title] ? (hashVotes)[vote.title] += 1 : (hashVotes)[vote.title] = 1;
    });
    return hashVotes;
  }

  public getVotesForChart() {
    return of(this.getVotesToTransform());
  }

  public getVotesForList(): Observable<VoteToList[]> {
    let hash = this.getVotesToTransform();
    let result: VoteToList[] = Object.keys(hash).map(el => ({ title: el, votes: hash[el] })).sort((a, b) => b.votes - a.votes);
    return of(result);
  }
}
