import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
    showFilters() {
      let filterContainer=document.getElementsByClassName("filter-container")[0];
      let filterButton=document.getElementsByClassName("filter-button")[0];
      if(filterContainer.classList.contains("visible")){
        filterContainer.classList.remove("visible");
        filterButton.textContent="Show Filters"
      } else{
        filterContainer.classList.add("visible");
        filterButton.textContent="Hide Filters"

      }
    }

}
