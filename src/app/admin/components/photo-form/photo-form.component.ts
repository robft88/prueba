import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo } from '../../../utils/interfaces/photo.interface';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  @Input() set data(data: Photo | undefined) {
    this.initializeData(data);
  }
  @Input() imageMiniUrl: string = '';
  @Input() imageUrl: string = '';

  form!: FormGroup;

  constructor(
    private formBuild: FormBuilder,
  ) {
    this.form = this.formBuild.group({
      format: ['', Validators.required],
      order: ['', Validators.required],
      title: ['', Validators.required],
      toShow: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  private initializeData(data: Photo | undefined): void {
    if (!data) return;

    this.form.reset({
      format: data.format,
      order: data.order,
      title: data.title,
      toShow: data.toShow,
    });
    this.imageMiniUrl = data.urlPhotoMini;
    this.imageUrl = data.urlPhoto;
  }

}
