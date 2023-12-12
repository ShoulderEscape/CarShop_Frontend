import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CarFormComponent } from './car-form.component';
import { DebugElement } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { ArticleService } from 'src/app/services/ArticleService';


describe('CarFormComponent', () => {
  let component: CarFormComponent;
  let fixture: ComponentFixture<CarFormComponent>;
  let articleService: ArticleService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [ArticleService],
    });

    fixture = TestBed.createComponent(CarFormComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
