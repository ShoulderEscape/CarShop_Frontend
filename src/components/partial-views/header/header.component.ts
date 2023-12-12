import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  toggleMenu() {
    let navbar = document.getElementsByClassName('navbar')[0];

    if (navbar.classList.contains('visible')) {
      navbar.classList.remove('visible');
    } else {
      navbar.classList.add('visible');
    }
  }
}
