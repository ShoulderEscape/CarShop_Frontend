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

    // Set form values
    component.registerForm.setValue(registerData);

    // Spy on the registerUser method
    const registerUserSpy = spyOn(userRegistrationService, 'registerUser').and.returnValue(of({ success: true }));

    // Trigger form submission
    component.onSubmit();
    tick();

    // Check if registerUser is called with the correct data
    expect(registerUserSpy).toHaveBeenCalledWith(registerData);

    // Check if the router.navigate method is called with the expected parameters
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { registered: 'true' },
    });

    // Add more expectations based on your specific implementation
  }));
});
