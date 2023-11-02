import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoStore } from '../../../utils/stores/photo.store';
import { Photo } from '../../../utils/interfaces/photo.interface';

@Component({
  selector: 'app-photo-form-page',
  templateUrl: './photo-form.page.html',
  styleUrls: ['./photo-form.page.css']
})
export class PhotoFormPage implements OnInit {

  @Input() editMode = false;
  photo?: Photo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoStore: PhotoStore,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (!id) return;
    if (id === 'new') {
      console.log('nueva photo');
    } else {
      this.photo = this.photoStore.getPhotoById(parseInt(id));
      this.editMode = true;
    }
  }

}
