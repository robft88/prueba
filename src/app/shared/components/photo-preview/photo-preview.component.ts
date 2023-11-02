import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../../../utils/interfaces/photo.interface';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css'],
})
export class PhotoPreviewComponent {

  @Input() photo?: Photo;
  @Input() isSelected: boolean = false;
  @Input() order?: number;
  @Input() isHidden: boolean = false;
  @Input() toShow: boolean = false;

  @Output() onSelectImage = new EventEmitter<void>();

  onClick(): void {
    this.onSelectImage.emit();
  }
}
