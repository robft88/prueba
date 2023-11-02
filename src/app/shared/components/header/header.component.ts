import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  @Input() typeButton: 'menu' | 'back' | null = null;
  @Input() title?: string;
  @Input() version?: string;
  @Input() navigateUrl?: string;
  showMenu = false;

  constructor(private router: Router) { }

  clickAction(typeButton: string | null) {
    if (typeButton === 'menu') this.showMenu = !this.showMenu;
    else if (typeButton === 'back') this.router.navigate([this.navigateUrl]);
    else return;
  }
}
