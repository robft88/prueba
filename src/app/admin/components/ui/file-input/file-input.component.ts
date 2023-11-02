import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  @Input() imageUrl: string = '';
  @Input() label = '';
  @Input() shape: 'normal' | 'round' = 'normal';
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Output() onImageChange = new EventEmitter<void>();

  editMode: boolean = true;
  imgFile?: File;

  constructor() { }

  ngOnInit(): void {
  }

  imageSelected(ev: Event): void {
    const target = ev.currentTarget as HTMLInputElement;

    if (!target.files) return;
    if (target.files.length === 0) return;

    this.imgFile = target.files[0];
    this.showImagePreview(this.imgFile);

    target.value = '';
    this.onImageChange.emit();
  }

  enableEditMode(): void {
    this.editMode = true;
  }

  private showImagePreview(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (ev) => {
      this.imageUrl = (ev.target?.result as string);
    });
    reader.readAsDataURL(file);
  }

}