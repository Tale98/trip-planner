import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-page',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
