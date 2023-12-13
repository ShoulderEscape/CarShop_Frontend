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
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ArticleService', ['CreateArticle']);

    TestBed.configureTestingModule({
      declarations: [CarFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: ArticleService, useValue: spy }],
    });

    fixture = TestBed.createComponent(CarFormComponent);
    component = fixture.componentInstance;
    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.carForm.get('brand')).toBeDefined();
    expect(component.carForm.get('model')).toBeDefined();
  });

  it('should update selectedFile when onFilesSelected is called', () => {
    const mockFile = new File([''], 'mockFile.txt');
    const event = {
      currentTarget: {
        files: {
          length: 1,
          0: mockFile,
        },
      },
    } as unknown as Event;

    component.onFilesSelected(event);

    expect(component.selectedFile).toEqual(mockFile);
  });

  it('should not submit the form if it is invalid', () => {
    component.carForm.setErrors({ 'invalid': true });

    component.onSubmit();

    expect(articleServiceSpy.CreateArticle).not.toHaveBeenCalled();
  });

  

});
