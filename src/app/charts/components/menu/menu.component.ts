import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../photos/interfaces/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  menu: MenuItem[] = [
    { route: '/S4p!3nz4-c0qU!t0/chart', text: 'Gráfica', icon: 'fa-solid fa-chart-pie' },
    { route: '/S4p!3nz4-c0qU!t0/table', text: 'Tabla', icon: 'fa-solid fa-list-ul' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
