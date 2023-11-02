import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input() emailMessage?: string;
  @Input() photoSize?: string;
  @Input() photoSizeText?: string;

}
