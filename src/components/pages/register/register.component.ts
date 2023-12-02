import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from 'src/app/services/UserService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService
  ) {
    this.registerForm = this.formBuilder.group({});
    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      //Fler fält???
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);

      this.userRegistrationService
        .registerUser(this.registerForm.value)
        .subscribe(
          (response) => {
            console.log('Register Complete', response);
          },
          (error) => {
            console.error('Register Failed', error);
          }
        );
    }
  }
}
