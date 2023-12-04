import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  filter?: Filter; 

  ngOnInit(): void {
    this.carFaker();
    this.generateArticles();
    
  }
  

  handleFilterChange(filterData: [string, string][]): void {
    const listOfIdsThatHaveNumberValues=["year-min", "year-max", "mileage-min", "mileage-max", "price-min", "price-max"];
    listOfIdsThatHaveNumberValues.forEach(ID => {
      filterData.forEach(element => {
        if(element[0]===ID){
          console.log(ID);
        }
      });
    });
  }

  private generateArticles(): void{
    const carContainer = document.getElementsByClassName('article-container')[0] as HTMLElement;

    this.cars.forEach((car) => {
      const article = document.createElement('div');
      article.classList.add('article');

      const image = document.createElement('img');
      image.setAttribute('src', car.imagelink);
      image.classList.add('car-image');
      article.appendChild(image);

      const imageFooter = document.createElement('div');
      imageFooter.classList.add('image-footer');

      const title = document.createElement('span');
      title.textContent = `${car.brand} ${car.model}`;
      title.classList.add('title');
      imageFooter.appendChild(title);

      const price = document.createElement('span');
      const formattedPrice = this.formatPrice(car.price);
      price.textContent = `${formattedPrice} kr`;
      price.classList.add('price');
      imageFooter.appendChild(price);

      article.appendChild(imageFooter);

      const fuelType = document.createElement('span');
      fuelType.textContent = `${car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)} car `;
      article.appendChild(fuelType);

      const mileage = document.createElement('span');
      mileage.textContent = `with ${car.mileage} miles mileage.`;
      article.appendChild(mileage);

      const transmission = document.createElement('div');
      transmission.textContent = `Transmission: ${car.transmission}`;
      article.appendChild(transmission);

      carContainer.appendChild(article);
    });
  }

  private formatPrice(price: number): string {
    const priceString = price.toString();
    return priceString
      .split('')
      .reverse()
      .reduce((result, char, index) => (result + char + ((index + 1) % 3 === 0 && index !== priceString.length - 1 ? ' ' : '')), '')
      .split('')
      .reverse()
      .join('');
  }

  

  private carFaker() {
    this.cars = [
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        mileage: 100,
        fuelType: 'electric',
        transmission: 'automatic',
        contactName: 'Elizabeth',
        contactNumber: '+46847514648',
        price: 100000,
        description: 'cool car',
        imagelink: '/example-car.png',
      },
      {
        brand: 'Honda',
        model: 'Accord',
        year: 2010,
        mileage: 5,
        fuelType: 'diesel',
        transmission: 'manual',
        contactName: 'Raymond',
        contactNumber: '+46331433429',
        price: 1000000,
        description: 'cooler car',
        imagelink: '/example-car.png',
      },
      {
        brand: 'Ford',
        model: 'Mustang',
        year: 1901,
        mileage: 13,
        fuelType: 'hybrid',
        transmission: 'automatic',
        contactName: 'Rodney',
        contactNumber: '+46403824633',
        price: 120000,
        description: 'coolest car',
        imagelink: '/example-car.png',
      },
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 1020,
        mileage: 89,
        fuelType: 'diesel',
        transmission: 'manual',
        contactName: 'Raymond',
        contactNumber: '+46331433429',
        price: 150000,
        description: 'cooler car',
        imagelink: '/example-car.png',
      },
      {
        brand: 'Volkswagen',
        model: 'Golf',
        year: 1901,
        mileage: 61,
        fuelType: 'hybrid',
        transmission: 'automatic',
        contactName: 'Rodney',
        contactNumber: '+46403824633',
        price: 86000,
        description: 'coolest car',
        imagelink: '/example-car.png',
      },
    ];
  }

  
}
