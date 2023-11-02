
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../../../utils/services/util.service';

@Component({
  selector: 'image-async',
  templateUrl: './loader-image.component.html',
  styleUrls: ['./loader-image.component.css'],
  animations: [
    trigger('imageAnimation', [
      state('show-image', style({
        opacity: '1',
      })),
      state('hide-image', style({
        opacity: '0'
      })),
      transition('show-image <=> hide-image', animate('1000ms ease-in')),
    ])
  ]
})
export class LoaderImageComponent implements OnInit {
  imageCtrl: string = 'hide-image';

  showPrueba: boolean = false;

  @Input() imageUrl!: string;
  @Input() imageName!: string;
  @Input() cssClassChild!: string;


  constructor(
    private utilService: UtilService,
  ) { }

  ngOnInit() { }

  loadImage() {
    this.showPrueba = true;
    this.imageCtrl = 'show-image';
  }

  setAltAttribute(): string {
    return this.utilService.setAltAttribute(this.imageName);
  }
}
