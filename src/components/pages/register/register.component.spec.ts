import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { UserRegistrationService } from 'src/app/services/UserService';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userRegistrationService: UserRegistrationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        UserRegistrationService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userRegistrationService = TestBed.inject(UserRegistrationService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the registration form when valid', fakeAsync(() => {
    const registerData = {
      username: 'testuser',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    };

    component.registerForm.setValue(registerData);

    const registerUserSpy = spyOn(userRegistrationService, 'registerUser').and.returnValue(of({ success: true }));

    component.onSubmit();
    tick();

    expect(registerUserSpy).toHaveBeenCalledWith(registerData);

    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { registered: 'true' },
    });

  }));
});
