import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../utils/interfaces/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() menu?: MenuItem[];

  ngOnInit(): void {
  }
}
