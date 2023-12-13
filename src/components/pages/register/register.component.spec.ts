import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { UserRegistrationService } from 'src/app/services/UserService';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userRegistrationService: UserRegistrationService;
  let router: Router;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        UserRegistrationService,
        FormBuilder, // Add formBuilder to the providers
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
    formBuilder = TestBed.inject(FormBuilder); // Inject formBuilder
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

  it('should return true if passwords match', () => {
    const password = 'password123';
    const form: FormGroup = formBuilder.group({
      password: [password, Validators.required],
      confirmPassword: [password, Validators.required], // Matching confirmPassword
    });
    component.registerForm = form;

    const result = component.passwordsMatch();

    expect(result).toBe(true);
  });

  it('should return false if passwords do not match', () => {
    const password = 'password123';
    const confirmPassword = 'password456';
    const form: FormGroup = formBuilder.group({
      password: [password, Validators.required],
      confirmPassword: [confirmPassword, Validators.required],
    });
    component.registerForm = form;

    const result = component.passwordsMatch();

    expect(result).toBe(false);
  });

  it('should return false if one of the passwords is missing', () => {
    const password = 'password123';
    const form: FormGroup = formBuilder.group({
      password: [password, Validators.required],
      confirmPassword: [null, Validators.required], // Missing confirmPassword
    });
    component.registerForm = form;

    const result = component.passwordsMatch();

    expect(result).toBe(false);
  });
});
