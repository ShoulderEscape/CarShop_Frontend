import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from 'src/app/services/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.userRegistrationService
        .registerUser(this.registerForm.value)
        .subscribe(
          (response) => {
            console.log('Register Complete', response);
            this.router.navigate(['/login'], {
              queryParams: { registered: 'true' },
            });
          },
          (error) => {
            if (error.status === 400 && error.error) {
              this.errorMessage = error.error;
            } else {
              this.errorMessage = 'An unexpected error occurred.';
            }
          }
        );
    } else if (!this.passwordsMatch()) {
      this.errorMessage = 'Passwords dont match.';
    }
  }

  private passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
