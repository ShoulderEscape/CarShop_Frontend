import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { queryParams: of({}) }; 

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with two controls', () => {
    expect(component.loginForm.contains('username')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the username and password controls required', () => {
    let usernameControl = component.loginForm.get('username');
    let passwordControl = component.loginForm.get('password');

    usernameControl!.setValue('');
    passwordControl!.setValue('');

    expect(usernameControl!.valid).toBeFalse();
    expect(passwordControl!.valid).toBeFalse();
  });

  it('should call authService.login if form is valid', () => {
    const formValues = { username: 'testuser', password: 'testpass' };
    mockAuthService.login.and.returnValue(of('fakeToken'));
    component.loginForm.setValue(formValues);

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith(formValues);
  });
  it('should navigate to home on successful login', () => {
    mockAuthService.login.and.returnValue(of('fakeToken'));
    component.loginForm.setValue({
      username: 'testuser',
      password: 'testpass',
    });

    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set errorMessage on login failure', () => {
    mockAuthService.login.and.returnValue(
      throwError(() => new Error('Login failed'))
    );
    component.loginForm.setValue({
      username: 'testuser',
      password: 'testpass',
    });

    component.onSubmit();

    expect(component.errorMessage).toBe(
      'Login failed, check username and password'
    );
  });
});
