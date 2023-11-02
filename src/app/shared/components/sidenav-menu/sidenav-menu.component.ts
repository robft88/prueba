import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../utils/interfaces/menu-item.interface';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent {

  @Input() showPanel: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      route: '/photos',
      text: 'Inicio'
    },
    {
      route: '/S4p!3nz4-c0qU!t0/exhibitions',
      text: 'Exhibiciones'
    },
    {
      route: '/S4p!3nz4-c0qU!t0/photos',
      text: 'Fotos'
    },
    {
      route: '/S4p!3nz4-c0qU!t0/settings',
      text: 'Configuración'
    },
  ]

  onClose() {
    this.onClick.emit();
  }

}
