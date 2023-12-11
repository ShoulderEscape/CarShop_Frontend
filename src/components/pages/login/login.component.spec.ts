import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; 
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/AuthService';
import { Subject } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    const activatedRoute = {
      snapshot: { paramMap: convertToParamMap({ registered: 'true' }) },
      paramMap: new Subject(),
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        {
          provide: AuthService,
          useValue: { login: jasmine.createSpy('login').and.returnValue(of('mockToken')) },
        },
      ],
    });

    // ...
  });

  it('should create', () => {
    // Trigger a route change to simulate ActivatedRoute paramMap update
    const paramMap = TestBed.inject(ActivatedRoute).paramMap as Subject<any>;
    paramMap.next(convertToParamMap({ registered: 'true' }));

    expect(component).toBeTruthy();
  });
});


