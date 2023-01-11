import { Component, OnInit } from '@angular/core';
import { map, reduce } from 'rxjs';
import { PhotosService } from '../../../photos/services/photos.service';
import { Photo } from '../../../photos/interfaces/photo.interface';
import { VoteToList } from '../../../photos/interfaces/vote-to-list.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styles: [
  ]
})
export class SummaryComponent implements OnInit {
  showPanel1: boolean = false;
  showPanel2: boolean = false;
  totalPhotos: number = 0;
  totalVotes: number = 0;
  moreVotes: VoteToList[] = [];
  lessVotes: VoteToList[] = [];

  constructor(private ps: PhotosService) { }

  ngOnInit(): void {
    this.ps.getVotes().subscribe(data => {
      let hash = data;
      let result: VoteToList[] = Object.keys(hash).map(el => ({ title: el, votes: hash[el] })).sort((a, b) => b.votes - a.votes);
      this.totalVotes = result.reduce((acc, el) => acc + el.votes, 0) / 3;
      this.totalPhotos = result.length;
      this.moreVotes = result.slice(0, 3);
      this.lessVotes = result.slice(this.totalPhotos - 3, this.totalPhotos);
    });

  }

}
