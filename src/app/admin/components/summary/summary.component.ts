import { Component, Input } from '@angular/core';
import { VoteToList } from '../../../utils/interfaces/vote-to-list.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css',]
})
export class SummaryComponent {

  @Input() leastVoted: VoteToList[] = [];
  @Input() mostVoted: VoteToList[] = [];
  @Input() totalPhotos: number = 0;
  @Input() totalVotes: number = 0;

  showPanel1: boolean = false;
  showPanel2: boolean = false;

  getPanelState(ev: boolean, panel: string) {
    if (panel === 'mostVoted') this.showPanel1 = ev;
    else this.showPanel2 = ev;
  }

}
