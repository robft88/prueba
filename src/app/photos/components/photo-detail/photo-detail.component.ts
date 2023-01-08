import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  animations: [
    trigger('imageAnimation', [
      state('show-image', style({
        opacity: '1',
      })),
      state('hide-image', style({
        opacity: '0'
      })),
      transition('show-image <=> hide-image', animate('500ms ease-in')),
    ])
  ]
})
export class PhotoDetailComponent implements OnInit {
  imageCtrl: string = 'hide-image';

  showPrueba: boolean = false;

  @Input() photo!: Photo;

  constructor(private ps: PhotosService) { }

  ngOnInit(): void {

  }

  /**
   * Función que permite agregar o eliminar del localStorage la foto a la que se le dá like
   * @param photo Foto a la que se le da like
   * @returns 
   */
  giveLike(photo: Photo) {
    // Validar que la lista contiene 3 fotos y la foto a la que se le dá like no está dentro de la lista.
    if (this.ps.userLikesList.length === 3 && this.ps.userLikesList.filter(el => photo.id === el.id).length === 0) return;

    if (this.ps.userLikesList.filter(el => photo.id === el.id).length === 0) {
      this.ps.userLikesList.push(photo);
    } else {
      this.ps.userLikesList = this.ps.userLikesList.filter(el => photo.id != el.id);
    }
    localStorage.setItem('userVote', JSON.stringify(this.ps.userLikesList));
  }

  checkIfLike(id: number) {
    return this.ps.userLikesList.filter(photo => photo.id === id).length === 1;
  }

  userAlreadyVoted() {
    return JSON.parse(localStorage.getItem('userHasVoted')!);
  }

  prueba() {
    console.log("entra");
    this.showPrueba = true;
    this.imageCtrl = 'show-image';
  }

}
