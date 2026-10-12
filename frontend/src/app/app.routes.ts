import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { MainPage } from './pages/main-page/main-page';
import { authGuard } from './guards/auth-guard';
import { RegisterPage } from './pages/register-page/register-page';
export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: '', component: MainPage, canActivate: [authGuard] },
];
