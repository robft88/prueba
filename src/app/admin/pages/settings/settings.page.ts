import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../utils/interfaces/menu-item.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.css']
})
export class SettingsPage implements OnInit {

  menu: MenuItem[] = [
    {
      route: '/S4p!3nz4-c0qU!t0/settings/profile',
      text: 'Perfil',
    },
    {
      route: '/S4p!3nz4-c0qU!t0/settings/action-call',
      text: 'Votar',
    },
    {
      route: '/S4p!3nz4-c0qU!t0/settings/exhibitions',
      text: 'Exhibiciones',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
