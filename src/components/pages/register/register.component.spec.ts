import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { UserRegistrationService } from 'src/app/services/UserService';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userRegistrationService: UserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [UserRegistrationService],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userRegistrationService = TestBed.inject(UserRegistrationService);
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

    // Add more expectations based on your specific implementation

  }));

  it('should not submit the registration form when invalid', fakeAsync(() => {
    // Leave the form invalid

    // Spy on the registerUser method
    const registerUserSpy = spyOn(userRegistrationService, 'registerUser').and.returnValue(of({ success: true }));

    // Trigger form submission
    component.onSubmit();
    tick();

    // Check if registerUser is not called when the form is invalid
    expect(registerUserSpy).not.toHaveBeenCalled();

    // Add more expectations based on your specific implementation

  }));
});
