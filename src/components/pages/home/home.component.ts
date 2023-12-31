import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { Filter } from 'src/app/models/filter.model';
import { ArticleService } from 'src/app/services/ArticleService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  filter: Filter = [];
  createdArticleMessage = "";

  ERROR_MESSAGE_ABOUT_MISSING_FILTER_FUNCTIONS =
    'There is no filter functionality about this filter, please inform us of this problem, and we will fix it';

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      (response) => {
        this.cars = response;
        console.log(this.cars);
        this.generateArticles();
      },
      (error) => {
        console.error(error);
      });

    this.route.queryParams.subscribe((params) => {
      if (params['createdArticle'] === 'true') {
        this.createdArticleMessage = 'Article successfuly created.';
      }
    });

  }
  applyFilterChangesToShownArticles(thisFilter: [string, string]) {
    if (this.filter) {
      switch (thisFilter[0]) {
        case 'year-min':
          this.filter.yearMin = parseInt(thisFilter[1]);
          break;
        case 'year-max':
          this.filter.yearMax = parseInt(thisFilter[1]);

          break;
        case 'mileage-min':
          this.filter.mileageMin = parseInt(thisFilter[1]);

          break;
        case 'mileage-max':
          this.filter.mileageMax = parseInt(thisFilter[1]);

          break;
        case 'price-min':
          this.filter.priceMin = parseInt(thisFilter[1]);

          break;
        case 'price-max':
          this.filter.priceMax = parseInt(thisFilter[1]);

          break;
        case 'fuel-type':
          this.filter.fuelType = thisFilter[1];
          break;
        case 'transmission':
          this.filter.transmission = thisFilter[1];
          break;

        default:
          alert(this.ERROR_MESSAGE_ABOUT_MISSING_FILTER_FUNCTIONS);

          break;
      }
    }
  }

  handleFilterChange(filterData: [string, string][]): void {
    filterData.forEach((element) => {
      this.applyFilterChangesToShownArticles(element);
    });
    this.generateArticles();
  }

  generateArticles(): void {
    const carContainer = document.getElementsByClassName(
      'article-container'
    )[0] as HTMLElement;
    while (carContainer.firstChild) {
      carContainer.removeChild(carContainer.firstChild);
    }

    this.cars.forEach((car) => {
      if (!this.doesArticleFitInFilter(car)) {
        return;
      }
      const article = document.createElement('div');
      article.classList.add('article');
      const image = document.createElement('img');

      if (car.imagelink) {
        image.setAttribute('src', this.getFullImageUrl(car.imagelink));
      } else{
        image.setAttribute('src', "/example-car.png");

      }
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
      fuelType.textContent = `${
        car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)
      } car `;
      article.appendChild(fuelType);

      console.log(car.mileAge);

      const mileage = document.createElement('span');
      mileage.textContent = `with ${car.mileAge} miles mileage.`;
      article.appendChild(mileage);

      const transmission = document.createElement('div');
      transmission.textContent = `Transmission: ${car.transmission}`;
      article.appendChild(transmission);

      carContainer.appendChild(article);
    });
  }
  doesArticleFitInFilter(car: Car): boolean {
    for (const specificFilter in this.filter) {
      if (Object.prototype.hasOwnProperty.call(this.filter, specificFilter)) {
        const value = this.filter[specificFilter];
        console.log(value);
        if (value === null) {
          continue;
        }
        console.log(specificFilter);

        switch (specificFilter) {
          case 'yearMin':
            if (car.year < value) return false;
            break;
          case 'yearMax':
            if (car.year > value) return false;

            break;
          case 'mileageMin':
            if (car.mileAge < value) return false;

            break;
          case 'mileageMax':
            if (car.mileAge > value) return false;

            break;
          case 'priceMin':
            if (car.price < value) return false;

            break;
          case 'priceMax':
            if (car.price > value) return false;

            break;
          case 'fuelType':
            if (car.fuelType != value && value != 'any') return false;

            break;
          case 'transmission':
            if (car.transmission != value && value != 'any') return false;
            break;
          default:
            alert(this.ERROR_MESSAGE_ABOUT_MISSING_FILTER_FUNCTIONS);
            break;
        }
      }
    }

    return true;
  }
  formatPrice(price: number): string {
    const priceString = price.toString();
    return priceString
      .split('')
      .reverse()
      .reduce(
        (result, char, index) =>
          result +
          char +
          ((index + 1) % 3 === 0 && index !== priceString.length - 1
            ? ' '
            : ''),
        ''
      )
      .split('')
      .reverse()
      .join('');
  }

  getFullImageUrl(relativeUrl: string): string {
    return `https://localhost:7225${relativeUrl}`;
  }
}
