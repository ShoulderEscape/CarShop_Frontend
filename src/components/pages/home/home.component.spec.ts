import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { FilterComponent } from './filter/filter.component';
import { ArticleService } from 'src/app/services/ArticleService';
import { Car } from 'src/app/models/car.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let articleService: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent, FilterComponent],
      providers: [ArticleService]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getArticles and generateArticles on initialization', () => {
    const getArticlesSpy = spyOn(articleService, 'getArticles').and.returnValue(of([]));
    const generateArticlesSpy = spyOn(component as any, 'generateArticles');
    
    component.ngOnInit();

    expect(getArticlesSpy).toHaveBeenCalled();
    expect(generateArticlesSpy).toHaveBeenCalled();
  });

  it('should call applyFilterChangesToShownArticles as many times as there are changes to the filterData', () => {
    const filterData: [string, string][] = [
      ['yearMin', '2000'],
      ['fuelType', 'electric']
    ];

    const applyFilterChangesSpy = spyOn(component as any, 'applyFilterChangesToShownArticles');
    const generateArticlesSpy = spyOn(component as any, 'generateArticles');

    component.handleFilterChange(filterData);

    expect(applyFilterChangesSpy).toHaveBeenCalledWith(filterData[0]);
    expect(applyFilterChangesSpy).toHaveBeenCalledWith(filterData[1]);
    expect(generateArticlesSpy).toHaveBeenCalled();
  });

  it('should format the price correctly', () => {
    const price = 1234567;
    const formattedPrice = component.formatPrice(price);
    expect(formattedPrice).toBe('1 234 567');
  });

 
  it('should handle zero input', () => {
    const price = 0;
    const formattedPrice = component.formatPrice(price);
    expect(formattedPrice).toBe('0');
  });
  it('should update the filter correctly for year-min', () => {
    const filterChange: [string, string] = ['year-min', '2020'];
    component.applyFilterChangesToShownArticles(filterChange);

    expect(component.filter.yearMin).toBe(2020);
  });


  it('should show an error alert for unknown filter', () => {
    spyOn(window, 'alert');

    const unknownFilter: [string, string] = ['unknown-filter', 'value'];
    component.applyFilterChangesToShownArticles(unknownFilter);

    expect(window.alert).toHaveBeenCalledWith(component.ERROR_MESSAGE_ABOUT_MISSING_FILTER_FUNCTIONS);
  });

  it('should generate articles with correct content', () => {
    const mockCars: Car[] = [
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileAge: 50000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        contactName: 'John Doe',
        contactNumber: 1234567890,
        price: 25000,
        imagelink: 'jo',
        auctionDateTime: new Date(2023, 11, 8, 14, 30, 0),
      },
      {
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        mileAge: 40000,
        fuelType: 'Gasoline',
        transmission: 'Manual',
        contactName: 'Alice Smith',
        contactNumber: 9876543210,
        price: 20000,
        description: 'Well-maintained, low mileage car.',
        imagelink: 'hello',
        auctionDateTime: new Date(2023, 11, 8, 14, 30, 0),
      }
    ];
  
    component.cars = mockCars;
    component.generateArticles();
  
    const articles = fixture.nativeElement.querySelectorAll('.article');
    expect(articles.length).toBe(mockCars.length);
  
    articles.forEach((article: any, index: number) => {
      const car = mockCars[index];
  
      expect(article.querySelector('.title').textContent).toContain(`${car.brand} ${car.model}`);
      expect(article.querySelector('.price').textContent).toContain(`${component.formatPrice(car.price)} kr`);
  
      const expectedImageSrc = car.imagelink ? component.getFullImageUrl(car.imagelink) : '';
      expect(article.querySelector('.car-image').getAttribute('src')).toBe(expectedImageSrc);
    });
  });
  
  it('should return true if no filters are set', () => {
    const car: Car = {
      brand: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileAge: 50000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      contactName: 'John Doe',
      contactNumber: 1234567890,
      price: 25000,
      imagelink: 'path/to/image.jpg',
      auctionDateTime: new Date(2023, 11, 8, 14, 30, 0),
    };

    component.filter = {};

    const result = component.doesArticleFitInFilter(car);

    expect(result).toBe(true);
  });

  it('should return false if car year is less than yearMin filter', () => {
    const car: Car = { 
      brand: 'Toyota', 
      model: 'Camry', 
      year: 2019, 
      mileAge:0, 
      fuelType:"diesel", 
      transmission:"Automatic", 
      contactName:"Jonah", 
      price:791273, 
      contactNumber:123, 
      auctionDateTime:new Date(2023, 11, 8, 14, 30, 0), 
      imagelink:"auyd"};
    component.filter = { yearMin: 2020 };

    const result = component.doesArticleFitInFilter(car);

    expect(result).toBe(false);
  });

  it('should return false if car year is greater than yearMax filter', () => {
    const car: Car = { 
      brand: 'Toyota', 
      model: 'Camry', 
      year: 2021, 
      mileAge:0, 
      fuelType:"diesel", 
      transmission:"Automatic", 
      contactName:"Jonah", 
      price:791273, 
      contactNumber:123, 
      auctionDateTime:new Date(2023, 11, 8, 14, 30, 0), 
      imagelink:"auyd" };
    component.filter = { yearMax: 2020 };

    const result = component.doesArticleFitInFilter(car);

    expect(result).toBe(false);
  });


  it('should return true if car passes all filter conditions', () => {
    const car: Car = {
      brand: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileAge: 50000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      contactName: 'John Doe',
      contactNumber: 1234567890,
      price: 25000,
      imagelink: 'path/to/image.jpg',
      auctionDateTime: new Date(2023, 11, 8, 14, 30, 0),
    };

    component.filter = {
      yearMin: 2000,
      yearMax: 2030,
    };

    const result = component.doesArticleFitInFilter(car);

    expect(result).toBe(true);
  });

  
  
  

 
});
