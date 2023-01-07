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
    this.ps.getVotesForList().subscribe(data => {
      this.totalVotes = data.reduce((acc, el) => acc + el.votes, 0);
      this.totalPhotos = data.length;
      this.moreVotes = data.slice(0, 3);
      this.lessVotes = data.slice(this.totalPhotos - 3, this.totalPhotos);
    });

  }

}
