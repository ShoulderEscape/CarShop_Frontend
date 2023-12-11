import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CarFormComponent } from './car-form.component';
import { DebugElement } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CreateArticleService } from 'src/app/services/ArticleService';


describe('CarFormComponent', () => {
  let component: CarFormComponent;
  let fixture: ComponentFixture<CarFormComponent>;
  let createArticleService: CreateArticleService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [CreateArticleService],
    });

    fixture = TestBed.createComponent(CarFormComponent);
    component = fixture.componentInstance;
    createArticleService = TestBed.inject(CreateArticleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
