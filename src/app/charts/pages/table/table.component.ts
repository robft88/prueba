import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/photos/interfaces/photo.interface';
import { PhotosService } from 'src/app/photos/services/photos.service';
import { VoteToList } from '../../../photos/interfaces/vote-to-list.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent implements OnInit {

  photos: VoteToList[] = [];

  constructor(private ps: PhotosService) { }

  ngOnInit(): void {
    this.ps.getVotes().subscribe(data => {
      let hash = data;
      this.photos = Object.keys(hash).map(el => ({ title: el, votes: hash[el] })).sort((a, b) => b.votes - a.votes);
    });
  }

}
