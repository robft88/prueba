import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-call',
  templateUrl: './action-call.component.html',
  styleUrls: ['./action-call.component.css']
})
export class ActionCallComponent {

  @Input() show: boolean = true;

}
