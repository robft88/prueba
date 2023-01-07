import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() showBackBtn!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  backToMain() {
    this.router.navigate(['/photos']);
  }
}
