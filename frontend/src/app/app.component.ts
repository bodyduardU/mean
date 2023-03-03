import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn: any = false;
  constructor() {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') ?? [];

    if (this.isLoggedIn) {
    }
  }
  title = 'front';
}
