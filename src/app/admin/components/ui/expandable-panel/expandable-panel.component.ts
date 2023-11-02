import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { VoteToList } from '../../../../utils/interfaces/vote-to-list.interface';

@Component({
  selector: 'app-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.css']
})
export class ExpandablePanelComponent {

  @Input() title: string = '';
  @Output() onClick = new EventEmitter<boolean>();

  showPanel: boolean = false;

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showPanel) {
      if (!this.el.nativeElement.contains(event.target)) this.changePanelState(false);
    }
  }

  changePanelState(state: boolean): void {
    this.showPanel = state;
    this.onClick.emit(state);
  }
}
