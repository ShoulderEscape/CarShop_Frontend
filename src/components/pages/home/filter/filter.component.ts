import { Component, EventEmitter, Output  } from '@angular/core';
import { Filter } from 'src/app/models/filter.model';


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

    @Output() filterTransfer: EventEmitter<any> = new EventEmitter();

    sendFilterDataToHome(filterData: any[]): void {
      let filterValues: [string, string][] = [];
    
      filterData.forEach(element => {
        let tempID;
        if (element.id=="automatic" || element.id=="any" || element.id=="manual"){
          tempID=element.id;
          element.setAttribute("id", "transmission");
        }
        if (element && typeof element.value === 'string') {
          let objectId = element.id || ''; 
          filterValues.push([objectId, element.value]);
          if(tempID){
            element.setAttribute("id", tempID);
          }
        }
      });
    
      this.filterTransfer.emit(filterValues);
    }
    
    

    changeTransmission(activeButtonId: string, disabledButtonIds: string[]): void {
      document.getElementById(activeButtonId)?.setAttribute("disabled", 'true');
    
      disabledButtonIds.forEach((buttonId) => {
        document.getElementById(buttonId)?.removeAttribute("disabled");
      });
     this.filterChanged(); 
    }
    
    setAny(): void {
      this.changeTransmission('any', ['automatic', 'manual']);
    }
    
    setAuto(): void {
      this.changeTransmission('automatic', ['any', 'manual']);
    }
    
    setManual(): void {
      this.changeTransmission('manual', ['automatic', 'any']);
    }
    
    
    filterChanged(){
      const yearMin=document.getElementById("year-min");
      const yearMax=document.getElementById("year-max");
      const mileageMin=document.getElementById("mileage-min");
      const mileageMax=document.getElementById("mileage-max");
      const priceMin=document.getElementById("price-min");
      const priceMax=document.getElementById("price-max");
      const fuelType=document.getElementById("fuel-type");
      let transmission;
      let transmissionOptions=['automatic', 'any', 'manual'];
      transmissionOptions.forEach(element => {
        if(document.getElementById(element)?.getAttribute('disabled')){
          transmission=document.getElementById(element);
        }
      });
      
      const errorLocation=document.getElementById("errormessages");
      if(errorLocation){
        errorLocation.innerHTML='';
      }
      this.ValidateNumbers([
        yearMin, yearMax, mileageMin, 
        mileageMax, priceMin, priceMax]);
      this.ValidateMinIsLowerThanMax(yearMin, yearMax);
      this.ValidateMinIsLowerThanMax(mileageMin, mileageMax);
      this.ValidateMinIsLowerThanMax(priceMin, priceMax);

     
      
      if (errorLocation){
        if(errorLocation.innerHTML==''){

          if(transmission){

          }
          this.sendFilterDataToHome([yearMin, yearMax, mileageMin, mileageMax, priceMin, priceMax, fuelType, transmission]);
  
        }
      }
      


      


    }
    ValidateMinIsLowerThanMax(min: any, max: any) {
      let addedToErrors = '';
    
      const minValue = parseInt(min.value);
      const maxValue = parseInt(max.value);
    
      if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
        addedToErrors += `${min.id}'s value needs to be lower than ${max.id}'s<br>`;
      }
    
      let errorLocation = document.getElementById("errormessages");
      if (errorLocation) {
        const currentErrors = errorLocation.innerHTML;
        errorLocation.innerHTML = currentErrors + addedToErrors;
      }
    }
    
    
    ValidateNumbers(listOfValidations: any[]){
      let ValidationProblems : any[] = [];
      
      listOfValidations.forEach(element => {
        
        if(element.value!=''){
          if(element.value.split('').some((char: any) => isNaN(Number(char)))){
            ValidationProblems.push(element);

          }
        }
        
          
      });
      let errormessage='';
      if(ValidationProblems.length>0){
        ValidationProblems.forEach(element => {
          errormessage+=element.id+" should only have numbers in it <br>";

          
        });
        let errorlocation=document.getElementById("errormessages");
        if(errorlocation)
          errorlocation.innerHTML=errormessage;
      }



    }




}
