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

  // photosList: Photo[] = [
  //   {
  //     id: 1,
  //     title: 'Una zancada más',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/01-md.jpg?alt=media&token=573de34b-ae80-45f3-8dec-6c8abf8758bb',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/01-sm.jpg?alt=media&token=197c94f8-aa5f-427d-8dd3-82ca38d0d378'
  //   },
  //   {
  //     id: 2,
  //     title: 'Arrópame',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/02-md.jpg?alt=media&token=44762527-dc96-4281-8bfb-2c1e2c46a1d9',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/02-sm.jpg?alt=media&token=b7b599c8-0c11-4e1f-b13c-7eba7bb4801c'
  //   },
  //   {
  //     id: 3,
  //     title: 'La niña',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/03-md.jpg?alt=media&token=efc626e2-ce9d-48ef-a57e-3e8c1e38c190',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/03-sm.jpg?alt=media&token=b2bd821e-2cb4-48e8-b4a0-dbfd0d30a74b'
  //   },
  //   {
  //     id: 4,
  //     title: 'Enredo',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/04-md.jpg?alt=media&token=a05f9639-7eb8-4970-9d27-ef8d017ef264',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/04-sm.jpg?alt=media&token=c1e17a80-aadc-46ee-9918-effce1f44eee'
  //   },
  //   {
  //     id: 5,
  //     title: 'Se me escapa de las manos',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/05-md.jpg?alt=media&token=c36a3047-f81c-43f8-ba40-8982fa6a801a',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/05-sm.jpg?alt=media&token=9422aeac-075a-485d-b414-7db2d2864494'
  //   },
  //   {
  //     id: 6,
  //     title: 'El lazo',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/06-md.jpg?alt=media&token=02c4317b-7920-44cf-a8e0-671b81855b33',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/06-sm.jpg?alt=media&token=3a496e83-1d2b-417b-8fa7-32cfb40fb088'
  //   },
  //   {
  //     id: 7,
  //     title: 'La duda',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/07-md.jpg?alt=media&token=78512f18-bc24-469c-8914-c87b6b78e49c',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/07-sm.jpg?alt=media&token=ba773c5e-ba9d-43e3-bbb9-720ef145e04b'
  //   },
  //   {
  //     id: 8,
  //     title: 'Mi piel',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/08-md.jpg?alt=media&token=ee1886f2-fa3a-468b-a105-b5f8ad719673',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/08-sm.jpg?alt=media&token=885de493-0689-437a-95a3-280b25e02ee0'
  //   },
  //   {
  //     id: 9,
  //     title: 'Disonancia',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/09-md.jpg?alt=media&token=99070436-373b-4ae2-ba1a-bff46a6aa2f0',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/09-sm.jpg?alt=media&token=8df26fa1-624a-40ee-95e4-cc3a548f2220'
  //   },
  //   {
  //     id: 10,
  //     title: 'Lo vivido',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/10-md.jpg?alt=media&token=6c05cc36-3212-4eb2-9914-8b02969a96cc',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/10-sm.jpg?alt=media&token=c042409c-8c8b-4f46-8cb3-0ab53366ef4f'
  //   },
  //   {
  //     id: 11,
  //     title: 'El descanso',
  //     toShow: false,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/11-md.jpg?alt=media&token=41cda00e-845a-4d0c-a322-5e8c0f8e6463',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/11-sm.jpg?alt=media&token=50c52214-8e16-4c39-a346-d7c41f2916f3'
  //   },
  //   {
  //     id: 12,
  //     title: 'Fatiga',
  //     toShow: false,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/12-md.jpg?alt=media&token=cda7dfd8-839e-4181-aae3-fc70a2d46a56',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/12-sm.jpg?alt=media&token=3e09dff5-8cfe-47e2-bd09-f7c9fc55d8a4'
  //   },
  //   {
  //     id: 13,
  //     title: 'Terciopelo',
  //     toShow: false,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/13-md.jpg?alt=media&token=856e384b-cf89-4d3b-8836-56766c1fab5f',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/13-sm.jpg?alt=media&token=572c42c8-279f-454a-af68-8ccc0f95c81c'
  //   },
  //   {
  //     id: 14,
  //     title: 'Narciso sin reflejo',
  //     toShow: true,
  //     format: '',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/14-md.jpg?alt=media&token=565d6d3f-ac8c-46a1-9d1e-4a6ec1e52994',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/14-sm.jpg?alt=media&token=a8011ae7-5df4-4aae-a6fe-b64f9514ce27'
  //   },
  //   {
  //     id: 15,
  //     title: 'El perdón',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/15-md.jpg?alt=media&token=ee9d5c22-c19e-4109-af4d-1ad5d5b1ab5f',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/15-sm.jpg?alt=media&token=df3ed0cd-62a4-41e9-b7bf-ab6cb5e8d286'
  //   },
  //   {
  //     id: 16,
  //     title: 'La derrota',
  //     toShow: false,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/16-md.jpg?alt=media&token=924edb10-817c-4400-96d4-760f105f344b',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/16-sm.jpg?alt=media&token=da97bb03-d1e4-456f-8d35-b09cf808f621'
  //   },
  //   {
  //     id: 17,
  //     title: 'El guerrero',
  //     toShow: false,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/17-md.jpg?alt=media&token=f79a1647-3909-451d-ad9e-bdbf691128d4',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/17-sm.jpg?alt=media&token=9cbd03de-e512-4598-9503-f43a59aa78b9'
  //   },
  //   {
  //     id: 18,
  //     title: 'Todo para mí',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/18-md.jpg?alt=media&token=0cc3c43d-d8d1-4385-8b58-7144bdf77924',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/18-sm.jpg?alt=media&token=55d5eebb-f6e5-4d31-8e26-c2f7bbff0847'
  //   },
  //   {
  //     id: 19,
  //     title: 'Erizada',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/19-md.jpg?alt=media&token=d7a0606c-2a83-4186-a6b9-65e1b09eb08e',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/19-sm.jpg?alt=media&token=5cf2d1a6-2a57-4f1c-a7f5-b53e38cc32fe'
  //   },
  //   {
  //     id: 20,
  //     title: 'Sentencia',
  //     toShow: false,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/20-md.jpg?alt=media&token=6b377fc6-1a0a-4888-af1d-a1113cee1d36',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/20-sm.jpg?alt=media&token=8a79491e-98d3-4093-bfea-273946243905'
  //   },
  //   {
  //     id: 21,
  //     title: 'Aprendiendo',
  //     toShow: true,
  //     format: '50x70cm',
  //     urlPhoto: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/21-md.jpg?alt=media&token=db583c78-957d-4c74-a5e1-372c80effa6f',
  //     urlPhotoMini: 'https://firebasestorage.googleapis.com/v0/b/figueiraphotoapp.appspot.com/o/21-sm.jpg?alt=media&token=3ee011b4-efe2-4ebb-950a-e05412604181'
  //   }
  // ];

  votesList: Vote[] = [
    { $key: '1', idPhoto: 2, title: 'Arrópame', date: new Date().getTime() },
    { $key: '2', idPhoto: 20, title: 'Sentencia', date: new Date().getTime() },
    { $key: '3', idPhoto: 19, title: 'Erizada', date: new Date().getTime() },
    { $key: '4', idPhoto: 20, title: 'Sentencia', date: new Date().getTime() },
    { $key: '5', idPhoto: 21, title: 'Aprendiendo', date: new Date().getTime() },
    { $key: '6', idPhoto: 9, title: 'Disonancia', date: new Date().getTime() },
    { $key: '1', idPhoto: 2, title: 'Arrópame', date: new Date().getTime() },
    { $key: '2', idPhoto: 20, title: 'Sentencia', date: new Date().getTime() },
    { $key: '3', idPhoto: 19, title: 'Erizada', date: new Date().getTime() },
    { $key: '4', idPhoto: 20, title: 'Sentencia', date: new Date().getTime() },
    { $key: '5', idPhoto: 19, title: 'Erizada', date: new Date().getTime() },
    { $key: '6', idPhoto: 13, title: 'Terciopelo', date: new Date().getTime() },
  ];

  constructor(private afd: AngularFireDatabase) {
    this.photosRef = this.afd.list('photos');
    this.votesRef = this.afd.list('votes');
  }

  public getPhotoList1(): Observable<Photo[]> {
    console.log(this.photosRef);
    return this.photos = this.photosRef.snapshotChanges().pipe(
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

  // public getPhotoList() {
  //   return this.photosList.filter(photo => photo.toShow);
  // }

  public getPhotoById1(id: number) {
    return this.photos.pipe(
      map(v => v.filter(p => p.id === id))
    );
  }

  public getPhotoById(id: number) {
    // console.log(id);
    // console.log(new Date().getTime());
    // console.log(this.photosList.filter(photo => photo.id === id));
    // return of(this.photosList.filter(photo => photo.id === id));
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

  public setAltAttribute(name: string): string {
    return name.toLowerCase().replace(/ /gi, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
