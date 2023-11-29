import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  toggleMenu() {
    let navbar=document.getElementsByClassName("navbar")[0];
    
    if(navbar.classList.contains("visible")){
      navbar.classList.remove("visible");
    } else{
      navbar.classList.add("visible");

    }
  }
}

