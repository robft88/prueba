import { Component, Input } from '@angular/core';
import { Profile } from '../../../utils/interfaces/profile.interface';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent {

  @Input() profile?: Profile;

}
