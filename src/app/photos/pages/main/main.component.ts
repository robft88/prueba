import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  photoList!: Photo[];

  constructor(private ps: PhotosService) { }

  ngOnInit(): void {
    this.ps.getPhotoList().subscribe(resp => {
      this.photoList = resp;
    })
  }
  check3PhotosLike() {
    if (!localStorage.getItem('userVote')) return;
    return JSON.parse(localStorage.getItem('userVote')!).length === 3;
  }

  userAlreadyVoted() {
    return JSON.parse(localStorage.getItem('userHasVoted')!);
  }

  sendInfo() {
    localStorage.setItem('userVote', JSON.stringify(this.ps.userLikesList));
    localStorage.setItem('userHasVoted', JSON.stringify(true));
    this.ps.saveVotes(this.ps.userLikesList);
  }
}
