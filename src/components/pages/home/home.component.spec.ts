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
    spyOn(window, 'alert'); // Spy on the alert function

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
        mileage: 50000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        contactName: 'John Doe',
        contactNumber: 1234567890,
        price: 25000,
        imagelink: 'path/to/image.jpg',
        auctionDateTime: '2023-01-01T12:00:00',
      },
      {
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        mileage: 40000,
        fuelType: 'Gasoline',
        transmission: 'Manual',
        contactName: 'Alice Smith',
        contactNumber: 9876543210,
        price: 20000,
        description: 'Well-maintained, low mileage car.',
        imagelink: 'path/to/another-image.jpg',
        auctionDateTime: '2023-02-01T14:30:00',
      }
      
    ];

    component.cars = mockCars;
    component.generateArticles();

    const articles = fixture.nativeElement.querySelectorAll('.article');
    expect(articles.length).toBe(mockCars.length);

    articles.forEach((article: { querySelector: (arg0: string) => { (): any; new(): any; textContent: any; getAttribute: 
      { (arg0: string): any; new(): any; }; }; }, index: number) => {
      const car = mockCars[index];

      expect(article.querySelector('.title').textContent).toContain(`${car.brand} ${car.model}`);
      expect(article.querySelector('.price').textContent).toContain(`${component.formatPrice(car.price)} kr`);
      expect(article.querySelector('.car-image').getAttribute('src')).toBe(car.imagelink);
    });
  });
  

 
});
