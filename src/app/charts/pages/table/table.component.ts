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

    console.log(this.photos);


    this.ps.getVotesForList().subscribe(data => {
      this.photos = data;
    });
  }

}
