import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  search(){
    const searchElement=document.getElementById("searchInput") as HTMLInputElement;

    if(searchElement){
      let searchInput=searchElement.value;
      //Call to backend
    }
  }

}
