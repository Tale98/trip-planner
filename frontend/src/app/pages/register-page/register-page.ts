import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth-service';
import { RegisterRequest } from '../../models/auth';
import { ToastService } from '../../services/toast-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) {
    return null;
  }
  if (password.dirty && confirmPassword.dirty) {
    if (password.value === confirmPassword.value) {
      return null;
    } else {
      return {
        passwordMissmatch: true,
      };
    }
  } else {
    return null;
  }
};

export class ConfirmPasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form?.hasError('passwordMissmatch') ?? false;
  }
}
@Component({
  selector: 'app-register-page',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  matcher = new ConfirmPasswordMatcher();
  registerForm = new FormGroup(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
      }),
      username: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(32)],
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      }),
    },
    {
      validators: [passwordMatchValidator],
    },
  );
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);
  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    const request: RegisterRequest = {
      email: this.registerForm.get('email')?.value!,
      username: this.registerForm.get('username')?.value!,
      password: this.registerForm.get('password')?.value!,
    };
    this.authService.register(request).subscribe({
      next: (response) => {
        this.registerForm.reset();
        this.toastService.show('success', 'Register Success', response.message);
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastService.show('error', 'Register Failed', error.error.detail, 5000);
      },
    });
  }
}
