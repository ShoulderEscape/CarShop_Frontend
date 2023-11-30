import { Component, OnInit, Renderer2,ViewEncapsulation  } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None // Add this line
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

      


      let image= document.createElement('img');
      image.setAttribute('src', car.imagelink);
      image.classList.add("car-image");
      article.appendChild(image);

      let imageFooter=document.createElement('div');
      imageFooter.classList.add("image-footer")


      let title = document.createElement('span');
      title.textContent=car.brand+' '+car.model;
      title.classList.add("title");
      imageFooter.appendChild(title);

      let price= document.createElement('span');
      price.textContent=car.price+" kr";
      price.classList.add("price");
      imageFooter.appendChild(price);

      article.appendChild(imageFooter);

      


      carContainer.appendChild(article);
    });
  }

  carFaker() {
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
        description: "cool car",
        imagelink: "/example-car.png"

      },
      { 
        brand: 'Honda', 
        model: 'Accord', 
        year: 2010, 
        mileage: 5, 
        fuelType: "diesel", 
        transmission: "manual", 
        contactName: "Raymond", 
        contactNumber: "+46331433429", 
        price: 90000, 
        description: "cooler car", 
        imagelink: "/example-car.png"

      },
      { 
        brand: 'Ford', 
        model: 'Mustang', 
        year: 1901, 
        mileage: 13, 
        fuelType: "hybrid", 
        transmission: "automatic", 
        contactName: "Rodney", 
        contactNumber: "+46403824633", 
        price: 120000, 
        description: "coolest car", 
        imagelink: "/example-car.png"

      },
      { 
         

        brand: 'Toyota', 
        model: 'Camry', 
        year: 1020, 
        mileage: 89, 
        fuelType: "diesel", 
        transmission: "manual", 
        contactName: "Raymond", 
        contactNumber: "+46331433429", 
        price: 150000, 
        description: "cooler car", 
        imagelink: "/example-car.png"
      },
      {  

        brand: 'Volkswagen', 
        model: 'Golf', 
        year: 1901, 
        mileage: 61, 
        fuelType: "hybrid", 
        transmission: "automatic", 
        contactName: "Rodney", 
        contactNumber: "+46403824633", 
        price: 86000, 
        description: "coolest car", 
        imagelink: "/example-car.png"

      },

    ];
  }
}
