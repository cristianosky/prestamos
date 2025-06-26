import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = 'test@test.com';
  password = '1234';
  isDark = false;

  constructor(private auth: AuthService, private router: Router) {
    this.loadThemePreference();
  }

  login() {
    const success = this.auth.login(this.email, this.password);
    if (success) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      alert('Credenciales incorrectas');
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'dark';
    document.body.classList.toggle('dark', this.isDark);
  }
}
