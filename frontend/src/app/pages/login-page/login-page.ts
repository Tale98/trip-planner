import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-login-page',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private router = inject(Router);
  private authService = inject(AuthService);
  loginform = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  private toastSercice = inject(ToastService);
  onSubmit() {
    this.authService
      .login({
        username: this.loginform.get('username')?.value!,
        password: this.loginform.get('password')?.value!,
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.toastSercice.show('success', 'Login Failed', res.message);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          this.toastSercice.show('error', 'Login Failed', error.error.detail, 5000);
        },
      });
  }
}
