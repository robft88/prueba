import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../../utils/interfaces/profile.interface';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() set data(data: Profile | undefined) {
    this.initializeData(data);
  }
  @Input() profilePhoto: string = '';

  form!: FormGroup;

  constructor(
    private formBuild: FormBuilder,
  ) {
    this.form = this.formBuild.group({
      instagram: ['', Validators.required],
      mailToHeader: ['', Validators.required],
      name: ['', Validators.required],
      photo: ['', Validators.required],
      photoSize: ['', Validators.required],
      photoSizeText: ['', Validators.required],
      profession: ['', Validators.required],
      user: ['', Validators.required],
      webSide: ['', Validators.required],
      webSideText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.form);
  }

  private initializeData(data: Profile | undefined): void {
    if (!data) return;

    this.form.reset({
      instagram: data.instagram,
      mailToHeader: data.mailToHeader,
      name: data.name,
      photo: data.photo,
      photoSize: data.photoSize,
      photoSizeText: data.photoSizeText,
      profession: data.profession,
      user: data.user,
      webSide: data.webSide,
      webSideText: data.webSideText,
    });
    this.profilePhoto = data.photo;
  }

}
