import { Component, OnInit, Renderer2 } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];

  constructor(private renderer: Renderer2) {}
  
  ngOnInit(): void {
    this.carFaker();
    let carContainer=document.getElementsByClassName("article-container")[0];
    this.cars.forEach(car => {
      let article=document.createElement("div");
      article.classList.add("article");
      for (const property in car) {
        if (car.hasOwnProperty(property)) {
          const carPropertyElement = this.renderer.createElement('div');
          carPropertyElement.textContent = `${car[property]}`;
          this.renderer.appendChild(article, carPropertyElement);
        }
      }




      carContainer.appendChild(article);
    });
  }

  carFaker() {
    // Assuming Car is a type or interface, not a class
    this.cars = [
      { 
        brand: 'Toyota', 
        model: 'Camry', 
        year: 2022, 
        mileage: 100, 
        fuelType: "electric", 
        transmission: "automatic", 
        contactName: "Elizabeth", 
        contactNumber: "+46847514648", 
        price: 100000, 
        description: "cool car" 
      },
      { 
        brand: 'Honda', 
        model: 'Accord', 
        year: 2010, 
        mileage: 100, 
        fuelType: "diesel", 
        transmission: "manual", 
        contactName: "Raymond", 
        contactNumber: "+46331433429", 
        price: 90000, 
        description: "cooler car" 
      },
      { 
        brand: 'Ford', 
        model: 'Mustang', 
        year: 1901, 
        mileage: 100, 
        fuelType: "hybrid", 
        transmission: "automatic", 
        contactName: "Rodney", 
        contactNumber: "+46403824633", 
        price: 120000, 
        description: "coolest car" 
      },
    ];
  }
}
